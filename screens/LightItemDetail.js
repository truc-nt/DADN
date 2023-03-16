import React, { useLayoutEffect } from 'react';
import OnOffDeviceDetail from '../components/OnOffDeviceDetail'

const LightItemDetail = ({route, navigation}) => {
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])
  const {id} = route.params

  return (
    <OnOffDeviceDetail light id={parseInt(JSON.stringify(id))}/>
  )
}

export default LightItemDetail