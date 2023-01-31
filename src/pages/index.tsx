import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Login from "../components/Login";
import { getServerAuthSession } from "../server/auth";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Menu,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  BsChevronDown,
  BsCircleFill,
  BsSortAlphaUp,
  BsSortDown,
  BsSortNumericDown,
} from "react-icons/bs";

const Index = () => {
  const { status } = useSession();
  const { colorScheme } = useMantineColorScheme();

  if (status === "unauthenticated") return <Login />;
  return (
    <main>
      <Container>
        <Flex h={128} align="center" justify="space-between">
          <Title align="center">Links</Title>
          <Button radius="xl" variant="outline">
            Add
          </Button>
        </Flex>
      </Container>
      <Divider color={colorScheme === "dark" ? "dark.5" : "gray.2"} />

      <Container py={16}>
        <Flex justify="end" columnGap="sm">
          <Menu position="bottom-end" width={200}>
            <Menu.Target>
              <Button
                leftIcon={<BsSortAlphaUp />}
                rightIcon={<BsChevronDown />}
              >
                Sort by
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<BsSortDown />} closeMenuOnClick={false}>
                Date Added
              </Menu.Item>
              <Menu.Item icon={<BsSortNumericDown />} closeMenuOnClick={false}>
                Number of Clicks
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu position="bottom-end" width={148}>
            <Menu.Target>
              <Button
                leftIcon={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: -8,
                    }}
                  >
                    <BsCircleFill size={12} color="#22c55e" />
                    <BsCircleFill size={12} color="#e5e7eb" />
                    <BsCircleFill size={12} color="#e5e7eb" />
                  </Box>
                }
                rightIcon={<BsChevronDown />}
              >
                Status
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<BsSortDown />} closeMenuOnClick={false}>
                Active
              </Menu.Item>
              <Menu.Item icon={<BsSortNumericDown />} closeMenuOnClick={false}>
                Expired
              </Menu.Item>
              <Menu.Item icon={<BsSortNumericDown />} closeMenuOnClick={false}>
                Archived
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Container>
    </main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  return {
    props: { session },
  };
};
