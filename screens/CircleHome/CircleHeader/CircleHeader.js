
import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../assets/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const CircleHeader = () => {
    const dimentions = useWindowDimensions()
    return (
        <View style={{ width: dimentions.width, height: 100, ...SHADOWS.dark, backgroundColor: COLORS.white, marginTop: 20 }}>
            <View style={{ width: dimentions.width, height: 60, backgroundColor: COLORS.gray, flexDirection: 'row' }}>

                <View style={{ width: 70, height: 70, backgroundColor: COLORS.primary, marginLeft: 10, marginBottom: -20, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', height: '100%', width: '100%', marginTop: 50, color: COLORS.white, fontFamily: FONTS.bold }}>SL</Text>
                </View>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <Text style={{ color: COLORS.white, fontFamily: FONTS.regular }}>SSL Infra</Text>
                    <Text style={{ color: COLORS.white, fontFamily: FONTS.light }}>This is the small group</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 5, marginLeft: 100 }}>
                    <Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}>6</Text>
                    <Text style={{ color: COLORS.black, fontFamily: FONTS.medium, marginLeft: 0, marginRight: 5 }}>P</Text>
                </View>
                <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}>10</Text>
                    <Text style={{ color: COLORS.black, fontFamily: FONTS.medium, marginLeft: 0, marginRight: 5 }}>M</Text>
                </View>
                <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}>10</Text>
                    <Text style={{ color: COLORS.black, fontFamily: FONTS.medium, marginLeft: 0 }}>F</Text>
                </View>
                <View style={{ marginTop: 2, marginLeft: 35, flexDirection: 'row', backgroundColor: COLORS.primary, justifyContent: 'center' }}>
                    <Icon name='send-o' size={20} color={COLORS.white} style={{ marginTop: 5, marginLeft: 5 }} />
                    <Text style={{ marginTop: 10, marginLeft: 5, marginRight: 5, color: COLORS.white, fontFamily: FONTS.semiBold }}>Invite</Text>
                </View>
            </View>
        </View>
    )
}

export default CircleHeader
