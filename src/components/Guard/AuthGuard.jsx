import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth';

const AuthGuard = ({ children }) => {

  const router = useRouter();
  const {token} = useAuth();
  
  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!token && !localStorage.getItem("accessToken")) {
      router.replace("/login")
    }

  }, [router.route])

  return (
    <>{children}</>
  )
}

export default AuthGuard