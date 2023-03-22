import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";
import { useGetAll } from '../hooks/useDevice';

const Fan = ({navigation}) => {
  const {list} = useGetAll("fan")
  
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <OnOffDevice list = {list} />
  )
}

export default Fan