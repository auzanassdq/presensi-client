import { Box, Center, Heading } from "@chakra-ui/layout"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"

import { getMatkulByID } from '../redux/actions/matkulAction'

function Matkul() {
  const { idMatkul } = useParams()
  const dispatch = useDispatch()
  const { matkul } = useSelector(state => state.matkulReducer)

  useEffect(() => {
    dispatch(getMatkulByID(idMatkul))
  }, [dispatch, idMatkul])

  return (
    <Center p={2}>
      <Heading>{matkul.nama}</Heading>
      {/* <h3>{matkul.jadwal}</h3> */}
    </Center>
  )
}

export default Matkul