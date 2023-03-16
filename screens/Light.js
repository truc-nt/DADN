import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";

const Light = ({navigation}) => {
  
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <OnOffDevice light />
  )
}

export default Light