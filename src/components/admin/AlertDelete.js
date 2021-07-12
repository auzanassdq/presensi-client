import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function AlertDelete({
  isOpen,
  cancelRef,
  onClose,
  data,
  handleDelete,
}) {
  const dispatch = useDispatch();

  const toast = useToast();

  const handleSubmit = () => {
    dispatch(handleDelete(data._id))
      .then(() => {
        onClose();
        toast({
          title: 'Berhasil di Hapus',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        onClose();
        toast({
          title: 'Gagal Di Hapus',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
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
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="red" onClick={handleSubmit} ml={3}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
