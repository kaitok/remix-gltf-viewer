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

export default function Model({ filename }: { filename: string }) {
  const ref = useRef<HTMLElement>()

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        className="bg-gray-300"
        eventSource={ref.current}
        eventPrefix="client"
      >
        <OrbitControls />
        <Gltf src={'/models/' + filename} scale={1} position={[0, 0, 0]} />
      </Canvas>
    </>
  )
}
