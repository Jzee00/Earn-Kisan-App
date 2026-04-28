import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Editprofile = () => {
    const navigation = useNavigation();
    const [editableField, setEditableField] = useState(null);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [phone, setPhone] = useState('+1234567890');
    const [address, setAddress] = useState('123 Main St, City, Country');
    const [password, setPassword] = useState('********');
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        console.log('Profile Updated:', { name, email, phone, address, password, profileImage });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.imagePlaceholder}>Pick an Image</Text>
                )}
            </TouchableOpacity>

            {[{ label: 'Name', value: name, setValue: setName },
              { label: 'Email', value: email, setValue: setEmail },
              { label: 'Address', value: address, setValue: setAddress },
              { label: 'Phone', value: phone, setValue: setPhone },
              { label: 'Password', value: password, setValue: setPassword, secureTextEntry: true }].map((field, index) => (
                <View key={index} style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderBottomWidth: 1 }]}
                        value={field.value}
                        onChangeText={field.setValue}
                        editable={editableField === field.label}
                        secureTextEntry={field.secureTextEntry}
                    />
                    <TouchableOpacity onPress={() => setEditableField(field.label)}>
                        <Ionicons name="pencil" size={20} color="gray" style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        top:30
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    imagePlaceholder: {
        color: '#555',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        borderBottomColor: '#ccc',
    },
    editIcon: {
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#3bb77e',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
});

export default Editprofile;
