import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  chakra,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';

import {
  createMahasiswa,
  editMahasiswa,
} from '../../../redux/actions/mahasiswaAction';

export default function FormModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();

  const toast = useToast();

  const [mahasiswaInput, setMahasiswaInput] = useState({
    nim: '',
    nama: '',
    email: '',
    username: '',
    jurusan: '',
    angkatan: '',
    password: '',
  });

  useEffect(() => {
    if (data._id) {
      setMahasiswaInput({
        nim: data.nim,
        nama: data.nama,
        email: data.email,
        username: data.username,
        jurusan: data.jurusan,
        angkatan: data.angkatan,
        password: '',
      });
    }

    if (!isOpen) {
      setMahasiswaInput({
        nim: '',
        nama: '',
        email: '',
        username: '',
        jurusan: '',
        angkatan: '',
        password: '',
      });
    }
  }, [dispatch, data, isOpen]);

  console.log(isOpen);
  console.log(data);

  const handleChange = e => {
    setMahasiswaInput({
      ...mahasiswaInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (data.nim) {
      console.log('yess');
      dispatch(editMahasiswa(mahasiswaInput, data._id))
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
      dispatch(createMahasiswa(mahasiswaInput))
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

  console.log(mahasiswaInput);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buat Mahasiswa Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              variant="filled"
              placeholder="NIM Mahasiswa"
              name="nim"
              value={mahasiswaInput.nim}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Nama Mahasiswa"
              name="nama"
              value={mahasiswaInput.nama}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Email mahasiswa"
              name="email"
              value={mahasiswaInput.email}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Username mahasiswa"
              name="username"
              value={mahasiswaInput.username}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Jurusan mahasiswa"
              name="jurusan"
              value={mahasiswaInput.jurusan}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Angkatan mahasiswa"
              name="angkatan"
              value={mahasiswaInput.angkatan}
              onChange={handleChange}
            />
            {/* <FormLabel>Nama Matkul</FormLabel> */}
          </FormControl>

          <FormControl mt={4}>
            <Input
              variant="filled"
              placeholder="Password mahasiswa"
              name="password"
              value={mahasiswaInput.password}
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
