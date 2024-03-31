import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  const progressBarStyle = {
    width: `${progress + 10}%`,
    height: '10px',
    backgroundColor: 'black',
    transition: 'width 0.1s ease',
  }

  const backgroundStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: 'gray',
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
          width: '400px',
          height: '20px',
          position: 'relative',
        }}
      >
        <div style={progressBarStyle}></div>
        <div style={backgroundStyle}></div>
        <div style={{ marginTop: '10px' }}>Loading...</div>
      </div>
    </Html>
  )
}

export default Loader
