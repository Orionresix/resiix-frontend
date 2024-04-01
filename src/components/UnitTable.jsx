/* eslint-disable react/prop-types */
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
// import { Button } from '@mui/material'

// const getStatusColor = (r_status) => {
//   switch (r_status) {
//     case 'In Progress':
//       return 'orange'
//     case 'Done':
//       return 'green'
//     case 'Cancelled':
//       return 'red'
//     default:
//       return 'gray'
//   }
// }

const UnitsTable = ({ data }) => {
  // const columnss = [
  //   { field: 'id', headerName: 'ID', width: 100 },
  //   { field: 'unitNumber', headerName: 'Unit Number', width: 150 },
  //   { field: 'request', headerName: 'Request', flex: 1 },
  //   {
  //     field: 'status',
  //     headerName: 'Status',
  //     width: 150,
  //     renderCell: (params) => (
  //       <span
  //         style={{
  //           backgroundColor: getStatusColor(params.value),
  //           color: 'white',
  //           fontSize: '0.5rem',
  //           padding: '3px 8px',
  //           borderRadius: '12px',
  //         }}>
  //         {params.value}
  //       </span>
  //     ),
  //   },
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     width: 150,
  //     renderCell: () => <Button size='small'>Action</Button>,
  //   },
  // ]
  const columns = [
    { field: 'r_id', headerName: 'ID', flex: 1 },
    { field: 'r_type', headerName: 'Category', flex: 1 },
    { field: 'r_description', headerName: 'Description', flex: 1 },
    { field: 'r_u_id', headerName: 'Unit No', flex: 1 },
    { field: 'r_phone', headerName: 'Phone', flex: 1 },
    { field: 'r_status', headerName: 'Status', flex: 1 },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>

      {data.map(group => (
        <div key={group.property}>
          <h3>{group.propertyName}</h3>
          <DataGrid
            rows={group.orders}
            columns={columns}
            pageSize={5}
            rowHeight={35}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            getRowId={(row) => row.r_id}
          />
        </div>
      ))}
    </div>
  )
}

export default UnitsTable
