import React, { useState } from 'react';
import lstyle from "./LoginAdmin.module.css"; // Import CSS module
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginAdmin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault(); // Prevent form submission
        
        const adminData = { username, password };

        console.log('Login Data to send:', adminData); // Log the data to be sent

        axios.post('http://localhost:5000/admin/login', adminData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('type', res.data.type);
                localStorage.setItem('token', res.data.token);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                // Handle error state or logging as needed
            });
    };

    return (
        <div className={lstyle.main}>
            <div className={lstyle.container}>
                <div className={lstyle['login-box']}>
                    <h2>Login</h2>
                    <form onSubmit={handleClick}>
                        <div className={lstyle['input-box']}>
                            <input
                                 id="username"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder='User Name'
                                 className="custom-input"
                                 type="text"
                            />
                            <label>User name</label>
                        </div>
                        <div className={lstyle['input-box']}>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className="custom-input"
                                type="password"
                            />
                            <label>Password</label>
                        </div>
                       
                        <button  type="submit" onClick={handleClick} className={lstyle.btn}>Login</button>
                        <div className={lstyle['signup-link']}>
                            <Link to="/home">Logout</Link>
                        </div>
                    </form>
                </div>
                {/* Span elements for decorative purposes */}
                {[...Array(50)].map((_, i) => (
                    <span key={i} style={{ '--i': i }}></span>
                ))}
            </div>
        </div>
    );
};

export default LoginAdmin;

// <section className='bg-gray-300 min-h-screen flex items-center justify-center'>
// <div className='bg-[#bad4f9] flex rounded-2xl shadow-lg  p-5'>
//     <div className='sm:w-1/2 px-16'>
//         <h1 className='text-3xl font-bold mb-4'>Admin Login</h1>
//         <div className='mt-8'>
//         <div className="mb-4">
//                 <label htmlFor="username" className="block mb-1">User Name</label>
//                 <input
//                     id="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder='User Name'
//                     className="custom-input"
//                     type="text"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="password" className="block mb-1">Password</label>
//                 <input
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder='Password'
//                     className="custom-input"
//                     type="password"
//                 />
//             </div>
                
//             <div className='mt-8 flex flex-col gap-y-4'>
//                 <button
//                     type="submit"
//                     onClick={handleClick}
//                     className="custom-button"
//                 > 
//                     Login
//                 </button>
//             </div>
//         </div>
//     </div>
//     <div className='sm:block hidden w-1/2'>
//         <img className='h-full w-full object-cover rounded-2xl' src={abhi} alt='...' />
//     </div>
// </div>
// </section>