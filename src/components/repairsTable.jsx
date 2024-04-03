/* eslint-disable react/prop-types */
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const getStatusColor = (r_status) => {
  switch (r_status) {
    case 'NEW':
      return 'orange'
    case 'ASSIGNED':
      return 'blue'
    case 'WIP':
      return 'yellow'
    case 'DONE':
          return 'green'
    case 'CANCELLED':
      return 'red'
    default:
      return 'gray'
  }
}

const repairsTable = ({  groupeddata }) => {

  const columns = [
    { field: 'r_id', headerName: 'ID', flex: 1 },
    { field: 'p_name', headerName: 'Property', flex: 1 },
    { field: 'u_name', headerName: 'Unit No', flex: 1 },
    { field: 'r_type', headerName: 'Type', flex: 1 },
    { field: 'r_description', headerName: 'Description', flex: 1 },
    { field: 'r_phone', headerName: 'Phone', flex: 1 },
    { field: 'r_status', headerName: 'Status', flex: 1,
        renderCell: (params) => (
            <span
              style={{
                backgroundColor: getStatusColor(params.value),
                color: 'white',
                fontSize: '0.5rem',
                padding: '3px 8px',
                borderRadius: '12px',
              }}>
              {params.value}
            </span>
          ), 
    },
    { field: 'r_priority', headerName: 'Priority', flex: 1 },
    {field: 'action', headerName: 'Action',width: 150,
          renderCell: () => <Button size='small'>Action</Button>,
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>


<DataGrid
    rows={groupeddata.reduce((acc, group) => [...acc, ...group.orders], [])}
    columns={columns}
    pageSize={5}
    rowHeight={35}
    rowsPerPageOptions={[5]}
    checkboxSelection={false}
    getRowId={(row) => row.r_id}
  />

    </div>
  )
}

export default repairsTable
