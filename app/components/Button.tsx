import getBgStyle from './util/getBgStyle'
const Button = ({
  textColor,
  children,
  size,
  bgColor,
  border,
  onClick,
  disabled,
  type,
}: {
  textColor: string
  children: React.ReactNode
  size?: string
  bgColor?: string
  border?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}) => {
  let style = 'py-2 px-3 text-sm'
  if (size == 'sm') {
    style = 'h-8 min-w-12 py-1.5 px-3 text-xs font-sm'
  }
  if (border) {
    style += ' border border-gray-400'
  }

  // due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
  const bgStyle = getBgStyle(bgColor)

  return (
    <button
      type={type ? type : 'button'}
      className={`text-center ${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 ${
        disabled ? 'opacity-50 hover:opacity-50' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
