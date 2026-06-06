import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';

const App = () => {
  const complaints = [
    {
      id: '1',
      title: 'Water leakage in bathroom',
      category: 'Water',
      status: 'Pending',
      date: '30 May 2026',
    },
    {
      id: '2',
      title: 'WiFi not working',
      category: 'Internet',
      status: 'In Progress',
      date: '29 May 2026',
    },
    {
      id: '3',
      title: 'Light not working',
      category: 'Electricity',
      status: 'Resolved',
      date: '28 May 2026',
    },
    {
      id: '4',
      title: 'Broken door lock',
      category: 'Security',
      status: 'Pending',
      date: '27 May 2026',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Pending') return '#f39c12';
    if (status === 'In Progress') return '#3498db';
    if (status === 'Resolved') return '#2ecc71';
    return '#999';
  };

  const statLabelStyle = { fontSize: 11 };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ComplaintHub Dashboard</Text>

      <Text style={styles.subHeader}>Report and track maintenance issues</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{complaints.length}</Text>
          <Text style={statLabelStyle}>Total</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {complaints.filter(item => item.status === 'Pending').length}
          </Text>
          <Text style={statLabelStyle}>Pending</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {complaints.filter(item => item.status === 'In Progress').length}
          </Text>
          <Text style={statLabelStyle}>In Progress</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {complaints.filter(item => item.status === 'Resolved').length}
          </Text>
          <Text style={statLabelStyle}>Resolved</Text>
        </View>
      </View>

      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.category}>Category: {item.category}</Text>

            <Text style={styles.date}>Reported: {item.date}</Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(
                    item.status
                  ),
                },
              ]}
            >
              <Text style={styles.statusText}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+ Report Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;