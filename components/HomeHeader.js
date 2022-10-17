import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setDefaultCommunities } from '../redux/reducers/projectSlice';
import {
    View, TouchableWithoutFeedback, Keyboard, Image, Text,
    TouchableOpacity, StyleSheet, ColorPropType, Linking
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CircleButtonInitials, RectButton, CircleButton } from './Button'
import LogoText from '../screens/logoText';
import MapView from 'react-native-maps';
import { COLORS, SIZES, FONTS, SHADOWS } from '../assets/constants'
import { ref } from 'yup';

const HomeHeader = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.communities.isLoggedIn)
    const Email = useSelector((state) => state.communities.loggedInUserEmail)
    const details_loc = useSelector((state) => state.communities.searchedLoc)
    const [details_local, setDetailsLocal] = React.useState(null)
    const [isF, setIsFocused] = React.useState(true)
    const inputText = React.useRef()

    React.useEffect(
        () => {
        }, [details_local]
    )

    const handleChangeText = (text) => {
        {
            console.log('text changed ...' + isF)
            setIsFocused(true)
            console.log('text changed after...' + isF)
        }
    }

    return (
        <GooglePlacesAutocomplete
            placeholder='Search your circle address'
            minLength={4}
            listViewDisplayed={"auto"}
            fetchDetails={true}
            ref={inputText}
            onPress={(data, details = null) => {
                setIsFocused(false)
                setDetailsLocal(details)
                dispatch(setDefaultCommunities(details))
            }}
            query={{
                key: 'AIzaSyBmL7lc0A0Ycbn8chdROXl1z8yuJcOVEFc',
                language: 'en',
                components: 'country:in',
                types: ['restaurent']
            }}

            textInputProps={{
                onChangeText: ((text) => handleChangeText(text))
            }}

            styles={{
                textInputContainer: {
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    padding: 0,
                    marginBottom: 0,
                    marginTop: -20,
                    height: 50,
                    marginLeft: 10,
                    marginRight: 20,
                    width: 260,
                    borderBottomWidth: 1,
                    zIndex: 999
                },
                container:
                {
                    marginTop: 0,
                    width: 260,
                    marginBottom: 0,
                }
            }}
        />
    )
}

//details.formatted_address.toUpperCase()
//details.name
//details.address_components
//details.types

//{details_local != null || details_local != undefined &&
//  <View style={{ flex: 1 }}>
//    <Text style={{ color: COLORS.primary, marginTop: 250, marginLeft: 100 }}>Name : {details_loc.name}</Text>
//  <Text>Detailed Address : {details_loc.formatted_address}</Text>
//  </View>
//}

export default HomeHeader
