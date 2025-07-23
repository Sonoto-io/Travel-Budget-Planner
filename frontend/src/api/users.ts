import axios from "axios";

export const getUsers = () => {
  return axios
    .get("/api/users/")
    .then((response) => response.data.users)
    .catch((error: any) => {
      console.error("Error fetching users :", error);
      return [];
    });
};
