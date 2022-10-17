import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'
import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../assets/constants'
import { RectButton, CircleButton } from './Button'
import { SubInfo, Title, Alerts, Messages } from './SubInfo'
import { useSelector, useDispatch } from 'react-redux';
import { joinCommunity } from '../redux/reducers/projectSlice'
import { showMessage, hideMessage } from "react-native-flash-message";



const CommunityCard = ({ data }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userJoinedCommunityIds = useSelector((state) => state.communities.userJoinedCommunityIds)
    const handleCommunityViewJoinButton = (name) => {
        if (userJoinedCommunityIds.some(e => e === data.id)) {
            navigation.navigate('Details')
        } else {
            dispatch(joinCommunity(data.id))
            showMessage({
                message: "Success",
                description: "Joined Group " + data.name,
                type: "success",
                icon: "success"
            });
        }
    }
    //console.log(userJoinedCommunityIds[0])
    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
            width: 200
        }}>
            <View style={{ height: 100 }}>
                <Image source={data.image}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                        //borderBottomLeftRadius: SIZES.font,
                        //borderBottomRightRadius: SIZES.font
                    }}
                />
                <CircleButton imageUrl={assets.heart} top={10} right={10}> </CircleButton>
            </View>
            <SubInfo></SubInfo>
            <View style={{ padding: SIZES.font }}>
                <Title title={data.name} subTitle={data.devloper} titleSize={SIZES.large} subtitleSize={SIZES.small}></Title>
                <View style={{ marginTop: SIZES.font, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginTop: SIZES.font, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Alerts count={data.alerts}></Alerts>
                        <Messages count={data.messages}></Messages>
                    </View>
                    <RectButton minWidth={30} fontSize={SIZES.font} name={userJoinedCommunityIds.some(e => e === data.id) ? "View" : "Join"} handlePress={handleCommunityViewJoinButton}></RectButton>
                </View>
                <Title title={""} subTitle={"Since May'22"} titleSize={SIZES.large} subtitleSize={SIZES.small}></Title>
            </View>
        </View>
    )
}

export default CommunityCard
