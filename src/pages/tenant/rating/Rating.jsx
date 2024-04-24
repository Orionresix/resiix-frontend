/* eslint-disable no-undef */
import React, { useState } from 'react';
import './Rating.css';
import { toast, Toaster } from 'react-hot-toast';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import { Card, CardContent, Typography, Button, TextareaAutosize, Grid, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Rating = ({ completedRequests, selectedticketid, onClose }) => {
  console.log(completedRequests)
  const baseURL = process.env.REACT_APP_BASE_URL
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const submitRating = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const url = `${baseURL}/work_orders/close`;
    const data = {
      ticketId: selectedticketid,
      rating: rating,
      message: message,
    };
    const options = {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify the content type of the request body
      },
      body: JSON.stringify(data), // Convert data to JSON string for the request body
    };
    fetch(url, options)
      .then((response) => {
        setIsLoading(false); 
        if (!response.ok) {
          throw new Error("Failed to add rating ");
        }
        toast.success("'Thank you for your feedback.'");
        onClose(data.wo_id);
      })
      .catch((error) => {
        setIsLoading(false); 
        console.error("Error while rating:", error);
      });
  };



  const handleClose = (rowIndex) => {
    onClose(rowIndex);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <form className="rating-form" onSubmit={(e) => submitRating(e)}>
              <Grid container spacing={2} alignItems="center">
              
               
             


                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    How was the service?
                  </Typography>
                  <RatingComponent required onClick={(rate) => setRating(rate)} ratingValue={rating} />
                </Grid>

                <Grid item xs={12}>
                  <Typography align="center">Want to share your experience?</Typography>
                  <div className="form-group">
                    <TextareaAutosize
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      minRows={3}
                      style={{ width: '100%' }}
                    />
                  </div>
                </Grid>

            

                <Box display="flex" gap="1rem" justifyContent="end">
              
              <Button
                onClick={() => handleClose(selectedticketid)}
                variant="contained"
                color="primary"
                style={{ width: "40%" }}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "40%" }}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
                
              </Button>



            </Box>






              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Toaster
        toastOptions={{
          style: {
            background: 'green',
            color: '#fff',
          },
        }}
      />
    </Grid>
  );
};

export default Rating;
