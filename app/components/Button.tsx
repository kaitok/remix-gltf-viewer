const Button = ({
  size,
  children,
  bgColor,
  textColor,
  border,
}: {
  size?: string
  children: string
  bgColor: string
  textColor: string
  border?: boolean
}) => {
  let style = 'py-2.5 px-5 me-2 mb-2 text-sm font-medium'
  if (size == 'sm') {
    style = 'py-1.5 px-3 me-1 mb-1 text-xs font-sm'
  }
  if (border) {
    style += ' border border-current'
  }
  let bgStyle = `bg-${bgColor}-600`
  if (bgColor == 'black' || bgColor == 'white') {
    bgStyle = `bg-${bgColor}`
  }

  return (
    <button
      type="button"
      className={`${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 `}
    >
      {children}
    </button>
  )
}

export default Button
