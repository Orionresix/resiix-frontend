import React, { useState } from 'react';
import './CompleteWork.css';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const CompleteWork = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState('');
    const [labour, setLabour] = useState('');
    const [cost, setCost] = useState('');
    


    const completeWork = (e) => {
        e.preventDefault();
        const notify = () => toast("Your Work Order has been successfully submitted.");
        setDescription('');
        setMaterials('');
        setLabour('');
        setCost('');
        notify();
        setTimeout(() => {
            navigate('/rating');
        }, 3000);
    }
    return (
        <div className='complete-issue'>
            <div className="complete-welcome">
                <h1>Complete Work Order</h1>
                <p>Describe the work done and cost below</p>
            </div>
            <form className="complete-form" onSubmit={(e) => { completeWork(e) }}>
                <div className="form-group">
                    <label htmlFor="description">Description of work</label>
                    <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="materials">Materials Used</label>
                    <input type="text" id="materials" name="materials" value={materials} onChange={(e) => setMaterials(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="labour">Labour Cost</label>
                    <input type="integer" id="labour" name="labour" value={labour} onChange={(e) => setLabour(e.target.value)} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="cost">Material Cost</label>
                    <textarea id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
                </div>
                
                <div className="form-group">
                    <button type="submit">Submit Work Order</button>
                </div>
                <Toaster
                    toastOptions={{
                        style: {
                            background: "green",
                            color: "#fff",
                        },
                    }}
                />
            </form>
        </div>
    )
}

export default CompleteWork