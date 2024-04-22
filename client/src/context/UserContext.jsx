/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserInfoReady, setIsUserInfoReady]  = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setIsUserInfoReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser , isUserInfoReady}}>
      {children}
    </UserContext.Provider>
  );
};
