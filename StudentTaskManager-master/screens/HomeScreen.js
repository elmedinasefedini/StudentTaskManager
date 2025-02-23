import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Animated, ImageBackground, Modal } from 'react-native';
import { TaskContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CircularProgress } from 'react-native-circular-progress';

export default function HomeScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    console.log('Home Screen mounted!');
  }, []);

  const handleDelete = (taskId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
            fadeAnim.setValue(1);
          });
        },
      },
    ]);
  };

  const renderTask = ({ item }) => {
    const progressColor = item.progress === 100 ? '#D64E84' : item.progress >= 50 ? '#FF69B4' : '#FF1493';

    return (
      <Animated.View style={[styles.taskItem, { opacity: fadeAnim }]}>        
        <TouchableOpacity style={styles.taskDetailsContainer} onPress={() => navigation.navigate('AddTask', { task: item })}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDetails}>Course: {item.course}</Text>
          <Text style={styles.taskDetails}>Deadline: {item.deadline}</Text>
          <View style={styles.priorityContainer}>
            <Icon name={item.priority === 'High' ? 'flag' : item.priority === 'Medium' ? 'star' : 'check'} size={20} color={progressColor} />
            <Text style={styles.taskDetails}>Priority: {item.priority}</Text>
          </View>
          <CircularProgress value={item.progress} radius={30} valueSuffix="%" progressValueColor={progressColor} activeStrokeColor={progressColor} activeStrokeWidth={8} inActiveStrokeColor="#F8F1F9" inActiveStrokeWidth={8} />
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={{ uri: 'https://m.media-amazon.com/images/I/71m5YHgVg6L.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>
        <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.analyticsButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Analytics</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Analytics Overview</Text>
              <Text style={styles.modalText}>Total Tasks: {tasks.length}</Text>
              <Text style={styles.modalText}>Completed Tasks: {tasks.filter(task => task.progress === 100).length}</Text>
              <Text style={styles.modalText}>In Progress Tasks: {tasks.filter(task => task.progress < 100 && task.progress > 0).length}</Text>
              <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, padding: 20, backgroundColor: 'rgba(248, 241, 249, 0.8)' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#D64E84', textAlign: 'center', marginBottom: 20 },
  list: { paddingBottom: 20 },
  taskItem: { backgroundColor: '#fff', padding: 15, marginBottom: 15, borderRadius: 10, shadowColor: '#D64E84', shadowOpacity: 0.1, elevation: 3 },
  taskDetailsContainer: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  taskDetails: { fontSize: 14, color: '#777' },
  priorityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  deleteButton: { backgroundColor: '#FF1493', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 20, marginTop: 10, alignSelf: 'center' },
  deleteText: { color: '#fff', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  addButton: { backgroundColor: '#D64E84', borderRadius: 10, paddingVertical: 12, flex: 1, alignItems: 'center', marginRight: 10 },
  analyticsButton: { backgroundColor: '#FF69B4', borderRadius: 10, paddingVertical: 12, flex: 1, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalText: { fontSize: 16, color: '#555', marginBottom: 5 },
  closeModalButton: { backgroundColor: '#D64E84', borderRadius: 10, paddingVertical: 12, marginTop: 20, alignItems: 'center' },
  closeModalText: { color: '#fff', fontWeight: 'bold' },
});
