
import React from 'react';
import { View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { SHADOWS, assets } from '../assets/constants';
import { Image } from 'react-native-elements'


const LogoText = () => {

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', marginBottom: -10, borderWidth: 0, border: 'none', ...SHADOWS.dark }}>
            <Image source={assets.logo} resizeMode='contain' resizeMethod='scale' style={{ flex: 1, alignContent: 'space-between', justifyContent: 'center', height: 100, width: 300, marginTop: 100 }} PlaceholderContent={<ActivityIndicator />} />
        </View>
    )

}

export default LogoText