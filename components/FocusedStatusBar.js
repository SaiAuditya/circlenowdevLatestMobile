import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { isFocused } from '@react-navigation/core'

const FocusedStatusBar = (props) => {
    return (
        isFocused ? <StatusBar animated={true} {...props} /> : null
    )
}

export default FocusedStatusBar
