import { useColorModeValue } from '@chakra-ui/color-mode';

export default function Color() {
  const cardBg = useColorModeValue('gray.200', 'gray.700');

  const netralColor = useColorModeValue('gray.100', 'gray.900');
  const textNetralColor = useColorModeValue('gray.500', 'gray.500');

  const checkColor = useColorModeValue('blue.100', 'blue.900');
  const textCheckColor = useColorModeValue('blue.500', 'blue.500');

  const unCheckColor = useColorModeValue('pink.100', 'pink.900');
  const textUnCheckColor = useColorModeValue('pink.500', 'pink.500');

  return {
    cardBg,
    netralColor,
    textNetralColor,
    checkColor,
    textCheckColor,
    unCheckColor,
    textUnCheckColor
  }
}
