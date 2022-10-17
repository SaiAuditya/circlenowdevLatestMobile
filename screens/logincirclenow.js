import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser } from '../redux/reducers/projectSlice';
import { COLORS, FONTS } from '../assets/constants';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import Icon from 'react-native-vector-icons/Ionicons'
import LogoText from './logoText';
import { setUserInitials } from '../redux/reducers/projectSlice'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';


const Login = () => {
    const navigation = useNavigation();
    const details = useSelector((state) => state.communities.searchedLoc)
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            dispatch(setLoggedInUser(''))
            dispatch(setUserInitials(''))
            //console.log('hi there')

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    const inputStyle = {
        borderWidth: 1,
        borderColor: '#4e4e4e',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        backgroundColor: '#fff',
        color: '#424242',
        width: 100
    };
    const styles = StyleSheet.create({
        formContainer: {
            padding: 20,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        mainContainer:
        {
            flex: 1
        },
        formInputContainer:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingBottom: 10,
            width: 250

        },
        sIcon: {
            padding: 0,
            marginRight: -25,
            zIndex: 1
        },
        buttonFormatSolid:
        {
            minWidth: 260,
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
            borderWidth: 1,
            //position: 'absolute',
            borderRadius: 2,
            marginTop: 15,
            marginLeft: 10,
            height: 40,
            padding: 10,
            marginRight: 15
        },
        buttonFormatLight:
        {
            minWidth: 80,
            backgroundColor: COLORS.white,
            borderColor: COLORS.white,
            //borderWidth: 1,
            //position: 'absolute',
            borderRadius: 2,
            marginTop: 15,
            height: 40,
            padding: 10,
            marginRight: 15
        },
        textFormatLight:
        {

            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.primary,
            textAlign: 'center',
            height: 40,
            justifyContent: 'center'

        },
        textFormatSolid:
        {
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.white,
            textAlign: 'center',
            height: 40,
            justifyContent: 'center'
        }
    });

    return (
        <ScrollView showsHorizontalScrollIndicator={false} bounces={false} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{
                            name: details.name,
                            email: '',
                            password: '',
                        }}
                        onSubmit={values => handleSubmit(values)}
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .required('Please, provide your name!'),
                            email: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .min(4)
                                .max(200, 'Password should not excced 200 chars.')
                                .required(),
                            devloper: yup
                                .string()
                                .min(4)
                                .max(200, 'Devloper details should not excced 200 chars.')
                                .required(),
                            description: yup
                                .string()
                                .min(4)
                                .max(200, 'Description details should not excced 200 chars.')
                                .required(),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, resetForm }) => (
                            <View style={styles.mainContainer}>
                                <LogoText></LogoText>
                                <View style={styles.formContainer}>
                                    <View style={styles.formInputContainer}>
                                        <Icon name='ios-mail' size={20} style={styles.sIcon} color={COLORS.primary}></Icon>
                                        <TextInput
                                            value={values.email}
                                            style={inputStyle}
                                            onChangeText={handleChange('email')}
                                            onBlur={() => setFieldTouched('email')}
                                            placeholder="E-mail"
                                        />
                                    </View>
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                                    }
                                    <View style={styles.formInputContainer}>
                                        <Icon name='ios-lock-closed' size={20} style={styles.sIcon} color={COLORS.primary}></Icon>
                                        <TextInput
                                            value={values.password}
                                            style={inputStyle}
                                            onChangeText={handleChange('password')}
                                            placeholder="Password"
                                            onBlur={() => setFieldTouched('password')}
                                            secureTextEntry
                                        />
                                    </View>
                                    {touched.address && errors.address &&
                                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                                    }

                                    <TouchableOpacity
                                        color={COLORS.primary}
                                        borderColor={COLORS.primary}

                                        onPress={() => {
                                            const auth = getAuth()
                                            signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
                                                dispatch(setUserInitials(values.email.slice(0, 2).toUpperCase()));

                                                const uid = auth.currentUser.uid
                                                const dbRef = ref(getDatabase());
                                                get(child(dbRef, `users/${uid}`)).then((snapshot) => {
                                                    if (snapshot.exists()) {
                                                        console.log(snapshot.val());
                                                        dispatch(setLoggedInUser(snapshot.val().username));
                                                    } else {
                                                        console.log("No data available");
                                                    }
                                                }).catch((error) => {
                                                    console.error(error);
                                                });

                                                navigation.navigate('My Circles')
                                                resetForm()
                                            }
                                            ).catch((error) => {
                                                console.log(error.message)
                                                showMessage({
                                                    message: "Failed",
                                                    description: "User Login Failed invalid User/Password",
                                                    type: "danger",
                                                    icon: "danger"
                                                });
                                                return
                                            }
                                            )
                                        }}
                                        style={styles.buttonFormatSolid}
                                    >
                                        <Text style={styles.textFormatSolid}>
                                            Login
                                    </Text>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
                                        <View>
                                            <TouchableOpacity
                                                color={COLORS.primary}
                                                borderColor={COLORS.primary}
                                                onPress={() => navigation.navigate('Register')}
                                                style={styles.buttonFormatLight}
                                            >
                                                <Text style={styles.textFormatLight}>
                                                    Register
                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                color={COLORS.primary}
                                                borderColor={COLORS.primary}
                                                onPress={() => navigation.navigate('ForgotPassword')}
                                                style={styles.buttonFormatLight}
                                            >
                                                <Text style={styles.textFormatLight}>
                                                    Forgot Password
                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                    <FlashMessage style={{ marginTop: -35 }}></FlashMessage>
                </View >
            </TouchableWithoutFeedback>
        </ScrollView>

    );


}

export default Login

//74465773719-mj05mcbjhc3m5jfg2tcslragnjcgnkcr.apps.googleusercontent.com

/*
<Button title={'Sign in with Google'} onPress={() => {
                        GoogleSignin.configure({
                            //androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
                            iosClientId: '74465773719-mj05mcbjhc3m5jfg2tcslragnjcgnkcr.apps.googleusercontent.com',
                            scopes: ["profile", "email"]
                        });
                        GoogleSignin.hasPlayServices().then((hasPlayService) => {
                            if (hasPlayService) {
                                GoogleSignin.signIn().then((userInfo) => {
                                    console.log(JSON.stringify(userInfo))
                                }).catch((e) => {
                                    console.log("ERROR IS: " + JSON.stringify(e));
                                })
                            }
                        }).catch((e) => {
                            console.log("ERROR IS: " + JSON.stringify(e));
                        })
                    }} />
*/

//1066230132031-8oqgejn5et5tqoee7v7mvfmeobo90g18.apps.googleusercontent.com
