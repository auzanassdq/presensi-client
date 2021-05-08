import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'

export default function MenuDrawer({placement, onClose, isOpen}) {
  return (
    <Drawer mt="100px" placement={placement} onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
      <DrawerBody>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
}
