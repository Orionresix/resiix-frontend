import React, {useState, useEffect} from 'react';
import './Rating.css';
import logo from '../../../assets/logo.svg';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import icon from '../../../assets/icon.png';

const Rating = () => {

    const navigate = useNavigate();
    const [rating, setRating] = useState(0); // Initialize rating state
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch technician's rating
    const fetchTechnicianRating = async () => {
        try {
            // Make an API call to fetch the technician's rating
            // Replace API_ENDPOINT and ticket ID with your actual endpoint and ticket ID
            const response = await fetch(`API_ENDPOINT/technician-rating?ticketId=${ticketId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch rating');
            }
            const data = await response.json();
            // Set the rating fetched from the API
            setRating(data.rating);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching rating:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnicianRating();
    }, []); // Fetch rating on component mount

    const submitRating = async (e) => {
        e.preventDefault();
        try {
            // Make an API call to submit the rating
            // Replace API_ENDPOINT and ticket ID with your actual endpoint and ticket ID
            await fetch(`API_ENDPOINT/submit-rating?ticketId=${ticketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: rating,
                    message: message,
                }),
            });
            const notify = () => toast("Thank you for your feedback.");
            setRating(0);
            setMessage('');
            notify();
            setTimeout(() => {
                navigate('/resiix/feedback');
            }, 3000);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
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
                    <p>Jaylon,Penzi Technician</p>
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
                    {!isLoading && (
                        <RatingComponent required onClick={(rate) => setRating(rate)} ratingValue={rating}/>
                    )}
                    {isLoading && <p>Loading...</p>}
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

export default Rating;
