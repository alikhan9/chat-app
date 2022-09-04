import React from 'react'

const ErrorPopUp = ({message}) => {
  return (
    <div className="error-popup"> 
    <p>{message}</p>
    </div>
  )
}

export default ErrorPopUp