import { Environment, Stats, OrbitControls, Gltf } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { Vector3, Euler, MathUtils } from 'three'
import Loader from './Loader'
import { Quaternion } from 'three'

export default function Model({ filename }: { filename: string }) {
  const orbitControlsRef = useRef() // OrbitControlsの参照
  const [spheres, setSpheres] = useState([]) // Sphereの位置を管理
  const [sphereRotations, setSphereRotations] = useState([]) // Sphereの回転を管理

  // SphereをクリックするとOrbitControlsのカメラ位置とターゲットを変更
  const handleSphereClick = (position, rotation) => {
    if (orbitControlsRef.current) {
      const orbitControls = orbitControlsRef.current

      // ターゲットをクリックしたSphereの位置に設定
      orbitControls.target.copy(position)

      // カメラの位置を、Sphereの位置と回転を考慮して設定
      const cameraOffset = new Vector3(5, 0, 0).applyEuler(rotation) // ターゲットからのオフセット
      const cameraPosition = position.clone().add(cameraOffset) // カメラの位置を計算
      orbitControls.object.position.copy(cameraPosition) // カメラの位置を設定

      // カメラの回転を設定
      // orbitControls.object.rotation.copy(rotation) // Sphereの回転をカメラに適用
      const cameraQuaternion = new Quaternion().setFromEuler(rotation)
      orbitControls.object.quaternion.copy(cameraQuaternion) // カメラの回転を設定

      console.log('rotation', rotation)

      // OrbitControlsを更新
      orbitControls.update()
    } else {
      console.error('OrbitControls reference is not set')
    }
  }

  const addSphere = () => {
    if (orbitControlsRef.current) {
      const orbitControls = orbitControlsRef.current

      const position = orbitControls.object.position.clone() // カメラの現在位置
      const rotation = orbitControls.object.rotation.clone() // カメラの現在回転

      // console.log('rotation', rotation)

      setSpheres([...spheres, position])
      setSphereRotations([...sphereRotations, rotation]) // Sphereの位置と回転を保存
    } else {
      console.error('OrbitControls reference is not set')
    }
  }

  const changeRotation = () => {
    if (orbitControlsRef.current) {
      const orbitControls = orbitControlsRef.current

      // 現在のカメラの回転を取得
      const currentRotation = orbitControls.object.rotation.clone()

      // 右に90度回転（Y軸にπ/2ラジアンを追加）
      const newRotation = new Euler(
        currentRotation.x,
        currentRotation.y + MathUtils.degToRad(90), // Y軸に90度追加
        currentRotation.z
      )

      // クォータニオンを使って新しい回転を設定
      const newQuaternion = new Quaternion().setFromEuler(newRotation)
      orbitControls.object.quaternion.copy(newQuaternion) // カメラの回転を設定

      // OrbitControlsのターゲットも適切に更新
      orbitControls.update()
    } else {
      console.error('OrbitControls reference is not set')
    }
  }

  return (
    <>
      {/* ボタンをCanvasの外に配置 */}
      <div>
        <button onClick={addSphere}>Add Sphere at Current Position</button>
      </div>
      <div>
        <button onClick={changeRotation}>Change Rotation</button>
      </div>

      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{ backgroundColor: '#f3f3f3' }}
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
          {/* OrbitControlsの参照を保持 */}
          <OrbitControls ref={orbitControlsRef} />

          <Gltf
            src={'/models/' + filename}
            scale={1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
          />

          {/* spheres の位置に基づいて球を追加 */}
          {spheres.map((pos, idx) => (
            <mesh
              key={idx}
              position={pos}
              onClick={() => handleSphereClick(pos, sphereRotations[idx])} // クリック時の処理
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
    </>
  )
}
