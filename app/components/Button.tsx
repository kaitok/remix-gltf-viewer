import getBgStyle from './util/getBgStyle'
const Button = ({
  textColor,
  children,
  size,
  bgColor,
  border,
  onClick,
}: {
  textColor: string
  children: React.ReactNode
  size?: string
  bgColor?: string
  border?: boolean
  onClick?: () => void
}) => {
  let style = 'py-2.5 px-5 text-sm font-medium'
  if (size == 'sm') {
    style = 'h-8 min-w-12 py-1.5 px-3 text-xs font-sm'
  }
  if (border) {
    style += ' border border-current'
  }

  // due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
  const bgStyle = getBgStyle(bgColor)

  return (
    <button
      type="button"
      className={`text-center ${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
