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

;

const PropCard = ({ selectedProperty, onViewDetailsClick }) => {
  console.log(onViewDetailsClick)

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
        {selectedProperty.map((unit) => (
                <TableRow key={unit.u_id}> 
                
        <TableCell>{unit.u_name}</TableCell>
      <TableCell>{unit.u_type}</TableCell>
                
                
                </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropCard;
