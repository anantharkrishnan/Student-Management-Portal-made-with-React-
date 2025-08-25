import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StudentDetail() {
  const { id } = useParams();

  
  const student = useSelector((state) =>
    state.students.data.find((s) => s.id.toString() === id)
  );

  if (!student) {
    return <p className="text-center text-red-600 mt-10">Student not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{student.name}</h2>

      <div className="space-y-2 text-gray-700 text-lg">
        <p>
          <span className="font-semibold">Email:</span> {student.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {student.phone}
        </p>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Back to List
        </Link>
      </div>
    </div>
  );
}


