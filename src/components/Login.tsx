import { useForm } from "@mantine/form";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Container,
  Flex,
} from "@mantine/core";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useState } from "react";
// import { env } from "../env/client.mjs";

const Login = () => {
  const [state, setState] = useState<{
    email: {
      loading: boolean;
      error: string | null;
      status: string | null;
    };
    google: {
      loading: boolean;
      error: string | null;
      status: string | null;
    };
    github: {
      loading: boolean;
      error: string | null;
      status: string | null;
    };
  }>({
    email: { loading: false, error: null, status: null },
    google: { loading: false, error: null, status: null },
    github: { loading: false, error: null, status: null },
  });

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
          Welcome to Jib.im, login with
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            variant="outline"
            radius="xl"
            loading={state.google.loading}
            onClick={async () => {
              setState((state) => ({
                ...state,
                google: { ...state.google, loading: true },
              }));

              await signIn("google");

              setState((state) => ({
                ...state,
                google: { ...state.google, loading: false },
              }));
            }}
          >
            <Flex columnGap="xs" align="center">
              <BsGoogle />
              <Text>Google</Text>
            </Flex>
          </Button>
          <Button
            variant="outline"
            radius="xl"
            loading={state.github.loading}
            onClick={async () => {
              setState((state) => ({
                ...state,
                github: { ...state.github, loading: true },
              }));

              await signIn("github");

              setState((state) => ({
                ...state,
                github: { ...state.github, loading: false },
              }));
            }}
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

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setState((state) => ({
              ...state,
              email: { ...state.email, loading: true },
            }));
            await signIn("email", {
              email: form.values.email,
              redirect: false,
            }).finally(() => {
              form.reset;
              setState((state) => ({
                ...state,
                email: {
                  ...state.email,
                  status: "Email sent - check your inbox!",
                },
              }));
            });
            setState((state) => ({
              ...state,
              email: { ...state.email, loading: false },
            }));

            setTimeout(() => {
              setState((state) => ({
                ...state,
                email: {
                  ...state.email,
                  status: "Send magic link",
                  error: null,
                },
              }));
            }, 10000);
          }}
        >
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
            <Button type="submit" loading={state.email.loading}>
              {state.email.status || "Send magic link"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
