import React, { useState } from 'react';
import styles from './Transparent.module.css'; // Importing styles from CSS module
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginAdmin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

    const handleClick = (e) => {
        e.preventDefault(); // Prevent form submission
        
        const adminData = { username, password, status, type };

        console.log('Admin Data to send:', adminData); // Log the data to be sent

        axios.post('http://localhost:5000/admin/add', adminData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('type', res.data.type);
                localStorage.setItem('token', res.data.token);
                navigate('/admin/dashboard');
            })
            .catch(err => {
                console.log(err);
                // Handle error state or logging as needed
            });
    };

    return (
        <div className={styles.main}>
            <div className={styles['form-box']}>
                <h1 className={styles['header-text']}>ADD ADMIN</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='User Name'
                    className={styles['input-admin']}
                    type="text"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className={styles['input-admin']}
                    type="password"
                />
                <div className={styles['select-wrapper']}>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={styles['input-admin']}
                    >
                        <option value="">Select Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="BLOCK">BLOCK</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <span className={styles['select-arrow']}></span>
                </div>
                <div className={styles['select-wrapper']}>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className={styles['input-admin']}
                    >
                        <option value="">Select Type</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUBADMIN">SUBADMIN</option>
                    </select>
                    <span className={styles['select-arrow']}></span>
                </div>
                <button onClick={handleClick} className={styles['submit-btn']}>Submit</button>
            </div>
        </div>
    );
};

export default LoginAdmin;
