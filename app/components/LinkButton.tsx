const LinkButton = ({
  href,
  textColor,
  children,
  size,
  bgColor,
  border,
}: {
  href: string
  textColor: string
  children: string
  size?: string
  bgColor?: string
  border?: boolean
}) => {
  let style = 'py-2.5 px-5 me-2 mb-2 text-sm font-medium'
  if (size == 'sm') {
    style = 'py-[0.45rem] px-3 me-1 mb- text-xs font-sm'
  }
  if (border) {
    style += ' border'
  }

  // due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
  let bgStyle = 'bg-gray-600'
  if (bgColor === 'black') {
    bgStyle = `bg-black`
  } else if (bgColor === 'white') {
    bgStyle = `bg-white`
  } else if (bgColor === 'red') {
    bgStyle = `bg-red-600`
  } else if (bgColor === 'blue') {
    bgStyle = `bg-blue-600`
  }

  return (
    <a
      href={href}
      className={`block ${style} text-${textColor} ${bgStyle} rounded-sm focus:outline-none hover:opacity-90 `}
    >
      {children}
    </a>
  )
}

export default LinkButton
