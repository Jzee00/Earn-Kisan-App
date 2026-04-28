import React, { useState } from 'react';
import { 
    SafeAreaView, View, Image, TextInput, Pressable, Text, TouchableOpacity, ScrollView,
    Alert
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const handleRegister =()=>{
        const user={
            name:name,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            phoneNumber:phoneNumber,
            address:address,
        };

        //send a post request to the APi
        axios.post("http://localhost:8000/register", user).then((response)=>{
            console.log(response);
            Alert.alert("Registration Successfully", "You have registered successfully");
            setAddress("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
        }).catch((error)=>{
            Alert.alert("Registration Error", "An Error ouccred during registration");
            console.log("registration failed", error)
        })
        
       

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                <View>
                    <Image
                        style={{ width: 150, height: 130, marginTop: 20 }}
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyIa5Z5SZZpxcSdA41bTo1D-yW2b6bxYsEgA&s.png" }}
                    />
                </View>

                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3bb77e', marginTop: 20 }}>Sign Up</Text>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <MaterialIcons name="person" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Name'
                    />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <MaterialIcons name="email" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Email'
                        keyboardType='email-address'
                    />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <MaterialIcons name="phone" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Phone Number'
                        keyboardType='phone-pad'
                    />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <MaterialIcons name="home" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Address'
                    />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <AntDesign name="lock" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Password'
                        secureTextEntry
                    />
                </View>

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <AntDesign name="lock" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Confirm Your Password'
                        secureTextEntry
                    />
                </View>

                <Pressable  onPress={handleRegister} style={{ marginTop: 30, width: 200, backgroundColor: '#3bb77e', borderRadius: 8, padding: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Sign Up</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ marginTop: 15, color: 'grey', fontSize: 16 }}>Already have an account? Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
