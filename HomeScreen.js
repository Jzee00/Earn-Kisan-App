import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, Image, TextInput, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import ProductItem from '../components/productItem.js'
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import Category from '../components/Category.js';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState([]);
  const [category, setCategory] = useState("jewewlery");
  const [items, setItem] = useState([
    { label: "Jewelery", value: 'jewewlery' },
    { label: "Fruits", value: 'fruits' },
    // { label: "Vegetables", value: 'vegetables' },
    { label: "Grains", value: 'gains' },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Women's clothing", value: "women's clothing" },
    

  ])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        console.log("Products fetched:", response.data); // Log inside fetchData to ensure updated data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false)
  }, []);

  const cart = useSelector((state) => state.cart?.cart || []);
  const [modalvisible, setModalVisible] =useState(false);
  const images = [
    "https://th.bing.com/th/id/OIP.jPcgQQiDbJzQMCICo_kv1gHaFy?rs=1&pid=ImgDetMain",
    "https://cdn.vectorstock.com/i/preview-1x/46/19/berries-and-fruits-seamless-pattern-border-vector-40034619.jpg",
    "https://static.vecteezy.com/system/resources/previews/013/762/519/original/fruit-and-berry-banner-with-border-of-farm-product-vector.jpg"
  ];
  const deals = [
    {
      id: "1",
      title: "Fresh Apple Pack (1kg)",
      oldPrice: 300,
      price: 250,
      image: "https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXRzfGVufDB8fDB8fHww",
      carouselImages: [
        "https://example.com/images/apple1.jpg",
        "https://example.com/images/apple2.jpg",
        "https://example.com/images/apple3.jpg",
        "https://example.com/images/apple4.jpg"
      ],
      category: "Fruits",
      size: "1kg"
    },
    {
      id: "2",
      title: "Juicy Mango Basket (5kg)",
      oldPrice: 1200,
      price: 999,
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
      carouselImages: [
        "https://example.com/images/mango1.jpg",
        "https://example.com/images/mango2.jpg",
        "https://example.com/images/mango3.jpg",
        "https://example.com/images/mango4.jpg"
      ],
      category: "Fruits",
      size: "5kg"
    },
    {
      id: "3",
      title: "Premium Wheat Flour (10kg)",
      oldPrice: 500,
      price: 450,
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
      carouselImages: [
        "https://example.com/images/wheat1.jpg",
        "https://example.com/images/wheat2.jpg",
        "https://example.com/images/wheat3.jpg",
        "https://example.com/images/wheat4.jpg"
      ],
      category: "Grains",
      size: "10kg"
    },
    {
      id: "4",
      title: "Cotton Fabric Rolls (20m)",
      oldPrice: 1500,
      price: 1300,
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
      carouselImages: [
        "https://example.com/images/cotton1.jpg",
        "https://example.com/images/cotton2.jpg",
        "https://example.com/images/cotton3.jpg",
        "https://example.com/images/cotton4.jpg"
      ],
      category: "Textile",
      size: "20m"
    },
    // {
    //   id: "5",
    //   title: "Basmati Rice (5kg)",
    //   oldPrice: 800,
    //   price: 700,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/rice1.jpg",
    //     "https://example.com/images/rice2.jpg",
    //     "https://example.com/images/rice3.jpg",
    //     "https://example.com/images/rice4.jpg"
    //   ],
    //   category: "Grains",
    //   size: "5kg"
    // },
    // {
    //   id: "6",
    //   title: "Organic Sugarcane Juice (1L)",
    //   oldPrice: 150,
    //   price: 120,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/sugarcane1.jpg",
    //     "https://example.com/images/sugarcane2.jpg",
    //     "https://example.com/images/sugarcane3.jpg",
    //     "https://example.com/images/sugarcane4.jpg"
    //   ],
    //   category: "Beverages",
    //   size: "1L"
    // },
    // {
    //   id: "7",
    //   title: "Golden Wheat Grains (25kg)",
    //   oldPrice: 1300,
    //   price: 1100,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/wheat5.jpg",
    //     "https://example.com/images/wheat6.jpg",
    //     "https://example.com/images/wheat7.jpg",
    //     "https://example.com/images/wheat8.jpg"
    //   ],
    //   category: "Grains",
    //   size: "25kg"
    // },
    // {
    //   id: "8",
    //   title: "Farm Fresh Mangoes (10kg)",
    //   oldPrice: 2500,
    //   price: 2200,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/mango5.jpg",
    //     "https://example.com/images/mango6.jpg",
    //     "https://example.com/images/mango7.jpg",
    //     "https://example.com/images/mango8.jpg"
    //   ],
    //   category: "Fruits",
    //   size: "10kg"
    // },
    // {
    //   id: "9",
    //   title: "Soft Cotton Bedsheets (Set of 3)",
    //   oldPrice: 1800,
    //   price: 1600,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/cotton5.jpg",
    //     "https://example.com/images/cotton6.jpg",
    //     "https://example.com/images/cotton7.jpg",
    //     "https://example.com/images/cotton8.jpg"
    //   ],
    //   category: "Textile",
    //   size: "Set of 3"
    // },
    // {
    //   id: "10",
    //   title: "Raw Sugarcane (20 sticks)",
    //   oldPrice: 500,
    //   price: 450,
    //   image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
    //   carouselImages: [
    //     "https://example.com/images/sugarcane5.jpg",
    //     "https://example.com/images/sugarcane6.jpg",
    //     "https://example.com/images/sugarcane7.jpg",
    //     "https://example.com/images/sugarcane8.jpg"
    //   ],
    //   category: "Agriculture",
    //   size: "20 sticks"
    // }
  ];
  const offers = [
    {
        id: "#0",
        title: "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC",
        offer: "72% off",
        ofPrice: 7500,
        price: 4500,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/612y1FCAJL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71D0CpYhILL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71LhL7QhIrL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61RgefYnddL._SX679_.jpg"
        ],
        color: "Green",
        size: "Normal",
        description: "Experience high-quality sound with Oppo Enco Air3 Pro, featuring industry-first Composite Bamboo Fiber diaphragm for enhanced audio clarity. 49dB ANC ensures an immersive listening experience.",
        review: "Great sound quality with deep bass. ANC works well for the price. Battery life is impressive! - 4.5/5"
    },
    {
        id: "#1",
        title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
        offer: "15% off",
        ofPrice: 24999,
        price: 21249,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/71bhWgQK-cL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61J34I72z9L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61NGnpjoRDL._SX679_.jpg"
        ],
        color: "White",
        size: "Normal",
        description: "Enjoy premium sound with Apple AirPods Pro 2nd Gen, featuring Active Noise Cancellation, Adaptive Transparency, and a MagSafe Charging Case for seamless connectivity.",
        review: "Apple's best AirPods yet! Amazing noise cancellation and sound quality. Battery life is also much improved. - 4.8/5"
    },
    {
        id: "#2",
        title: "Samsung Galaxy Buds2 Pro True Wireless Earbuds with Intelligent ANC",
        offer: "20% off",
        ofPrice: 17999,
        price: 14399,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/51NKoH1a96L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61vXH2YHiML._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61P6ZUw6vlL._SX679_.jpg"
        ],
        color: "Graphite",
        size: "Normal",
        description: "Samsung Galaxy Buds2 Pro offers superior ANC, high-fidelity sound, and 360 Audio for an immersive experience. Perfect fit with IPX7 water resistance.",
        review: "Great for Samsung users! The ANC is excellent, and the fit is super comfortable. - 4.6/5"
    },
    {
        id: "#3",
        title: "Sony WF-1000XM4 Industry Leading Noise Cancelling Truly Wireless Earbuds",
        offer: "30% off",
        ofPrice: 24990,
        price: 17490,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/51+zJbTL3PL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61y2VVWcGBL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71F6kU-dK+L._SX679_.jpg"
        ],
        color: "Black",
        size: "Normal",
        description: "Sony WF-1000XM4 offers industry-leading noise cancellation, crystal-clear call quality, and exceptional battery life for all-day listening.",
        review: "Absolutely fantastic noise cancellation and audio quality. A bit bulky but worth it! - 4.7/5"
    },
    {
        id: "#4",
        title: "OnePlus Buds Pro 2 with Smart Adaptive Noise Cancellation",
        offer: "25% off",
        ofPrice: 11999,
        price: 8999,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/618HQ9DAPQL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71a7Ajr+uYL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71p45Fc7PbL._SX679_.jpg"
        ],
        color: "Obsidian Black",
        size: "Normal",
        description: "OnePlus Buds Pro 2 offers adaptive noise cancellation, spatial audio, and a comfortable fit for premium listening experience.",
        review: "Good value for money! Sound is great, and ANC is decent. The case is compact and stylish. - 4.5/5"
    },
    {
        id: "#5",
        title: "Jabra Elite 7 Active In-Ear Bluetooth Earbuds with ShakeGrip™ Technology",
        offer: "40% off",
        ofPrice: 15999,
        price: 9599,
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        carouselImages: [
            "https://m.media-amazon.com/images/I/61dCdh3McWL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61c9zXhrxoL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61OjYqNW9EL._SX679_.jpg"
        ],
        color: "Navy Blue",
        size: "Normal",
        description: "Jabra Elite 7 Active with ShakeGrip™ ensures a secure fit, deep bass, and top-notch call quality for an active lifestyle.",
        review: "Perfect for workouts! The grip is amazing, and the sound is balanced. Battery life is solid. - 4.6/5"
    }
];




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 40 : 0,
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <ScrollView>
        <View style={{
          backgroundColor: "#3bb77e",
          padding: 13,
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Pressable 

         
          
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 4,
            height: 38,
            flex: 1
          }}>
            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
            <TextInput placeholder='Search Items' style={{ paddingRight: 45 }} />
          </Pressable>
          <MaterialIcons name="g-translate" size={24} color="black" />
        </View>
        <Pressable 

         onPress={()=>setModalVisible(!modalvisible)}
        style={{ flexDirection: "row", alignItems: 'center', gap: 5, padding: 10, backgroundColor: '#89D3B1' }}>
          <EvilIcons name="location" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Deliver to Jzee -- Raiwind 55150</Text>
          </Pressable>
          <Entypo name="chevron-down" size={24} color="black" />
        </Pressable>
         <Category/>


        {/* Custom Auto Sliding Image Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(slideIndex);
          }}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={{ width, height: 200, resizeMode: 'cover' }} />
          ))}
        </ScrollView>

        {/* Dots Indicator */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {images.map((_, index) => (
            <View key={index} style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: currentIndex === index ? '#3bb77e' : '#90A4AE',
              marginHorizontal: 5
            }} />

          ))}

        </View>
        <Text style={{ padding: 12, fontSize: 21, fontWeight: "bold", color: "#3bb77e" }}>Papular Deals</Text>
        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
          {deals.map((item, index) => (
            <Pressable 
            onPress={() =>
              navigation.navigate("Info", {
                id: item?.id,
                title: item?.title,
                price: item?.price,
                carouselImages: item?.carouselImages,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item ?? {},
              })}
              style={{
                marginVertical:10,
                flexDirection:'row',
                alignItems:'center'
              }}
            
            
            key={item.id}>
              <Image style={{ width: 180, height: 180, resizeMode: "contain", marginTop: 12 }} source={{ uri: item?.image }} />
            </Pressable>
          ))}
        </View>
        <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 2, marginTop: 15 }} />
        <Text style={{ padding: 10, fontSize: 21, fontWeight: 'bold', color: '#3bb77e' }}>Today's Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Info", {
                  id: item?.id,
                  title: item?.title,
                  price: item?.price,
                  carouselImages: item?.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item ?? {},
                })
              }
              style={{ marginVertical: 10, alignItems: "center", justifyContent: 'center' }}  >
              <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: item?.image }} />
              <View style={{
                backgroundColor: "#3bb77e", paddingVertical: 5,
                width: 130,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 5
              }}>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: "bold", color: 'white' }}>Rs.{item?.price}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 2, marginTop: 15 }} />

        <View style={{ marginHorizontal: 10, marginTop: 20, width: "45%", marginBottom: open ? 50 : 15, }}>
          <DropDownPicker style={{
            borderColor: "#B7B7B7", height: 30,
            marginBottom: open ? 120 : 15,
          }} open={open} value={category} items={items} setOpen={setOpen} setValue={setCategory} setItem={setItem}
            placeholder="Choose Category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          >

          </DropDownPicker>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          {products?.filter((item) => item.category === category).map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}

        </View>


      </ScrollView>
    </SafeAreaView>


     {/* <BottomModal  onBackdropPress={()=>setModalVisible(!modalvisible)}
      swipeDirection={["up","down"]}
      swipeThreshold={200}
      modalAnimation={
        new SlideAnimation({
          slideFrom:"bottom"
        })
      }
      onHardwareBackPress={()=>setModalVisible(!modalvisible)}
      visible={modalvisible}
      onTouchOutside={()=>setModalVisible(!modalvisible)}
      
      
      >
        <ModalContent  style={{width:"100%", height:400}}>
          <View style={{marginBottom:8}}>
            <Text style={{fontSize:19, fontWeight:"bold", color:"#3bb77e"}}>Choose your Location</Text>
            <Text style={{marginTop:6, fontSize:15, fontWeight:"500", color:'grey'}}>Select location for search the product </Text>
          </View>
        </ModalContent>

     </BottomModal> */}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
