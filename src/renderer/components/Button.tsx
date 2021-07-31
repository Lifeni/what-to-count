import React, { ReactNode } from 'react'

interface Props {
  color?: string
  action?: () => void
  children: ReactNode | string
}

const Button = ({ color, action, children = '按钮' }: Props) => {
  return (
    <button
      className={`${color ? `bg-${color}-500` : 'bg-gray-100'} ${
        color ? `text-white` : `text-black`
      } px-4 py-2 rounded-md focus:ring-4`}
      onClick={action}
    >
      {children}
    </button>
  )
}

export default Button
