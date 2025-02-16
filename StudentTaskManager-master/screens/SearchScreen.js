import React, { useState, useContext } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { TaskContext } from '../App';

export default function SearchScreen({ navigation }) {
  const { tasks } = useContext(TaskContext); // Përdorim TaskContext për të marrë detyrat
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrimi i detyrave bazuar në kërkimin e përdoruesit
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Krahaso me titullin
  );

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDetails}>Course: {item.course}</Text>
      <Text style={styles.taskDetails}>Priority: {item.priority}</Text>
      <Text style={styles.taskDetails}>Deadline: {item.deadline}</Text>
      <Text style={styles.taskDetails}>Progress: {item.progress}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  taskItem: {
    backgroundColor: '#fce4ec',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDetails: {
    fontSize: 14,
    color: '#777',
  },
  list: {
    paddingBottom: 20,
  },
});
