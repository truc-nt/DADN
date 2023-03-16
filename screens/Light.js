import React, { useLayoutEffect } from 'react';
import OnOffDevice from "../components/OnOffDevice";
import { useNavigation } from '@react-navigation/native';

const Light = () => {
  const navigation = useNavigation();
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