import React from 'react'
import { FONTS } from '../../../assets/constants'
import { useSelector } from 'react-redux';
import { Card, Text, Button, Icon } from 'react-native-elements'
import { View, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native'
import { formatDistance, parseISO } from 'date-fns'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg'
import emoji from 'emoji-dictionary'
import axios from 'axios';
//import * as FileSystem from 'expo-file-system'
//import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av'
import CHomePage from '../HomePage/HomePage'
import UserIcon from '../TopBanner/UserIcon'
function textToEmoji(comment) {
    const findValue = (a, i) => {
        if (i != 0 && a)
            comment = comment.replace(a, emoji.getUnicode(a))
    }
    comment.split(':').forEach(findValue)
    return comment
}

const Comments = (props) => {
    const comment = props.comment
    return (
        <View style={{ shadowColor: 'white', borderLeftWidth: 0 }}>
            <Card containerStyle={{ backgroundColor: '#f5f5f5', marginLeft: -10, marginRight: -10, marginBottom: -15, shadowColor: 'white', shadowOpacity: 0.1, borderLeftWidth: 0 }}>
                <Card.Title style={{ textAlign: 'left', fontSize: 14, marginBottom: 15, marginTop: -10, fontFamily: FONTS.bold, color: '#189AB4' }}>
                    <UserIcon size={25} style={{ marginLeft: 2, marginRight: 10 }} user={comment.createdBy.display_name} guid={comment.createdBy.guid}></UserIcon>
                </Card.Title>
                <Card.Title style={{ textAlign: 'left', fontSize: 12, marginBottom: -5, marginTop: -20, marginLeft: 30, fontFamily: FONTS.bold, color: '#189AB4' }}>{comment.createdBy.display_name}</Card.Title>
                <Card.Title style={{ textAlign: 'left', fontSize: 10, marginTop: 4, marginBottom: 10, marginLeft: 30, fontFamily: FONTS.regular, color: '#05445E' }}>{formatDistance(parseISO(comment.createdAt.toString().trim()), new Date(), { addSuffix: true })}</Card.Title>
                <Card.Divider style={{ marginTop: 3 }} />
                { // postImagesBase64[i] && <Card.Image source={{ uri: postImagesBase64[i] }}></Card.Image>
                }
                { // postImagesBase64[i] && <Card.Divider />
                }
                <Text style={{ color: 'black', fontSize: 14, marginBottom: 8, marginLeft: 5, marginTop: -10 }}>{textToEmoji(comment.message).split(':').join('')}</Text>
                <View style={{ flexDirection: 'row', marginTop: -5, marginLeft: 5, marginBottom: -5 }}>
                    <Icon name='comments' type='font-awesome' size={12}></Icon>
                    <Text style={{ marginRight: 10, marginLeft: 3, fontFamily: FONTS.medium, fontSize: 12 }}>{comment.commentsCount ? comment.commentsCount : 0}</Text>
                    <Icon name='thumbs-o-up' type='font-awesome' size={12}></Icon>
                    <Text style={{ marginRight: 40, marginLeft: 3, fontFamily: FONTS.medium, fontSize: 12 }}>{comment.likes.total ? comment.likes.total : 0}</Text>
                </View>
                {comment.comments && <View style={{ marginLeft: 20, marginBottom: -5 }}>
                    {comment.comments && comment.comments.map((innercomment, l) => {
                        return (<Comments comment={innercomment} key={l}></Comments>)
                    })}
                </View>}
            </Card>
        </View>
    )
}

export default Comments
