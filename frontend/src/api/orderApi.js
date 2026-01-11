import api from "./axios";

export const createOrder = (orderData) => {
  return api.post("/orders", orderData);
};

export const fetchMyOrders = () => {
  return api.get("/orders/my-orders");
};
