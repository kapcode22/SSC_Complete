import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './UpdatesAdmin.css';
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';

const PostHostldersAdmin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, handleChange] = useForm({
        club: '',
        name: '',
        post: '',
        instaLink: '',
        facebookLink: '',
        linkdinLink: '',
        image: null // Initialize as null for file
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleClick = async () => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        const endpoints = {
            spc: 'http://localhost:5000/api/postHolders/spc',
            ku: 'http://localhost:5000/api/postHolders/ku',
            hhc: 'http://localhost:5000/api/postHolders/hhc',
            sahyog: 'http://localhost:5000/api/postHolders/sahyog',
            council: 'http://localhost:5000/api/postHolders/council'
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
            }
            else{
                setMessage('Image uploaded successfully!');
                handleChange({ target: { name: 'club', value: '' } });
                handleChange({ target: { name: 'name', value: '' } });
                handleChange({ target: { name: 'post', value: '' } });
                handleChange({ target: { name: 'instaLink', value: '' } });
                handleChange({ target: { name: 'facebookLink', value: '' } });
                handleChange({ target: { name: 'linkdinLink', value: '' } });
                handleChange({ target: { name: 'image', value: null } });
            }
           
        } catch (err) {
            console.error('Error adding post holder:', err);
            // Handle error state or logging as needed
        }
    };

    return (
        <div className='admin-card'>
            <div className='heading'>ADD Post Holder</div>
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
                <option value="council">Council</option>
            </select>
            <input name='name' value={values.name} onChange={handleChange} placeholder='Name' className='input-admin' /><br />
            <input name='post' value={values.post} onChange={handleChange} placeholder='Post' className='input-admin' /><br />
            <input name='instaLink' value={values.instaLink} onChange={handleChange} placeholder='Instagram Link' className='input-admin' /><br />
            <input name='facebookLink' value={values.facebookLink} onChange={handleChange} placeholder='Facebook Link' className='input-admin' /><br />
            <input name='linkdinLink' value={values.linkdinLink} onChange={handleChange} placeholder='LinkedIn Link' className='input-admin' /><br />
            <input name='image' className="input-admin" type="file" onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })} /><br />
            <button onClick={handleClick} className='add-btn'>Add Post Holder</button>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default PostHostldersAdmin;
