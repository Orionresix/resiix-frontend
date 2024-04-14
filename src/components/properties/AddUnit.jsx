import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Input,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Switch from "@material-ui/core/Switch";
// const baseURL = 'https://orionbackend-1.onrender.com';

const AddUnitForm = ({ onSubmit, onCancel, selectedProperty }) => {
  //   const classes = useStyles();
  const [unit, setUnit] = useState({
    u_p_id: selectedProperty,
    u_name: "",
    r_description: "",
    r_type: "",
    r_img_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(unit);
    // Optionally, you can reset the form after submission
    setUnit({
      p_name: "",
      u_p_id: "",
      u_name: "",
      r_description: "",
      r_priority: "",
      u_type: "",
      r_img_url: "",
    });
  };

  const Types = [
    { id: 1, name: "ACTIVE" },
    { id: 2, name: "VACANT" },
    { id: 3, name: "OTHER" },
  ];

  const [checked, setChecked] = useState(false);

  const handleUnitStatus = () => {
    setChecked((prev) => !prev);
  };

  const handleClose = () => {};

  return (
    <Dialog open={true} onClose={handleClose}>
      <Paper className={"classes.paper"} sx={{ pt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ ml: 4 }}>
          Add Unit
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Unit code/name "
                name="u_name"
                value={unit.u_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Description"
                name="r_description"
                value={unit.u_description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                label="Select type"
                name="u_type"
                value={unit.u_type}
                onChange={handleChange}
              >
                {Types.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

         

<Switch
        checked={checked}
        onChange={handleUnitStatus}
        color="primary"
        name="Occupied"
        inputProps={{ 'aria-label': 'toggle switch' }}
      />

            <hr></hr>

            {checked && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Lease No"
                    name="l_code"
                    value={unit.l_code}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Lease expiry date"
                    name="l_end_date"
                    value={unit.l_end_date}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Tenant name"
                    name="l_lessee_name"
                    value={unit.l_lessee_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Tenant number"
                    name="l_phone"
                    value={unit.l_phone}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Tenant email"
                    name="l_email"
                    value={unit.l_email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input
                    type="file"
                    accept="file/*"
                    fullWidth
                    label="Attach Photo"
                    name="l_attachment_url"
                    onChange={handleChange} // Change handler for image selection
                  />
                </Grid>
              </>
            )}

            <br />

            <span>
              <Button type="submit" variant="contained" color="primary">
                Add unit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={onCancel}
                sx={{ mr: 2 }}
              >
                cancel
              </Button>
            </span>
          </Grid>
        </form>
      </Paper>
    </Dialog>
  );
};

AddUnitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedProperty: PropTypes.func.isRequired,
};

export default AddUnitForm;
