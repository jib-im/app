import { ActionIcon, Box, useMantineColorScheme } from "@mantine/core";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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

      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        Box lets you add inline styles with sx prop
      </Box>
    </main>
  );
};

export default Home;
