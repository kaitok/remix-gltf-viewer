import { CameraControls, OrbitControls, Gltf } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { Vector3, Euler, MathUtils } from 'three'
import Loader from './Loader'

export default function Model({ filename }) {
  const orbitControlsRef = useRef()
  const cameraControlRef = useRef() // CameraControlsの参照
  const [spheres, setSpheres] = useState([]) // Sphereの位置
  const [sphereRotations, setSphereRotations] = useState([]) // Sphereの回転

  // Sphereクリック時にカメラを更新
  const handleSphereClick = (position, rotation) => {
    if (cameraControlRef.current) {
      const cameraControls = cameraControlRef.current

      // カメラの位置をターゲットからのオフセットで設定
      const offset = new Vector3(1, 0, 0).applyEuler(rotation)
      const cameraPosition = position.clone().add(offset)

      cameraControls.setPosition(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        true // アニメーションで設定
      )
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  // Sphereを追加する
  const addSphere = () => {
    const cameraControls = cameraControlRef.current

    if (cameraControls) {
      // カメラの位置と方向を取得
      const cameraPosition = cameraControls.camera.position.clone()
      const cameraDirection = new Vector3()
      cameraControls.camera.getWorldDirection(cameraDirection)

      // カメラの前方に一定距離オフセット
      const offsetDistance = 3 // カメラの前方に5ユニット
      const spherePosition = cameraPosition.add(
        cameraDirection.multiplyScalar(offsetDistance)
      )

      const rotation = new Euler(
        cameraControls.camera.rotation.x,
        cameraControls.camera.rotation.y,
        cameraControls.camera.rotation.z
      )

      // Sphereの位置と回転を保存
      setSpheres((prev) => [...prev, spherePosition])
      setSphereRotations((prev) => [...prev, rotation])
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  const changeRotation = () => {
    if (cameraControlRef.current) {
      const cameraControls = cameraControlRef.current

      // Y軸を90度回転
      const newRotation = MathUtils.degToRad(90)
      cameraControls.rotate(newRotation, 0, true)
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  return (
    <>
      <div>
        <div>
          <button onClick={addSphere}>Add Sphere at Current Position</button>
        </div>
        <div>
          <button onClick={changeRotation}>Change Rotation</button>
        </div>
      </div>

      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{ backgroundColor: '#f3f3f3', borderTop: '1px solid #e5e7eb' }}
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
          <CameraControls ref={cameraControlRef} />

          <Gltf
            src={'/models/' + filename}
            scale={1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
          />

          {spheres.map((pos, idx) => (
            <mesh
              key={idx}
              position={pos}
              onClick={() => handleSphereClick(pos, sphereRotations[idx])}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshBasicMaterial color="red" />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
    </>
  )
}
