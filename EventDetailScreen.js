import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const events = [
    {
      id: '1',
      title: 'Organic Farming Workshop',
      date: 'March 20, 2025',
      location: 'Lahore, Pakistan',
      organizer: 'Agri Pakistan',
      eventImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCEJZRIu_mtFfRGWpoO7ZJKqUzsxifNIuqg&s',
      description: 'Join our workshop on organic farming techniques and sustainable agriculture.',
      attendees: 150,
    },
    {
      id: '2',
      title: 'Farmers Market Expo',
      date: 'April 5, 2025',
      location: 'Islamabad, Pakistan',
      organizer: 'Pak Farmers Association',
      eventImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPtQ2qTW50BQPUfPqrwGRzEAAe03RmWZEng&s',
      description: 'A great opportunity to connect with local farmers and learn about fresh produce.',
      attendees: 200,
    },
];

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;
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
      <Image source={{ uri: event.eventImage }} style={styles.detailImage} resizeMode="cover" />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.location}>📍 {event.location}</Text>
      <Text style={styles.organizer}>Organizer: {event.organizer}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Text style={styles.content}>
        Sustainable farming is an essential practice that helps preserve resources and increase yields.
      </Text>

      <Text style={styles.attendees}>👥 {event.attendees} Attendees</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={[styles.button, styles.likeButton]}>
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <FontAwesome name="thumbs-up" size={22} color="white" />
          </Animated.View>
          <Text style={styles.buttonText}>Like ({likes})</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('CommentScreen', { eventId: event.id })} 
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
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  detailImage: { width: '100%', height: 250, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  date: { fontSize: 16, color: 'gray', marginBottom: 5 },
  location: { fontSize: 16, color: '#555', marginBottom: 5 },
  organizer: { fontSize: 16, fontWeight: '500', color: '#222', marginBottom: 5 },
  description: { fontSize: 18, marginVertical: 8, color: '#555' },
  attendees: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  content: { fontSize: 16, textAlign: 'justify', marginBottom: 10, color: '#444' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 8, width: '45%', justifyContent: 'center' },
  likeButton: { backgroundColor: '#007bff' },
  commentButton: { backgroundColor: '#28a745' },
  buttonText: { color: 'white', marginLeft: 8, fontSize: 16, fontWeight: 'bold' },
});

export default EventDetailScreen;
