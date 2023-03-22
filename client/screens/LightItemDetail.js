import React, { useLayoutEffect } from 'react';
import OnOffDeviceDetail from '../components/OnOffDeviceDetail'

const LightItemDetail = ({route, navigation}) => {
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])
  const {id, detail} = route.params

  return (
    <OnOffDeviceDetail light detail = {detail}/>
  )
}

export default LightItemDetail