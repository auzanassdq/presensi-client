import {
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import { getAllMahasiswa } from '../../../redux/actions/mahasiswaAction';
import AlertDelete from '../AlertDelete';
import HeadContent from '../HeadContent';
import FormModal from './MahasiswaModalForm';
import TableBase from '../TableBase';
import OptionMenu from '../OptionMenu';
import { tableColumn } from '../../../utilities/tableData';

export default function MahasiswaTable({content}) {
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const { allMahasiswa, mahasiswa } = useSelector(
    state => state.mahasiswaReducer
  );

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // colomn table
  const [columns] = useState(tableColumn[content]);

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

  const editHandler = item => {
    setData(item);
    onOpen();
  };

  const deleteHandler = item => {
    setData(item);
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
                          <OptionMenu
                            editHandler={() => editHandler(cell.row.original)}
                            deleteHandler={() =>
                              deleteHandler(cell.row.original)
                            }
                          />
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
