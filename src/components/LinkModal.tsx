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
import { BsShuffle } from "react-icons/bs";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { generateId } from "../utils/generateId";

const LinkModal = ({
  modalType,
  isOpen,
  onClose,
  refetch,
}: {
  refetch: () => void;
  isOpen: boolean;
  onClose: () => void;
  modalType:
    | {
        type: null;
      }
    | {
        type: "ADD";
      }
    | {
        type: "UNARCHIVED";
        link: Link;
      }
    | {
        type: "EDIT";
        link: Link;
      }
    | {
        type: "DELETE";
        link: Link;
      }
    | {
        type: "ARCHIVED";
        link: Link;
      };
}) => {
  const [modalState, setModalState] = useState({
    url: "",
    shortUrl: "",
  });
  const [deleteVerification, setDeleteVerification] = useState("");
  const { colorScheme } = useMantineColorScheme();

  const createLink = api.link.create.useMutation();
  const editLink = api.link.update.useMutation();
  const deleteLink = api.link.delete.useMutation();
  const archiveLink = api.link.archive.useMutation();
  const unarchiveLink = api.link.unarchive.useMutation();

  const generateIdMutation = api.link.generateShortUrl.useMutation();

  const generateShortUrlRecursively = async () => {
    const id = generateId();
    const res = await generateIdMutation.mutateAsync({ shortUrl: id });
    if (res) {
      setModalState({
        ...modalState,
        shortUrl: id,
      });
    } else {
      await generateShortUrlRecursively();
    }
  };

  useEffect(() => {
    setModalState({
      url: modalType.type === "EDIT" ? modalType.link.url : "",
      shortUrl: modalType.type === "EDIT" ? modalType.link.shortUrl : "",
    });
  }, [modalType.type]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={() => {
        onClose();
        setModalState({
          url: "",
          shortUrl: "",
        });
      }}
      title={
        modalType.type === "ADD"
          ? "Add Link"
          : modalType.type === "EDIT"
          ? `Edit jib.im/${modalType.link.shortUrl}`
          : modalType.type === "DELETE"
          ? `Delete jib.im/${modalType.link.shortUrl}`
          : modalType.type === "ARCHIVED"
          ? `Archive  jib.im/${modalType.link.shortUrl}`
          : modalType.type === "UNARCHIVED"
          ? `Unarchive jib.im/${modalType.link.shortUrl}`
          : ""
      }
    >
      {(() => {
        switch (modalType.type) {
          case "ADD":
            return (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await createLink.mutateAsync({
                      url: modalState.url,
                      shortUrl: modalState.shortUrl,
                    });
                    refetch();
                    onClose();
                  }}
                >
                  <Stack>
                    <TextInput
                      placeholder="https://github.com/bricesuazo"
                      label="Destination Link"
                      name="url"
                      withAsterisk
                      required
                      value={modalState.url}
                      onChange={(e) => {
                        setModalState({
                          ...modalState,
                          url: e.target.value,
                        });
                      }}
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
                          loading={generateIdMutation.isLoading}
                          onClick={async () => {
                            await generateShortUrlRecursively();
                          }}
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
                        name="shortUrl"
                        value={modalState.shortUrl}
                        onChange={(e) => {
                          setModalState({
                            ...modalState,
                            shortUrl: e.target.value,
                          });
                        }}
                      />
                    </Box>
                    <Button type="submit" loading={createLink.isLoading}>
                      Add link
                    </Button>
                  </Stack>
                </form>
              </>
            );
          case "EDIT":
            return (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    await editLink.mutateAsync({
                      id: modalType.link.id,
                      url: modalState.url,
                      shortUrl: modalState.shortUrl,
                    });
                    refetch();
                    onClose();
                  }}
                >
                  <Stack>
                    <TextInput
                      placeholder="https://github.com/bricesuazo"
                      label="Destination Link"
                      withAsterisk
                      required
                      value={modalState.url}
                      onChange={(e) => {
                        setModalState({
                          ...modalState,
                          url: e.target.value,
                        });
                      }}
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
                          loading={generateIdMutation.isLoading}
                          onClick={async () => {
                            await generateShortUrlRecursively();
                          }}
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
                        value={modalState.shortUrl}
                        onChange={(e) => {
                          setModalState({
                            ...modalState,
                            shortUrl: e.target.value,
                          });
                        }}
                      />
                    </Box>
                    <Button
                      type="submit"
                      loading={editLink.isLoading}
                      disabled={
                        modalState.url === modalType.link.url &&
                        modalState.shortUrl === modalType.link.shortUrl
                      }
                    >
                      Edit
                    </Button>
                  </Stack>
                </form>
              </>
            );
          case "DELETE":
            return (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (
                      deleteVerification !== `jib.im/${modalType.link.shortUrl}`
                    )
                      return;

                    await deleteLink.mutateAsync({ id: modalType.link.id });
                    refetch();
                    onClose();
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
                          jib.im/{modalType.link.shortUrl}
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
                        value={deleteVerification}
                        onChange={(e) => {
                          setDeleteVerification(e.target.value);
                        }}
                      />
                    </Box>

                    <Button
                      color="red"
                      type="submit"
                      loading={deleteLink.isLoading}
                      disabled={
                        deleteVerification !==
                        `jib.im/${modalType.link.shortUrl}`
                      }
                    >
                      Delete link
                    </Button>
                  </Stack>
                </form>
              </>
            );
          case "ARCHIVED":
            return (
              <>
                <Stack>
                  <Text>
                    Archived links will still work - they just won&apos;t show
                    up on your main dashboard.
                  </Text>
                  <Button
                    color="gray"
                    onClick={async () => {
                      await archiveLink.mutateAsync({ id: modalType.link.id });
                      refetch();
                      onClose();
                    }}
                    loading={archiveLink.isLoading}
                  >
                    Archive link
                  </Button>
                </Stack>
              </>
            );
          case "UNARCHIVED":
            return (
              <>
                <Stack>
                  <Text>
                    Unarchiving link will make it appear on your main dashboard.
                  </Text>
                  <Button
                    color="gray"
                    onClick={async () => {
                      await unarchiveLink.mutateAsync({
                        id: modalType.link.id,
                      });
                      refetch();
                      onClose();
                    }}
                    loading={archiveLink.isLoading}
                  >
                    Unarchive link
                  </Button>
                </Stack>
              </>
            );
        }
      })()}
    </Modal>
  );
};

export default LinkModal;
