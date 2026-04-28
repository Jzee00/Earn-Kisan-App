import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const events = [
  {
    id: '1',
    title: 'Organic Farming Workshop',
    date: 'March 20, 2025',
    location: 'Lahore, Pakistan',
    organizer: 'Agri Pakistan',
    eventImage: '\https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCEJZRIu_mtFfRGWpoO7ZJKqUzsxifNIuqg&s',
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

const EventsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetail', { event: item })}>
            <Image source={{ uri: item.eventImage }} style={styles.eventImage} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.location}>📍 {item.location}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.attendees}>👥 {item.attendees} Attendees</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.eventImage }} style={styles.detailImage} resizeMode="cover" />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.location}>📍 {event.location}</Text>
      <Text style={styles.organizer}>Organizer: {event.organizer}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.attendees}>👥 {event.attendees} Attendees</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  card: { marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  eventImage: { width: '100%', height: 180, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#333' },
  date: { fontSize: 14, color: 'gray', marginBottom: 5 },
  location: { fontSize: 14, color: '#555', marginBottom: 5 },
  description: { fontSize: 16, marginVertical: 8, color: '#555' },
  attendees: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  detailImage: { width: '100%', height: 250, borderRadius: 10, marginBottom: 10 },
  organizer: { fontSize: 16, fontWeight: '500', color: '#222', marginBottom: 5 },
});

export default EventsScreen;
