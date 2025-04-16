import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApplications = createAsyncThunk("applications/fetchApplications", async () => {
  const response = await axios.get("http://localhost:5001/api/students/applications", { withCredentials: true }); // Adjust endpoint
  // console.log("Fetched Applications Data:", response.data);
  return response.data;
});

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [], // ✅ Make sure it's an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload || []; // ✅ Ensure it remains an array
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default applicationSlice.reducer;
