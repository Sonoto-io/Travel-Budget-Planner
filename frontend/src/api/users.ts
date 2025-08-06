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

export const createUser = (userData: Partial<any>) => {
  return axios
    .post("/api/users", userData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a user:", error);
      return error;
    });
};

export const updateUser = (user: any) => {
  return axios
    .post(`/api/users/${user.id}`, user)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a user:", error);
      return error;
    });
};

export const deleteUser = (userId: string) => {
  return axios
    .delete(`/api/users/${userId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a user:", error);
      return error;
    });
};
