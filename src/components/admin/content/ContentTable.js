import { Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import { getAllDosen } from '../../../redux/actions/dosenAction';
import AlertDelete from '../AlertDelete';
import HeadContent from '../HeadContent';
import FormModal from './FormModal';
import TableBase from '../TableBase';
import OptionMenu from '../OptionMenu';
import { tableColumn } from '../../../utilities/tableData';
import { getAllMahasiswa } from '../../../redux/actions/mahasiswaAction';

function useGetContent(content) {
  const { allDosen, dosen } = useSelector(state => state.dosenReducer);
  const { allMahasiswa, mahasiswa } = useSelector(
    state => state.mahasiswaReducer
  );
  let allData, data;

  switch (content) {
    case 'dosen':
      allData = allDosen;
      data = dosen;
      break;
    case 'mahasiswa':
      allData = allMahasiswa;
      data = mahasiswa;
      break;
    default:
      break;
  }

  return { allData, data };
}

export default function ContentTable({ content }) {
  const dispatch = useDispatch();

  const [dataItem, setDataItem] = useState({});
  const { allData, data } = useGetContent(content);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRefAlert = useRef();

  // row table
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns: tableColumn[content],
        data: allData,
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);

  const editHandler = item => {
    setDataItem(item);
    onOpen();
  };

  const deleteHandler = item => {
    setDataItem(item);
    setIsOpenAlert(!isOpenAlert);
  };

  useEffect(() => {
    switch (content) {
      case 'dosen':
        dispatch(getAllDosen());
        break;
      case 'mahasiswa':
        dispatch(getAllMahasiswa());
        break;
      default:
        break;
    }
  }, [dispatch, data, content]);

  return (
    <>
      <HeadContent title={content} setData={setDataItem} onOpen={onOpen} />

      {/* Modal */}
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        data={dataItem}
        content={content}
      />
      <AlertDelete
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        cancelRef={cancelRefAlert}
        data={dataItem}
        topic="dosen"
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
