import api from "./axios";

export const fetchProducts = (params = {}) => {
  return api.get("/products", { params });
};

export const fetchProductById = (id) => {
  return api.get(`/products/${id}`);
};
