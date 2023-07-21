import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

const GuestGuard = ({ children }) => {

  const { token } = useAuth();
  const router = useRouter();
  
  useEffect(() => {

    if (!router.isReady) {
      return
    }

    if (localStorage.getItem('accessToken')) {
      router.replace('/protected')
    }

    
  }, [router.route])
  return (
    <>{children}</>
  )
}

export default GuestGuard