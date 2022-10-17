import React from 'react'
import { FONTS, assets } from '../../../assets/constants'
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
import Comments from './Comments';
import { array } from 'yup/lib/locale';
import { FloatingAction } from "react-native-floating-action";
import { setSelectedSpace } from '../../../redux/reducers/projectSlice';
import UserIcon from '../TopBanner/UserIcon';

const actions = [
    {
        text: "Accessibility",
        icon: assets.add,
        name: "bt_accessibility",
        position: 1
    },]


function textToEmoji(comment) {
    const findValue = (a, i) => {
        if (i != 0 && a)
            comment = comment.replace(a, emoji.getUnicode(a))
    }
    comment.split(':').forEach(findValue)
    return comment
}
const postEndpoint = "https://circlenowdev.xyz/api/v1/post"
const commentDataEndpoint = 'http://circlenowdev.xyz/api/v1/comment';
const AllCommentsEndPoint = 'http://circlenowdev.xyz/api/v1/comment/content';
const postCommentEndPoint = '';
const AllPosts = () => {
    const [result, setResult] = React.useState()
    const [postImagesBase64, setImagesBase64] = React.useState([])
    const video = React.useRef()
    const [status, setStatus] = React.useState({});
    const token = useSelector((state) => state.communities.token)
    const selectedSpace = useSelector((state) => state.communities.selectedSpace)
    //const [toggleShowAll, setShowAll] = React.useState()
    const [ids, setIds] = React.useState([])
    const dimensions = useWindowDimensions();
    const [allComments, setAllComments] = React.useState([[]])
    const [showAll, setShowAll] = React.useState(false)

    const showAllHandler = () => {
        setShowAll(!showAll)
    }


    const commentsHandler = (id, i) => {

        axios.get(AllCommentsEndPoint + '/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(out => {
            var comments = out.data.results
            var allCommentsTemp = allComments
            allCommentsTemp[i] = comments;
            setAllComments([...allCommentsTemp])
            //console.log(allCommentsTemp)
        })
    }

    React.useEffect(() => {
        const getData = async () => {
            const innerFunction = async () => {
                axios.get(postEndpoint, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }).then(resultOut => {
                    var posts = []
                    console.log(selectedSpace + ' here I am')
                    if (selectedSpace == 'All' || !selectedSpace) {
                        setResult(resultOut.data)
                    }
                    if (resultOut.status != 200) {
                        alert('User not exists, please register..!')
                    } else {
                        resultOut.data.results.forEach(async (result) => {
                            if (result.content.files.length > 0) {
                                if (!result.content.files[0].mime_type.includes('video')) {
                                    //console.log(result.content.files[0].mime_type)
                                    axios.get(result.content.files[0].url, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                        responseType: 'blob'
                                    }).then(blob => {
                                        const fr = new FileReader();
                                        /*
                                        var i = 0
                                        fr.onload = async () => {
                                            i = i + 1
                                            const fileUri = `${FileSystem.documentDirectory}/images_${i}`;
                                            await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                                            Sharing.shareAsync(fileUri);
                                        };*/

                                        fr.readAsDataURL(blob.data)

                                        fr.onloadend = () => {
                                            var base64Url = fr.result
                                            var imagesPrev = [...postImagesBase64]
                                            imagesPrev.push(base64Url)
                                            //console.log(base64Url)

                                            setImagesBase64(postImagesBase64 => [...postImagesBase64, base64Url]);

                                        }
                                    })

                                } else {
                                    /*
                                    const imagesPrev = [...postImagesBase64]
                                    imagesPrev.push(undefined)
                                    setImagesBase64([...imagesPrev])
                                    */
                                }
                            }
                            else {
                                /*
                                const imagesPrev = [...postImagesBase64]
                                imagesPrev.push(undefined)
                                setImagesBase64([...imagesPrev])
                                */
                            }

                        });



                    }
                    //setImagesBase64([...imagesLinks]);
                    //console.log(postImagesBase64)
                    //return imagesLinks;
                }).catch(error => console.log(error))
            }
            await innerFunction();
        }
        getData();

    }, [])

    if (result) {
        var k = 0
        return (
            <SafeAreaView>
                <CHomePage></CHomePage>
                <ScrollView style={{ backgroundColor: '#f5f5f5', marginTop: -10 }} showsVerticalScrollIndicator={false} b>
                    {result.results.map((res, i) => {
                        if (result.results[i].content.metadata.url.includes(selectedSpace) || selectedSpace == 'All' || !selectedSpace) {
                            if (result.results[i].content.files.length > 0 && !result.results[i].content.files[0].mime_type.includes('video')) {
                                k = k + 1
                            }
                            return (
                                <Card key={i} containerStyle={{ padding: 12, marginLeft: -12, marginRight: -5, marginBottom: -8 }}>

                                    <Card.Title style={{ textAlign: 'left', fontSize: 14, marginBottom: 15, marginTop: -10, fontFamily: FONTS.bold, color: '#189AB4' }}>
                                        <UserIcon size={32} style={{ marginLeft: 2, marginRight: 10 }} user={result.results[i].content.metadata.created_by.display_name} guid={result.results[i].content.metadata.created_by.guid}></UserIcon>
                                    </Card.Title>
                                    <Card.Title style={{ textAlign: 'left', marginLeft: 40, fontSize: 14, marginBottom: -0, marginTop: -18, fontFamily: FONTS.bold, color: '#189AB4' }}>{result.results[i].content.metadata.created_by.display_name}</Card.Title>
                                    <Card.Title style={{ textAlign: 'left', marginLeft: 40, fontSize: 12, marginTop: 4, marginBottom: -1, fontFamily: FONTS.regular }}>{formatDistance(parseISO(result.results[i].content.metadata.created_at.toString().trim()), new Date(), { addSuffix: true })}</Card.Title>
                                    <Card.Title style={{ textAlign: 'right', marginBottom: -1, marginTop: -20, marginLeft: dimensions.width - dimensions.width / 9 }}><Icon containerStyle={{ alignContent: 'right' }} type="material" color="#C8C8C8" name="more-horiz" /></Card.Title>
                                    <Card.Divider style={{ marginTop: 3 }} />
                                    <Text style={{ color: 'black', fontSize: 18, marginBottom: 10, marginLeft: 5 }}>{textToEmoji(result.results[i].message).split(':').join('')}</Text>

                                    {result.results[i].content.files.length > 0 && postImagesBase64[k - 1] && !result.results[i].content.files[0].mime_type.includes('video') && <Card.Image source={{ uri: postImagesBase64[k - 1] }} style={{ height: 350, marginTop: -20 }} resizeMode='contain'></Card.Image>}
                                    {postImagesBase64[k - 1] && <Card.Divider />}

                                    {
                                        (result.results[i].content.files.length > 0 && result.results[i].content.files[0].mime_type.includes('video') && !result.results[i].content.files[0].mime_type.includes('3gp')) && <Video
                                            ref={video}
                                            style={{ width: dimensions.width, height: 350, marginBottom: 5 }}
                                            source={{
                                                uri: result.results[i].content.files[0].url,
                                            }}
                                            useNativeControls
                                            resizeMode="contain"
                                            isLooping
                                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                                        />
                                    }
                                    <View style={{ flexDirection: 'row', marginTop: 0, marginLeft: 0, alignContent: 'space-around', justifyContent: 'space-between', width: dimensions.width - 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name='like1' size={20} type='antdesign'></Icon>
                                            <Button type='clear' buttonStyle={{ marginTop: -3 }} titleStyle={{ fontFamily: FONTS.regular, fontSize: 14 }} title={`likes (${result.results[i].content.likes.total})`}></Button>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                                            <Icon name='comment' size={20} type='foundation'></Icon>
                                            <Button type='clear' buttonStyle={{ marginTop: -7 }} titleStyle={{ fontFamily: FONTS.regular, fontSize: 14 }} title={`comments (${result.results[i].content.comments.total})`} onPress={showAllHandler}></Button>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name='share-a' size={20} type='fontisto'></Icon>
                                            <Button type='clear' buttonStyle={{ marginTop: -5 }} titleStyle={{ fontFamily: FONTS.regular, fontSize: 14 }} title={`share`}></Button>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', marginTop: 5, marginBottom: -15, marginLeft: -dimensions.width / 1.5 + 20 }}>
                                        {!showAll && result.results[i].content.comments.total > 2 && <Button titleStyle={{ fontFamily: FONTS.regular, fontSize: 8, marginLeft: -10 }} title={ids.indexOf(result.results[i].content.id) > -1 ? 'Hide All Comments' : 'Show All Comments'} type='clear' titleStyle={{ fontSize: 14, fontFamily: FONTS.medium }} buttonStyle={{ marginTop: 10, marginLeft: -10 }} onPress={
                                            () => {
                                                //setShowAll(!toggleShowAll)
                                                //setShowAll(false)
                                                const index = ids.indexOf(result.results[i].content.id)
                                                var newIds = ids
                                                if (index > -1) {
                                                    newIds.splice(index, 1)
                                                    setIds([...newIds])
                                                    //console.log('here')
                                                    //return
                                                } else {
                                                    var id = result.results[i].content.id
                                                    setIds([...ids, id])
                                                    //console.log(id)
                                                    commentsHandler(id, i);
                                                }
                                            }
                                        }></Button>}
                                    </View>
                                    {!showAll && !ids.indexOf(result.results[i].content.id) > -1 && result.results[i].content.comments.latest.map((comment, p) => {
                                        return (
                                            <Comments comment={comment} key={p}></Comments>
                                        )
                                    }
                                    )}
                                    {!showAll && allComments[i] && ids.indexOf(result.results[i].content.id) > -1 && allComments[i].map((comment, p) => {
                                        return (
                                            <Comments comment={comment} key={p}></Comments>
                                        )
                                    }
                                    )}

                                </Card>
                            )
                        }
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return (<SafeAreaView>

            {[1, 2, 3, 4, 5, 6].map(i =>
                <SvgAnimatedLinearGradient
                    primaryColor="#e8f7ff"
                    secondaryColor="#4dadf7"
                    height={140}
                    key={i}
                >
                    <Rect x="80" y="10" rx="3" ry="3" width="30" height="10" />
                    <Rect x="80" y="25" rx="3" ry="3" width="400" height="10" />
                    <Rect x="80" y="40" rx="3" ry="3" width="400" height="10" />
                    <Rect x="80" y="80" rx="3" ry="3" width="400" height="10" />
                    <Rect x="80" y="100" rx="3" ry="3" width="400" height="10" />
                    <Rect x="80" y="120" rx="3" ry="3" width="400" height="10" />
                </SvgAnimatedLinearGradient>
            )}
        </SafeAreaView>)
    }
}

export default AllPosts

/*
const getData = async (dataurl) => {
        fetch(dataurl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.blob())
            .then((response) => {
                //console.log(response)
                //const imagesPrev = [...postImagesBase64]
                //imagesPrev.push(base64Url)
                //setImagesBase64((postImagesBase64) => [...postImagesBase64, URL.createObjectURL(response)]);
                //setImagesBase64(imagesPrev);
                //return (URL.createObjectURL(response))
                const imagesPrev = [...postImagesBase64]
                imagesPrev.push(URL.createObjectURL(response))
                setImagesBase64(imagesPrev);
                console.log(postImagesBase64.length)
            })
            .catch(err => {
                console.log(err);
            });
    }

*/

//

/*
<SvgAnimatedLinearGradient
                    primaryColor="#e8f7ff"
                    secondaryColor="#4dadf7"
                    height={140}
                    key={i}
                >
                    <Rect x="0" y="0" rx="15" ry="15" width="20" height="20" />
                    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                    <Rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
                    <Rect x="0" y="100" rx="3" ry="3" width="200" height="10" />
                    <Rect x="0" y="120" rx="3" ry="3" width="360" height="10" />
                </SvgAnimatedLinearGradient>
*/

/*

{
                                    axios.get(AllCommentsEndPoint + '/' + result.results[i].content.id, {
                                    headers: {
                                        'Content-type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                }).then(out => out.data.results.map((comment, q) => {
                                    console.log(comment)
                                    return (
                                        <Comments comment={comment} key={comment.createdAt}></Comments>
                                    )
                                }
                                ))
*/