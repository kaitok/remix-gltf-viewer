import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  const progressBarStyle = {
    width: `${progress + 5}%`,
    height: '2px',
    backgroundColor: '#2f2f2f',
    transition: 'width 0.01s ease',
  }

  const backgroundStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: '#b0b0b0',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  }

  return (
    <Html center>
      <div
        style={{
          textAlign: 'center',
          width: '250px',
          height: '20px',
          position: 'relative',
        }}
      >
        <div style={progressBarStyle}></div>
        <div style={backgroundStyle}></div>
        <div
          style={{
            marginTop: '17px',
            marginRight: '5px',
            fontSize: '15px',
            color: '#848484',
          }}
        >
          Loading...
        </div>
      </div>
    </Html>
  )
}

export default Loader
