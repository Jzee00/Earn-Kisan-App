import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, View, Image, TextInput, Pressable, Text, TouchableOpacity, Alert 
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(()=>{
        const checkLoginStatus =async()=>{
            try{
                const token=await AsyncStorage.getItem("authToken");

                if (token){
                    navigation.replace("Main")
                }
            }catch(err){
                console.log("error message", err)
            }
        };
        checkLoginStatus();
    }, [])

    const handleLogin = async () => {
        const user = { email, password };

        try {
            const response = await axios.post("http://localhost:8000/login", user);
            console.log(response);
            const token = response.data.token;
            await AsyncStorage.setItem("authToken", token);
            navigation.replace("Main");
        } catch (error) {
            Alert.alert("Login Error", "Invalid credentials");
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Image
                    style={{ width: 150, height: 130, marginTop: 50 }}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyIa5Z5SZZpxcSdA41bTo1D-yW2b6bxYsEgA&s.png" }}
                />
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3bb77e' }}>Login</Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <MaterialIcons name="email" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Email'
                        keyboardType='email-address'
                    />
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f8f8f8', width: 320 }}>
                    <AntDesign name="lock" size={24} color="grey" style={{ marginRight: 10 }} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{ flex: 1, fontSize: 16, color: 'black' }}
                        placeholder='Enter Your Password'
                    />
                </View>
            </View>

            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', width: 320 }}>
                <Text>Keep me logged in</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#3bb77e', fontWeight: '600' }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: '#3bb77e', borderRadius: 8, padding: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Login</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ marginTop: 15, color: 'grey', fontSize: 16 }}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
