import api from "@/api/apiClient";

export const getUsers = () => {
  return api
    .get("/users/")
    .then((response) => response.data.users)
    .catch((error: any) => {
      console.error("Error fetching users :", error);
      return [];
    });
};

export const createUser = (userData: Partial<any>) => {
  return api
    .post("/users", userData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a user:", error);
      return error;
    });
};

export const updateUser = (user: any) => {
  return api
    .post(`/users/${user.id}`, user)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a user:", error);
      return error;
    });
};

export const deleteUser = (userId: string) => {
  return api
    .delete(`/users/${userId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a user:", error);
      return error;
    });
};
