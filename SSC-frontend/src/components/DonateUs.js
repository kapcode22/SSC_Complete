import React, { useState } from 'react';
import styles from './admin/Transparent.module.css'; // Importing styles from CSS module

const DonateUs = () => {

  
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://buy.stripe.com/test_bIY4gXaXI2D34lW8wx";
  };

  return (
    <div className={styles.main}>
      <div className={styles['form-box']}>
        <h1 className={styles['header-text']}>Helping Hands, Changing Lives.</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Your Name'
          className={styles['input-admin']}
          type='text'
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Enter Amount'
          className={styles['input-admin']}
          type='number'
        />
        <button onClick={handleSubmit} type='submit' className={styles['submit-btn']}>
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default DonateUs;
