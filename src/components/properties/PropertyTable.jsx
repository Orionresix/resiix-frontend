/* eslint-disable react/prop-types */
import {React,useState }from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  Typography
} from '@mui/material'
import actionicon from "../../assets/actionicon.svg"


const PropertyTable = ({ properties, onAddClick, onViewDetailsClick }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(Array(properties.length).fill(false));
  const handleCellClick = (rowIndex) => {
    setIsDropdownOpen((prevState) => {
      const newDropdowns = [...prevState];
      newDropdowns[rowIndex] = !newDropdowns[rowIndex];
      return newDropdowns;
    });
  };

  const handleMenuItemClick = (action, rowIndex) => {
    setIsDropdownOpen(false); // Close dropdown after selection
    console.log(action, rowIndex)
    switch (action) {
      case "add":
        onAddClick(rowIndex);
        break;
      case "viewDetails":
        onViewDetailsClick(rowIndex);
        break;
      case "reject":
        // onDeleteClick(rowIndex);
        break;
      default:
        break;
    }
  };



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
          {/* Render a TableRowItem for each property in the properties array */}
          {properties.map((property) => (
                <TableRow key={property.p_id}>

       <TableCell onClick={() => handleCellClick(property.p_id)}>
              {!isDropdownOpen[[property.p_id]] && (
                 <CardMedia
                 component="img"
                 image={actionicon}
                 alt={property.p_id}
                 height="40"
                 width="40"
                 sx={{flex: "0 0 40px",  }}
               />


              )}

              {isDropdownOpen[property.p_id] && (
                <>
    
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    onClick={() =>
                      handleMenuItemClick("viewDetails", property.p_id)
                    }
                  >
                    view details
                  </Typography>
               
                </>
              )}
            </TableCell>
      <TableCell>{property.p_name}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_city}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
      <TableCell>{property.p_num_units}</TableCell>
    
    </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyTable;
