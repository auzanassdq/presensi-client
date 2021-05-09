import { ListItem } from '@chakra-ui/layout';

const MenuItem = ({text}) => {
  return (
    <ListItem
      p="1"
      rounded="5"
      width="200px"
      fontSize="xs"
      cursor="pointer"
      _hover={{ bg: 'gray.600' }}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      // {...props}
    >
      {text}
    </ListItem>
  )
}

export default MenuItem;