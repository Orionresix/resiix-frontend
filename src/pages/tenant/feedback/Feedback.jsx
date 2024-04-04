import React, {useState} from 'react';
import './Feedback.css';
import { FaTimes } from 'react-icons/fa';
import { IoMdAttach, IoMdSend } from "react-icons/io";
import bot from '../../../assets/Bot.png';

const Feedback = () => {

    const [message, setMessage] = useState();
    const [image, setImage] = useState({name: ''});

    const submitFeedback = (e) => {
        e.preventDefault();
        console.log(message, image);
        setMessage('');
    }

    const messages = [
        {
            id: 1,
            message: 'Hi, how are you doing? How can I help you today?.',
            by: 'bot'
        },
        {
            id: 2,
            message: 'I am having issues with the electricity in my apartment.',
            by: 'user'
        },
        {
            id: 3,
            message: 'I am having issues with the electricity in my apartment.',
            by: 'bot'
        },
        {
            id: 4,
            message: 'I am having issues with the electricity in my apartment.',
            by: 'user'
        },
        {
            id: 5,
            message: 'I am having issues with the electricity in my apartment.',
            by: 'bot'
        },
        {
            id: 6,
            message: 'I am having issues with the electricity in my apartment.',
            by: 'user'
        },
    ]

  return (
    <div className='feedback'>
        <div className="feedback-header">
            <h3>Feedback</h3>
            <FaTimes/>
        </div>
        <div className="feedback-body">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.by}`}>
                    {message.by === 'bot' ? <img src={bot} alt="bot"/> : ''}
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
        <form className="chat-form" onSubmit={(e) => {submitFeedback(e)}}>
            <div className="attach">
                <p>{image?.name}</p>
                <input type="file" id="file" onChange={(e) => {setImage(e.target.files[0]); console.log(image.name);}} style={{display: 'none'}}/>
                <label htmlFor="file"><IoMdAttach/></label>
            </div>
            <div className="chat-input">
                <textarea type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div className="send">
                <button type="submit"><IoMdSend/></button>
            </div>
        </form>
    </div>
  )
}

export default Feedback