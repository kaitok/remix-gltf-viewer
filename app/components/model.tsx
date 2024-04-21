import {
  Environment,
  Stats,
  OrbitControls,
  Circle,
  Gltf,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { SphereGeometry, Vector3 } from 'three'
import { useRef, useState, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'
import Loader from './Loader'

export default function Model({ filename }: { filename: string }) {
  const objectRef = useRef() // オブジェクトの参照
  const [spheres, setSpheres] = useState([]) // 球の位置を管理

  // ボタンのクリックで、オブジェクトの角度に基づいて球を追加
  const addSphereBasedOnRotation = () => {
    if (objectRef.current) {
      console.log(objectRef.current.object.rotation)
      console.log(objectRef.current.object.position)
      const objectRotation = objectRef.current.object.rotation.clone()
      const objectPosition = objectRef.current.object.position.clone()
      const newPosition = objectPosition.add(
        new Vector3(1, 0, 0).applyEuler(objectRotation)
      )
      setSpheres([...spheres, newPosition]) // オブジェクトの位置と角度を考慮して球を追加
    } else {
      console.error('Object reference is not set')
    }
  }

  return (
    <>
      {/* ボタンをCanvasの外に配置 */}
      <button onClick={addSphereBasedOnRotation}>
        Add Sphere Based on Rotation
      </button>

      <Canvas camera={{ fov: 75, position: [0, 0, 20] }}>
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
          {/* オブジェクトの参照を保持 */}
          <OrbitControls ref={objectRef} />

          <Gltf
            src={'/models/' + filename}
            // 参照を設定
            scale={1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
          />

          {/* spheres の位置に基づいて球を追加 */}
          {spheres.map((pos, idx) => (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
    </>
  )
}
