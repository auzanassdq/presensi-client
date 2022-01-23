import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';

import { createDosen, editDosen } from '../../../redux/actions/dosenAction';
import {
  createMahasiswa,
  editMahasiswa,
} from '../../../redux/actions/mahasiswaAction';

import { listInput } from '../../../utilities/tableData';

function useDataAction(content) {
  let createData, editData;

  switch (content) {
    case 'dosen':
      createData = createDosen;
      editData = editDosen;
      break;
    case 'mahasiswa':
      createData = createMahasiswa;
      editData = editMahasiswa;
      break;
    default:
      break;
  }

  return { createData, editData };
}

export default function FormModal({ isOpen, onClose, data, content }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { createData, editData } = useDataAction(content);

  const [inputEmpty] = useState(listInput[content].reduce(
    (prev, item) => ({ ...prev, [item]: '' }),
    {}
  ))

  const [inputWithValue] = useState(listInput[content].reduce(
    (prev, item) => ({ ...prev, [item]: data[item] }),
    {}
  ))

  // const inputEmpty = listInput[content].reduce(
  //   (prev, item) => ({ ...prev, [item]: '' }),
  //   {}
  // );

  // const inputWithValue = listInput[content].reduce(
  //   (prev, item) => ({ ...prev, [item]: data[item] }),
  //   {}
  // );

  const [dataInput, setDataInput] = useState({ ...inputEmpty });

  useEffect(() => {
    if (data._id) {
      setDataInput({ ...inputWithValue, password: '' });
    }

    if (!isOpen) {
      setDataInput({ ...inputEmpty });
    }
  }, [dispatch, data, isOpen, inputEmpty, inputWithValue]);

  const handleChange = e => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (data._id) {
      console.log('yess');
      dispatch(editData(dataInput, data._id))
        .then(result => {
          onClose();
          toast({
            title: 'Berhasil di Edit',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(err => {
          onClose();
          toast({
            title: 'Gagal Di Edit',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      dispatch(createData(dataInput))
        .then(() => {
          onClose();
          toast({
            title: 'Berhasil dibuat',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          onClose();
          toast({
            title: 'Gagal dibuat',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Dosen</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {listInput[content].map(item => (
            <FormControl mb={4}>
              <Input
                variant="filled"
                placeholder={item}
                name={item}
                value={dataInput[item]}
                onChange={handleChange}
              />
            </FormControl>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Simpan
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
