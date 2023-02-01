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
import type { Dispatch, SetStateAction } from "react";
import { BsShuffle } from "react-icons/bs";

const LinkModal = ({
  linkModal,
  setIsOpen,
}: {
  linkModal: {
    isOpen: boolean;
    link?: { link: string };
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
          ? `Edit ${"link"}`
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
                          color="gray"
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
                          color="gray"
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
            return <>DELETE</>;
          case "ARCHIVE":
            return <>ARCHIVE</>;
          default:
            return <>DEFAULT</>;
        }
      })()}
    </Modal>
  );
};

export default LinkModal;
