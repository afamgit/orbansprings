'use client'

import React, { createContext, useState, useEffect } from "react";

export const SiteContext = createContext();

  export const SiteContextProvider = ({ children }) => {
    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PRO;;
    const [userData, setUserData] = useState(null);
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  useEffect(() => {
    getUserDetails();
    },[]);

  const getUserDetails = async () => {
    const fromStorageUser = await localStorage.getItem('user');
    const parsedVUser = JSON.parse(fromStorageUser);
    if(fromStorageUser !== null) {
       await setUserData(parsedVUser);
        await setIsLoggedOn(true);
    }
  };

  const handleLogin = (values) => {

    let formData = new FormData();

    formData.append('uname', values.username);
    formData.append('upass', values.password);
    formData.append('action', 'auth');

     fetch(`${apiUrl}/api/auth.php`, {
      method: 'post',
      body: formData
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);

        if(res.status === 200) {
           await handleSignIn(res.user);
        } 
      })
      .catch((error) => {
        console.log('Api call error', error.message);
      });
    }


const handleSignOut = async () => {
    await setUserData(null);
    await setIsLoggedOn(false);
    await localStorage.removeItem('user');
    await localStorage.removeItem('loggedin', false);
}

const handleSignIn = async (data) => {
    const storedUser = JSON.stringify(data);

    await setUserData(data);
    await setIsLoggedOn(true);
    await localStorage.setItem('user', storedUser);
    await localStorage.setItem('loggedin', true);
}

  const contextValue = {
    apiUrl,
    isLoggedOn,
    userData,
    handleLogin,
    handleSignOut,
    handleSignIn,
    setUserData,
  };

  return (
    <SiteContext.Provider value={contextValue}>{children}</SiteContext.Provider>
  );
};
