import { Button } from '@chakra-ui/button'
import { ModalCloseButton,ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Modal } from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkInKehadiran, getKehadiranSuccess } from '../redux/actions/kehadiranAction'

export default function ScanModal({isOpen, onClose, pertemuan}) {
  const dispatch = useDispatch()
  const toast = useToast()
  const {userId} = useSelector(state => state.userReducer)
  const [dataCheckIn] = useState({mahasiswa: userId, pertemuan});

  const handleSubmit = () => {
    dispatch(checkInKehadiran(dataCheckIn))
    .then(result => {
      dispatch(getKehadiranSuccess(result))
      toast({
        title: "Berhasil CheckIn",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }).catch(error => {
      toast({
        title: "Gagal CheckIn",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{pertemuan.nama}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          TEss
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr="auto" ml="auto" onClick={handleSubmit}>
            Hadir
          </Button>
        </ModalFooter>
      </ModalContent>
  </Modal>
  )
}
