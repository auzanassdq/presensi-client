import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { NumberInput, NumberInputField } from '@chakra-ui/number-input'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createMatkul } from '../redux/actions/matkulAction'

export default function FormModal({isOpen, onClose}) {
  const dispatch = useDispatch()
  const [matkulInput, setMatkulInput] = useState({
    kode: "",
    nama: "Struktur Dasar Algortima",
    sks: 0,
    semester: 0
  })

  const handleChange = (e) => {
    setMatkulInput({
      ...matkulInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(matkulInput);
    dispatch(createMatkul(matkulInput))
  }

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Matkul Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Kode Matkul</FormLabel>
              <Input placeholder="Kode Matkul" name="kode" onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nama Matkul</FormLabel>
              <Input placeholder="Nama Matkul" name="nama" onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Jumlah SKS</FormLabel>
              <NumberInput><NumberInputField placeholder="0" name="sks" onChange={handleChange}/></NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Semester</FormLabel>
              <NumberInput><NumberInputField placeholder="0" name="semester" onChange={handleChange}/></NumberInput>
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
  )
}
