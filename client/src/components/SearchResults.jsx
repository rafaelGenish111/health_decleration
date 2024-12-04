import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'תעודת זהות', width: 150 },
  { field: 'last_name', headerName: 'שם משפחה', width: 150 },
  { field: 'first_name', headerName: 'שם פרטי', width: 150 },
];

export default function SearchResults({ data }) {
  console.log(data);
  return (
    <div
      className='form'
      style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(params) => {
          const decId = params.row.id;
          console.log('User clicked on row', params.row);
           window.open(`/declerations/${decId}`, '_blank');         
        }}
      />
    </div>
  )
}
