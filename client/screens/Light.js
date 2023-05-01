import React, { useLayoutEffect } from 'react';
import OnOffDevice from '../components/OnOffDevice';

import { useGetAll } from '../hooks/useDevice';

const Light = ({ navigation }) => {
    const { list, type } = useGetAll('light');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return list && <OnOffDevice list={list} type={type} />;
};

export default Light;
