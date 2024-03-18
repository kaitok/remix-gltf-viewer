const LinkButton = ({
  size,
  children,
  bgColor,
  textColor,
  href,
  border,
}: {
  size?: string
  children: string
  bgColor: string
  textColor: string
  href: string
  border?: boolean
}) => {
  let style = 'py-2.5 px-5 me-2 mb-2 text-sm font-medium'
  if (size == 'sm') {
    style = 'py-1.5 px-3 me-1 mb-1 text-xs font-sm'
  }
  if (border) {
    style += ' border'
  }
  let bgStyle = `bg-${bgColor}-600`
  if (bgColor == 'black' || bgColor == 'white') {
    bgStyle = `bg-${bgColor}`
  }

  return (
    <a
      href={href}
      className={`${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 `}
    >
      {children}
    </a>
  )
}

export default LinkButton
