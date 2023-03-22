import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";

import {useGetAll} from '../hooks/useDevice'

const Light = ({navigation}) => {
  const {list} = useGetAll("light")
  
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <OnOffDevice list = {list}/>
  )
}

export default Light