"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

function Home() {
  return (
    <Flex justify="center" align="start" h="100vh" backgroundColor="purple.600">
      <Flex
        position="absolute"
        borderRight="100vw solid transparent"
        borderBottom="23.9vw solid white"
        bottom="0"
      />
      <Flex maxW="1920px" w="100%" mt="100px" zIndex={3} align="start">
        <Image
          src="/assets/images/home_img.png"
          w="100%"
          objectFit="scale-down"
          maxW="720px"
          alt="home-image"
        />
        <Flex
          flexDir="column"
          mt="100px"
          gap="20px"
          align="center"
          p="16px"
          color="white"
        >
          <Heading>Aprendendo com os erros</Heading>
          <Text fontSize="large" textAlign="center" color="gray.200">
            Descubra e aprimore suas habilidades de programação com nossa
            plataforma de exercícios focada na identificação de erros em
            códigos! Desenvolva sua capacidade de detectar padrões de equívocos
            com uma variedade de desafios envolventes.
          </Text>
          <Link href="/desafios">
            <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
              Começar agora
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Home;
