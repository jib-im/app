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

const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const { query, push } = useRouter();

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
                      <BsCircleFill size={12} color="#f59e0b" />
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
                      query.status = "expired,archived";
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
                      if (
                        query.status.includes("expired") &&
                        query.status.includes("archived")
                      ) {
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
                  icon={<BsCircleFill size={12} color="#f59e0b" />}
                  onClick={async () => {
                    if (query.status === "none") {
                      query.status = "expired";
                    } else if (query.status === "all") {
                      query.status = "active,archived";
                    } else if (!query.status) {
                      query.status = "active,expired";
                    } else if (query.status === "expired") {
                      query.status = "none";
                    } else if (query.status?.includes(",expired")) {
                      typeof query.status === "string"
                        ? (query.status = query.status.replace(",expired", ""))
                        : query.status;
                    } else if (query.status?.includes("expired,")) {
                      typeof query.status === "string"
                        ? (query.status = query.status.replace("expired,", ""))
                        : query.status;
                    } else {
                      if (
                        query.status.includes("active") &&
                        query.status.includes("archived")
                      ) {
                        query.status = "all";
                      } else {
                        query.status = query.status.concat(",expired");
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
                  Expired
                  {(query.status?.includes("expired") ||
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
                      query.status = "active,expired";
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
                      if (
                        query.status.includes("active") &&
                        query.status.includes("expired")
                      ) {
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
