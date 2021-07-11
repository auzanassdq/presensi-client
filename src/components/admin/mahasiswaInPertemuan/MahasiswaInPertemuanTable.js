import {
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tbody,
  Td,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useSortBy, useTable } from 'react-table';
import moment from 'moment';

import { getKehadiranPertemuan, editKehadiran } from '../../../redux/actions/kehadiranAction';
import AlertDelete from '../AlertDelete';
import HeadContent from '../HeadContent';
import TableBase from '../TableBase';

export default function MahasiswaInPertemuanTable() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { pertemuanId } = useParams();
  // const { url } = useRouteMatch();

  const toast = useToast();
  const [data, setData] = useState({});
  const { kehadiranByPertemuan, kehadiran } = useSelector(state => state.kehadiranReducer);
  console.log(kehadiranByPertemuan);

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // colomn table
  const [columns] = useState([
    { Header: 'NIM', accessor: 'mahasiswa.nim' },
    { Header: 'Nama', accessor: 'mahasiswa.nama' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'CheckIn', accessor: 'checkIn' },
  ]);

  // row table
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data: kehadiranByPertemuan || [],
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);

  const editHandler = (kehadiranId, status) => {
    let data = {
      status,
      checkIn: Date.now()
    }
    
    dispatch(editKehadiran(kehadiranId, data))
    .then(() => {
      toast({
        title: 'Berhasil di Edit',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
    .catch(err => {
      toast({
        title: 'Gagal Di Edit',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    // dispatch(getAllMahasiswa());
    dispatch(getKehadiranPertemuan(pertemuanId));
  }, [dispatch, pertemuanId, kehadiran]);

  return (
    <>
      <HeadContent title="Kehadiran" setData={setData} />

      {/* Modal */}
      {/* <FormModal isOpen={isOpen} onClose={onClose} data={data} /> */}
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
                    // case 'Nim':
                    //   return (
                    //     <Td {...cell.getCellProps()} pt="1" pb="1">
                    //       {cell.value.nim}
                    //     </Td>
                    //   );
                    case 'CheckIn':
                      return (
                        <Td {...cell.getCellProps()} pt="1" pb="1">
                          {cell.row.original.status ? 
                          moment(cell.value).format('dddd, DD-MMM-YYYY, kk:mm')
                          // cell.render('Cell') 
                          : "-"}
                        </Td>
                      );
                      case 'Status':
                        return (
                          <Td {...cell.getCellProps()} 
                          pt="1" pb="1"
                          >
                            <Menu>
                            <MenuButton
                              colorScheme={cell.value ? "green" : "red"}
                              size="sm"
                              as={Badge}
                            >
                              {cell.value ? "Hadir" : "Tidak"}
                            </MenuButton>
                            <MenuList minWidth="1">
                              <MenuItem
                                onClick={() => editHandler(cell.row.original._id, true)}
                              >
                                Hadir
                              </MenuItem>
                              <MenuItem
                                onClick={() => editHandler(cell.row.original._id, false)}
                              >
                                Tidak
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
