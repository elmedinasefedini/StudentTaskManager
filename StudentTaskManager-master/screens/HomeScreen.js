import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { TaskContext } from '../App'; // Mos harroni këtë për të marrë tasks nga TaskContext
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { CircularProgress } from 'react-native-circular-progress'; 
import { Modal } from 'react-native';


export default function HomeScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal për statistikat

  // Animacion për fshirje të detyrave
  const fadeAnim = new Animated.Value(1);

  // Përdorimi i useEffect për të kontrolluar lejet dhe dërguar njoftime
  useEffect(() => {
    // Mund të vendosni kodin për kontrollimin e lejeve ose dërgimin e njoftimeve
    console.log('Home Screen mounted!');
  }, []);

  const handleDelete = (taskId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Fshirja e detyrës nga lista
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);

            // Animacioni për fshirje
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          },
        },
      ]
    );
  };

  const renderTask = ({ item }) => {
    const progressColor = item.progress === 100 ? '#D64E84' : item.progress >= 50 ? '#FF69B4' : '#FF1493'; // Ngjyra roze për progresin

    return (
      <Animated.View style={[styles.taskItem, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.taskDetailsContainer} onPress={() => navigation.navigate('AddTask', { task: item })}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDetails}>Course: {item.course}</Text>
          <Text style={styles.taskDetails}>Deadline: {item.deadline}</Text>
          <View style={styles.priorityContainer}>
            <Icon
              name={item.priority === 'High' ? 'flag' : item.priority === 'Medium' ? 'star' : 'check'}
              size={20}
              color={item.priority === 'High' ? '#FF1493' : item.priority === 'Medium' ? '#FF69B4' : '#D64E84'}
            />
            <Text style={styles.taskDetails}>Priority: {item.priority}</Text>
          </View>
          
          <CircularProgress
            value={item.progress}
            radius={30}
            valueSuffix="%"
            textColor={progressColor}
            progressValueColor={progressColor}
            activeStrokeColor={progressColor}
            activeStrokeWidth={8}
            inActiveStrokeColor="#F8F1F9"
            inActiveStrokeWidth={8}
          />

          {/* Butoni i Fshirjes */}
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Për statistikën Modal
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    // Shtoni ImageBackground si wrapper për ekranin
    <ImageBackground
      source={{ uri: 'https://m.media-amazon.com/images/I/71m5YHgVg6L.jpg' }} // Shto linkun ose burimin e fotos
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
            <Text style={styles.buttonText}>Add New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.analyticsButton} onPress={openModal}>
            <Text style={styles.buttonText}>View Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Modal për Statistikën */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Analytics Overview</Text>
              {/* Shto grafikët dhe statistikën këtu */}
              <Text style={styles.modalText}>Total Tasks: {tasks.length}</Text>
              <Text style={styles.modalText}>Completed Tasks: {tasks.filter(task => task.progress === 100).length}</Text>
              <Text style={styles.modalText}>In Progress Tasks: {tasks.filter(task => task.progress < 100 && task.progress > 0).length}</Text>

              <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
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
  background: {
    flex: 1,
    resizeMode: 'cover', // Siguron që fotografia mbulon ekranin
    justifyContent: 'center', // Qëndron qendra e ekranit
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(248, 241, 249, 0.8)', // Përdor ngjyrë të lehtë për transparencë mbi sfondin
  },
  title: {
    fontSize: 32,                     // Madhësia e titullit
    fontWeight: 'bold',               // Bën titullin të jetë i trashë
    color: '#D64E84',                 // Ngjyrë roze për titullin
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',              // Përdor fontin Arial
    letterSpacing: 1.2,               // Distanca mes shkronjave
  },
  list: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#D64E84',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskDetailsContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',               // Bën titullin e detyrës të jetë i trashë
    color: '#333',
    fontFamily: 'Verdana',            // Përdor një font tjetër për titullin e detyrës
    letterSpacing: 0.5,               // Shtimi i distancës mes shkronjave
  },
  taskDetails: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Helvetica',          // Përdor një font të ndryshëm për detajet
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: '#FF1493',  // Ngjyrë roze për butonin e fshirjes
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Arial',              // Fonti për tekstin e butonit të fshirjes
    fontSize: 16,                     // Madhësia e shkronjave të butonit
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#D64E84', // Ngjyrë roze për butonin "Add New Task"
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  analyticsButton: {
    backgroundColor: '#FF69B4', // Ngjyrë roze për butonin "View Analytics"
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',             // Fonti për tekstin e butonëve
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    fontFamily: 'Arial',             // Fonti për titullin në modal
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'Helvetica',         // Fonti për tekstin në modal
  },
  closeModalButton: {
    backgroundColor: '#D64E84', // Ngjyrë roze për butonin e mbylljes së modalit
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Arial',             // Fonti për tekstin në butonin e mbylljes së modalit
  },
});
 