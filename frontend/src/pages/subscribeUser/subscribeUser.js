import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../../context/AuthContext.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "bootstrap/dist/css/bootstrap.css";
import { Carousel } from "react-responsive-carousel";
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
  // const { isAuthenticated } = useContext(AuthContext);
  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //   navigate("/login");

  //   // Redirect to login page or display an error message
  //   return null;
  // }

  return (
    <div>
      <div className="subscription-banner">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img
              src={require("../../assets/box-service-image/banner1.jpeg")}
              alt="Banner 3"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'} 
            />
          </div>
          <div>
            <img
              src={require("../../assets/box-service-image/banner2.jpeg")}
              alt="Banner 2"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'} 
            />
          </div>
          <div>
            <img
              src={require("../../assets/box-service-image/banner3.jpeg")}
              alt="Banner 3"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'} 
            />
          </div>
          <div>
            <img
              src={require("../../assets/box-service-image/banner4.jpeg")}
              alt="Banner 3"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'} 
            />
          </div>
          <div>
            <img
              src={require("../../assets/box-service-image/banner5.jpeg")}
              alt="Banner 3"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'}
            />
          </div>
          <div>
            <img
              src={require("../../assets/box-service-image/bannershop.jpeg")}
              alt="Banner 3"
              style={{width: 1000, height: 500}}
              resizeMode={'cover'}
            />
          </div>
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
