import React from 'react'
import './ErrorBox.css'

interface ErrorBoxProps {
  message: string
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => {
  if (!message) return null
  return (
    <div className="error-box">
      <span className="material-symbols-outlined error-box__icon">error</span>
      <span className="error-box__message">{message}</span>
    </div>
  )
}

export default ErrorBox
