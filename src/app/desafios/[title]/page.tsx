"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonText,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import FeedbackModal from "./FeedbackModal";

async function getChallengeData(title: string) {
  const response = await fetch(`/api/challenges/${title}`);
  const data = await response.json();
  return data;
}

/**
 * Renders a challenges page.
 * @returns Challenges component.
 */
function Challenge({ params }: { params: { title: string } }) {
  const [data, setData] = useState<ChallengeType | null>(null);
  const [answer, setAnswer] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      const challengeData = await getChallengeData(params.title);
      setData(challengeData);
    }
    fetchData();
  }, [params.title]);

  return (
    <Flex p="100px" justify="center" w="100%">
      <Flex w="100% " maxW="870px" flexDir="column" align="center" gap="30px">
        <Skeleton height="60px" isLoaded={!!data}>
          <Heading>{data?.title || "Title of the Challenge"}</Heading>
        </Skeleton>
        <SkeletonText noOfLines={5} isLoaded={!!data} spacing="4">
          <Heading size="md" fontWeight={400} textAlign="justify">
            {data?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore architecto velit, magni rem obcaecati alias necessitatibus doloribus aut ex. Quam dignissimos labore facere. Veritatis quod quas voluptate in optio!"}
          </Heading>
        </SkeletonText>
        <Skeleton isLoaded={!!data} w="100%" h={data ? "auto" : "600px"}>
          {(
            <CodeBlock
              text={data?.code}
              language="javascript"
              showLineNumbers
              theme={dracula}
            />
          ) || <Box boxSize={500} />}
        </Skeleton>
        <RadioGroup w="100%" onChange={setAnswer} value={answer}>
          <Stack spacing={4} w="100%">
            {data?.alternatives.map((alternative, index) => {
              return (
                <Radio key={alternative} value={String(index + 1)} size="lg">
                  {index + 1} - {alternative}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
        <Flex>
          <Button colorScheme="purple" onClick={() => onOpen()}>
            Responder
          </Button>
          {data && (
            <FeedbackModal
              isOpen={isOpen}
              onClose={onClose}
              answer={answer}
              correctAnswer={String(data.answer_alternative)}
              correctAnswerText={data.alternatives[data.answer_alternative - 1]}
              description={data.answer_description}
              nextQuestionId={data.id + 1}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Challenge;
