import React, { useState } from 'react';
import './Rating.css';
import logo from '../../../assets/logo.svg';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import icon from '../../../assets/icon.png';
import { Card, CardContent, Typography, Button, TextareaAutosize, Avatar, Grid } from '@mui/material';

const Rating = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const submitRating = (e) => {
    e.preventDefault();
    const notify = () => toast.success('Thank you for your feedback.');
    setRating(0);
    setMessage('');
    notify();
    setTimeout(() => {
      navigate('/resiix/feedback');
    }, 3000);
  };

  return (
    <Grid>
        <Typography variant="h5" component="h2">
       
       <Avatar alt="logo" src={logo} />
   

   </Typography>

    <Card>


      <CardContent>

        <form className="rating-formmmm" onSubmit={(e) => submitRating(e)}>
       
           
           
              <Avatar alt="icon" src={icon} />
              <Typography>Tck0001</Typography>
     


            <Typography>11 minutes ago</Typography>
  
       <Grid>
            <Typography variant="h6">KW</Typography>
            <Typography>karen Wanyama</Typography>
            <Typography>Electrical</Typography>
            </Grid>

          <Typography variant="h6">How was the service?</Typography>
          <RatingComponent required onClick={(rate) => setRating(rate)} ratingValue={rating} />
          <Typography>Want to share your experience?</Typography>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <TextareaAutosize
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              minRows={3}
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>

      <Toaster
        toastOptions={{
          style: {
            background: 'green',
            color: '#fff',
          },
        }}
      />
    </Card>
    </Grid>
  );
};

export default Rating;
