import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const blogs = [
  {
    id: '1',
    title: 'Sustainable Farming Practices',
    date: 'March 12, 2025',
    author: 'John Doe',
    authorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU-rxXTrx4QdTdwIpw938VLL8EuJiVhCelkQ&s',
    blogImage: 'https://static.wixstatic.com/media/cbc1ea_9d53078c927f43c4bae3d4184a190408~mv2.png/v1/fill/w_568,h_332,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cbc1ea_9d53078c927f43c4bae3d4184a190408~mv2.png',
    description: 'Learn about the latest sustainable farming practices that help improve yield and conserve resources.',
    contentImages: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3lNbG-f0DlRrttifpbadd2XTTDb85Im2PGBSAbjC1tA6hLo9WmvnsKYFct08a-kuYKY&usqp=CAU'],
    likes: 120,
    comments: 45,
  },
  {
    id: '2',
    title: 'Organic Crop Growth Tips',
    date: 'March 10, 2025',
    author: 'Jane Smith',
    authorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQYGIdsOunkRXCHtn_ljTrveDy_n8Ubul9pw&s',
    blogImage: 'https://via.placeholder.com/300',
    description: 'Discover tips for growing organic crops efficiently and naturally.',
    contentImages: ['https://via.placeholder.com/400'],
    likes: 95,
    comments: 30,
  },
];

const BlogScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BlogDetail', { blog: item })}>
            <Image source={{ uri: item.blogImage }} style={styles.blogImage} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.authorContainer}>
              <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
              <Text style={styles.authorName}>{item.author}</Text>
            </View>
            <View style={styles.interactions}>
              <Text style={styles.likes}>👍 {item.likes} Likes</Text>
              <Text style={styles.comments}>💬 {item.comments} Comments</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  card: { marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  blogImage: { width: '100%', height: 180, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#333' },
  date: { fontSize: 14, color: 'gray', marginBottom: 5 },
  description: { fontSize: 16, marginVertical: 8, color: '#555' },
  authorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  authorImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  authorName: { fontSize: 16, fontWeight: '500', color: '#222' },
  contentImage: { width: '100%', height: 180, borderRadius: 10, marginTop: 10 },
  interactions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  likes: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  comments: { fontSize: 14, color: '#333', fontWeight: 'bold' },
});

export default BlogScreen;
