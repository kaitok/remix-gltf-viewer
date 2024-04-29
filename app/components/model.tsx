import { CameraControls, OrbitControls, Gltf } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { Vector3, Euler } from 'three'
import * as THREE from 'three'
import Button from './Button'
import Loader from './Loader'

export default function Model({
  filename,
  cameraControlRef,
  viewPoints,
  setViewPoints,
  registerNote,
}: {
  filename: string
  cameraControlRef: any
  viewPoints: any
  setViewPoints: any
  registerNote: any
}) {
  const [viewPointsRotations, setViewPointsRotations] = useState([])

  const handleViewPointClick = (position: any, rotation: any) => {
    if (cameraControlRef.current) {
      const cameraControls = cameraControlRef.current

      // カメラの位置をターゲットからのオフセットで設定
      const offset = new Vector3(1, 0, 0).applyEuler(rotation)
      const cameraPosition = position.clone().add(offset)

      cameraControls.setPosition(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        true
      )
      cameraControls.camera.rotation.copy(rotation)
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  const addViewPoint = () => {
    const cameraControls = cameraControlRef.current

    if (cameraControls) {
      // get camera position
      const cameraPosition = cameraControls.camera.position.clone()
      const cameraDirection = new Vector3()
      cameraControls.camera.getWorldDirection(cameraDirection)

      // カメラの前方に一定距離オフセット
      const offsetDistance = 3 // カメラの前方に3ユニット
      const boxPosition = cameraPosition.add(
        cameraDirection.multiplyScalar(offsetDistance)
      )

      const cameraRotation = cameraControls.camera.rotation.clone()
      registerNote(boxPosition, cameraRotation)

      // Boxの位置と回転を保存
      setViewPoints((prev: any) => [
        ...prev,
        {
          position: JSON.stringify(boxPosition),
          rotation: JSON.stringify(cameraRotation),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      // setViewPointsRotations((prev: any) => [...prev, cameraRotation])
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  const ViewPoint = ({ pos, rotation, onClick }) => {
    const boxSize = [4, 2.5, 0.1]

    const transparentBox = (
      <mesh position={pos} rotation={rotation} onClick={onClick}>
        <boxGeometry args={boxSize} />
        <meshStandardMaterial
          color="#ff4d00"
          opacity={0.7}
          transparent={true}
        />
      </mesh>
    )

    const wireframeBox = (
      <mesh position={pos} rotation={rotation} onClick={onClick}>
        <boxGeometry args={boxSize} />
        <meshStandardMaterial
          color="white"
          wireframe={true}
          wireframeLinewidth={40.0}
        />
      </mesh>
    )

    return (
      <group>
        {transparentBox}
        {wireframeBox}
      </group>
    )
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          left: '20px',
          bottom: '-20px',
          height: 0,
          zIndex: 2,
        }}
      >
        <Button bgColor="black" textColor="white" onClick={addViewPoint}>
          Add view point
        </Button>
      </div>

      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        style={{ backgroundColor: '#E5E5E5', borderTop: '1px solid #e5e7eb' }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[0, 0, 0]} decay={0} intensity={Math.PI} />
        <Suspense fallback={<Loader />}>
          <CameraControls ref={cameraControlRef} />

          <Gltf
            src={'/models/' + filename}
            scale={1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
          />

          {viewPoints.map((viewPoint: any, idx: number) => {
            const parsedPosition = JSON.parse(viewPoint.position)
            const parsedRotation = JSON.parse(viewPoint.rotation)

            const pos = new Vector3(
              parsedPosition.x,
              parsedPosition.y,
              parsedPosition.z
            )
            const rotation = new Euler(
              parsedRotation._x,
              parsedRotation._y,
              parsedRotation._z,
              parsedRotation._order
            )

            return (
              <ViewPoint
                key={idx}
                pos={pos}
                rotation={rotation}
                onClick={() => handleViewPointClick(pos, rotation)}
              />
            )
          })}
        </Suspense>
      </Canvas>
    </>
  )
}
