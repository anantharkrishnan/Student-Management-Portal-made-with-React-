import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/students';

// ✅ Fetch students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// ✅ Add student to API
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const res = await axios.post(API_URL, student);
  return res.data;
});

// ✅ Delete student from API
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    editStudent: (state, action) => {
      const index = state.data.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.data = state.data.filter(s => s.id !== action.payload);
      });
  },
});

export const { editStudent } = studentSlice.actions;
export default studentSlice.reducer;

