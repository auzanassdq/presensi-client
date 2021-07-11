import { useEffect, useState, useRef } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useParams, useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { getMatkulByID } from '../../../redux/actions/matkulAction';
import { getPertemuanByMatkul } from '../../../redux/actions/pertemuanAction';

import TableBase from '../TableBase';
import HeadContent from '../HeadContent';
import AlertDelete from '../AlertDelete';
import FormModal from './PertemuanModalForm';

export default function PertemuanTable() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { matkulId } = useParams();

  const { pertemuanByMatkul, pertemuan } = useSelector(
    state => state.pertemuanReducer
  );

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({});

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // colomn table
  const [columns] = useState([
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Jadwal', accessor: 'jadwal' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data: pertemuanByMatkul,
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);

  useEffect(() => {
    dispatch(getPertemuanByMatkul(matkulId));
    dispatch(getMatkulByID(matkulId));
  }, [dispatch, matkulId, pertemuan]);

  const editHandler = pertemuan => {
    setData(pertemuan);
    onOpen();
  };

  const deleteHandler = pertemuan => {
    setData(pertemuan);
    setIsOpenAlert(!isOpenAlert);
  };

  const lihatKehadiran = (pertemuan) => {
    console.log(pertemuan);
    history.push(`${url}/${pertemuan._id}`);
  }

  return (
    <>
      <HeadContent title="Pertemuan" setData={setData} onOpen={onOpen} />

      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        matkulId={matkulId}
      />
      <AlertDelete
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        cancelRef={cancelRefAlert}
        data={data}
        topic="pertemuan"
      />

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
                          {moment(cell.value).format(
                            'dddd, DD MMMM YYYY, kk:mm'
                          )}
                        </Td>
                      );
                    default:
                      return (
                        <Td {...cell.getCellProps()} 
                        fontSize="sm"
                        onClick={() => lihatKehadiran(row.original)}
                        >
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
