"use client";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";

interface AppData {
  images: string;
  "Tool_Tip-non_executable": string;
  Executable_two_Letters: string;
  ToolTips: string;
  "Number of tip selected": string;
  "Launch Command": string;
}

// Extended data for each side with up to 26 combinations
// const sideData: Record<string, AppData[]> = {
//   Access: [
//     {
//       letters: "Ac",
//       tooltip: "Access Control Manager",
//       launchCommand: "launch-access-control",
//       usageCount: 95,
//     },
//     {
//       letters: "Au",
//       tooltip: "Authentication Portal",
//       launchCommand: "launch-auth",
//       usageCount: 88,
//     },
//     {
//       letters: "Pr",
//       tooltip: "Permission Manager",
//       launchCommand: "launch-permissions",
//       usageCount: 82,
//     },
//     {
//       letters: "Id",
//       tooltip: "Identity Verification",
//       launchCommand: "launch-identity",
//       usageCount: 76,
//     },
//     {
//       letters: "Se",
//       tooltip: "Security Scanner",
//       launchCommand: "launch-security",
//       usageCount: 70,
//     },
//     {
//       letters: "Lo",
//       tooltip: "Login Manager",
//       launchCommand: "launch-login",
//       usageCount: 65,
//     },
//     {
//       letters: "Ke",
//       tooltip: "Key Management",
//       launchCommand: "launch-keys",
//       usageCount: 60,
//     },
//     {
//       letters: "Bi",
//       tooltip: "Biometric Auth",
//       launchCommand: "launch-biometric",
//       usageCount: 55,
//     },
//     {
//       letters: "To",
//       tooltip: "Token Generator",
//       launchCommand: "launch-token",
//       usageCount: 50,
//     },
//   ],
//   Autonomy: [
//     {
//       letters: "Ai",
//       tooltip: "AI Decision Engine",
//       launchCommand: "launch-ai-engine",
//       usageCount: 98,
//     },
//     {
//       letters: "Au",
//       tooltip: "Autonomous Systems",
//       launchCommand: "launch-auto-systems",
//       usageCount: 92,
//     },
//     {
//       letters: "Ml",
//       tooltip: "Machine Learning Hub",
//       launchCommand: "launch-ml-hub",
//       usageCount: 87,
//     },
//     {
//       letters: "Ro",
//       tooltip: "Robotics Control",
//       launchCommand: "launch-robotics",
//       usageCount: 83,
//     },
//     {
//       letters: "Ne",
//       tooltip: "Neural Networks",
//       launchCommand: "launch-neural",
//       usageCount: 78,
//     },
//     {
//       letters: "De",
//       tooltip: "Decision Trees",
//       launchCommand: "launch-decisions",
//       usageCount: 74,
//     },
//     {
//       letters: "Pr",
//       tooltip: "Process Automation",
//       launchCommand: "launch-process",
//       usageCount: 69,
//     },
//     {
//       letters: "Wo",
//       tooltip: "Workflow Engine",
//       launchCommand: "launch-workflow",
//       usageCount: 65,
//     },
//     {
//       letters: "Sc",
//       tooltip: "Smart Contracts",
//       launchCommand: "launch-contracts",
//       usageCount: 60,
//     },
//     {
//       letters: "Op",
//       tooltip: "Optimization Engine",
//       launchCommand: "launch-optimize",
//       usageCount: 56,
//     },
//     {
//       letters: "Le",
//       tooltip: "Learning Algorithms",
//       launchCommand: "launch-learning",
//       usageCount: 52,
//     },
//     {
//       letters: "Pl",
//       tooltip: "Planning System",
//       launchCommand: "launch-planning",
//       usageCount: 48,
//     },
//   ],
//   Communication: [
//     {
//       letters: "Ch",
//       tooltip: "Chat Interface",
//       launchCommand: "launch-chat",
//       usageCount: 96,
//     },
//     {
//       letters: "Em",
//       tooltip: "Email Manager",
//       launchCommand: "launch-email",
//       usageCount: 91,
//     },
//     {
//       letters: "Vi",
//       tooltip: "Video Conferencing",
//       launchCommand: "launch-video",
//       usageCount: 86,
//     },
//     {
//       letters: "Me",
//       tooltip: "Messaging System",
//       launchCommand: "launch-messaging",
//       usageCount: 81,
//     },
//     {
//       letters: "Vo",
//       tooltip: "Voice Calls",
//       launchCommand: "launch-voice",
//       usageCount: 76,
//     },
//     {
//       letters: "Sl",
//       tooltip: "Slack Integration",
//       launchCommand: "launch-slack",
//       usageCount: 71,
//     },
//   ],
//   Visualization: [
//     {
//       letters: "Da",
//       tooltip: "Dashboard Creator",
//       launchCommand: "launch-dashboard",
//       usageCount: 94,
//     },
//     {
//       letters: "Ch",
//       tooltip: "Chart Builder",
//       launchCommand: "launch-charts",
//       usageCount: 89,
//     },
//     {
//       letters: "Gr",
//       tooltip: "Graph Visualizer",
//       launchCommand: "launch-graphs",
//       usageCount: 84,
//     },
//     {
//       letters: "Ma",
//       tooltip: "Map Interface",
//       launchCommand: "launch-maps",
//       usageCount: 79,
//     },
//     {
//       letters: "Re",
//       tooltip: "Report Generator",
//       launchCommand: "launch-reports",
//       usageCount: 74,
//     },
//     {
//       letters: "Ta",
//       tooltip: "Table Designer",
//       launchCommand: "launch-tables",
//       usageCount: 69,
//     },
//     {
//       letters: "Ga",
//       tooltip: "Gauge Widgets",
//       launchCommand: "launch-gauges",
//       usageCount: 64,
//     },
//     {
//       letters: "He",
//       tooltip: "Heatmap Creator",
//       launchCommand: "launch-heatmap",
//       usageCount: 59,
//     },
//     {
//       letters: "Tr",
//       tooltip: "Tree Diagrams",
//       launchCommand: "launch-tree",
//       usageCount: 54,
//     },
//   ],
//   "Data Analysis": [
//     {
//       letters: "An",
//       tooltip: "Analytics Engine",
//       launchCommand: "launch-analytics",
//       usageCount: 97,
//     },
//     {
//       letters: "St",
//       tooltip: "Statistics Tool",
//       launchCommand: "launch-stats",
//       usageCount: 93,
//     },
//     {
//       letters: "Pr",
//       tooltip: "Predictive Models",
//       launchCommand: "launch-predictions",
//       usageCount: 88,
//     },
//     {
//       letters: "Da",
//       tooltip: "Data Mining",
//       launchCommand: "launch-mining",
//       usageCount: 84,
//     },
//     {
//       letters: "Bi",
//       tooltip: "Business Intelligence",
//       launchCommand: "launch-bi",
//       usageCount: 79,
//     },
//     {
//       letters: "Et",
//       tooltip: "ETL Pipeline",
//       launchCommand: "launch-etl",
//       usageCount: 75,
//     },
//     {
//       letters: "Wa",
//       tooltip: "Data Warehouse",
//       launchCommand: "launch-warehouse",
//       usageCount: 70,
//     },
//     {
//       letters: "Cl",
//       tooltip: "Data Cleaning",
//       launchCommand: "launch-cleaning",
//       usageCount: 66,
//     },
//   ],
//   "AI Models": [
//     {
//       letters: "Gp",
//       tooltip: "GPT Interface",
//       launchCommand: "launch-gpt",
//       usageCount: 99,
//     },
//     {
//       letters: "Cv",
//       tooltip: "Computer Vision",
//       launchCommand: "launch-cv",
//       usageCount: 80,
//     },
//     {
//       letters: "Nl",
//       tooltip: "NLP Processor",
//       launchCommand: "launch-nlp",
//       usageCount: 70,
//     },
//     {
//       letters: "Tr",
//       tooltip: "Training Pipeline",
//       launchCommand: "launch-training",
//       usageCount: 50,
//     },
//   ],
// };

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
  "Data Analysis": {
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
  return 10 + random * 65; // Random position between 10% and 80%
};

export default function CubeSide({ sideName }: CubeSideProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Assume we have a function to get the apps for a specific side
  const [apps, setApps] = useState<AppData[]>([]);
  const [infoBoxPosition, setInfoBoxPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (app: AppData, event: React.MouseEvent) => {
    setHoveredApp(app.Executable_two_Letters);
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = event.currentTarget.getBoundingClientRect();
      setInfoBoxPosition({
        top: 20,
        left: 0,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredApp(null);
  };

  useEffect(() => {
    fetchApps();
  }, [sideName]);

  const fetchApps = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");

      if (!response.ok) {
        throw new Error("Failed to fetch apps");
      }
      const data = await response.json();
      console.log("Fetched apps:", data);

      // Filter and format the data based on sideName
      const filteredApps = data.filter(
        (app: AppData) =>
          app["Tool_Tip-non_executable"].toLowerCase() ===
          sideName.toLowerCase()
      );
      console.log("Filtered apps:", filteredApps);

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
  const featureImage = featureImages[sideName]?.src ;

  // Sort apps by "Number of tip selected" (highest first)
  const sortedApps = apps.sort(
    (a, b) =>
      parseInt(b["Number of tip selected"]) -
      parseInt(a["Number of tip selected"])
  );

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
    return 10 + (index / (totalApps - 1)) * 40;
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
        top="32%"
        left="50%"
        userSelect="none"
        transform="translateX(-50%)"
        zIndex={30}
      >
        <Tooltip
          label={apps[0]?.["Tool_Tip-non_executable"]}
          color="white"
          fontSize="12px"
          fontWeight="bold"
          bg="rgba(0, 0, 0, 0.7)"
          px={2}
          py={1}
          borderRadius="md"
          hasArrow
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
        bottom="100px"
        left="50%"
        transform="translateX(-50%)"
        width="160px"
        height="120px"
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
            src="/images/glass-bowl.png"
            alt="Glass Bowl"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: "0.7",
            }}
          />
        </Box>

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
                zIndex={26}
                onMouseEnter={(e) => handleMouseEnter(app, e)}
                onMouseLeave={handleMouseLeave}
                animation={`float-${index % 3} 3s ease-in-out infinite`}
                 sx={{
                  "@keyframes float-0": {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-2px) rotate(0.5deg)" },
                  },
                  "@keyframes float-1": {
                    "0%, 100%": { transform: "translateY(-1px) rotate(-0.3deg)" },
                    "50%": { transform: "translateY(-3px) rotate(0.3deg)" },
                  },
                  "@keyframes float-2": {
                    "0%, 100%": { transform: "translateY(-0.5px) rotate(0.3deg)" },
                    "50%": { transform: "translateY(-2.5px) rotate(-0.5deg)" },
                  },
                }}
              >
                <Button
                  id={`button-${app.Executable_two_Letters}`}
                  onClick={() =>
                    handleAppClick(
                      app.Executable_two_Letters,
                      app["Launch Command"]
                    )
                  }
                  bg="transparent"
                  color="white"
                  px={0.5}
                  py={0.5}
                  borderRadius="sm"
                  fontSize="6px"
                  fontWeight="bold"
                  _hover={{
                    transform: "scale(1.2)",
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                  }}
                  transition="all 0.3s"
                  height="auto"
                  minWidth="auto"
                  size="xs"
                  border="none"
                  textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
                  minH="10px"
                  minW="12px"
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
              position="absolute"
              top={-20}
              left={-20}
              zIndex={9999}
              bg="rgba(0, 0, 0, 0.8)"
              color="white"
              p={2}
              maxHeight="100px"
              borderRadius="md"
              boxShadow="lg"
              maxWidth="90px"
            >
              <Text fontWeight="semibold" fontSize="10px">
                {
                  apps.find((app) => app.Executable_two_Letters === hoveredApp)
                    ?.ToolTips
                }
              </Text>

              <Text color="cyan.400" fontSize="xx-small">
                Click to launch
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
