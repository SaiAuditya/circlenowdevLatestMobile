import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS } from '../assets/constants';
import FlashMessage from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome'
import LogoText from './logoText';
import { setToken, setLoggedInUser, setLoggedInUserEmail, setLoggedInUserGuid } from '../redux/reducers/projectSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, CheckBox, Overlay, Dialog } from 'react-native-elements'
import { MarkdownView } from 'react-native-markdown-view';

const Login = () => {
    const navigation = useNavigation();
    const dims = useWindowDimensions();
    const dispatch = useDispatch()
    const AUTH_END_POINT = 'https://circlenowdev.xyz/api/v1/auth/login'
    const CURRENT_USER_DETAILS = 'https://circlenowdev.xyz/api/v1/auth/current'
    const token = useSelector((state) => state.communities.token)
    const [details, setDetails] = React.useState({})
    const [checked, setChecked] = React.useState(false)
    const [visible, setVisible] = React.useState(false);
    const [showError, setShowError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const acceptTermsAndConditionsHandler = () => {
        //toggleOverlay()
        checked ? setChecked(false) : setChecked(true)
        setShowError(false)
    }

    const closeErrorDialog = () => {
        setIsError(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, width: dims.width, justifyContent: 'center', alignContent: 'center' }}>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={yup.object().shape({
                    email: yup
                        .string()
                        .required("Email is not entered.."),
                    password: yup
                        .string()
                        .min(4)
                        .required("Please enter password.."),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched }) => (
                    <KeyboardAwareScrollView scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }} style={{ felx: 1, alignContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', width: dims.width, alignItems: 'center', marginRight: 20 }}>
                                <LogoText></LogoText>
                                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', marginTop: 50 }}>
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name='envelope-o'
                                                size={24}
                                                color={COLORS.primary}
                                            />
                                        }
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        placeholder="Email / User"
                                        inputStyle={{ width: dims.width - 100, color: COLORS.primary, fontFamily: FONTS.regular, fontSize: 16 }}
                                        placeholderTextColor={COLORS.primary}
                                        containerStyle={{ flex: 1, alignItems: "center", justifyContent: 'center', width: dims.width / 1.5 }}
                                        errorStyle={{ color: 'red', marginLeft: -dims.width / 3 + 10, fontFamily: FONTS.regular, fontSize: 14 }}
                                        errorMessage={touched.email && errors.email ? "Please enter email" : ''}
                                    />

                                    <Input
                                        leftIcon={
                                            <Icon
                                                name='lock'
                                                size={30}
                                                color={COLORS.primary}
                                            />
                                        }
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        placeholder="Password"
                                        secureTextEntry
                                        inputStyle={{ width: dims.width - 100, alignSelf: 'center', color: COLORS.primary, fontFamily: FONTS.regular, fontSize: 16 }}
                                        placeholderTextColor={COLORS.primary}
                                        containerStyle={{ flex: 1, alignItems: "center", justifyContent: 'center', width: dims.width / 1.5 }}
                                        errorStyle={{ color: 'red', marginLeft: -dims.width / 4 + 10, fontFamily: FONTS.regular, fontSize: 14 }}
                                        errorMessage={touched.password && errors.password ? "Please enter password" : ''}
                                    />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Button
                                        title="Login"
                                        titleStyle={{ width: 120, fontFamily: FONTS.bold }}
                                        style={{ marginTop: 10 }}
                                        type='solid'
                                        buttonStyle={{ backgroundColor: COLORS.primary }}
                                        onPress={async () => {
                                            //console.log(values.email)
                                            //console.log(values.password)
                                            if (!checked) {
                                                setShowError(true)
                                                return
                                            }
                                            setIsLoading(true)
                                            const result = await fetch(AUTH_END_POINT, {
                                                method: 'POST',
                                                headers:
                                                {
                                                    'Content-type': 'application/json',
                                                },
                                                body: JSON.stringify(
                                                    {
                                                        "username": `${values.email}`,
                                                        "password": `${values.password}`
                                                    })
                                            })
                                            const res = await result.json()

                                            //console.log('result' + JSON.stringify(res))
                                            if (res.code != 200) {
                                                console.log(res.statusText)
                                                setIsLoading(false)
                                                setIsError(true)
                                                //alert('User / Password error, please try again..!')
                                                //return
                                            } else {
                                                dispatch(setToken(res.auth_token))
                                                const userDetails = await fetch(CURRENT_USER_DETAILS, {
                                                    method: 'GET',
                                                    headers: {
                                                        'Content-type': 'application/json',
                                                        'Authorization': `Bearer ${res.auth_token}`
                                                    },
                                                })
                                                const detailsObj = await userDetails.json()
                                                //console.log(detailsObj)
                                                setDetails(detailsObj)
                                                dispatch(setLoggedInUser(detailsObj.account.username))
                                                dispatch(setLoggedInUserEmail(detailsObj.account.email))
                                                dispatch(setLoggedInUserGuid(detailsObj.account.guid))
                                                setIsLoading(false)
                                                navigation.navigate('HomePage')
                                            }
                                        }}
                                    />

                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                    <Button
                                        type="clear"
                                        onPress={() => navigation.navigate('Register_2')}
                                        title="Sign Up"
                                        titleStyle={{ color: COLORS.primary, fontFamily: FONTS.bold }}
                                    />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                    <CheckBox
                                        center
                                        //title="Please accept Terms and Conditions"
                                        textStyle={{ color: showError ? 'red' : COLORS.primary, fontFamily: FONTS.regular, fontSize: 14 }}
                                        checked={checked}
                                        onPress={acceptTermsAndConditionsHandler}
                                    />
                                    <Text style={{ marginLeft: -15, color: showError ? 'red' : COLORS.primary, fontFamily: FONTS.regular, fontSize: 14 }}>Please accept</Text>
                                    <Button
                                        type="clear"
                                        onPress={toggleOverlay}
                                        title="Terms and conditions"
                                        titleStyle={{ fontFamily: FONTS.medium, fontSize: 14 }}
                                    />
                                </View>
                                <View style={{ flex: 1, marginTop: 120 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ color: COLORS.primary, fontFamily: FONTS.medium }}>All Rights Reserverd</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ marginTop: 5, color: COLORS.primary, fontFamily: FONTS.medium }}>Contact hello@circlenow.xyz</Text>
                                    </View>
                                </View>
                                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                                    <View style={{ height: 600, width: 350, borderColor: COLORS.primary, borderWidth: 1 }}>
                                        <ScrollView style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 20 }}>
                                            <MarkdownView>{text}</MarkdownView>
                                            {/*
                                            <Button
                                                title={checked ? "Decline" : "Accept"}
                                                //onPress={acceptTermsAndConditionsHandler}
                                                buttonStyle={{ backgroundColor: COLORS.primary, marginTop: 20, fontFamily: FONTS.bold }}
                                                titleStyle={{ fontSize: 16, fontFamily: FONTS.bold }}
                                            />*/}
                                        </ScrollView>
                                    </View>
                                </Overlay>

                                <Dialog isVisible={isLoading}>
                                    <Dialog.Loading />
                                </Dialog>
                                <Dialog isVisible={isError} onBackdropPress={closeErrorDialog}>
                                    <Dialog.Title />
                                    <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                                        <Icon name="warning" color="orange" size={100} style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: 10, marginTop: -10 }}></Icon>
                                        <Text style={{ fontFamily: FONTS.regular, fontSize: 16, textAlign: 'center', color: COLORS.primary }}>
                                            Unable to login. Invalid User / Password
                                    </Text>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Dialog.Actions>
                                                <Dialog.Button title="Close" onPress={closeErrorDialog} buttonStyle={{ alignSelf: 'center', alignItems: 'center' }} titleStyle={{ color: COLORS.primary, fontSize: 16, fontFamily: FONTS.bold }} />
                                            </Dialog.Actions>
                                        </View>
                                    </View>
                                </Dialog>
                            </View>
                        </TouchableWithoutFeedback>
                        <FlashMessage position='top'></FlashMessage>
                    </KeyboardAwareScrollView>
                )}

            </Formik>
        </SafeAreaView >
    );


}

export default Login

const text = `# Terms and Conditions

Last updated: September 27, 2022

Please read these terms and conditions carefully before using Our Service.

# Interpretation and Definitions

## Interpretation

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

## Definitions

For the purposes of these Terms and Conditions:

- __Application__ means the software program provided by the Company downloaded by You on any electronic device, named Circlenow
- __Application Store__ means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.
- __Affiliate__ means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

- __Country__ refers to: Telangana,  India
- __Company__ (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Prominds Capitol, Miyapur, Hyderbad.

- __Device__ means any device that can access the Service such as a computer, a cellphone or a digital tablet.







- __Service__ refers to the Application.


- __Terms and Conditions__ (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the [Free Terms and Conditions Generator](https://www.freeprivacypolicy.com/free-terms-and-conditions-generator/).
- __Third-party Social Media Service__ means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

- __You__ means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

# Acknowledgment

These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.

Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.

By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.


You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.


Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.



















# Links to Other Websites

Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.

The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.

We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.

# Termination

We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

Upon termination, Your right to use the Service will cease immediately.


# Limitation of Liability

Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.

To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.

# "AS IS" and "AS AVAILABLE" Disclaimer

The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.

# Governing Law

The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.

# Disputes Resolution

If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.


# For European Union (EU) Users

If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.





# United States Legal Compliance

You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.


# Severability and Waiver

## Severability

If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

## Waiver

Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.

# Translation Interpretation

These Terms and Conditions may have been translated if We have made them available to You on our Service.
You agree that the original English text shall prevail in the case of a dispute.

# Changes to These Terms and Conditions

We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.

By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.

# Contact Us

If you have any questions about these Terms and Conditions, You can contact us:


- By email: Prominds.Capitol@gmail.com



- By phone number: 8374653210


- By mail: Miyapur, Hyderabad`
//checked ? setChecked(false) : setChecked(true)


//<VerifyPhone phoneNumber={values.phone}></VerifyPhone>