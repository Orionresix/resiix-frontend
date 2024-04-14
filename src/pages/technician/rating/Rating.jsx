import React, {useState} from 'react';
import './Rating.css';
import logo from '../../../assets/logo.svg';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import icon from '../../../assets/icon.png';

const Rating = () => {

    const navigate = useNavigate();
    const [rating, setRating] = useState();
    const [message, setMessage] = useState();

    const submitRating = (e) => {
        e.preventDefault();
        const notify = () => toast("Thank you for your feedback.");
        setRating('');
        setMessage('');
        notify();
        setTimeout(() => {
            navigate('/resix/feedback');
        }, 3000);
        
    }

  return (
    <div className='rating'>
        <div className="padding">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
        </div>
        <div className="rating-cont">
            <div className="rating-welcome">
                <h1>Welcome</h1>
                <p>Jairus Musa,Penzi Technician</p>
            </div>
            <form className="rating-form" onSubmit={(e) => {submitRating(e)}}>
                <div className="flex-row-space">
                    <div className="flex-row">
                        <img src={icon} alt="icon"/>
                        <p>Tck0001</p>
                    </div>
                    <p>11 minutes ago</p>
                </div>
                <div className="rating-profile">
                    <h1>KW</h1>
                    <p>karen Wanyama</p>
                    <p>Electrical</p>
                </div>
                <h4>How was the software?</h4>
                <RatingComponent required onClick={(rate) => setRating(rate)} ratingValue={rating}/>
                <p>Want to share your experience?</p>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={message} onChange={(e) => {setMessage(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        <Toaster
          toastOptions={{
            style: {
              background: "green",
              color: "#fff",
            },
          }}
        />
    </div>
  )
}

export default Rating