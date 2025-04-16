import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const ResourcesTable = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/students/resources');
        setResources(res.data.resources || []);
      } catch (err) {
        console.error('Failed to fetch resources', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const columns = [
    { field: 'fileName', headerName: 'File Name', flex: 1, minWidth: 150 },
    { field: 'subject', headerName: 'Subject', flex: 1, minWidth: 120 },
    {
      field: 'uploadDate',
      headerName: 'Uploaded On',
      flex: 1,
      minWidth: 160,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
      },
    },
    {
      field: 'fileSize',
      headerName: 'Size (KB)',
      flex: 1,
      minWidth: 120,
      valueFormatter: (params) => {
        const sizeInKB = params.value / 1024;
        return isNaN(sizeInKB) ? 'N/A' : sizeInKB.toFixed(1);
      },
    },
    {
      field: 'download',
      headerName: 'Download',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          href={params.row.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 3, bgcolor: '#f5f7fa' }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        📚 Placement Resources
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={resources}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          getRowId={(row) => row._id}
          sx={{
            bgcolor: 'white',
            border: '1px solid #ddd',
            borderRadius: 2,
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f9f9f9', // Zebra stripe color
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#e0f7fa', // Hover color
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              fontWeight: 'bold',
            },
          }}
        />
      )}
    </Box>
  );
};

export default ResourcesTable;
