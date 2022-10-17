import React from 'react';
import { View, useWindowDimensions, SafeAreaView, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FONTS, assets } from '../../../assets/constants';
import {
    Avatar
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import { color } from 'react-native-elements/dist/helpers';
import { setSelectedSpace } from '../../../redux/reducers/projectSlice'
import UserIcon from './UserIcon';

const profile_base_url = 'https://circlenowdev.xyz/uploads/profile_image/'

const TopBanner = () => {
    const dimentions = useWindowDimensions()
    const dispatch = useDispatch();
    //alert('test')
    const user = useSelector((state) => state.communities.loggedInUser)
    const guid = useSelector((state) => state.communities.loggedInUserGuid)
    const token = useSelector((state) => state.communities.token)
    const [listofSpaces, setListofSpaces] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [IsSpaceImageExisting, setIsSpaceImageExisitng] = React.useState(false)
    //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjU2ODczMDUsImlzcyI6Imh0dHA6XC9cL2NpcmNsZW5vd2Rldi54eXoiLCJuYmYiOjE2NjU2ODczMDUsInVpZCI6NCwiZW1haWwiOiJtZ293cmlkaXZ5YUBnbWFpbC5jb20iLCJleHAiOjE2NjU2OTA5MDV9.pFyqIsdTiTO1kuqDYZ4sk2swI0dkaHr-QwHV2UPWaSnL23vWoBqsTPSiNfdunyTOAFxt8Sv5q_iNOK1ZNWNn3w'
    React.useEffect(() => {
        axios.get("http://206.189.133.189/api/spaces",
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }).then(result => {
                //alert('test')
                var arrayOfItems = []
                arrayOfItems.push({ label: 'My Circles', item: 'My Circles', value: 'All', key: 'My Circels Key', icon: () => <View style={{ height: 20, width: 20, backgroundColor: 'white', marginRight: 15 }}><Image source={{ uri: './undefined' }} style={{ height: 35, width: 35, borderRadius: 17.5, marginRight: 50, marginTop: -10 }} defaultSource={assets.logo}></Image></View> })
                function checkImageURL(url) {
                    fetch(url)
                        .then((res) => {
                            console.log(url)
                            if (res.status != 200) {
                                //console.log(res.statusText)
                                setIsSpaceImageExisitng(false)
                            } else {
                                setIsSpaceImageExisitng(true)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            setIsSpaceImageExisitng(false);
                        });
                }
                function getNewObj(obj) {
                    var url = profile_base_url + obj.guid + '.jpg'
                    var isImage = IsSpaceImageExisting
                    checkImageURL(url)
                    arrayOfItems.push({ label: obj.name, item: obj.value, value: obj.url, key: obj.name, icon: () => IsSpaceImageExisting ? <Image source={{ uri: `${profile_base_url + obj.guid + '.jpg'}` }} style={{ height: 35, width: 35, borderRadius: 17.5 }} /> : <View style={{ backgroundColor: obj.color, height: 35, width: 35, borderRadius: 17.5 }}><Text style={{ textAlign: 'center', marginTop: 10, color: 'white', fontSize: 14 }}>{obj.name.charAt(0).toUpperCase()}</Text></View> })
                }
                result.data.forEach(getNewObj)
                setListofSpaces([...arrayOfItems])

            })
    }, [])

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={{ height: 40, marginTop: 20, marginLeft: -5 }} onPress={() => setOpen(false)}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 50, width: dimentions.width / 2, marginLeft: -8 }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={listofSpaces}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setListofSpaces}
                            dropDownContainerStyle={{ borderWidth: 0, fontFamily: FONTS.bold, fontSize: 16 }}
                            style={{ borderWidth: 0 }}
                            placeholder={'My Circles'}
                            placeholderStyle={{ fontFamily: FONTS.bold, fontSize: 16 }}
                            selectedItemLabelStyle={{ fontFamily: FONTS.bold, fontSize: 16 }}
                            selectedItemContainerStyle={{ fontFamily: FONTS.bold }}
                            labelStyle={{ fontFamily: FONTS.bold, fontSize: 16 }}
                            onChangeValue={(value) => dispatch(setSelectedSpace(value))}
                        />
                        <UserIcon size={35} style={{ marginTop: 5, width: dimentions.width / 7, left: dimentions.width, position: 'absolute' }} user={user} guid={guid}></UserIcon>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    )
}

export default TopBanner



/*
</SafeAreaView><View style={{ backgroundColor: COLORS.primary, height: 40, top: 5, left: 0, width: dimentions.width, alignContent: 'space-around', flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginRight: 70, marginLeft: 10 }}>
                    <Text style={{ color: COLORS.white, textAlign: 'center', fontFamily: FONTS.bold }}>Circlesnow</Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 1 }}>
                    <Icon name='envelope' color={COLORS.white} size={20} />
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 1 }}>
                    <Icon name='bell' color={COLORS.white} size={20} />
                </View>
            </View>
            <View style={{ justifyContent: 'center', paddingHorizontal: 10, position: 'absolute', left: dimentions.width - 150, top: 8, alignContent: 'center', backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ justifyContent: 'center', color: COLORS.black, textAlign: 'center', fontSize: 12, fontFamily: FONTS.semiBold }}>{user}</Text>
                </View>
                <Text style={{ justifyContent: 'center', color: COLORS.black, textAlign: 'center', fontSize: 10 }}>{email}</Text>
            </View>
        </View>


        <View>
            <View style={{ backgroundColor: COLORS.white, height: 20, minWidth: dimentions.width / 8, marginTop: 5, }}>
                <SearchBar
                    ref={searchRef}
                    placeholder="Search Circle..."
                    onChangeText={updateSearch}
                    value={search}
                    containerStyle={{ height: 30, backgroundColor: 'white' }}
                    inputContainerStyle={{ height: 50, backgroundColor: 'white', marginTop: -10, marginLeft: -10, marginRight: -10 }}
                    onTextInput={() => alert('triggered')}
                    onBlur={() => alert('blurred')}
                />
            </View>
        </View>
        <View style={{ marginLeft: 40, marginTop: 10 }}>
            <Avatar
                rounded
                title="Fc"
                containerStyle={{ backgroundColor: '#3d4db7' }}
            />
        </View>
            </View >*/
