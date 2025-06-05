"use client"

import { Box, Heading, Text, Button } from "@chakra-ui/react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense, useState } from "react"
import RotatingCube from "@/components/rotating-cube"

export default function Home() {
  const [isRotating, setIsRotating] = useState(true)

  return (
    <Box width="100vw" height="100vh" bg="gray.100">
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <Suspense fallback={null}>
          {/* Removed Environment and all lights */}
          <RotatingCube isRotating={isRotating} />
          <OrbitControls enableZoom={true} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <Box position="absolute" top={4} left={4} color="white">
        <Heading as="h1" color='black' size="xl" mb={2}>
          World of AISC
        </Heading>
        <Text fontSize="sm" color='black' opacity={0.75}>
         Hover over letters in the sky and double click to launch
        </Text>
      </Box>

      {/* Rotation Control Button */}
      <Box position="absolute" top={4} right={4}>
        <Button
          onClick={() => setIsRotating(!isRotating)}
           bg="blue.300"
            _hover={{ bg: "blue.400" }}
          size="md"
          fontWeight="semibold"
          boxShadow="lg"
        >
          {isRotating ? "Stop Rotation" : "Start Rotation"}
        </Button>
      </Box>

      <Box position="absolute" bottom={35} right={45}>
        <Text fontSize="sm" color="black" fontStyle="italic">
          Developed by Fahad
        </Text>
      </Box>
    </Box>
  )
}
