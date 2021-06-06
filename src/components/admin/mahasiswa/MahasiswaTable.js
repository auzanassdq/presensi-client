import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { useSortBy, useTable } from 'react-table';
import { getAllMahasiswa } from '../../../redux/actions/mahasiswaAction';
import AlertDelete from '../AlertDelete';
import HeadContent from '../HeadContent';
import FormModal from './MahasiswaModalForm';
import TableBase from '../TableBase';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function MahasiswaTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const [data, setData] = useState({});
  const { allMahasiswa, mahasiswa } = useSelector(state => state.mahasiswaReducer);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // colomn table
  const [columns] = useState([
    { Header: 'NIM', accessor: 'nim' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Jurusan', accessor: 'jurusan' },
    { Header: 'Angkatan', accessor: 'angkatan' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]);

  // row table
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data: allMahasiswa,
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);

  const editHandler = matkul => {
    setData(matkul);
    onOpen();
  };

  const deleteHandler = matkul => {
    setData(matkul);
    setIsOpenAlert(!isOpenAlert);
  };

  useEffect(() => {
    dispatch(getAllMahasiswa());
  }, [dispatch, mahasiswa]);

  return (
    <>
      <HeadContent title="Mahasiswa" setData={setData} onOpen={onOpen} />

      {/* Modal */}
      <FormModal isOpen={isOpen} onClose={onClose} data={data} />
      <AlertDelete
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        cancelRef={cancelRefAlert}
        data={data}
        topic="mahasiswa"
      />

      {/* Table */}
      <TableBase tableHead={{ headers, getTableProps }}>
        <Tbody {...getTableBodyProps()}>
          {firstPageRows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  switch (cell.column.Header) {
                    case 'Opsi':
                      return (
                        <Td {...cell.getCellProps()} pt="1" pb="1">
                          <Menu>
                            <MenuButton
                              colorScheme="blue"
                              size="sm"
                              as={Button}
                            >
                              Opsi
                            </MenuButton>
                            <MenuList minWidth="1">
                              <MenuItem
                                icon={<EditIcon />}
                                onClick={() => editHandler(cell.row.original)}
                              >
                                Ubah
                              </MenuItem>
                              <MenuItem
                                icon={<DeleteIcon />}
                                onClick={() => deleteHandler(cell.row.original)}
                              >
                                Hapus
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      );
                    default:
                      return (
                        <Td {...cell.getCellProps()} fontSize="sm">
                          {cell.render('Cell')}
                        </Td>
                      );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </TableBase>
    </>
  );
}
