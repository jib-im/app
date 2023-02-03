import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Menu,
  Stack,
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
import LinkComponent from "../components/Link";
import LinkModal from "../components/LinkModal";
import { useState } from "react";
import { api } from "../utils/api";

const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const links = api.link.getAll.useQuery();

  return (
    <>
      <LinkModal
        isOpen={isOpenAddModal}
        modalType={{ type: "ADD" }}
        onClose={() => {
          setIsOpenAddModal(false);
        }}
        refetch={links.refetch}
      />
      <main>
        <Container>
          <Flex h={128} align="center" justify="space-between">
            <Title align="center">Links</Title>
            <Button
              radius="xl"
              variant="outline"
              onClick={() => {
                setIsOpenAddModal(true);
              }}
            >
              Add
            </Button>
          </Flex>
        </Container>
        <Divider color={colorScheme === "dark" ? "dark.5" : "gray.2"} />

        <Container py={16}>
          <Flex justify="end" columnGap="sm">
            <Menu position="bottom-end" width={200} closeOnItemClick={false}>
              <Menu.Target>
                <Button
                  leftIcon={<BsSortAlphaUp />}
                  rightIcon={<BsChevronDown />}
                  variant="default"
                  radius="xl"
                >
                  Sort by
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<BsSortDown />}>Date Added</Menu.Item>
                <Menu.Item icon={<BsSortNumericDown />}>
                  Number of Clicks
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Menu position="bottom-end" width={148} closeOnItemClick={false}>
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
                  variant="default"
                  radius="xl"
                >
                  Status
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<BsCircleFill size={12} color="#22c55e" />}>
                  Active
                </Menu.Item>
                <Menu.Item icon={<BsCircleFill size={12} color="#f59e0b" />}>
                  Expired
                </Menu.Item>
                <Menu.Item icon={<BsCircleFill size={12} color="#9ca3af" />}>
                  Archived
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>

          <Stack mt={16} spacing="xs">
            {links.data?.map((link) => (
              <LinkComponent
                key={link.id}
                link={link}
                refetch={links.refetch}
              />
            ))}
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
