import { Flex, Heading, Text } from "@chakra-ui/react";

function About() {
  return (
    <Flex
      w="100%"
      mt="100px"
      flexDir="column"
      align="center"
      gap="30px"
      px="100px"
    >
      <Heading>Sobre</Heading>
      <Text fontSize="24px" fontWeight={300}>
        Essa plataforma foi desenvolvida pelos alunos do programa de Monitoria
        de Algoritmos e Programação do curso de Engenharia de Computação da
        Universidade Estadual de Feira de Santana - UEFS.
      </Text>
    </Flex>
  );
}
export default About;
