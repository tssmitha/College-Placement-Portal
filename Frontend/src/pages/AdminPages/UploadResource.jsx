// UploadResource.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography,
  MenuItem, Select, InputLabel, FormControl,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const UploadResource = () => {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjectsList, setSubjectsList] = useState([]); // ✅ default is empty array
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Modal state
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  // 🔁 Fetch subjects
 // 🔁 Fetch subjects — define outside so it's reusable
const fetchSubjects = async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/admin/subjects");
    if (Array.isArray(res.data.subjects)) {
      setSubjectsList(res.data.subjects);
    } else {
      console.error("Subjects response is not an array:", res.data);
      setSubjectsList([]);
    }
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    setSubjectsList([]);
  }
};

// Call it on component mount
useEffect(() => {
  fetchSubjects();
}, []);

  


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !subject) {
      alert("Please select a subject and a file");
      return;
    }

    const formData = new FormData();
    formData.append('subjectPdf', file);
    formData.append('subject', subject);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5001/api/admin/upload-resource', formData);
      setUploadMessage('Uploaded Successfully ✅');
    } catch (err) {
      setUploadMessage('Upload failed ❌');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add New Subject
  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;

    try {
      await axios.post("http://localhost:5001/api/admin/subjects", { name: newSubject.trim() });
      setOpenDialog(false);
      setNewSubject('');
      fetchSubjects(); // Refresh subject list
    } catch (err) {
      console.error('Failed to add subject:', err);
    }
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={3}>Upload Placement Resource</Typography>

      <form onSubmit={handleUpload}>
        {/* Select Subject */}
        <Box display="flex" gap={2} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Select Subject</InputLabel>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Select Subject"
            >
              {Array.isArray(subjectsList) && subjectsList.map((subject) => (
  <MenuItem key={subject._id} value={subject.name}>
    {subject.name}
  </MenuItem>
))}

            </Select>
          </FormControl>

          {/* Add Subject Button */}
          <IconButton color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* File Picker */}
        <Button variant="outlined" component="label" fullWidth sx={{ my: 2 }}>
          {file ? file.name : "Choose PDF File"}
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        {/* Upload Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Upload Resource"}
        </Button>

        {uploadMessage && (
          <Typography mt={2} color="secondary">
            {uploadMessage}
          </Typography>
        )}
      </form>

      {/* ➕ Add Subject Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject Name"
            fullWidth
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubject}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadResource;
