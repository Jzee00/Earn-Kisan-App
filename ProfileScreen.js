import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Uncomment this if you have a UserContext
// import { UserType } from "../context/UserContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const { userId, setUserId } = useContext(UserType); // Ensure UserContext is set up
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: "#00CED1" },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
          // source={require('../assets/logo.png')} // Ensure this path is correct
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 12 }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, [navigation]);

  const Logout = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth token cleared");
    navigation.navigate("Login");
  };

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`); // Replace localhost with 10.0.2.2 for Android emulator
  //       setOrders(response.data.orders || []);
  //     } catch (error) {
  //       console.log("Error fetching orders:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userId) {
  //     fetchOrders();
  //   }
  // }, [userId]);

  return (
    <ScrollView style={{ padding: 10, backgroundColor: "white", flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome {user?.name || "Guest"}
      </Text>

      {/* Profile Action Buttons */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.button}>
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Setting</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'center' }}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("Blogs")}
        
        style={styles.button}>
          <Text style={styles.buttonText}>Blogs</Text>
        </TouchableOpacity>
        <TouchableOpacity         onPress={()=>navigation.navigate("Events")} style={styles.button}>
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
          <Text style={styles.buttonText}>Buy Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Logout} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Orders Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={styles.orderContainer}
              key={order._id}
            >
              {order.products.slice(0, 1).map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#3bb77e",
    borderRadius: 22,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  orderContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bd0b0b",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
