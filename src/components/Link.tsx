import {
  ActionIcon,
  Box,
  Flex,
  MediaQuery,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import {
  BsInbox,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import { useState } from "react";
import LinkModal from "./LinkModal";

const LinkComponent = () => {
  const { colorScheme } = useMantineColorScheme();
  const [linkModal, setLinkModal] = useState<{
    isOpen: boolean;
    link: null;
    type: "EDIT" | "DELETE" | "ARCHIVE" | null;
  }>({
    isOpen: false,
    link: null,
    type: null,
  });
  return (
    <>
      <LinkModal linkModal={linkModal} setIsOpen={setLinkModal} />
      <Flex
        bg={colorScheme === "dark" ? "dark.5" : "gray.2"}
        justify="space-between"
        px={20}
        py={12}
        sx={{ borderRadius: "8px" }}
        align="center"
      >
        <Box>
          <Link
            href=""
            style={{
              textDecoration: "none",
            }}
          >
            <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
              <Text size="lg">jib.im/bricesuazo</Text>
            </MediaQuery>
            <MediaQuery largerThan="xs" styles={{ display: "none" }}>
              <Text>jib.im/bricesuazo</Text>
            </MediaQuery>
          </Link>
          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
            <Text>https://github.com/jib-im</Text>
          </MediaQuery>
          <MediaQuery largerThan="xs" styles={{ display: "none" }}>
            <Text size="sm">https://github.com/jib-im</Text>
          </MediaQuery>
        </Box>
        <Flex columnGap="sm" align="center">
          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
            <Text size="sm" color="gray.6">
              a month ago
            </Text>
          </MediaQuery>
          <Menu position="bottom-end" width={128}>
            <Menu.Target>
              <ActionIcon variant="light">
                <BsThreeDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<BsPencilSquare />}
                onClick={() =>
                  setLinkModal({
                    isOpen: true,
                    link: null,
                    type: "EDIT",
                  })
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<BsInbox />}
                onClick={() =>
                  setLinkModal({
                    isOpen: true,
                    link: null,
                    type: "ARCHIVE",
                  })
                }
              >
                Archive
              </Menu.Item>
              <Menu.Item
                icon={<BsTrash />}
                color="red.5"
                onClick={() =>
                  setLinkModal({
                    isOpen: true,
                    link: null,
                    type: "DELETE",
                  })
                }
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};

export default LinkComponent;
