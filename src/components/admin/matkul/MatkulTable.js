import { useEffect, useState, useRef } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Tbody,
  Tr,
  Td,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { getAllMatkul } from '../../../redux/actions/matkulAction';

import FormModal from './MatkulModalForm';
import TableBase from '../TableBase';
import AlertDelete from '../AlertDelete';
import HeadContent from '../HeadContent';

export default function MatkulTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const [data, setData] = useState({});
  const { allMatkul, matkul } = useSelector(state => state.matkulReducer);
  const { userId, role } = useSelector(state => state.userReducer);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // colomn table
  const [columns] = useState([
    { Header: 'Kode', accessor: 'kode' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Dosen', accessor: 'dosen' },
    { Header: 'Jadwal', accessor: 'jadwal' },
    { Header: 'SKS', accessor: 'sks' },
    { Header: 'Semester', accessor: 'semester' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]);

  // row table
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data:  allMatkul,
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);

  const lihatPertemuan = matkul => {
    console.log(matkul);
    history.push(`${url}/${matkul._id}`);
  };

  const editHandler = matkul => {
    setData(matkul);
    onOpen();
  };

  const deleteHandler = matkul => {
    setData(matkul);
    setIsOpenAlert(!isOpenAlert);
  };

  useEffect(() => {
    dispatch(getAllMatkul('', {userId, role}));
  }, [dispatch, matkul, role, userId]);

  return (
    <>
      <HeadContent title="Matkul" setData={setData} onOpen={onOpen} />

      {/* Modal */}
      <FormModal isOpen={isOpen} onClose={onClose} data={data} />
      <AlertDelete
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        cancelRef={cancelRefAlert}
        data={data}
        topic="matkul"
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
                    case 'Jadwal':
                      return (
                        <Td {...cell.getCellProps()} fontSize="sm">
                          {moment(cell.value).format('dddd, kk:mm')}
                        </Td>
                      );
                    default:
                      return (
                        <Td
                          {...cell.getCellProps()}
                          fontSize="sm"
                          onClick={() => lihatPertemuan(row.original)}
                        >
                          {cell.value.nama || cell.value}
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
