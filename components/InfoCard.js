import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Image, Text } from 'react-native'

import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../assets/constants'

import { RectButton, CircleButton } from './Button'
import { SubInfo, Title, Alerts, Messages } from './SubInfo'

const InfoCard = ({ data }) => {
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.small,
            margin: SIZES.base,
            height: 70,
            ...SHADOWS.dark
        }}>
            <View style={{ padding: SIZES.font, justifyContent: 'center', alignItems: 'center' }}>
                <Title title={data.title} subTitle={data.subTitle} titleSize={SIZES.large} subtitleSize={SIZES.small}></Title>
                <View style={{ marginTop: SIZES.font, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                </View>
            </View>
        </View>
    )
}

export default InfoCard
