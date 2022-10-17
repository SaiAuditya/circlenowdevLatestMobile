import React from 'react'
import { View, Text, Image } from 'react-native'
import { SIZES, FONTS, SHADOWS, COLORS, assets } from '../assets/constants'

export const Title = ({ title, subTitle, titleSize, subTitleSize }) => {
    return (
        <View>
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: titleSize }}>{title}</Text>
            <Text style={{ fontFamily: FONTS.regular, fontSize: subTitleSize }}>{subTitle}</Text>
        </View>
    )
}

export const Alerts = ({ count }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={assets.alert} style={{ width: 20, height: 20, marginRight: 1 }} resizeMode='contain' />
            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font, color: COLORS.primary, marginRight: 4 }}>{count}</Text>
        </View>
    )
}


export const Messages = ({ count }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={assets.messages} style={{ width: 20, height: 20, marginRight: 2 }} resizeMode='contain' />
            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font, color: COLORS.primary }}>{count}</Text>
        </View>
    )
}

export const ImageCmp = ({ imgUrl, index }) => {
    return (
        <Image
            source={imgUrl}
            resizeMode='contain'
            style={{
                width: 48,
                height: 48,
                marginLeft: index == 0 ? 0 : -SIZES.font
            }} />

    )
}

export const Members = () => {
    return (
        <View
            style={{
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                ...SHADOWS.light,
                elevation: 1,
                maxWidth: '50%'
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.small,
                    color: COLORS.primary
                }}
            >Members</Text>

            <Text
                style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.medium,
                    color: COLORS.primary
                }}
            >256</Text>
        </View>
    )
}

export const People = () => {
    return (
        <View style={{ flexDirection: "row" }}>
            {[assets.person01, assets.person02, assets.person03]
                .map((imgUrl, index) => <ImageCmp imgUrl={imgUrl} index={index} key={`people - ${index}`} />)}
        </View>
    )
}

export const SubInfo = () => {
    return (
        <View style={{
            width: '100%',
            paddingHorizontal: SIZES.font,
            marginTop: -SIZES.extraLarge,
            flexDirection: "row",
            justifyContent: 'flex-end'
        }}>
            <Members></Members>
        </View>
    )
}

/*
            <People></People>
            <EndDate></EndDate>
*/


export default SubInfo
