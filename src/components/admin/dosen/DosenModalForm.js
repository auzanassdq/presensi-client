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

export default function FormModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();

  const toast = useToast();
  // const [startDate, setStartDate] = useState();

  const [dosenInput, setDosenInput] = useState({
    nidn: '',
    nama: '',
    email: '',
    password: '',
    username: '',
  });

  useEffect(() => {
    if (data.nidn) {
      setDosenInput({
        nidn: data.nidn,
        nama: data.nama,
        email: data.email,
        username: data.username,
        password: "",
      });
    }

    if (!isOpen) {
      setDosenInput({
        nidn: '',
        nama: '',
        email: '',
        password: '',
        username: '',
      });
    }
  }, [dispatch, data, isOpen]);

  console.log(isOpen);
  // console.log("startDate", startDate);
  // console.log("jadwal", data.jadwal);

  const handleChange = e => {
    setDosenInput({
      ...dosenInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (data.nidn) {
      console.log("yess");
      dispatch(editDosen(dosenInput, data._id))
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
      dispatch(createDosen(dosenInput))
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
        <ModalHeader>Buat Dosen Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              variant="filled"
              placeholder="NIDN Dosen"
              name="nidn"
              value={dosenInput.nidn}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Nama Dosen"
              name="nama"
              value={dosenInput.nama}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Email Dosen"
              name="email"
              value={dosenInput.email}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Username Dosen"
              name="username"
              value={dosenInput.username}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Password Dosen"
              name="password"
              value={dosenInput.password}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

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
