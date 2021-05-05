

//   let userRegex = /u/
//   let passRegex = /p/
//   if (e.target.name == "username") {
//     if (userRegex.test(e.target.value)) {
//       setErrMessage({...errMessage, username: ""})
//       setLolos(true)
//     } else {
//       setErrMessage({...errMessage, username: "ga sesuai pola, harus depannya u"})
//     }
//   } else if (e.target.name == "password") {
//     if (passRegex.test(e.target.value)) {
//       setErrMessage({...errMessage, password: ""})
//     } else {
//       setErrMessage({...errMessage, password: "ga sesuai pola, harus depannya p"})
//     }
//   }
// }

import {useState} from 'react'
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Flex, 
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../redux/actions/userAction'

function Login() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)
  const [userLogin, setUserLogin] = useState({ username: "", password: "" })
  const [show, setShow] = useState(false)
  const fromBg = useColorModeValue("gray.200", "gray.700");


  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(userLogin))
  }

  return (
    <Flex justifyContent="center">
      <Flex direction="column" bg={fromBg} rounded={10} p={12}>
      <Heading mb={6} textAlign="center">LOGIN</Heading>
      <Input
        mb={2}
        variant="filled"
        placeholder="Masukkan Username" 
        type="text" 
        name="username" 
        id="username" 
        value={userLogin.username} 
        onChange={handleChange}/>
      <InputGroup size="md" mb={4}>
        <Input
          pr="4.5rem"
          variant="filled"
          type={show ? "text" : "password"}
          placeholder="Masukkan Password"
          name="password" 
          id="password" 
          value={userLogin.password} 
          onChange={handleChange}
        />
        <InputRightElement>
          <IconButton icon={show? <ViewIcon/> : <ViewOffIcon/>} h="1.75rem" size="sm" onClick={() => setShow(!show)} />
        </InputRightElement>
      </InputGroup>
      { user.isLoading ? 
        <Button isLoading loadingText="Login" colorScheme="blue">Login</Button> : 
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      }
      </Flex>
    </Flex>
  )
}

export default Login