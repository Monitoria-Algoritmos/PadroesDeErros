"use client";

import {
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Tag,
  CloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { GET } from "../api/challenges/route";
import stringToSlug from "../../utils/slug";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

async function getChallenges() {
  const response = await fetch("/api/challenges");
  const data = await response.json();
  return data["challenges"];
}

/**
 * Renders a challenges page.
 * @returns Challenges component.
 */
function Challenges() {
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [difficulty, setDifficulty] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const challengeData = await getChallenges();
      setChallenges(challengeData);
    }
    fetchData();
  }, []);

  function handleChangeDifficulty(value: string) {
    setDifficulty(value);
  }

  function handleChangeType(value: string) {
    setType(value);
  }

  function clearDifficulties() {
    setDifficulty("");
  }

  function clearTypes() {
    setType("");
  }

  const data = challenges.filter((challenge) => {
    if (difficulty && type) {
      return challenge.difficulty === difficulty && challenge.type === type;
    }
    if (difficulty) {
      return challenge.difficulty === difficulty;
    }
    if (type) {
      return challenge.type === type;
    }
    return challenge;
  });

  return (
    <Flex p="100px" justify="center" w="100%">
      <Flex w="100% " maxW="1270px" flexDir="column" align="center" gap="10px">
        <Heading mb="40px">Lista de desafios</Heading>
        <Flex justify="start" w="100%" gap="20px">
          
          <FilterButton
            placeholder="Tipo"
            onChange={handleChangeType}
            options={["Léxico", "Sintático", "Semântico"]}
          />
          <FilterButton
            placeholder="Dificuldade"
            onChange={handleChangeDifficulty}
            options={["Fácil", "Médio", "Difícil"]}
          />
        </Flex>
        <Flex justify="start" w="100%" gap="8px">
          {difficulty && (
            <Tag borderRadius="full" display="inline-flex">
              {difficulty}
              <CloseButton
                size="sm"
                _hover={{ bg: "" }}
                onClick={clearDifficulties}
              />
            </Tag>
          )}
          {type && (
            <Tag borderRadius="full" display="inline-flex">
              {type}
              <CloseButton size="sm" _hover={{ bg: "" }} onClick={clearTypes} />
            </Tag>
          )}
        </Flex>
        <TableContainer
          border="1px"
          borderRadius="8px"
          borderColor="gray.200"
          w="100%"
        >
          <Table colorScheme="gray" variant="striped">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Dificuldade</Th>
                <Th>Tipo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((challenge) => (
                <Tr key={challenge.title}>
                  <Td>
                    <Link href={`/desafios/${stringToSlug(challenge.title)}`}>
                      <Text _hover={{ color: "purple.500" }}>
                        {challenge.title}
                      </Text>
                    </Link>
                  </Td>
                  <Td>{challenge.difficulty}</Td>
                  <Td>{challenge.type}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}
export default Challenges;
