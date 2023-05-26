import axios from "axios";

export const subscribeUser = async (userId, plan, cardNumber, expiryDate, cvc) => {
  try {
    const response = await axios.post("127.0.0.1:5000/api/box_service/subscription", {
      user_id: userId,
      plan: plan,
      card_number: cardNumber,
      expiry_date: expiryDate,
      cvc: cvc,
    });
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
