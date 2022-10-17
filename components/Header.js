import React from 'react'
import { useWindowDimensions } from 'react-native'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native'
import { COLORS, SIZES, FONTS, SHADOWS } from '../assets/constants'
import { CircleButton, CircleButtonInitials } from './Button'
import { useSelector } from 'react-redux'

export const CustomHeader = ({ imageUrl, handlePress, ...props }) => {
    const url = useSelector((state) => state.communities.photoUrl)
    const initials = useSelector((state) => state.communities.userInitials)
    console.log("thiss..." + initials)
    const dim = useWindowDimensions();
    if (url === '' && initials != '')
        return (
            <CircleButtonInitials initials={initials}></CircleButtonInitials>
        )
    if (url)
        return (<CircleButton imageUrl={url}></CircleButton>);
}

export default CustomHeader