import React from 'react';
import { View, useWindowDimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../../assets/constants';
import {
    ListItem,
    Avatar
} from 'react-native-elements';

const TopBanner = () => {
    const dimentions = useWindowDimensions()
    const user = useSelector((state) => state.communities.loggedInUser)
    const token = useSelector((state) => state.communities.token)
    const [expanded, setExpanded] = React.useState(false);
    const [] = React.useState(true)
    const [listofSpaces, setListofSpaces] = React.useState();
    const [listItemTitle, setListItemTitle] = React.useState('My Circles')
    const [, setSearch] = React.useState("");

    React.useEffect(() => {
        async function getSpaces() {
            const allSpaces = await fetch("http://206.189.133.189/api/spaces",
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })

            const alluserSpaces = await allSpaces.json();
            setListofSpaces(alluserSpaces)
        }

        getSpaces()

    }, [])


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={{ height: 50, marginTop: 20 }} onPress={() => setExpanded(false)}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 50, width: dimentions.width / 2 }}>
                        <ListItem.Accordion
                            content={
                                <>
                                    { //<Icon name="dot-circle-o" size={30} style={{ marginLeft: 5, marginRight: 5, marginTop: -5 }} color={COLORS.primary} />
                                    }
                                    <ListItem.Content>
                                        <ListItem.Title style={{ fontFamily: FONTS.bold, fontSize: 18, marginRight: -10 }}>{listItemTitle}</ListItem.Title>
                                    </ListItem.Content>
                                </>
                            }
                            isExpanded={expanded}
                            onPress={() => {
                                setExpanded(!expanded);
                                //width == 50 ? setWidth(200) : setWidth(50)
                                //setWidth(50)
                            }}
                            style={{ zIndex: 1 }}
                        >
                            {listofSpaces && <ScrollView style={{ minHeight: dimentions.height / 2 }}>
                                {listofSpaces.map((l, i) => (
                                    <ListItem key={i} onPress={() => {
                                        setExpanded(false)
                                        setListItemTitle(listofSpaces[i].name)
                                    }} bottomDivider style={{ marginLeft: 10, marginRight: 10, zIndex: 1 }}>
                                        {//<Avatar title={l.name} source={{ uri: l.avatar_url }} />
                                        }
                                        <Avatar
                                            title={l.name.slice(0, 1)}
                                            containerStyle={{ backgroundColor: COLORS.primary }}
                                            size={20}
                                        />
                                        <ListItem.Content style={{ marginLeft: 5, height: 15 }}>
                                            <ListItem.Title style={{ fontFamily: FONTS.regular, fontSize: 12 }}>{l.name}</ListItem.Title>
                                            {//<ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                            }
                                        </ListItem.Content>
                                        {//<ListItem.Chevron />
                                        }
                                    </ListItem>
                                ))}
                            </ScrollView>}
                        </ListItem.Accordion>

                        <View style={{ marginLeft: 10, marginTop: 5, width: dimentions.width / 10, left: dimentions.width - 70, position: 'absolute' }}>
                            <Avatar
                                rounded
                                title={user.slice(0, 2).toUpperCase()}
                                containerStyle={{ backgroundColor: '#3d4db7' }}
                                size={30}
                            />
                        </View>
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
