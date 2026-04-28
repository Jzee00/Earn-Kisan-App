import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  PermissionsAndroid,
  Platform,
} from "react-native";

import { ListItem, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request Permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
    setModalVisible(false);
  };

  const takePhotoWithCamera = async () => {
    launchCamera({ mediaType: "photo", quality: 1, saveToPhotos: true }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="#000" size={28} />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: imageUri || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.name}>Jzee Mayo</Text>
        <Text style={styles.email}>Your email goes here</Text>
      </View>
      <FlatList
        data={[
          { id: "1", title: "Edit Profile", icon: "edit", screen: "Editprofile" },
          { id: "2", title: "Orders", icon: "receipt", screen: "Orders" },
          // { id: "3", title: "Coupons", icon: "local-offer", screen: "Coupons" },
          { id: "4", title: "My Cart", icon: "shopping-cart", screen: "MyCart" },
          { id: "5", title: "Addresses", icon: "location-on", screen: "Addresses" },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => navigation.navigate(item.screen)}>
            <Icon name={item.icon} color="#000" />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Icon name="chevron-right" />
          </ListItem>
        )}
        contentContainerStyle={styles.menu}
      />
      <Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption} onPress={pickImageFromGallery}>
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={takePhotoWithCamera}>
              <Text style={styles.modalText}>Take from Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                setViewImage(true);
              }}
            >
              <Text style={styles.modalText}>View Profile Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={viewImage} animationType="fade" onRequestClose={() => setViewImage(false)}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: imageUri || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={styles.fullImage} />
          <TouchableOpacity style={styles.modalCancel} onPress={() => setViewImage(false)}>
            <Text style={styles.modalCancelText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: { position: "absolute", top: 30, left: 20, zIndex: 10 },
  header: { alignItems: "center", paddingVertical: 30, backgroundColor: "#E8F5E9", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginTop: 40 },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 15 },
  email: { fontSize: 14, color: "gray" },
  menu: { paddingBottom: 50, marginBottom: 40 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "#fff", borderRadius: 10, paddingVertical: 20, alignItems: "center" },
  modalOption: { padding: 15, width: "100%", alignItems: "center" },
  modalText: { fontSize: 16 },
  modalCancel: { marginTop: 10, padding: 10 },
  modalCancelText: { fontSize: 16, color: "red" },
  fullImage: { width: 300, height: 300, borderRadius: 10 },
});

export default Profile;
