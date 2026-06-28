import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const COLORS = {
  darkWalnut: '#582f0e',
  saddleBrown: '#7f4f24',
  toffeeBrown: '#936639',
  camel: '#a68a64',
  khakiBeige: '#b6ad90',
  white: '#FFFFFF',
  offWhite: '#FAF7F2',
  lightGray: '#F1EFEA',
  gray: '#D8D6CE',
  mediumGray: '#A8A69B',
  darkGray: '#6B6A63',
  drySageLight: '#c2c5aa',
  drySageDeep: '#a4ac86',
  dustyOlive: '#656d4a',
  ebony: '#414833',
  charcoalBrown: '#333d29',
  pending: '#7f4f24',
  pendingBg: '#F1EFEA',
  inProgress: '#656d4a',
  inProgressBg: '#EDEEE8',
  resolved: '#a4ac86',
  resolvedBg: '#F0F2E8',
};

const MyComplaints = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My Complaints');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'All', label: 'All', icon: 'grid-outline' },
    { id: 'Pending', label: 'Pending', icon: 'time-outline' },
    { id: 'In Progress', label: 'In Progress', icon: 'refresh-outline' },
    { id: 'Resolved', label: 'Resolved', icon: 'checkmark-circle-outline' },
  ];

  const complaints = [
    {
      id: 1,
      title: 'Water leakage in bathroom',
      room: 'Room 101',
      date: '12 June 2026',
      status: 'Pending',
      statusColor: COLORS.pending,
      statusIcon: 'time-outline',
      icon: 'water-outline',
      iconBg: COLORS.pendingBg,
      iconColor: COLORS.pending,
    },
    {
      id: 2,
      title: 'WiFi not working',
      room: 'Room 204',
      date: '11 June 2026',
      status: 'In Progress',
      statusColor: COLORS.inProgress,
      statusIcon: 'refresh-outline',
      icon: 'wifi-outline',
      iconBg: COLORS.inProgressBg,
      iconColor: COLORS.inProgress,
    },
    {
      id: 3,
      title: 'Tube light not working',
      room: 'Room 302',
      date: '9 June 2026',
      status: 'Resolved',
      statusColor: COLORS.resolved,
      statusIcon: 'checkmark-circle-outline',
      icon: 'bulb-outline',
      iconBg: COLORS.resolvedBg,
      iconColor: COLORS.resolved,
    },
  ];

  const filteredComplaints = complaints.filter((item)=>{
    const matchesFilter =
      selectedFilter === "All" ||
      item.status === selectedFilter;
    const matchesSearch =
      item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;

  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor={COLORS.offWhite}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons
              name="document-text-outline"
              size={28}
              color={COLORS.darkWalnut}
            />
            <Text style={styles.headerTitle}>
              My Complaints
            </Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.mediumGray}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search complaints..."
            placeholderTextColor={COLORS.mediumGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter)=>(
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id &&
                styles.filterChipActive
              ]}
              onPress={()=>
                setSelectedFilter(filter.id)
              }
            >
              <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id &&
                styles.filterTextActive
              ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>

        <ScrollView
          style={styles.complaintsList}
          showsVerticalScrollIndicator={false}
        >
        {
          filteredComplaints.map((complaint)=>(
            <TouchableOpacity
              key={complaint.id}
              style={styles.complaintCard}
              onPress={()=>
                navigation.navigate(
                  "ComplaintDetails",
                  { complaint }
                )
              }
            >
              <Text style={styles.complaintTitle}>
                {complaint.title}
              </Text>
              <Text style={styles.complaintMeta}>
                {complaint.room} • {complaint.date}
              </Text>
              <Text
              style={[
                styles.status,
                {
                  color: complaint.statusColor
                }
              ]}
              >
                {complaint.status}
              </Text>
            </TouchableOpacity>
          ))
        }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
safeArea:{
  flex:1,
  backgroundColor:COLORS.offWhite,
},
container:{
  flex:1,
},
header:{
  backgroundColor:COLORS.white,
  padding:20,
},
headerLeft:{
  flexDirection:"row",
  alignItems:"center",
},
headerTitle:{
  fontSize:24,
  fontWeight:"700",
  color:COLORS.darkWalnut,
  marginLeft:10,
},
searchContainer:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:COLORS.white,
  margin:20,
  paddingHorizontal:12,
  height:45,
  borderRadius:12,
},
searchInput:{
  flex:1,
  marginLeft:8,
},
filterContainer:{
  paddingHorizontal:20,
},
filterChip:{
  paddingHorizontal:15,
  paddingVertical:8,
  backgroundColor:COLORS.lightGray,
  borderRadius:20,
  marginRight:10,
},
filterChipActive:{
  backgroundColor:COLORS.darkWalnut,
},
filterText:{
  color:COLORS.darkGray,
},
filterTextActive:{
  color:COLORS.white,
},
complaintsList:{
  padding:20,
},
complaintCard:{
  backgroundColor:COLORS.white,
  padding:15,
  borderRadius:12,
  marginBottom:12,
},
complaintTitle:{
  fontSize:16,
  fontWeight:"600",
  color:COLORS.darkWalnut,
},
complaintMeta:{
  marginTop:5,
  color:COLORS.darkGray,
},
status:{
  marginTop:8,
  fontWeight:"600",
},
});
export default MyComplaints;