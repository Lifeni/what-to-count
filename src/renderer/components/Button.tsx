import React, { ButtonHTMLAttributes } from 'react'

const Button = ({
  onClick,
  className,
  children = '按钮',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-gray-50 px-4 py-2 border rounded-md flex items-center select-none gap-3 hover:bg-gray-100 focus:ring-4 ${className} transition disabled:cursor-not-allowed`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
