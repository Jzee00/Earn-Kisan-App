import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';
import  axios  from 'axios';
import { useNavigation } from '@react-navigation/native';

const steps = [
    { title: 'Address', content: 'Delivery Address' },
    { title: 'Delivery', content: 'Delivery Option' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
];

const addresses = [
    {
        id: '1',
        name: 'Ali Khan',
        address: '#123, Near Jinnah Hospital\nLahore, Pakistan',
        phone: '03001234567',
        pin: '54000',
    },
    {
        id: '2',
        name: 'Hassan Raza',
        address: '#45, Near Mall Road\nKarachi, Pakistan',
        phone: '03121234567',
        pin: '74000',
    },
    {
        id: '3',
        name: 'Saad Ahmed',
        address: '#90, Near Gulberg Plaza\nIslamabad, Pakistan',
        phone: '03231234567',
        pin: '44000',
    },
];

const ConfirmationScreen = () => {
    const cart = useSelector((state) => state.cart.cart) || [];
  const total = cart.length > 0
    ? cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    : 0;
    const dispatch =useDispatch();
    const navigation= useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
    const [option, setOption] = useState(false);
    const [selectedoption, setSelectedOption] = useState("");
    // const {userId,setUserId}=useContext(UserType)
    // const [addresses, setAddresses]=useState([]);
    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedoption
            };
    
            const response = await axios.post("http://localhost:8000/orders", orderData);
    
            if (response.status === 201) { // 201 is typically for successful resource creation
                navigation.navigate("Order"); 
                dispatch(cleanCart());
                console.log("Order created successfully", response.data.order);
            } else {
                console.error("Error creating order", response.data);
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };    

    return (
        <ScrollView style={{ marginTop: 55 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                {/* Step Progress UI */}
                <View style={styles.progressContainer}>
                    {steps.map((step, index) => (
                        <View key={index} style={styles.stepItem}>
                            {index > 0 && (
                                <View style={[styles.line, index <= currentStep && styles.activeLine]} />
                            )}
                            <View style={[styles.circle, index < currentStep && styles.activeCircle]}>
                                <Text style={styles.stepText}>{index < currentStep ? '✔' : index + 1}</Text>
                            </View>
                            <Text style={styles.stepLabel}>{step.title}</Text>
                        </View>
                    ))}
                </View>

                {/* Address Selection */}
                {currentStep === 0 && (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.addressBox, selectedAddress === item.id && styles.selectedBox]}>
                                <TouchableOpacity
                                    style={styles.radioContainer}
                                    onPress={() => setSelectedAddress(item.id)}
                                >
                                    <View style={[styles.radioOuter, selectedAddress === item.id && styles.radioOuterSelected]}>
                                        {selectedAddress === item.id && <View style={styles.radioInner} />}
                                    </View>
                                    <View>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.details}>{item.address}</Text>
                                        <Text style={styles.details}>Phone No: {item.phone}</Text>
                                        <Text style={styles.details}>Pin Code: {item.pin}</Text>
                                    </View>
                                </TouchableOpacity>
                                {selectedAddress === item.id && (
                                    <TouchableOpacity
                                        onPress={() => setCurrentStep(1)}
                                        style={styles.selectedButton}>
                                        <Text style={styles.buttonText}>Deliver to this Address</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    />
                )}

                {/* Delivery UI */}
                {currentStep === 1 && (
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#3bb77e" }}>Choose your Delivery Option </Text>
                        <View style={{
                            flexDirection: 'row', alignItems: "center", backgroundColor: "white", padding: 8,
                            gap: 7,
                            borderWidth: 1,
                            borderColor: "#D0D0D0",
                            marginTop: 10
                        }}>

                            {
                                option ? (
                                    <FontAwesome5
                                        name="dot-circle" size={24} color="#3bb77e" />
                                ) : (

                                    <Entypo onPress={() => setOption(!option)}
                                        name="circle" size={24} color="grey" />
                                )
                            }

                            <Text style={{ flex: 1 }}>
                                <Text style={{ color: "#3bb77e", fontWeight: "500" }}> Tomorrow by 10 PM</Text>
                                - Free Delivery with your Daliy members
                            </Text>

                        </View>
                        <TouchableOpacity
                            onPress={() => setCurrentStep(2)}
                            style={{ backgroundColor: "#3bb773", padding: 10, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Contiue</Text>
                        </TouchableOpacity>

                    </View>

                )}
            </View>


            {/* Payment ui*/}
            {
               currentStep === 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3bb77e" }}>
                        Choose your Payment Method
                    </Text>
            
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedoption === "cash" ? (
                            <FontAwesome5 name="dot-circle" size={24} color="#3bb77e" />
                        ) : (
                            <Entypo onPress={() => setSelectedOption("cash")} name="circle" size={24} color="grey" />
                        )}
                        <Text>Cash On Delivery</Text>
                    </View>
            
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedoption === "card" ? (
                            <FontAwesome5 name="dot-circle" size={24} color="#3bb77e" />
                        ) : (
                            <Entypo
                             onPress={() => {setSelectedOption("card");
                                Alert.alert("Debit Cart", "Pay Online",[
                                    {
                                          text:"Cancel",
                                          onPress:()=>console.log("cancel is Pressed")
                                    },
                                    {
                                        text:"ok",
                                        onPress:()=>pay(),
                                    }
                                ])
                             }
                             }
                             name="circle" size={24} color="grey" />
                        )}
                        <Text>Credit Card / Debit Card</Text>
                    </View>
                    <TouchableOpacity
                            onPress={() => setCurrentStep(3)}
                            style={{ backgroundColor: "#3bb773", padding: 10, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Contiue</Text>
                        </TouchableOpacity>
                </View>
            )
            }



            {/*Place Order ui*/}

            {
                currentStep ===3 && selectedoption==="cash" &&(
                    <View style={{marginHorizontal:20}}>
                        <Text style={{fontSize:20, fontWeight:"bold", color:"#3bb77e"}}>Order Now</Text>

                        <View style={{flexDirection:"row",
                            alignItems:'center',
                            justifyContent:'space-between',
                            gap:8,
                            backgroundColor:'white',
                            padding:8,
                            borderColor:"#D0D0D0",
                            borderWidth:1,
                            marginTop:10
                        }}>
                            <View>
                                <Text style={{fontSize:17, fontWeight:"bold"}}>Save 5% and never run out</Text>
                                <Text style={{fontSize:15, color:'grey', marginTop:5}}>Trun on auto deliveries</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </View>
                        <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
                            <Text style={{}}>Shipping To: {selectedAddress?.name}</Text>

                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:8}}>
                                <Text sty={{fontSize:16,fontWeight:"500",color:"#3bb77e "}}>Items:</Text>
                                <Text style={{color:"grey", fontSize:16}}>Qun: {total}</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:8}}>
                                <Text sty={{fontSize:16,fontWeight:"500",color:"#3bb77e "}}>Delivery:</Text>
                                <Text style={{color:"grey", fontSize:16}}>No</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:8}}>
                                <Text sty={{fontSize:20,fontWeight:"500",color:"#3bb77e "}}>Total:</Text>
                                <Text style={{color:"#C60C63", fontSize:20}}>Rs. {total}</Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:"white",borderColor:"#D0D0D0", padding:8,
                            borderWidth:1,marginTop:10
                        }}>
                            <Text style={{fontSize:16, color:"grey"}}> Pay With</Text>
                            <Text style={{fontSize:16,fontWeight:"600", marginTop:7}}>Pay on Delivery (Cash)</Text>
                        </View>

                        <TouchableOpacity 
                        onPress={handlePlaceOrder}
                        
                        
                        style={{backgroundColor:"#3bb77e",padding:10,borderRadius:18,justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <Text >Place Your Order</Text>
                        </TouchableOpacity>

                    </View>
                )
            }
            
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stepItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // line: {

    //     height: 5,
    //     backgroundColor: '#ccc',
    // },
    activeLine: {
        backgroundColor: 'green',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCircle: {
        backgroundColor: 'green',
    },
    stepText: {
        color: 'white',
        fontWeight: 'bold',
    },
    stepLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3bb77e',
    },
    addressBox: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedBox: {
        borderColor: '#3bb77e',
        borderWidth: 2,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioOuterSelected: {
        borderColor: '#3bb77e',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3bb77e',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButton: {
        marginTop: 10,
        backgroundColor: '#3bb77e',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },


});

export default ConfirmationScreen;