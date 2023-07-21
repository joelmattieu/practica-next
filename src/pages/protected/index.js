import React from 'react'

const Protected = () => {
  return (
    <div>Protected</div>
  )
}

Protected.authGuard = true

export default Protected