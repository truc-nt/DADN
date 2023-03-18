import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import OnOffDeviceDetail from '../components/OnOffDeviceDetail'

const FanItemDetail = (route) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions({
      headerShown: false,
    })
  }, [])
  const {id} = route.params

  return (
    <OnOffDeviceDetail fan id={parseInt(JSON.stringify(id))}/>
  )
}

export default FanItemDetail