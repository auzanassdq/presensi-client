import { Button } from '@chakra-ui/button'
import { ModalCloseButton,ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Modal } from '@chakra-ui/modal'
import axios from 'axios'
import React from 'react'

export default function ScanModal({isOpen, onClose}) {

  const handleSubmit = () => {
    // axios.put
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pemindai Wajah</ModalHeader>
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
