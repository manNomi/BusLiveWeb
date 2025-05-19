import axios from "axios";
import React from "react";

export const useFetchData = () => {
  const [serverState, setServerState] = React.useState(null);

  const request = async (method, url, body = null, token = "") => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      console.log("Request URL:", url);

      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });

      setServerState({
        status: response.status,
        data: response.data,
      });
    } catch (error) {
      if (error.response) {
        setServerState({
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        setServerState({
          status: 500,
          data: null,
        });
      }
    }
  };

  return [serverState, request];
};
