// auth.test.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Adjust this path as necessary
const { register, login } = require('./auth'); // Adjust the path as necessary

jest.mock('./db'); // Mock the db module
jest.mock('bcryptjs'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jwt

describe('Auth Module', () => {
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

  describe('register', () => {
    it('should register a user successfully', async () => {
      const req = mockRequest({ username: 'testuser', password: 'password123' });
      const res = mockResponse();
      const hashedPassword = 'hashedpassword';

      bcrypt.hash.mockResolvedValue(hashedPassword);
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['testuser', hashedPassword],
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should return an error if registration fails', async () => {
      const req = mockRequest({ username: 'testuser', password: 'password123' });
      const res = mockResponse();

      bcrypt.hash.mockResolvedValue('hashedpassword');
      db.query.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error registering user' });
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const req = mockRequest({ username: 'testuser', password: 'password123' });
      const res = mockResponse();
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };

      db.query.mockImplementation((sql, params, callback) => {
        callback(null, [user]);
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token123');

      await login(req, res);

      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['testuser'],
        expect.any(Function)
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'token123' });
    });

    it('should return an error if user is not found', async () => {
      const req = mockRequest({ username: 'testuser', password: 'password123' });
      const res = mockResponse();

      db.query.mockImplementation((sql, params, callback) => {
        callback(null, []);
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return an error if credentials are invalid', async () => {
      const req = mockRequest({ username: 'testuser', password: 'wrongpassword' });
      const res = mockResponse();
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };

      db.query.mockImplementation((sql, params, callback) => {
        callback(null, [user]);
      });
      bcrypt.compare.mockResolvedValue(false); // Password does not match

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should return an error if login fails', async () => {
      const req = mockRequest({ username: 'testuser', password: 'password123' });
      const res = mockResponse();

      db.query.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error logging in' });
    });
  });
});