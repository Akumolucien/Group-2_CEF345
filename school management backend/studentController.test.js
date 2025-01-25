// studentController.test.js
const db = require('./db'); // Adjust this path as necessary
const { getAllStudents, addStudent } = require('./studentController'); // Adjust the path as necessary

jest.mock('./db'); // Mock the db module

describe('Student Controller', () => {
  const mockRequest = (body) => ({
    body,
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('getAllStudents', () => {
    it('should fetch all students successfully', async () => {
      const req = {};
      const res = mockResponse();
      const students = [{ id: 1, name: 'John Doe', grade: 'A' }];

      db.query.mockImplementation((sql, callback) => {
        callback(null, students);
      });

      await getAllStudents(req, res);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM students', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(students);
    });

    it('should return an error if fetching students fails', async () => {
      const req = {};
      const res = mockResponse();

      db.query.mockImplementation((sql, callback) => {
        callback(new Error('Database error'));
      });

      await getAllStudents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching students' });
    });
  });

  describe('addStudent', () => {
    it('should add a student successfully', async () => {
      const req = mockRequest({ name: 'Jane Doe', grade: 'B' });
      const res = mockResponse();

      db.query.mockImplementation((sql, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      await addStudent(req, res);

      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO students (name, grade) VALUES (?, ?)',
        ['Jane Doe', 'B'],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Student added successfully' });
    });

    it('should return an error if adding a student fails', async () => {
      const req = mockRequest({ name: 'Jane Doe', grade: 'B' });
      const res = mockResponse();

      db.query.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      await addStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error adding student' });
    });
  });
});