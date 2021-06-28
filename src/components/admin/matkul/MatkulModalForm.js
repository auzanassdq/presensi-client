import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
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
  FormLabel,
  Select,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';

import { createMatkul, editMatkul } from '../../../redux/actions/matkulAction';
import { getAllDosen } from '../../../redux/actions/dosenAction';

const StyledaDatepicker = chakra(DatePicker);

export default function FormModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();
  const { allDosen } = useSelector(state => state.dosenReducer);

  const toast = useToast();
  const [startDate, setStartDate] = useState();

  const [matkulInput, setMatkulInput] = useState({
    kode: '',
    nama: '',
    dosen: '',
    sks: '',
    semester: '',
  });

  useEffect(() => {
    dispatch(getAllDosen());

    console.log(data);

    if (data.kode) {
      setMatkulInput({
        kode: data.kode,
        nama: data.nama,
        dosen: data.dosen._id,
        sks: data.sks,
        semester: data.semester,
      });
      setStartDate(new Date(data.jadwal));
    }

    if (!isOpen) {
      setMatkulInput({
        kode: '',
        nama: '',
        dosen: '',
        sks: '',
        semester: '',
      });
      setStartDate();
    }
  }, [dispatch, data, isOpen]);

  console.log(isOpen);
  // console.log("startDate", startDate);
  // console.log("jadwal", data.jadwal);

  const handleChange = e => {
    setMatkulInput({
      ...matkulInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let newData = {
      ...matkulInput,
      jadwal: startDate,
    };

    console.log(newData);

    if (data) {
      dispatch(editMatkul(newData, data._id))
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
      dispatch(createMatkul(newData))
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
        <ModalHeader>Buat Matkul Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Kode</FormLabel>
            <Input
              variant="filled"
              placeholder="Kode Matkul"
              name="kode"
              value={matkulInput.kode}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nama</FormLabel>
            <Input
              variant="filled"
              placeholder="Nama Matkul"
              name="nama"
              value={matkulInput.nama}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Dosen</FormLabel>
            <Select name="dosen" placeholder="Dosen" variant="filled" value={matkulInput.dosen}
              onChange={handleChange}>
              {allDosen.map(item => (
                <option value={item._id}>{item.nama}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>SKS</FormLabel>
            <NumberInput variant="filled" value={matkulInput.sks}>
              <NumberInputField
                placeholder="jumlah sks"
                name="sks"
                onChange={handleChange}
              />
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Semester</FormLabel>
            <NumberInput variant="filled" value={matkulInput.semester}>
              <NumberInputField
                placeholder="semester"
                name="semester"
                onChange={handleChange}
              />
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Jadwal</FormLabel>

            <Box>
              <StyledaDatepicker
                w="100%"
                bg="gray.600"
                p="2"
                name="jadwal"
                rounded="5px"
                color="gray.200"
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d yyyy, kk:mm"
                placeholderText="Pilih Jadwal"
              />
            </Box>
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
