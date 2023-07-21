import AuthGuard from '@/components/Guard/AuthGuard'
import GuestGuard from '@/components/Guard/GuestGuard'
import AuthProvider from '@/context/AuthContext'
import '@/styles/globals.css'

const Guard = ({children, authGuard, guestGuard}) => {
  if (authGuard) {
    return <AuthGuard>{children}</AuthGuard>
  } else if (!authGuard && !guestGuard) {
    return <>{children}</>
  } else if (guestGuard) {
    return <GuestGuard>{children}</GuestGuard>
  }
}

export default function App({ Component, pageProps }) {
  const authGuard = Component.authGuard ?? false
  const guestGuard = Component.guestGuard ?? false
  return (
    <AuthProvider>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <Component {...pageProps} />
      </Guard>
    </AuthProvider>
  );
}
