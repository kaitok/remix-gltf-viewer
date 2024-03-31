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
import { Suspense } from 'react'
import model from '../models/scene2.glb'

export default function Model() {
  // const gltf = useLoader(GLTFLoader, model)
  // const { scene } = useGLTF(model)
  console.log(model)

  return <div>{/* <primitive object={scene} /> */}</div>
}
useGLTF.preload(model)
