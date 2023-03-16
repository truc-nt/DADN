import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";

const Fan = ({navigation}) => {
  
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <OnOffDevice fan />
  )
}

export default Fan