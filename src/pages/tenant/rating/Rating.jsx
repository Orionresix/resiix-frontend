import React, { useState, useEffect } from 'react';
import './Rating.css';
import logo from '../../../assets/logo.svg';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import icon from '../../../assets/icon.png';
import { Card, CardContent, Typography, Button, TextareaAutosize, Avatar, Grid } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Rating = ({ ticketId }{ ticketId }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [ticketDetails, setTicketDetails] = useState({ name: '', type: '', submittedAt: '', assignedTechnician: '' });

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        // Fetch ticket details from the API
        const response = await fetch(`API_ENDPOINT/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }
        const data = await response.json();
        setTicketDetails({
          name: data.name,
          type: data.type,
          submittedAt: data.submittedAt,
          assignedTechnician: data.assignedTechnician,
        });
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        toast.error('Failed to fetch ticket details. Please try again later.');
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  const submitRating = async (e) => {
    e.preventDefault();
    try {
      // Submit the rating to the API
      const response = await fetch('API_ENDPOINT/submit-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticketId,
          rating: rating,
          message: message,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
      const notify = () => toast.success('Thank you for your feedback.');
      setRating(0);
      setMessage('');
      notify();
      setTimeout(() => {
        navigate('/resiix/feedback');
      }, 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again later.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <form className="rating-form" onSubmit={(e) => submitRating(e)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2" align="center">
                    <Avatar alt="logo" src={logo} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    <Avatar alt="icon" src={icon} />
                    {ticketDetails.name}
                  </Typography>
                  <Typography align="center">{ticketDetails.submittedAt}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    {ticketDetails.type}
                  </Typography>
                  {/* Fetch the name of the assigned technician from the API */}
                  <Typography align="center">{ticketDetails.assignedTechnician}</Typography>
                </Grid>
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
                <Grid item xs={12}>
                  <div className="form-group" style={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </Grid>
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
