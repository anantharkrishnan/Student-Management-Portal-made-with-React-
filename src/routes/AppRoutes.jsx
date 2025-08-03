import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from '../features/students/StudentList';
import StudentForm from '../features/students/StudentForm';
import EditStudent from '../features/students/EditStudent';
import StudentDetail from '../features/students/StudentDetail'; 

export default function AppRoutes() {
  return (
    <div className='bg-green-300 p-4'>
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

