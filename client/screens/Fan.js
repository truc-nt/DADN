import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";
import { useGetAll } from '../hooks/useDevice';

const Fan = ({navigation}) => {
  const {list, type} = useGetAll("fan")
  
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <OnOffDevice list = {list} type = {type}/>
  )
}

export default Fan