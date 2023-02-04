import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Menu,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  BsCheck,
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
import { useRouter } from "next/router";
import Image from "next/image";

const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const { query, push } = useRouter();

  const links = api.link.getAll.useQuery({
    sort: query.sort as string,
    status: query.status as string,
  });

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
                <Menu.Item
                  icon={<BsSortDown />}
                  pos="relative"
                  onClick={async () => {
                    if (query.sort !== "clicks") return;

                    delete query.sort;

                    await push({
                      pathname: "/",
                      query,
                    });
                  }}
                >
                  Date Added
                  {!query.sort && (
                    <BsCheck
                      size={18}
                      style={{
                        position: "absolute",
                        right: 12,
                      }}
                    />
                  )}
                </Menu.Item>
                <Menu.Item
                  pos="relative"
                  icon={<BsSortNumericDown />}
                  onClick={async () => {
                    if (query.sort === "clicks") return;

                    query.sort = "clicks";

                    await push({
                      pathname: "/",
                      query,
                    });
                  }}
                >
                  Number of Clicks
                  {query.sort === "clicks" && (
                    <BsCheck
                      size={18}
                      style={{
                        position: "absolute",
                        right: 12,
                      }}
                    />
                  )}
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
                      <BsCircleFill size={12} color="#9ca3af" />
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
                <Menu.Item
                  pos="relative"
                  icon={<BsCircleFill size={12} color="#22c55e" />}
                  onClick={async () => {
                    if (!query.status || query.status === "active") {
                      query.status = "none";
                    } else if (query.status === "none") {
                      delete query.status;
                    } else if (query.status === "all") {
                      query.status = "archived";
                    } else if (!query.status.includes("active")) {
                      query.status = query.status.concat(",active");
                    } else if (query.status.includes("active,")) {
                      query.status =
                        typeof query.status === "string"
                          ? query.status.replace("active,", "")
                          : query.status;
                    } else if (query.status.includes(",active")) {
                      query.status =
                        typeof query.status === "string"
                          ? query.status.replace(",active", "")
                          : query.status;
                    } else {
                      if (query.status.includes("archived")) {
                        query.status = "all";
                      }
                    }
                    await push({
                      pathname: "/",
                      query,
                    });
                  }}
                >
                  Active
                  {(query.status?.includes("active") ||
                    !query.status ||
                    query.status === "all") && (
                    <BsCheck
                      size={18}
                      style={{
                        position: "absolute",
                        right: 12,
                      }}
                    />
                  )}
                </Menu.Item>
                <Menu.Item
                  pos="relative"
                  icon={<BsCircleFill size={12} color="#9ca3af" />}
                  onClick={async () => {
                    if (query.status === "none") {
                      query.status = "archived";
                    } else if (query.status === "all") {
                      query.status = "active";
                    } else if (!query.status) {
                      query.status = "active,archived";
                    } else if (query.status === "archived") {
                      query.status = "none";
                    } else if (query.status.includes(",archived")) {
                      typeof query.status === "string"
                        ? (query.status = query.status.replace(",archived", ""))
                        : query.status;
                    } else if (query.status.includes("archived,")) {
                      typeof query.status === "string"
                        ? (query.status = query.status.replace("archived,", ""))
                        : query.status;
                    } else {
                      if (query.status.includes("active")) {
                        query.status = "all";
                      } else {
                        query.status = query.status.concat(",archived");
                      }
                    }

                    if (query.status === "active") {
                      delete query.status;
                    }

                    await push({
                      pathname: "/",
                      query,
                    });
                  }}
                >
                  Archived
                  {(query.status?.includes("archived") ||
                    query.status === "all") && (
                    <BsCheck
                      size={18}
                      style={{
                        position: "absolute",
                        right: 12,
                      }}
                    />
                  )}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>

          <Stack mt={16} spacing="xs">
            {links.isLoading ? (
              [...Array(8).keys()].map((_, i) => (
                <LinkComponent key={i} type="LOADING" />
              ))
            ) : !links.data?.length ? (
              <Center>
                <Stack align="center">
                  <Image
                    src="/images/no-link.svg"
                    alt="No link"
                    width={256}
                    height={256}
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                  <Text>No links yet.</Text>
                </Stack>
              </Center>
            ) : (
              links.data.map((link) => (
                <LinkComponent
                  key={link.id}
                  type="DATA"
                  link={link}
                  refetch={links.refetch}
                />
              ))
            )}
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
