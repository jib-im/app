import {
  Box,
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import type { Link } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { BsShuffle } from "react-icons/bs";

const LinkModal = ({
  linkModal,
  setIsOpen,
}: {
  linkModal: {
    isOpen: boolean;
    link?: Link;
    type?: "ADD" | "EDIT" | "DELETE" | "ARCHIVE";
  };
  setIsOpen: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      type?: "ADD" | "EDIT" | "DELETE" | "ARCHIVE";
    }>
  >;
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Modal
      centered
      opened={linkModal.isOpen}
      onClose={() => setIsOpen({ isOpen: false })}
      title={
        linkModal.type === "ADD"
          ? "Add Link"
          : linkModal.type === "EDIT"
          ? `Edit ${linkModal.link?.shortUrl}`
          : linkModal.type === "DELETE"
          ? "Delete Link"
          : linkModal.type === "ARCHIVE"
          ? "Archive Link"
          : ""
      }
    >
      {(() => {
        switch (linkModal.type) {
          case "ADD":
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Stack>
                    <TextInput
                      placeholder="https://github.com/bricesuazo"
                      label="Destination Link"
                      withAsterisk
                      required
                    />
                    <Box>
                      <Flex justify="space-between" align="center">
                        <Text
                          component="label"
                          htmlFor="short-link"
                          size="sm"
                          weight={500}
                          color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                        >
                          Short Link{" "}
                          <Text
                            component="span"
                            color={colorScheme === "dark" ? "red.8" : "red.6"}
                          >
                            *
                          </Text>
                        </Text>
                        <Button
                          leftIcon={<BsShuffle />}
                          size="xs"
                          variant="subtle"
                          color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                          px={8}
                          h={24}
                          loaderPosition="center"
                          //   loading={true}
                        >
                          Randomize
                        </Button>
                      </Flex>

                      <TextInput
                        placeholder="bricesuazo"
                        id="short-link"
                        icon={<Text size="sm">jib.im/</Text>}
                        required
                        iconWidth={64}
                      />
                    </Box>
                    <Button type="submit">Add link</Button>
                  </Stack>
                </form>
              </>
            );
          case "EDIT":
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Stack>
                    <TextInput
                      placeholder="https://github.com/bricesuazo"
                      label="Destination Link"
                      withAsterisk
                      required
                    />
                    <Box>
                      <Flex justify="space-between" align="center">
                        <Text
                          component="label"
                          htmlFor="short-link"
                          size="sm"
                          weight={500}
                          color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                        >
                          Short Link{" "}
                          <Text
                            component="span"
                            color={colorScheme === "dark" ? "red.8" : "red.6"}
                          >
                            *
                          </Text>
                        </Text>
                        <Button
                          leftIcon={<BsShuffle />}
                          size="xs"
                          variant="subtle"
                          color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                          px={8}
                          h={24}
                          loaderPosition="center"
                          //   loading={true}
                        >
                          Randomize
                        </Button>
                      </Flex>

                      <TextInput
                        placeholder="bricesuazo"
                        id="short-link"
                        icon={<Text size="sm">jib.im/</Text>}
                        required
                        iconWidth={64}
                      />
                    </Box>
                    <Button type="submit">Edit</Button>
                  </Stack>
                </form>
              </>
            );
          case "DELETE":
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Stack>
                    <Text>
                      Warning: Deleting this link will remove all of its stats.
                      This action cannot be undone.
                    </Text>

                    <Box>
                      <Text
                        component="label"
                        htmlFor="delete-link"
                        size="sm"
                        color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                      >
                        To verify, type{" "}
                        <Text component="span" weight={500}>
                          jib.im/github
                        </Text>{" "}
                        below{" "}
                        <Text
                          component="span"
                          color={colorScheme === "dark" ? "red.8" : "red.6"}
                        >
                          *
                        </Text>
                      </Text>

                      <TextInput
                        id="delete-link"
                        placeholder="jib.im/github"
                        required
                      />
                    </Box>

                    <Button color="red" type="submit">
                      Delete link
                    </Button>
                  </Stack>
                </form>
              </>
            );
          case "ARCHIVE":
            return (
              <>
                <Stack>
                  <Text>
                    Archived links will still work - they just won&apos;t show
                    up on your main dashboard.
                  </Text>
                  <Button color="gray">Archive link</Button>
                </Stack>
              </>
            );
        }
      })()}
    </Modal>
  );
};

export default LinkModal;
