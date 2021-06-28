import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export default function ModalDelete({ isOpen, onClose, data, handleSubmit }) {
  return (
    <AlertDialog
      isOpen={isOpen}
      // leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Hapus {data.nama}
          </AlertDialogHeader>

          <AlertDialogBody>
            Yakin? Setelah dihapus ga bisa di kembalikan ya!
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // ref={cancelRef}
              onClick={handleSubmit}
            >
              Hapus
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Batal
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
