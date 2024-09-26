import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./UpdatesAdmin.css"
import { useNavigate } from 'react-router-dom'

const UpdatesAdmin = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('g');
    const [desc, setDesc] = useState('j');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleClick = async () => {
        console.log(title, desc, image,12);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:5000/api/services', formData, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            if (res.data.code === 403 && res.data.message === 'Token Expired') {
                localStorage.removeItem('token');
                navigate('/');
            }
        } catch (err) {
            console.log(err, 'err');
        }
    };

    return (
        <div className='admin-card'>
            <div className='heading'>ADD Update</div>
            <input value={title} onChange={handleChange} placeholder='Title' className='input-admin' /><br />
            <input value={desc} onChange={handleChangeDesc} placeholder='Description' className='input-admin' /><br />
            <input className="input-admin" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} /><br />
            <button onClick={handleClick} className='add-btn'>Add Update</button>
        </div>
    );
};

export default UpdatesAdmin;
