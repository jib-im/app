import {
  ActionIcon,
  Box,
  Button,
  Input,
  useMantineColorScheme,
} from "@mantine/core";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme() as {
    colorScheme: "dark" | "light";
    toggleColorScheme: () => void;
  };
  const dark = colorScheme === "dark";
  return (
    <main>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? "light" : "dark"}
      </ActionIcon>

      <Box>
        <Button>ayo</Button>
        <Input />
      </Box>
    </main>
  );
};

export default Home;
