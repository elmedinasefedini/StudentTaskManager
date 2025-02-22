import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { TaskContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AnalyticsScreen() {
  const { tasks } = useContext(TaskContext);

  // Përllogaritje statistikash
  const totalProgress = tasks.reduce((acc, task) => acc + task.progress, 0);
  const avgProgress = totalProgress / tasks.length || 0;
  const completedTasks = tasks.filter(task => task.progress === 100).length;
  const inProgressTasks = tasks.filter(task => task.progress > 0 && task.progress < 100).length;
  
  // Përgatitja e të dhënave për grafikë
  const labels = tasks.map(task => task.title);
  const progressData = tasks.map(task => task.progress);

  const highPriority = tasks.filter(task => task.priority === 'High').length;
  const mediumPriority = tasks.filter(task => task.priority === 'Medium').length;
  const lowPriority = tasks.filter(task => task.priority === 'Low').length;

  const priorityData = [
    { name: 'High', population: highPriority, color: '#FF3B3B', legendFontColor: '#000', legendFontSize: 14 },
    { name: 'Medium', population: mediumPriority, color: '#FFB84D', legendFontColor: '#000', legendFontSize: 14 },
    { name: 'Low', population: lowPriority, color: '#4CAF50', legendFontColor: '#000', legendFontSize: 14 }
  ];

  // Detyrat afër afatit
  const deadlineTasks = tasks.filter(task => {
    const taskDeadline = new Date(task.deadline);
    const currentDate = new Date();
    return taskDeadline - currentDate <= 3 * 24 * 60 * 60 * 1000; // Detyrat që janë afër afatit (3 ditë)
  }).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Task Analytics</Text>

      <Text style={styles.subTitle}>Average Progress: {avgProgress.toFixed(2)}%</Text>
      <Text style={styles.subTitle}>Completed Tasks: {completedTasks} / {tasks.length}</Text>
      <Text style={styles.subTitle}>In Progress Tasks: {inProgressTasks}</Text>
      <Text style={styles.subTitle}>Tasks Near Deadline: {deadlineTasks}</Text> {/* Shtohet statistika për detyrat afër afatit */}

      {/* Grafik Linjë për progresin e detyrave */}
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: progressData }],
        }}
        width={340}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#FF69B4',
          backgroundGradientTo: '#D64E84',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
      />

      {/* Grafik Qerthull për shpërndarjen e prioriteteve */}
      <Text style={styles.subTitle}>Task Priority Distribution</Text>
      <PieChart
        data={priorityData}
        width={340}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
      />

      {/* Histogram për përparimin e detyrave */}
      <Text style={styles.subTitle}>Task Progress Distribution</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: progressData }],
        }}
        width={340}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#D64E84',
          backgroundGradientTo: '#FF69B4',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />

      {/* Detyrat me prioritet të lartë dhe ikona për to */}
      <View style={styles.highPriorityContainer}>
        <Icon name="flag" size={30} color="red" />
        <Text style={styles.highPriorityText}>High Priority Tasks: {highPriority}</Text>
      </View>

      {/* Button për të parë detyrat afër afatit */}
      <TouchableOpacity style={styles.viewDeadlineButton}>
        <Text style={styles.buttonText}>View Tasks Near Deadline</Text>
      </TouchableOpacity>

      {/* Sekzioni për statistika të tjera */}
      <View style={styles.additionalStatsContainer}>
        <Text style={styles.additionalStatsTitle}>Other Stats:</Text>
        <Text style={styles.additionalStatsText}>Tasks Near Deadline: {deadlineTasks}</Text>
        <Text style={styles.additionalStatsText}>Total Tasks: {tasks.length}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8F1F9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D64E84',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  highPriorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  highPriorityText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
  viewDeadlineButton: {
    backgroundColor: '#FF3B3B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalStatsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F1E0E8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  additionalStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D64E84',
    marginBottom: 10,
  },
  additionalStatsText: {
    fontSize: 16,
    color: '#333',
  },
});
