import React, { ReactNode } from 'react'

interface Props {
  color?: string
  disabled?: boolean
  action?: () => void
  children: ReactNode | string
}

const Button = ({ color, disabled, action, children = '按钮' }: Props) => {
  return (
    <button
      className={`${color ? `bg-${color}` : 'bg-gray-100'} ${
        color ? `text-white` : `text-black`
      } px-4 py-2 rounded-md flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-70 focus:ring-4`}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
