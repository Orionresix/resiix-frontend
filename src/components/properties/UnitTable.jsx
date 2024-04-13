/* eslint-disable react/prop-types */
import {React }from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

// Separate component for rendering a single row in the table
const TableRowItem = ({ selectedProperty,  onViewDetailsClick}) => {
 
  console.log(onViewDetailsClick)

  return (
    <TableRow key={selectedProperty}>
      
      <TableCell>saple unit </TableCell>
      
    
    </TableRow>
  );
};

const PropCard = ({ selectedProperty }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number of Units</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Requests</TableCell>
            <TableCell>Workorders</TableCell>
            <TableCell>Caretaker </TableCell>
            <TableCell>Caretaker No</TableCell>
            <TableCell>Caretaker Email </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render a TableRowItem for each property in the properties array
          {properties.map((property) => (
            <TableRowItem key={property.p_id} property={property} />
          ))} */}

<TableRowItem key={selectedProperty} property={selectedProperty} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropCard;
