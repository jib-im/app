import { type NextPage } from "next";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
  Flex,
} from "@mantine/core";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme() as {
  //   colorScheme: "dark" | "light";
  //   toggleColorScheme: () => void;
  // };
  // const dark = colorScheme === "dark";

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Container
      size="xs"
      style={{
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} align="center">
          Welcome to Jib.im, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            variant="outline"
            radius="xl"
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
          >
            <Flex columnGap="xs" align="center">
              <BsGoogle />
              <Text>Google</Text>
            </Flex>
          </Button>
          <Button
            variant="outline"
            radius="xl"
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
          >
            <Flex columnGap="xs" align="center">
              <BsGithub />
              <Text>Github</Text>
            </Flex>
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Home;
