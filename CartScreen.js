import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity as incrementItem, decrementQuantity as decrementItem, removeFromCart } from "../redux/CartReducer";
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart) || [];
  const total = cart.length > 0
    ? cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    : 0;

  const dispatch = useDispatch();

  const handleIncrementQuantity = (item) => {
    dispatch(incrementItem(item));
  };

  const handleDecrementQuantity = (item) => {
    dispatch(decrementItem(item));
  };
  const deleteItem=(item)=>{
    dispatch(removeFromCart(item))
  };

  const navigation=useNavigation();

  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          backgroundColor: "#3bb77e",
          padding: 13,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 4,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
          <TextInput placeholder='Search Items' style={{ flex: 1, paddingLeft: 10 }} />
        </Pressable>
        <MaterialIcons name="g-translate" size={24} color="black" />
      </View>

      <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#3bb77e" }}>SubTotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Rs. {total.toFixed(2)}</Text>
      </View>

      <Text style={{ marginHorizontal: 12 }}>Detail of the Product Available</Text>

      <Pressable

       onPress={()=>navigation.navigate("Confirm")}
        style={{
          backgroundColor: "#3bb77e",
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Proceed to Buy ({cart.length} items)
        </Text>
      </Pressable>

      <View style={{ height: 1, backgroundColor: "#D0D0D0", marginVertical: 16 }} />

      <View style={{ marginHorizontal: 10 }}>
        {cart.map((item, index) => (
          <View style={{ backgroundColor: 'white', marginVertical: 10, borderBottomColor: "#F0F0F0", borderWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }} key={index}>
            <Pressable style={{ marginVertical: 10, flexDirection: 'row', resizeMode: 'contain', justifyContent: 'space-between' }}>
              <View>
                <Image
                  style={{ height: 140, width: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View>
                <Text style={{ width: 150, marginTop: 10, fontSize: 18 }} numberOfLines={2}>{item?.title}</Text>
                <Text style={{ color: "#3bb77e", fontSize: 20, marginTop: 7 }}>Rs. {item?.price}</Text>
                <View style={{ marginVertical: 10, flexDirection: 'row', resizeMode: 'contain' }}>
                  <Text style={{ fontSize: 15, color: 'grey' }}>Available in Stock </Text>
                </View>
              </View>
            </Pressable>
            <Pressable style={{ marginTop: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => handleDecrementQuantity(item)}
                    style={{ backgroundColor: "#D8D8D8", padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable 
                  onPress={()=>deleteItem(item)}
                  style={{ backgroundColor: "#D8D8D8", padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable>
                  <Text style={{ fontSize: 18, color: '#3bb77e', paddingLeft: 10, paddingRight:10 }}>{item?.quantity} </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleIncrementQuantity(item)}
                  style={{ backgroundColor: "#D8D8D8", padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
                  <AntDesign name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable style={{
                backgroundColor: 'white',
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6
              }}>
                <Text  onPress={()=>deleteItem(item)}>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 }}>
              <Pressable style={{
                backgroundColor: 'white',
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6
              }}>
                <Text>Save for Later</Text>
              </Pressable>
              <Pressable style={{
                backgroundColor: 'white',
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6
              }}><Text>See More Like This</Text></Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
