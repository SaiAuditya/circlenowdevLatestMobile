import TopNavigations from '../TopNavigations/TopNavigations'
import React from 'react';
import { View, useWindowDimensions, SafeAreaView } from 'react-native';
import TopBanner from '../TopBanner/TopBanner'



const CHomePage = () => {
    return (
        <>
            <View style={{ zIndex: 1, backgroundColor: 'white' }}>
                <TopBanner></TopBanner>
            </View>
            <View style={{ zIndex: -1, backgroundColor: 'white', marginBottom: 0 }}>
                <TopNavigations></TopNavigations>
            </View>
        </>

    )
}

export default CHomePage
