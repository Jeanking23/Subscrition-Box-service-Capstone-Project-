import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { SubscribePage } from "../../api/subscriptionPage";

const SubscriptionPage = () => {
  const { user } = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value);
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await SubscribePage(user.id, selectedPlan, cardNumber, expiryDate, cvc);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Error subscribing user.");
    }
  };

  return (
    <div className="container">
      <h1>Subscribe to a plan</h1>
      <form onSubmit={handleSubscriptionSubmit}>
        <div className="form-group">
          <label>Choose a plan:</label>
          <select className="form-control" value={selectedPlan} onChange={handlePlanChange}>
            <option value="basic">Basic - $10/month</option>
            <option value="premium">Premium - $20/month</option>
            <option value="ultimate">Ultimate - $30/month</option>
          </select>
        </div>
        <div className="form-group">
          <label>Card Number:</label>
          <input type="text" className="form-control" value={cardNumber} onChange={handleCardNumberChange} />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="text" className="form-control" value={expiryDate} onChange={handleExpiryDateChange} />
        </div>
        <div className="form-group">
          <label>CVC:</label>
          <input type="text" className="form-control" value={cvc} onChange={handleCvcChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionPage;


