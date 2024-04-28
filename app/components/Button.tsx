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
  style,
}: {
  textColor?: string
  children: React.ReactNode
  size?: string
  bgColor?: string
  border?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: any
}) => {
  let base = 'py-2 px-3 text-sm cursor-pointer'
  if (size == 'sm') {
    base = 'h-8 min-w-12 py-1.5 px-3 text-xs font-sm'
  }
  if (border) {
    base += ' border border-gray-300 border-b-[1px]'
  }

  // due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
  const bgStyle = getBgStyle(bgColor)

  return (
    <button
      type={type ? type : 'button'}
      className={`text-center ${base} text-${textColor} ${bgStyle} rounded-sm focus:outline-none ${
        disabled ? 'opacity-50 ' : 'hover:opacity-70'
      }`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
