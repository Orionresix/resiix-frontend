/* eslint-disable react/prop-types */
import React from 'react'
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
const TableRowItem = ({ property }) => {
  return (
    <TableRow key={property.p_id}>
      <TableCell>{property.p_id}</TableCell>
      <TableCell>{property.p_name}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_city}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
    </TableRow>
  );
};

const PropCard = ({ properties }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number of Units</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Field 1</TableCell>
            <TableCell>Field 2</TableCell>
            <TableCell>Field 3</TableCell>
            <TableCell>Field 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render a TableRowItem for each property in the properties array */}
          {properties.map((property) => (
            <TableRowItem key={property.p_id} property={property} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropCard;
