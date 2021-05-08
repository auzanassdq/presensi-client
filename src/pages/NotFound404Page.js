import { Center, Flex, Heading, Stack } from '@chakra-ui/layout';

export function NotFound404Page() {
  return (
    <Center pt="300px">
      <Flex direction="column" alignItems="center">
        <Heading>404</Heading>
        <Heading>Not Found</Heading>
      </Flex>
    </Center>
  );
}
