import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, Image, TextInput, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import { useState } from 'react';

const ProductInfoScreen = () => {
    const { width } = Dimensions.get("window");
    const navigation = useNavigation();
    const height = (width * 100) / 100;
    const [addedToCart, setAddedToCart] = useState(false);
    const route = useRoute();
    const dispatch = useDispatch();

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };

    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    
    return (
        <ScrollView style={{ flex: 1, marginTop: 50, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <View style={{
                backgroundColor: "#3bb77e",
                padding: 13,
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Pressable style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 7,
                    gap: 10,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    height: 38,
                    flex: 1,
                    paddingLeft: 10
                }}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput placeholder='Search Items' style={{ flex: 1 }} />
                </Pressable>
                <MaterialIcons name="g-translate" size={24} color="black" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params?.carouselImages?.map((item, index) => (
                    <ImageBackground 
                        key={index} 
                        style={{ width, height, marginTop: 25, resizeMode: 'cover' }} 
                        source={{ uri: item }}
                    >
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#E0E0E0",
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 10,
                            right: 10
                        }}>
                            <Feather name="share-2" size={24} color="black" />
                        </View>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#E0E0E0",
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 20,
                            left: 20
                        }}>
                            <Feather name="heart" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route?.params?.title}</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 6, color: "#3bb77e" }}>
                    {route?.params?.price ? `Rs.${route.params.price}` : ''}
                </Text>
            </View>
            
            {/* Product Description */}
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: '#555' }}>
                    {route?.params?.description || ''}
                </Text>
            </View>
            
            <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1, marginVertical: 10 }} />
            
            {/* Reviews Section */}
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Reviews</Text>
                {route?.params?.reviews?.length > 0 ? (
                    route.params.reviews.map((review, index) => (
                        <View key={index} style={{ marginTop: 8, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{review.user}</Text>
                            <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{review.comment}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ fontSize: 14, color: '#555', marginTop: 6 }}>No reviews yet.</Text>
                )}
            </View>
            
            <TouchableOpacity 
                onPress={() => addItemToCart(route?.params)}
                style={{
                    backgroundColor: "#3bb77e",
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    marginHorizontal: 10,
                    marginVertical: 10
                }}>
                <Text style={{ color: "white" }}>{addedToCart ? "Added to Cart" : "Add to Cart"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                marginHorizontal: 10,
                marginVertical: 10
            }}>
                <Text style={{ color: "white" }}>Buy Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
