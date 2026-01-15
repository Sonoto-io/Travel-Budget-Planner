import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";
import api from "@/api/apiClient";
import { CapacitorHttp } from '@capacitor/core';

const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  try {
    const res = await CapacitorHttp.post({
    url: 'https://travelbudget.ensibf-holdings.fr/api/auth/verify-session',
    webFetchExtra: {
      credentials: 'include',
    },
  });
    console.log("authenticate response : ", JSON.stringify(await res))
    const valid = (await res).data.valid;
    useAuthStore(pinia).setAuthenticated(valid);
    console.log("is this valide ? ", valid)
    return valid;
  } catch (error) {
    console.error("Error verifying session:", error);
    throw "Error verifying session, backend may be unreachable";
  }
};

export const getTokenFromCode = async (code: string) => {
  // const res = api.post(
  //   "/auth/finalize",
  //   { code },
  //   {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // ).then(response => {
  //   console.log("response: ", JSON.stringify(response))
  //   return response;
  // }).catch(error => {
  //   console.error("Error finalizing authentication:", JSON.stringify(error));
  //   throw "Error finalizing authentication";
  // });

  const res = await CapacitorHttp.post({
    url: 'https://travelbudget.ensibf-holdings.fr/api/auth/finalize',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { code },
    webFetchExtra: {
      credentials: 'include',
    },
  });

  console.log("res : ", JSON.stringify(res))

  return res
}

export { isAuthenticated };