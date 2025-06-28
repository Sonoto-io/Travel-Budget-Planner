import axios from "axios";

export const getExpenses = () => {
  return axios.get("/api/expenses/");
};
