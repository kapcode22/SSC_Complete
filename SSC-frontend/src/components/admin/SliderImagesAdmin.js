import React, {  useState,useEffect } from 'react';
import axios from 'axios';
import './UpdatesAdmin.css';
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';

const SliderImagesAdmin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, handleChange] = useForm({
        club: '',
        image: null // Initialize as null for file
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleClick = async () => {
        const formData = new FormData();
        formData.append('image', values.image);

        const endpoints = {
            spc: 'http://localhost:5000/api/sliderImages/spc',
            ku: 'http://localhost:5000/api/sliderImages/ku',
            hhc: 'http://localhost:5000/api/sliderImages/hhc',
            sahyog: 'http://localhost:5000/api/sliderImages/sahyog',
        
        };

        const endpoint = endpoints[values.club];
        if (!endpoint) {
            console.log('Invalid club type');
            return;
        }

        try {
            const res = await axios.post(endpoint, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            if (res.data.message === 'No token provided.' || res.data.message === 'Failed to authenticate token.') {
                localStorage.removeItem('token');
                navigate('/');
            }else {
                setMessage('Image uploaded successfully!');
                // Clear form after successful submission if needed
                handleChange({ target: { name: 'club', value: '' } });
                handleChange({ target: { name: 'image', value: null } });
            }
        } catch (err) {
            console.error('Error adding slider image:', err);
            // Handle error state or logging as needed
        }
    };

    return (
        <div className='admin-card'>
            <div className='heading'>ADD Slider Image</div>
            <select
                name='club'
                value={values.club}
                onChange={handleChange}
                className='input-post'
            >
                <option value="">Select club</option>
                <option value="spc">SPC</option>
                <option value="ku">KU</option>
                <option value="hhc">HHC</option>
                <option value="sahyog">Sahyog</option>
            </select>
            <input name='image' className="input-admin" type="file" onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })} /><br />
            <button onClick={handleClick} className='add-btn'>Add Slider Image</button>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default SliderImagesAdmin;
