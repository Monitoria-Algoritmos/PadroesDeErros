import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import stringToSlug from "../../../../utils/slug";
import { useEffect, useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  answer: string;
  correctAnswer: string;
  correctAnswerText: string;
  description: string;
  nextQuestionId: number;
}

/**
 * Renders a feedback modal to explain the challenge to the user.
 * @returns FeedbackModal component.
 */
function FeedbackModal({
  isOpen,
  onClose,
  answer,
  correctAnswer,
  correctAnswerText,
  description,
  nextQuestionId,
}: FeedbackModalProps) {
  const [nextChallengeName, setNextChallengeName] = useState("");
  const isCorrect = answer === correctAnswer;

  useEffect(() => {
    async function fetchData() {
      const challengeData = await fetch(`/api/challenges/${nextQuestionId}`);
      const data: ChallengeType = await challengeData.json();
      setNextChallengeName(data.title);
    }
    fetchData();
  }, [nextQuestionId]);

  console.log(nextChallengeName);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalHeader>
          <Text color={isCorrect ? "green.500" : "red.500"}>
            Resposta {isCorrect ? " Correta" : " Incorreta"}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="15px">
            {!isCorrect && (
              <Text fontWeight={700}>
                Alternativa correta: <br />
                {correctAnswer} - {correctAnswerText}
              </Text>
            )}
            <Text textAlign="justify">{description}</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button as={Link} variant="ghost" mr={3} href="/desafios">
            Lista de desafios
          </Button>
          {nextChallengeName && (
            <Button
              as={Link}
              colorScheme="purple"
              href={`/desafios/${stringToSlug(nextChallengeName)}`}
            >
              Próxima Questão
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FeedbackModal;
