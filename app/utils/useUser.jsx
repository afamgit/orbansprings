'use client'

import React, {useState, useEffect} from 'react'

export const useAuth = ({user}) => {

  const [userInfo, setUserInfo] = useState(null)
  const [isLoggenOn, setIsLoggedOn] = useState(false)

  useEffect(() => {
    if(user) {
      setUserInfo(user)
      setIsLoggedOn(true)
    }
  },[])

  return [
    userInfo, isLoggenOn
  ]

  }
