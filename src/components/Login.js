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

import { useState } from 'react';
import { useFormik } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Flex,
  IconButton,
} from '@chakra-ui/react';

import { login } from '../redux/actions/userAction';
import CardForm from './CardForm';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const [show, setShow] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validate,
    onSubmit: values => {
      console.log(values);
      dispatch(login(values));
    },
  });

  return (
    <Flex justifyContent="center" mt="100px">
      <CardForm>
        <Heading mb={6} textAlign="center">
          LOGIN
        </Heading>
        <Input
          mb={2}
          variant="filled"
          placeholder="Masukkan Username"
          type="text"
          name="username"
          id="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <InputGroup size="md" mb={4}>
          <Input
            pr="4.5rem"
            variant="filled"
            type={show ? 'text' : 'password'}
            placeholder="Masukkan Password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <InputRightElement>
            <IconButton
              icon={show ? <ViewIcon /> : <ViewOffIcon />}
              h="1.75rem"
              size="sm"
              onClick={() => setShow(!show)}
            />
          </InputRightElement>
        </InputGroup>
        {user.isLoading ? (
          <Button isLoading loadingText="Login" colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={formik.handleSubmit}>
            Login
          </Button>
        )}
      </CardForm>
    </Flex>
  );
}

export default Login;
