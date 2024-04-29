import getBgStyle from './util/getBgStyle'

const LinkButton = ({
  href,
  textColor,
  children,
  size,
  bgColor,
  border,
  className,
}: {
  href: string
  textColor: string
  children: React.ReactNode
  size?: string
  bgColor?: string
  border?: boolean
  className?: string
}) => {
  let style = 'py-2.5 px-5 text-sm font-medium cursor-pointer'
  if (size == 'sm') {
    style = 'h-8 min-w-12 py-[0.45rem] text-xs font-sm'
  }
  if (border) {
    style += ' border border-current border-b-[1px]'
  }

  // due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
  const bgStyle = getBgStyle(bgColor)

  return (
    <a
      href={href}
      className={
        `text-center block ${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 ` +
        className
      }
    >
      {children}
    </a>
  )
}

export default LinkButton
