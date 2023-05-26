import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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
      <form onSubmit={handleSubmit}>
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

export default PaymentPage;
