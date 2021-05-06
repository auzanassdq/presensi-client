import { List } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPertemuanByMatkul } from '../redux/actions/pertemuanAction';
import PertemuanItem from './PertemuanItem';

export default function ListPertemuan({ matkulId }) {
  const dispatch = useDispatch();

  const pertemuan = useSelector(
    state => state.pertemuanReducer.pertemuanByMatkul
  );

  useEffect(() => {
    dispatch(getPertemuanByMatkul(matkulId));
  }, [dispatch, matkulId]);

  return (
    <List mt={5}>
      {pertemuan &&
        pertemuan.map((item, index) => (
          <PertemuanItem
            key={index}
            pertemuan={item}
            lastItem={pertemuan.length - 1 === index ? true : false}
          />
        ))}
    </List>
  );
}
