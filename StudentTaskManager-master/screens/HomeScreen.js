// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskContext } from '../App'; // Importimi i TaskContext

export default function HomeScreen({ navigation }) {
  const { tasks } = useContext(TaskContext); // Përdorimi i TaskContext për marrjen e detyrave

  const renderTask = ({ item }) => {
    return (
      <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate('AddTask', { task: item })}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDetails}>Course: {item.course}</Text>
        <Text style={styles.taskDetails}>Priority: {item.priority}</Text>
        <Text style={styles.taskDetails}>Deadline: {item.deadline}</Text>
        <Text style={styles.taskDetails}>Progress: {item.progress}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Task"
          onPress={() => navigation.navigate('AddTask')}
        />
        <Button
          title="View Analytics"
          onPress={() => navigation.navigate('Analytics')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDetails: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
