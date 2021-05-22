import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import {
  Box,
  Button,
  chakra,
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
import 'react-datepicker/dist/react-datepicker.css';

import {
  createPertemuan,
  editPertemuan,
} from '../../../redux/actions/pertemuanAction';

const StyledaDatepicker = chakra(DatePicker);

export default function FormModal({ isOpen, onClose, data, matkulId }) {
  const dispatch = useDispatch();

  const toast = useToast();
  const [startDate, setStartDate] = useState();

  const [pertemuanInput, setPertemuanInput] = useState({
    nama: '',
  });

  useEffect(() => {
    if (data._id) {
      setPertemuanInput({
        nama: data.nama,
      });
      setStartDate(new Date(data.jadwal));
    }

    if (!isOpen) {
      setPertemuanInput({
        nama: '',
      });
      setStartDate();
    }
  }, [dispatch, data, isOpen]);

  const handleChange = e => {
    setPertemuanInput({
      ...pertemuanInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let newData = {
      ...pertemuanInput,
      jadwal: startDate,
    };

    console.log(data);
    console.log(newData);

    if (data._id) {
      dispatch(editPertemuan(newData, data._id))
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
      newData = {
        ...pertemuanInput,
        matkul: matkulId,
        kehadiran: [],
        jadwal: startDate,
      };
      dispatch(createPertemuan(newData))
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
        <ModalHeader>Buat Pertemuan Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              variant="filled"
              placeholder="Nama Pertemuan"
              name="nama"
              value={pertemuanInput.nama}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <Box>
              <StyledaDatepicker
                w="100%"
                bg="gray.600"
                p="2"
                pl="4"
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
