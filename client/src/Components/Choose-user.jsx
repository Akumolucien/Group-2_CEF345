import React from 'react';
import { ChooseUserContainer, UserSection, Title, Button } from '../styles/ChooseUserStyles'; // Import styles


const ChooseUser = () => {
  return (
    <div className='ChooseUserContainer'>
      <div className='UserSection'>
        <Title>Admin</Title>
        <Button to="/admin-signIn">Login as Admin</Button>
      </UserSection>
      <UserSection>
        <Title>Student</Title>
        <Button to="/student-signIn">Login as Student</Button>
      </UserSection>
      <UserSection>
        <Title>Teacher</Title>
        <Button to="/teacher-signIn">Login as Teacher</Button>
      </UserSection>
    </div>
  );
};

export default ChooseUser;