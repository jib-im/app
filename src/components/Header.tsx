import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { Header as HeaderMantine } from "@mantine/core";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  BsBarChart,
  BsBoxArrowInRight,
  BsChevronDown,
  BsFillMoonFill,
  BsPersonCircle,
  BsSunFill,
} from "react-icons/bs";

const Header = ({ session }: { session: Session }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme() as {
    colorScheme: "dark" | "light";
    toggleColorScheme: () => void;
  };

  return (
    <HeaderMantine
      height={64}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          href="/"
          style={{
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/jib-logo.png"
            width={40}
            height={40}
            alt="Jib.im Logo"
          />
        </Link>
        <Menu width={200} shadow="md" closeDelay={400} position="bottom-end">
          <Menu.Target>
            <Button
              unstyled
              sx={{
                overflow: "hidden",
                backgroundColor: "transparent",
                color: "inherit",
                transition: "all 100ms ease-in-out",
                border: "none",
                padding: ".5rem .75rem",
                borderRadius: "8px",
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                },
                "&:active": {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Flex align="center" columnGap="xs">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    width={32}
                    height={32}
                    alt={`Profile picture`}
                    style={{
                      borderRadius: "50%",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                ) : (
                  <BsPersonCircle size={32} />
                )}
                <Box w={72}>
                  <Text size="xs" align="left" weight="bold" truncate>
                    {session?.user.name}
                  </Text>
                  <Text size="xs" align="left" truncate>
                    {session?.user.email}
                  </Text>
                </Box>
                <BsChevronDown />
              </Flex>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Link
              href="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Menu.Item icon={<BsBarChart />}>Dashboard</Menu.Item>
            </Link>

            <Menu.Item
              closeMenuOnClick={false}
              icon={colorScheme === "dark" ? <BsSunFill /> : <BsFillMoonFill />}
              onClick={() => toggleColorScheme()}
            >
              {colorScheme === "dark" ? "Light mode" : "Dark mode"}
            </Menu.Item>
            <Menu.Item icon={<BsBoxArrowInRight />} onClick={() => signOut()}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </HeaderMantine>
  );
};

export default Header;
