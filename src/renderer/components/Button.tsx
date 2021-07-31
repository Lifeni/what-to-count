import React, { ButtonHTMLAttributes } from 'react'

const Button = ({
  onClick,
  className,
  children = '按钮',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-gray-100 px-4 py-2 rounded-md flex items-center gap-3 focus:ring-4 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
