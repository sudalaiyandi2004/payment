import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [shoe, setShoe] = useState({
    name: "Training Shoe",
    creator: "Nike",
    img: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 1,
  });

  const initPay = (data) => {
    const options = {
      key: "rzp_test_8UWCsWizv1lAhg",
      amount: data.amount,
      currency: data.currency,
      name: shoe.name,
      description: "Test",
      image: shoe.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:5000/api/payment/verify";
          const payload = {
            razorpay_orderID: response.razorpay_order_id,
            razorpay_paymentID: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const { data } = await axios.post(verifyURL, payload);
          console.log("Verification Response:", data);
        } catch (error) {
          console.log("Verification Error:", error);
        }
      },
      theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:5000/api/payment/orders";
      const { data } = await axios.post(orderURL, { amount: shoe.price });
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shoe_container">
      <img src={shoe.img} alt="shoe_img" className="shoe_img" />
      <p className="shoe_name">{shoe.name}</p>
      <p className="shoe_creator">By {shoe.creator}</p>
      <p className="shoe_price">Price: {shoe.price} Rupee</p>
      <button onClick={handlePay} className="buyBtn">Buy Shoes</button>
    </div>
  );
}

export default Home;
