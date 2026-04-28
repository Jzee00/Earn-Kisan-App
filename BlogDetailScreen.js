import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const BlogDetailScreen = ({ route }) => {
  const { blog } = route.params;
  const [likes, setLikes] = useState(0);
  const likeScale = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
    Animated.sequence([
      Animated.timing(likeScale, { toValue: 1.3, duration: 200, useNativeDriver: true }),
      Animated.timing(likeScale, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: blog.blogImage }} style={styles.detailImage} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.description}>{blog.description}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>Sustainable farming is an essential practice that helps preserve resources and increase yields.</Text>
        <Image source={{ uri: blog.contentImages[0] }} style={styles.contentImage} />
        <Text style={styles.content}>Organic farming practices ensure that crops are grown without harmful chemicals, making them safer for consumption.</Text>
        <Image source={{ uri: blog.contentImages[1] }} style={styles.contentImage} />
        <Text style={styles.content}>By adopting these methods, farmers can contribute to a healthier planet and a more secure food system.</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={[styles.button, styles.likeButton]}> 
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <FontAwesome name="thumbs-up" size={22} color="white" />
          </Animated.View>
          <Text style={styles.buttonText}>Like ({likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('CommentScreen', { blogId: blog.id })} 
          style={[styles.button, styles.commentButton]}
        >
          <FontAwesome name="comments" size={22} color="white" />
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailImage: { width: '100%', height: 250, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10, paddingHorizontal: 15 },
  description: { fontSize: 16, color: '#666', marginBottom: 15, paddingHorizontal: 15 },
  contentContainer: { paddingHorizontal: 15 },
  content: { fontSize: 16, textAlign: 'justify', marginBottom: 10, color: '#444' },
  contentImage: { width: '100%', height: 220, borderRadius: 10, marginVertical: 15, resizeMode: 'cover' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 8, backgroundColor: '#007bff', width: '45%', justifyContent: 'center' },
  likeButton: { backgroundColor: '#007bff' },
  commentButton: { backgroundColor: '#28a745' },
  buttonText: { color: 'white', marginLeft: 8, fontSize: 16, fontWeight: 'bold' },
});

export default BlogDetailScreen;