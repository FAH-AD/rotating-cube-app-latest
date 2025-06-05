"use client";
import { Box, Button, Text, Tooltip,Spinner } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";

interface AppData {
  id:string;
  images: string;
  "Tool_Tip-non_executable": string;
  Executable_two_Letters: string;
  ToolTips: string;
  Status: string;
  "Number of tip selected": string;
  "Launch Command": string;
}


// Feature images and tooltips for each side using the provided images
const featureImages: Record<string, { src: string; tooltip: string }> = {
  Access: {
    src: "/images/access.png",
    tooltip: "Access",
  },
  Autonomy: {
    src: "/images/autonomy.png",
    tooltip: "Autonomy",
  },
  Communication: {
    src: "/images/communication.png",
    tooltip: "Communication",
  },
  Visualization: {
    src: "/images/visual.png",
    tooltip: "Visualization",
  },
  Data: {
    src: "/images/data.png",
    tooltip: "Data Analysis",
  },
  "AI Models": {
    src: "/images/model.png",
    tooltip: "AI Models",
  },
};

interface CubeSideProps {
  sideName: string;
}

// Function to generate consistent random horizontal positions for each side
const getRandomHorizontalPosition = (sideName: string, index: number) => {
  // Use sideName and index to create a consistent seed for randomness
  const seed = sideName.charCodeAt(0) + index * 7;
  const random = ((seed * 9301 + 49297) % 233280) / 233280; // Simple pseudo-random
  return 16 + random * 65; // Random position between 10% and 80%
};

export default function CubeSide({ sideName }: CubeSideProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Assume we have a function to get the apps for a specific side
  const [apps, setApps] = useState<AppData[]>([]);
  const [infoBoxPosition, setInfoBoxPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseEnter = (app: AppData, event: React.MouseEvent<HTMLElement>) => {
    setHoveredApp(app.Executable_two_Letters);
     
    const targetRect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.parentElement?.getBoundingClientRect() || { top: 0, left: 0 };
    setInfoBoxPosition({
      top: containerRect.top - 30,
      left: containerRect.left-200,
    });
  
   
  };

  const handleMouseLeave = () => {
    setHoveredApp(null);
  };

  const handleDoubleClick = async (app: AppData) => {
      setIsLoading(true);
    try {
      const response = await fetch('https://rotating-cube-backend.onrender.com/api/increase-tip-selected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterId: app.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to increase tip count');
      }
      
      // Refetch the apps to update the display
      await fetchApps();
      alert(`Command executed for ${app.Executable_two_Letters}`);
    } catch (error) {
      console.error('Error increasing tip count:', error);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [sideName]);

  const fetchApps = async () => {
    try {
      const response = await fetch(
        "https://rotating-cube-backend.onrender.com/api/data"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch apps");
      }
      const data = await response.json();
      // console.log("Fetched apps:", data);

      // Filter and format the data based on sideName
      const filteredApps = data.filter(
        (app: AppData) =>
          app["Tool_Tip-non_executable"].toLowerCase() ===
          sideName.toLowerCase()
      );
      // console.log("Filtered apps:", filteredApps);

      if (filteredApps.length > 0) {
        setApps(filteredApps);
      } else {
        setApps([]);
      }
    } catch (error) {
      console.error("Error fetching apps:", error);
      setApps([]);
    }
  };
  const featureImage = featureImages[sideName]?.src;

  // console.log("feature image", featureImage);
  // console.log("side name", sideName);

  // Sort apps by "Number of tip selected" (highest first)
  const sortedApps = apps.sort(
    (a, b) =>
      parseInt(b["Number of tip selected"]) -
      parseInt(a["Number of tip selected"])
  );

  // console.log("Sorted apps:", sortedApps);

  const handleAppClick = async (letters: string, launchCommand: string) => {
    console.log(`Launching: ${launchCommand}`);
    alert(`Launching: ${launchCommand}`);

    // Increment usage count
    try {
      const response = await fetch("/api/incrementUsage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ letters }),
      });
      if (!response.ok) {
        throw new Error("Failed to increment usage");
      }
      // Optionally, you can refetch the apps here to update the usage count
      fetchApps();
    } catch (error) {
      console.error("Error incrementing usage:", error);
    }
  };

  // Calculate position based on usage (higher usage = higher position in bowl)
  const getVerticalPosition = (index: number, totalApps: number) => {
    return 20 + (index / (totalApps - 1)) * 40;
  };

  return (
    <Box
      width="480px"
      height="480px"
      position="relative"
      bg="transparent"
      userSelect="none"
      pointerEvents="auto"
    >
      {/* Feature image */}
      <Box
        position="absolute"
        top="31%"
        left="50%"
        userSelect="none"
        transform="translateX(-50%)"
        zIndex={30}
      >
        <Tooltip
          label={apps[0]?.["Tool_Tip-non_executable"]}
          color="black"
          fontSize="12px"
          fontWeight="bold"
          bg="transparent"
          px={2}
          py={1}
          borderRadius="md"
          placement="top"
        >
          <Box
            width="100px"
            height="100px"
            bg="transparent"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
            _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
            transition="all 0.2s"
            cursor="pointer"
            border="1px"
            borderColor="gray.200"
            userSelect="none"
          >
            <Box
              as="img"
              src={featureImage || "/placeholder.svg"}
              alt={`${sideName} feature`}
              width="100px"
              height="100px"
              userSelect="none"
              objectFit="contain"
            />
          </Box>
        </Tooltip>
      </Box>

      {/* Glass Bowl Container */}
      <Box
        position="absolute"
        bottom="115px"
        left="50%"
        transform="translateX(-50%)"
        width="200px"
        height="110px"
        zIndex={20}
      >
        {/* Glass Bowl Image */}
        <Box
          position="absolute"
          userSelect="none"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex={21}
        >
          <img
            src="/images/cloud.png"
            alt="Glass Bowl"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: "0.9",
            }}
          />
        </Box>

        {isLoading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={9999}
          bg="rgba(0, 0, 0, 0.5)"
          borderRadius="md"
          p={4}
        >
           {/* <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        /> */}
          <Text color="white" fontSize='10px' whiteSpace='nowrap'  mt={2}>Executing command...</Text>
        </Box>
      )}

        {/* Floating Characters inside the bowl */}

        {/* Floating Characters inside the bowl */}
        <Box position="relative" width="100%" height="100%" zIndex={25}>
          {sortedApps.map((app, index) => {
            const topPosition = getVerticalPosition(index, sortedApps.length);
            const leftPosition = getRandomHorizontalPosition(sideName, index);

            return (
              <Box
                key={index}
                position="absolute"
                top={`${topPosition}%`}
                left={`${leftPosition}%`}
                right="10px"
                zIndex={26}
                width="12px"
                onMouseEnter={(e) => handleMouseEnter(app, e)}
                onMouseLeave={handleMouseLeave}
                animation={`float-${index % 3} 3s ease-in-out infinite`}
                sx={{
                  "@keyframes float-0": {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-2px) rotate(0.5deg)" },
                  },
                  "@keyframes float-1": {
                    "0%, 100%": {
                      transform: "translateY(-1px) rotate(-0.3deg)",
                    },
                    "50%": { transform: "translateY(-3px) rotate(0.3deg)" },
                  },
                  "@keyframes float-2": {
                    "0%, 100%": {
                      transform: "translateY(-0.5px) rotate(0.3deg)",
                    },
                    "50%": { transform: "translateY(-2.5px) rotate(-0.5deg)" },
                  },
                }}
              >
                <Button
                  id={`button-${app.Executable_two_Letters}`}
                  // onClick={() =>
                  //   handleAppClick(
                  //     app.Executable_two_Letters,
                  //     app["Launch Command"]
                  //   )
                  // }
                  onDoubleClick={() => handleDoubleClick(app)}
                  bg="transparent"
                  color="white"
                  borderRadius="sm"
                  fontSize="6px"
                  fontWeight="bold"
                  _hover={{
                    cursor: "pointer",
                  }}
                  transition="all 0.3s"
                  height="auto"
                  minWidth="auto"
                  size="xs"
                  border="none"
                  textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
                  minH="12px"
                  minW="10px"
                >
                  <Text as="span" fontSize="10px" mr="0.5px">
                    {app.Executable_two_Letters[0]}
                  </Text>
                  <Text as="span" fontSize="8px">
                    {app.Executable_two_Letters[1]}
                  </Text>
                </Button>
              </Box>
            );
          })}

          {hoveredApp && (
            <Box
              position="fixed"
              top={`${0}`}
              left={`${-20}px`}
              zIndex={9999}
              bg='transparent'
                
              fontWeight={"bold"}
              color={
                apps.find((app) => app.Executable_two_Letters === hoveredApp)
                  ?.Status === "Dark"
                  ? "#71797E"
                  : "black"
              }
              p={2}
              maxHeight="100px"
              borderRadius="md"
              whiteSpace="nowrap"
              boxShadow="lg"
              maxWidth="100%"
            >
              <Text fontWeight="semibold" fontSize="10px">
                {
                  apps.find((app) => app.Executable_two_Letters === hoveredApp)
                    ?.ToolTips
                }
              </Text>
            </Box>
          )}
        </Box>

        {/* Water ripple effects overlay */}
        <Box
          position="absolute"
          top="30%"
          left="25%"
          width="50%"
          height="30%"
          borderRadius="50%"
          bg="rgba(255, 255, 255, 0.1)"
          animation="ripple 6s ease-in-out infinite"
          zIndex={22}
          sx={{
            "@keyframes ripple": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.1 },
              "50%": { transform: "scale(1.3)", opacity: 0.3 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
