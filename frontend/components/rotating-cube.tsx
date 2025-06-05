"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { Html } from "@react-three/drei"
import type * as THREE from "three"
import CubeSide from "./cube-side"
import { Box } from "@chakra-ui/react"

const sideNames = [
  "Access", // front
  "AI Models", // back
  "Autonomy", // right
  "Communication", // left
  "Visualization", // top
  "Data", // bottom
]

interface RotatingCubeProps {
  isRotating: boolean
}

export default function RotatingCube({ isRotating }: RotatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Load textures
  const backgroundTexture = useLoader(TextureLoader, "/images/aisc-background.png")

  useFrame((state, delta) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        {/* Increased cube size from 4 to 6 */}
        <boxGeometry args={[6, 6, 6]} />

        {/* Apply background texture with MeshBasicMaterial (no lighting needed) */}
        {Array.from({ length: 6 }).map((_, index) => (
          <meshBasicMaterial key={index} attach={`material-${index}`}>
            <primitive object={backgroundTexture} attach="map" />
          </meshBasicMaterial>
        ))}

        {/* HTML overlays for interactive elements on each side */}
        {sideNames.map((sideName, index) => {
          const positions = [
            [0, 0, 3.01], // front
            [0, 0, -3.01], // back
            [3.01, 0, 0], // right
            [-3.01, 0, 0], // left
            [0, 3.01, 0], // top
            [0, -3.01, 0], // bottom
          ]

          const rotations = [
            [0, 0, 0], // front
            [0, Math.PI, 0], // back
            [0, Math.PI / 2, 0], // right
            [0, -Math.PI / 2, 0], // left
            [-Math.PI / 2, 0, 0], // top
            [Math.PI / 2, 0, 0], // bottom
          ]

          return (
            <Html
              key={sideName}
              position={positions[index] as [number, number, number]}
              rotation={rotations[index] as [number, number, number]}
              transform
              occlude
              style={{ pointerEvents: "auto" }}
            >
              <CubeSide sideName={sideName} />
            </Html>
          )
        })}

        {/* Logo overlays on each side */}
        {sideNames.map((sideName, index) => {
          const positions = [
            [2.2, 2.5, 3.01], // front - top right
            [-2.2, 2.5, -3.01], // back - top right (flipped)
            [3.01, 2.5, -2.2], // right - top right
            [-3.01, 2.5, 2.2], // left - top right
            [2.2, 3.01, -2.5], // top - top right
            [2.2, -3.01, 2.5], // bottom - top right
          ]

          const rotations = [
            [0, 0, 0], // front
            [0, Math.PI, 0], // back
            [0, Math.PI / 2, 0], // right
            [0, -Math.PI / 2, 0], // left
            [-Math.PI / 2, 0, 0], // top
            [Math.PI / 2, 0, 0], // bottom
          ]

          return (
            <Html
              key={`logo-${sideName}`}
              position={positions[index] as [number, number, number]}
              rotation={rotations[index] as [number, number, number]}
              transform
              occlude
              style={{ pointerEvents: "none" }}
            >
              <Box width="36px" userSelect="none" height="36px">
                <img
                  src="/images/aisc-logo.png"
                  alt="AISC Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
            </Html>
          )
        })}

        {/* Side name labels */}
        {sideNames.map((sideName, index) => {
          const positions = [
            [-2.2, 2.5, 3.01], // front - top left
            [2.2, 2.5, -3.01], // back - top left (flipped)
            [3.01, 2.5, 2.2], // right - top left
            [-3.01, 2.5, -2.2], // left - top left
            [-2.2, 3.01, -2.5], // top - top left
            [-2.2, -3.01, 2.5], // bottom - top left
          ]

          const rotations = [
            [0, 0, 0], // front
            [0, Math.PI, 0], // back
            [0, Math.PI / 2, 0], // right
            [0, -Math.PI / 2, 0], // left
            [-Math.PI / 2, 0, 0], // top
            [Math.PI / 2, 0, 0], // bottom
          ]

          return (
            <Html
              key={`title-${sideName}`}
              position={positions[index] as [number, number, number]}
              rotation={rotations[index] as [number, number, number]}
              transform
              occlude
              style={{ pointerEvents: "none" }}
            >
              <Box
                color="white"
                userSelect="none"
                fontSize="12px"
                fontWeight="bold"
                bg="rgba(70, 70, 70, 0.7)"
                px={2}
                py={1}
                borderRadius="md"
              >
                
              </Box>
            </Html>
          )
        })}
      </mesh>
    </>
  )
}
