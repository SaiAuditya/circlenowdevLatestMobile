import React from 'react'
import { View, useWindowDimensions, SafeAreaView, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FONTS, assets } from '../../../assets/constants';
import {
    Avatar
} from 'react-native-elements';
const profle_pic_end_point = 'https://circlenowdev.xyz/uploads/profile_image/'

const UserIcon = (props) => {
    const user = props.user
    const profile_pic_url = 'https://circlenowdev.xyz/uploads/profile_image/' + props.guid + '.jpg'
    const [IsProfImageExisting, setIsProfeImageExisitng] = React.useState(false)
    const dimentions = useWindowDimensions()
    React.useEffect(() => {
        fetch(profile_pic_url)
            .then((res) => {
                console.log(profile_pic_url)
                if (res.status != 200) {
                    //console.log(res.statusText)
                    setIsProfeImageExisitng(false)
                } else {
                    setIsProfeImageExisitng(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsProfeImageExisitng(false);
            });
    }, [])
    return (
        <View style={{ marginLeft: 10, marginTop: 5, width: dimentions.width / 10, left: dimentions.width - 70, position: 'absolute' }}>
            <Avatar
                rounded
                title={user.slice(0, 2).toUpperCase()}
                containerStyle={{ backgroundColor: '#3d4db7' }}
                size={props.size}
                source={{ uri: IsProfImageExisting ? profile_pic_url : undefined }}
            />
        </View>
    )
}

export default UserIcon
