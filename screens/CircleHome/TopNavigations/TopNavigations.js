import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../../assets/constants';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

const TopNavigations = () => {
    const dimentions = useWindowDimensions()
    return (
        <View style={{ backgroundColor: COLORS.white, ...SHADOWS.light, height: 50, width: dimentions.width, alignContent: 'space-around', flexDirection: 'row', marginBottom: 8 }}>
            <SearchBar placeholder='Whats on your mind' style={{ fontSize: 14, fontFamily: FONTS.regular, height: 40 }}
                searchIcon={{
                    style:
                        { alignSelf: 'center' }
                }}
            >
            </SearchBar>
        </View >
    )
}

export default TopNavigations
