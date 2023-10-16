import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SubscriptionPage.css";

const SubscriptionCard = ({ title, price, image }) => {
  return (
    <div className="subscription-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price}</p>
      <Link to="/payment">Subscribe</Link>
    </div>
  );
};

const SubscriptionPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Redirect to login page or display an error message
  }

  return (
    <div>
      <div className="subscription-banner">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {/* Slides */}
        </Carousel>
      </div>
      <div className="card-cont">
        <h1>Subscription To a Plan</h1>
        <div className="subscription-cards">
          <SubscriptionCard
            title="Basic Subscription"
            price="$9.99/month"
            image={require("../../assets/box-service-image/card.jpeg")}
          />
          <SubscriptionCard
            title="Premium Subscription"
            price="$19.99/month"
            image={require("../../assets/box-service-image/card2.jpg")}
          />
          <SubscriptionCard
            title="Ultimate Subscription"
            price="$29.99/month"
            image={require("../../assets/box-service-image/card3.jpg")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
