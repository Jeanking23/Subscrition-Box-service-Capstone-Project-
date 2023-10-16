import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = ({ amount }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } else {
      // Send payment information to your server to complete the transaction
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          payment_method_id: paymentMethod.id,
        }),
      });

      if (response.ok) {
        setPaymentSuccess(true);
        setPaymentError(null);
      } else {
        setPaymentError('Payment failed. Please try again.');
        setPaymentSuccess(false);
      }
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Amount: ${amount}</p>
      <form onSubmit={handleSubmit} className=''>
        <label>
          Card details:
          <CardElement options={{}} />
        </label>
        {paymentError && <p className="error">{paymentError}</p>}
        {paymentSuccess && <p className="success">Payment successful!</p>}
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

const stripePromise = loadStripe('pk_live_51NExlMIs5alAznFc7KJz8nAdC1VWGRysGPPR7H4DfM1Y5jfSMO9vRHy1MU3PY6cIwUVawx54Ec76MO9Yijgry7Zp00KoTXa8tB');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage amount={100} />
    </Elements>
  );
};

export default App;
