import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const res = await fetch('/db.json');
  const data = await res.json();
  return data.students; 
});


const savedStudents = JSON.parse(localStorage.getItem('students')) || [];

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: savedStudents,
    loading: false,
    error: null,
  },
  reducers: {
    addStudent: (state, action) => {
      const newStudent = { id: Date.now().toString(), ...action.payload };
      state.data.push(newStudent);
      localStorage.setItem('students', JSON.stringify(state.data));
    },
    editStudent: (state, action) => {
      const index = state.data.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        localStorage.setItem('students', JSON.stringify(state.data));
      }
    },
    deleteStudent: (state, action) => {
      state.data = state.data.filter((s) => s.id !== action.payload);
      localStorage.setItem('students', JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        
        if (state.data.length === 0) {
          state.data = action.payload;
          localStorage.setItem('students', JSON.stringify(state.data));
        }
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;



