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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BOTTOM_TAB_HEIGHT = Platform.OS === 'ios' ? 85 : 65;

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

const Dashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const stats = [
    { label: 'Total Complaints', value: '24', icon: 'document-text-outline', color: COLORS.ebony, bgColor: COLORS.lightGray },
    { label: 'Pending', value: '8', icon: 'time-outline', color: COLORS.pending, bgColor: COLORS.pendingBg },
    { label: 'In Progress', value: '7', icon: 'refresh-outline', color: COLORS.inProgress, bgColor: COLORS.inProgressBg },
    { label: 'Resolved', value: '9', icon: 'checkmark-circle-outline', color: COLORS.resolved, bgColor: COLORS.resolvedBg },
  ];

  const recentComplaints = [
    {
      id: 1,
      title: 'Water leakage in bathroom',
      room: 'Room 101',
      date: '12 June 2026',
      status: 'Pending',
      statusColor: COLORS.pending,
      statusBg: COLORS.pendingBg,
    },
    {
      id: 2,
      title: 'WiFi not working',
      room: 'Room 204',
      date: '11 June 2026',
      status: 'In Progress',
      statusColor: COLORS.inProgress,
      statusBg: COLORS.inProgressBg,
    },
    {
      id: 3,
      title: 'Tube light not working',
      room: 'Room 302',
      date: '9 June 2026',
      status: 'Resolved',
      statusColor: COLORS.resolved,
      statusBg: COLORS.resolvedBg,
    },
  ];

  const renderTabIcon = (tabName, iconName) => {
    const isActive = activeTab === tabName;
    return (
      <Ionicons
        name={iconName}
        size={24}
        color={isActive ? COLORS.darkWalnut : COLORS.mediumGray}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.offWhite} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: BOTTOM_TAB_HEIGHT + 30 } // ✅ FIX OVERLAP
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerSubtitle}>Welcome back,</Text>
              <Text style={styles.headerTitle}>Khushi Maharjan 🥰</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color={COLORS.darkGray} />
                <Text style={styles.locationText}>Room 101 • Block A</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profileInitial}>K</Text>
              </View>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
  <Text style={styles.sectionTitle}>Quick Actions</Text>

  <View style={styles.quickActionsGrid}>

    <TouchableOpacity
      style={styles.quickActionCard}
      onPress={() => navigation.navigate('ReportComplaint')}
    >
      <Ionicons
        name="add-circle"
        size={28}
        color={COLORS.white}
      />
      <Text style={styles.quickActionTitle}>
        Report Complaint
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.quickActionCard}
      onPress={() => navigation.navigate('MyComplaints')}
    >
      <Ionicons
        name="list"
        size={28}
        color={COLORS.white}
      />
      <Text style={styles.quickActionTitle}>
        My Complaints
      </Text>
    </TouchableOpacity>

  </View>
</View>

        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Complaints</Text>

          {recentComplaints.map((item) => (
            <View key={item.id} style={styles.complaintCard}>
              <Text style={styles.complaintTitle}>{item.title}</Text>
              <Text style={styles.complaintMeta}>
                {item.room} • {item.date}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomTabBar, { height: BOTTOM_TAB_HEIGHT }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Home')}>
          {renderTabIcon('Home', 'home-outline')}
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('My Complaints')}>
          {renderTabIcon('My Complaints', 'document-text-outline')}
          <Text style={styles.tabLabel}>Complaints</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.tabItem}
  onPress={() => {
    setActiveTab('Announcements');
    navigation.navigate('Announcements');
  }}
>
  {renderTabIcon('Announcements', 'megaphone-outline')}
  <Text style={styles.tabLabel}>Announcement</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Profile')}>
          {renderTabIcon('Profile', 'person-outline')}
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.darkWalnut,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  locationText: {
    marginLeft: 5,
    color: COLORS.darkGray,
  },

  profilePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.darkWalnut,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInitial: {
    color: 'white',
    fontWeight: 'bold',
  },

  notificationDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },

  statsContainer: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    width: (width - 60) / 4,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  statLabel: {
    fontSize: 10,
    textAlign: 'center',
  },

  quickActionsContainer: {
    padding: 20,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  quickActionCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: COLORS.darkWalnut,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },

  quickActionTitle: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },

  recentContainer: {
    padding: 20,
  },

  complaintCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  complaintTitle: {
    fontWeight: '600',
  },

  complaintMeta: {
    color: COLORS.darkGray,
    fontSize: 12,
  },

  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },

  tabItem: {
    alignItems: 'center',
  },

  tabLabel: {
    fontSize: 10,
    color: COLORS.mediumGray,
  },
});

export default Dashboard;
