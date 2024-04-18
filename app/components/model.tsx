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
import { useRef, useState, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'
import Loader from './Loader'

export default function Model({ filename }: { filename: string }) {
  const ref = useRef<HTMLElement>()
  const { progress } = useProgress()
  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        className="bg-gray-300 w-full h-full"
        eventSource={ref.current}
        eventPrefix="client"
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls />
          <Gltf src={'/models/' + filename} scale={1} position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </>
  )
}
