import {
  Environment,
  Stats,
  OrbitControls,
  Circle,
  Gltf,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { SphereGeometry } from 'three'
import { GLTFLoader } from 'three-stdlib'
import { useRef, useState, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'
import Loader from './Loader'

export default function Model({ filename }: { filename: string }) {
  const ref = useRef<HTMLElement>()
  const { progress } = useProgress()
  function Box(props: any) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  const handleClick = (props: any) => {
    console.log(props.point)
  }
  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        className="bg-gray-300 w-full h-full"
        eventSource={ref.current}
        eventPrefix="client"
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <mesh
            visible
            userData={{ hello: 'world' }}
            position={[1, 2, 3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
          <Box position={[-1.2, 0, 0]} />
          <Gltf
            src={'/models/' + filename}
            scale={1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            onClick={handleClick}
          />
        </Suspense>
      </Canvas>
    </>
  )
}
