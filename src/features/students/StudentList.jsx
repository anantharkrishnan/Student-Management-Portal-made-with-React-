import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, deleteStudent } from './studentSlice';
import { Link } from 'react-router-dom';

export default function StudentList() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p className="text-blue-500 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 uppercase italic">Student List</h2>
        <Link
          to="/add"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Student
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {data.map((student) => (
            <div
              key={student.id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-3">
                <p className="text-xl font-semibold text-gray-800">{student.name}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/student/${student.id}`}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 text-sm font-medium"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${student.id}`}
                  className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

