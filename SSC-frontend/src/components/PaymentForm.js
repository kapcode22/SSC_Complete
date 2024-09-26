// import React, { useState } from 'react';
// import styles from './admin/Transparent.module.css'; // Importing styles from CSS module
// import axios from 'axios';
// //import { useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// const PaymentForm = () => {
  
//   const [message, setMessage] = useState(null);
//   const [username, setUsername] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = async (event) => {
//     const stripe =await loadStripe("pk_test_51O3juaSFUzG000TSlpVlPO1QSykakaeTkfxpdn2Hfsu9BPO0zhA7W7tIWRKVt6xzOIWx7MMzb3Cedxh4S1KBELsn00NAGy31cm");
//     event.preventDefault();
//     const body={
//       amount:amount,
//       name:username
//     }
//     console.log(body);
//     const headers={
//       "Content-Type":"application/json"
//     }

//     try {
//       // Create a Checkout Session on the server
//       const response = await axios.post('http://localhost:5000/api/create-checkout-session', {
//             method:"POST",
//             headers:headers,
//             body:JSON.stringify(body)
//       });

//       const session = await response.json();

//       // Redirect to Checkout
//       const result = stripe.redirectToCheckout({
//         sessionId: session.id
//       });

//       if (result.error) {
//         console.log(result.error);
//         setMessage("Error occurred during payment.");
//       }
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       setMessage("Error occurred during payment.");
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <div className={styles['form-box']}>
//         <h1 className={styles['header-text']}>Helping Hands, Changing Lives.</h1>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder='Enter Your Name'
//           className={styles['input-admin']}
//           type="text"
//         />
//         <input
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder='Enter Amount'
//           className={styles['input-admin']}
//           type="number"
//         />
//         <button onClick={handleSubmit}  type="submit" className={styles['submit-btn']}>Make Payment</button>
//         {message && (
//           <div >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;
