
import React from 'react'
import { View, Text, Image } from 'react-native'
export const InfoImage = ({ imgUrl }) => {
    return (
        <Image
            source={imgUrl}
            resizeMode='contain'
        />

    )
}