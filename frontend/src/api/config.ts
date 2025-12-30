import api from "@/api/apiClient";

interface Config {
  currencyId?: string;
  enableBackground?: boolean;
}

export const getConfig = () => {
  return api
    .get("config/")
    .then((response) => response.data.config)
    .catch((error: any) => {
      console.error("Error fetching config:", error);
      return {};
    });
};

export const setConfig = (config: Config) => {
  return api
    .post("config/", config)
    .then((response) => response.data.config)
    .catch((error: any) => {
      console.error("Error setting config:", error);
      return {};
    });
};