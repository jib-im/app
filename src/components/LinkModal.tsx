import {
  Box,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";

const LinkModal = ({
  linkModal,
  setIsOpen,
}: {
  linkModal: {
    isOpen: boolean;
    link: null;
    type: "EDIT" | "DELETE" | "ARCHIVE" | null;
  };
  setIsOpen: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      link: null;
      type: "EDIT" | "DELETE" | "ARCHIVE" | null;
    }>
  >;
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Modal
      centered
      opened={linkModal.isOpen}
      onClose={() => setIsOpen({ isOpen: false, link: null, type: null })}
      title={
        linkModal.type === "EDIT"
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
          case "EDIT":
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("ds");
                  }}
                >
                  <Stack>
                    <TextInput
                      placeholder="https://jib.im/bricesuazo"
                      label="Destination Link"
                      withAsterisk
                      required
                    />
                    <Box>
                      <Text
                        component="label"
                        htmlFor="short-link"
                        size="sm"
                        weight={500}
                        color={colorScheme === "dark" ? "dark.0" : "gray.9"}
                      >
                        Destination Link
                      </Text>
                      <TextInput
                        placeholder="bricesuazo"
                        id="short-link"
                        withAsterisk
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
