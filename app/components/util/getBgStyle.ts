// due to tailwind dosen't support dynamic class name like `bg-${bgColor}-600`
const getBgStyle = (bgColor: string | undefined) => {
  let bgStyle = 'bg-gray-600'
  if (bgColor === 'black') {
    bgStyle = `bg-zinc-700`
  } else if (bgColor === 'white') {
    bgStyle = `bg-fafafa`
  } else if (bgColor === 'red') {
    bgStyle = `bg-red-600`
  } else if (bgColor === 'blue') {
    bgStyle = `bg-blue-600`
  } else {
    bgStyle = `bg-blue-600`
  }
  return bgStyle
}

export default getBgStyle
