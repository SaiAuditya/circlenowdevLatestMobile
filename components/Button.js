import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ColorPropType } from 'react-native'
import { COLORS, SIZES, FONTS, SHADOWS } from '../assets/constants'
import Icon from 'react-native-vector-icons/EvilIcons'

export const CircleButton = ({ imageUrl, handlePress, ...props }) => {

    return (
        <TouchableOpacity
            style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.white,
                position: 'absolute',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                ...SHADOWS.dark,
                ...props
            }}
            onPress={handlePress}
        >
            <Image source={{ uri: imageUrl }}
                resizeMode='contain'
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25
                }}
            />
        </TouchableOpacity>
    )
}
export const CircleButtonInitials = ({ handlePress, initials, ...props }) => {
    return (
        <TouchableOpacity
            style={{
                width: 45,
                height: 45,
                backgroundColor: COLORS.primary,
                //position: 'absolute',
                borderRadius: SIZES.extraLarge,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 5,
                ...SHADOWS.dark,
                ...props
            }}
            onPress={handlePress}
        >
            <Icon name='user' color={COLORS.white} size={50} style={{ marginRight: 0, marginTop: 5, marginLeft: -10 }} />
            <Text
                style={{
                    width: 20,
                    height: 20,
                    textAlign: 'justify',
                    color: COLORS.white,
                    marginBottom: 5,
                    marginLeft: -5
                }}
            >{initials}</Text>
        </TouchableOpacity>
    )
}

export const RectButton = ({ minWidth, fontSize, handlePress, name, ...props }) => {

    const styles = StyleSheet.create({

        buttonFormatSolid:
        {
            minWidth: 260,
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
            borderWidth: 1,
            //position: 'absolute',
            borderRadius: 2,
            marginTop: 15,
            marginLeft: 10,
            height: 40,
            padding: 10,
            marginRight: 15
        },
        textFormatLight:
        {
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.primary,
            textAlign: 'center',
            height: 30,
            justifyContent: 'center'

        },
        textFormatSolid:
        {
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.white,
            textAlign: 'center',
            height: 30,
            justifyContent: 'center'
        }
    });


    return (
        <TouchableOpacity
            color={COLORS.primary}
            borderColor={COLORS.primary}
            onPress={handlePress}
            style={styles.buttonFormatSolid}
            onPressIn={handlePress}
        >
            <Text style={styles.textFormatSolid}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export const RectButtonCustomWhite = ({ minWidth, fontSize, handlePress, name, props }) => {
    return (
        <TouchableOpacity
            style={{
                minWidth: minWidth,
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 1,
                //position: 'absolute',
                borderRadius: SIZES.extraLarge,
                marginTop: 5,
                height: 40,
                padding: SIZES.small,
                ...props
            }}
            onPress={handlePress}
        >
            <Text style={{ fontFamily: FONTS.medium, fontSize: 12, color: COLORS.black, textAlign: 'center' }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}
