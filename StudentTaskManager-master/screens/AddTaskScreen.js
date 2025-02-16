// AddTaskScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { TaskContext } from '../App'; // Sigurohu që të importosh kontekstin nga App.js

export default function AddTaskScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext); // Përdorim TaskContext për të marrë dhe ndryshuar detyrat
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    deadline: '',
    priority: '',
    progress: 0
  });

  // Funksioni që ruan detyrën e re
  const handleSave = () => {
    const task = { id: Date.now().toString(), ...newTask }; // Krijo një ID unik për detyrën
    setTasks([...tasks, task]); // Shto detyrën e re në listën e detyrave
    navigation.goBack(); // Kthehu në ekranin paraprak (HomeScreen)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTask.title}
        onChangeText={(text) => setNewTask({ ...newTask, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={newTask.course}
        onChangeText={(text) => setNewTask({ ...newTask, course: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline"
        value={newTask.deadline}
        onChangeText={(text) => setNewTask({ ...newTask, deadline: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={newTask.priority}
        onChangeText={(text) => setNewTask({ ...newTask, priority: text })}
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
