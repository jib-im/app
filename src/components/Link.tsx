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
import type { Link as LinkType } from "@prisma/client";
import Moment from "react-moment";

const LinkComponent = ({ link }: { link: LinkType }) => {
  const { colorScheme } = useMantineColorScheme();
  const [linkModal, setLinkModal] = useState<{
    isOpen: boolean;
    link?: LinkType;
    type?: "ADD" | "EDIT" | "DELETE" | "ARCHIVE";
  }>({
    isOpen: false,
    link,
  });
  return (
    <>
      <LinkModal linkModal={linkModal} setIsOpen={setLinkModal} />
      <Flex
        bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
        justify="space-between"
        px={20}
        py={12}
        sx={{ borderRadius: "8px" }}
        align="center"
      >
        <Box>
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
              <Text>{link.url}</Text>
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
                    type: "ARCHIVE",
                  })
                }
              >
                Archive
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
