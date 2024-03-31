import {
  Environment,
  Stats,
  OrbitControls,
  Circle,
  Gltf,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { useRef, useState } from 'react'

export default function Model() {
  const ref = useRef<HTMLElement>()

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        eventSource={ref.current}
        eventPrefix="client"
      >
        <Gltf
          src="/models/scene-1711777033946.glb"
          scale={0.1}
          position={[0, -0.8, -4]}
        />
      </Canvas>
    </>
  )
}
