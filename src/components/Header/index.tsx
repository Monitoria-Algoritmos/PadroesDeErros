"use client";

import { HStack, Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Renders a header.
 * @returns Header component.
 */
function Header() {
  const path = usePathname();
  const links = [
    {
      label: "Desafios",
      href: "/desafios",
    },
    {
      label: "Sobre",
      href: "/sobre",
    },
  ];
  return (
    <Flex
      as="header"
      bg="transparent"
      position="absolute"
      top="0"
      w="100%"
      justify="center"
    >
      <Flex
        w="100%"
        maxW="1920px"
        h="50px"
        pl="100px"
        gap="80px"
        align="center"
      >
        <Link href="/">
          <Image src="/assets/logo.ico" alt="Logo MVP" w="90px" />
        </Link>
        <HStack spacing="25px">
          {links.map((link) => (
            <ChakraLink
              as={Link}
              href={link.href}
              key={link.href}
              color={path === "/" ? "white" : "black"}
              _hover={{ color: path === "/" ? "gray.300" : "blue.500" }}
            >
              {link.label}
            </ChakraLink>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}
export default Header;
