import { List } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPertemuanByMatkul } from '../redux/actions/pertemuanAction';
import PertemuanItem from './PertemuanItem';

export default function ListPertemuan({ matkulId, onOpen }) {
  const dispatch = useDispatch();

  const pertemuan = useSelector(
    state => state.pertemuanReducer.pertemuanByMatkul
  );
  const { userId } = useSelector(state => state.userReducer);
  const { kehadiran } = useSelector(state => state.kehadiranReducer);

  // console.log(pertemuan);
  useEffect(() => {
    dispatch(getPertemuanByMatkul(matkulId, userId));
  }, [dispatch, kehadiran, matkulId, userId]);

  return (
    <List mt={5} pl="auto" pr="auto">
      {pertemuan &&
        pertemuan.map((item, index) => (
          <PertemuanItem
            key={index}
            pertemuan={item}
            onOpen={onOpen}
            lastItem={pertemuan.length - 1 === index ? true : false}
          />
        ))}
    </List>
  );
}
