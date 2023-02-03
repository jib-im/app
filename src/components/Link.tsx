import {
  ActionIcon,
  Box,
  Flex,
  MediaQuery,
  Menu,
  Paper,
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
import type { Link as LinkType } from "@prisma/client";
import Moment from "react-moment";

const LinkComponent = ({
  link,
  refetch,
}: {
  link: LinkType;
  refetch: () => void;
}) => {
  const { colorScheme } = useMantineColorScheme();
  const [linkModal, setLinkModal] = useState<{
    isOpen: boolean;
    type: "EDIT" | "DELETE" | "ARCHIVED" | "UNARCHIVED" | null;
  }>({
    isOpen: false,
    type: null,
  });
  return (
    <>
      <LinkModal
        modalType={{ type: linkModal.type, link }}
        isOpen={linkModal.isOpen}
        onClose={() =>
          setLinkModal({
            isOpen: false,
            type: null,
          })
        }
        refetch={refetch}
      />

      <Flex
        bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
        justify="space-between"
        px={20}
        py={12}
        sx={{ borderRadius: "8px" }}
        align="center"
      >
        <Box>
          <Flex align="center" columnGap="sm">
            <Link
              href={"https://jib.im/" + link.shortUrl}
              style={{
                textDecoration: "none",
              }}
              target="_blank"
            >
              <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                <Text size="lg">{"jib.im/" + link.shortUrl}</Text>
              </MediaQuery>
              <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                <Text>{"jib.im/" + link.shortUrl}</Text>
              </MediaQuery>
            </Link>

            <Paper px={8} py={2} bg={colorScheme == "dark" ? "gray" : "gray.3"}>
              <Text size="xs">
                {link.clicks === 0
                  ? "No clicks"
                  : link.clicks === 1
                  ? "1 click"
                  : link.clicks.toString() + " clicks"}
              </Text>
            </Paper>
          </Flex>

          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
            <Text>{link.url}</Text>
          </MediaQuery>
          <MediaQuery largerThan="xs" styles={{ display: "none" }}>
            <Text size="sm">{link.url}</Text>
          </MediaQuery>
        </Box>
        <Flex columnGap="sm" align="center">
          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
            <Text size="sm" color="gray.6">
              <Moment fromNow>{link.createdAt}</Moment>
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
                    type:
                      link.status === "ARCHIVED" ? "UNARCHIVED" : "ARCHIVED",
                  })
                }
              >
                {link.status === "ARCHIVED" ? "Unarchive" : "Archive"}
              </Menu.Item>
              <Menu.Item
                icon={<BsTrash />}
                color={colorScheme === "dark" ? "red.5" : "red.9"}
                onClick={() =>
                  setLinkModal({
                    isOpen: true,
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
