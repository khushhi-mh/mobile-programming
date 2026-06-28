import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
const BOTTOM_TAB_HEIGHT = Platform.OS === 'ios' ? 85 : 65;

const Announcements = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Announcements');

  const categories = ['All', 'General', 'Maintenance', 'Water', 'WiFi'];

  const announcements = [
    {
      id: 1,
      title: 'Water Supply Interruption',
      date: '7 June 2026',
      description: 'Water supply will be unavailable in Block A from 10:00 PM to 6:00 AM tomorrow.',
      category: 'Maintenance',
      icon: 'water-outline',
      iconColor: COLORS.inProgress,
      bgColor: COLORS.inProgressBg,
    },
    {
      id: 2,
      title: 'WiFi Maintenance',
      date: '3 June 2026',
      description: 'WiFi services may be slow on 3 June from 1:00 AM to 5:00 AM.',
      category: 'WiFi',
      icon: 'wifi-outline',
      iconColor: COLORS.resolved,
      bgColor: COLORS.resolvedBg,
    },
    {
      id: 3,
      title: 'Mess Holiday',
      date: '31 May 2026',
      description: 'The hostel mess will be closed on Sunday, 31 May 2026.',
      category: 'General',
      icon: 'restaurant-outline',
      iconColor: COLORS.pending,
      bgColor: COLORS.pendingBg,
    },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
     
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Announcements</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={COLORS.darkWalnut} />
          </TouchableOpacity>
        </View>
       
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.mediumGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search announcements..."
            placeholderTextColor={COLORS.mediumGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.mediumGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
  style={styles.announcementsList}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: BOTTOM_TAB_HEIGHT + 20 }}
>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <View key={item.id} style={styles.announcementCard}>
              <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                  <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                    <Ionicons name={item.icon} size={24} color={item.iconColor} />
                  </View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.announcementTitle}>{item.title}</Text>
                    <Text style={styles.announcementDate}>{item.date}</Text>
                  </View>
                </View>
                <View style={[styles.categoryTag, { backgroundColor: item.bgColor }]}>
                  <Text style={[styles.categoryTagText, { color: item.iconColor }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <Text style={styles.announcementDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={50} color={COLORS.mediumGray} />
            <Text style={styles.emptyStateText}>No announcements found</Text>
          </View>
        )}

        <View style={[styles.bottomTabBar, { height: BOTTOM_TAB_HEIGHT }]}>
  <TouchableOpacity
    style={styles.tabItem}
    onPress={() => {
      setActiveTab('Home');
      navigation.navigate('Dashboard');
    }}
  >
    {renderTabIcon('Home', 'home-outline')}
    <Text style={styles.tabLabel}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.tabItem}
    onPress={() => {
      setActiveTab('My Complaints');
      navigation.navigate('MyComplaints');
    }}
  >
    {renderTabIcon('My Complaints', 'document-text-outline')}
    <Text style={styles.tabLabel}>Complaints</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.tabItem}
    onPress={() => setActiveTab('Announcements')}
  >
    {renderTabIcon('Announcements', 'megaphone-outline')}
    <Text style={styles.tabLabel}>Alerts</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.tabItem}
    onPress={() => {
      setActiveTab('Profile');
      navigation.navigate('Profile');
    }}
  >
    {renderTabIcon('Profile', 'person-outline')}
    <Text style={styles.tabLabel}>Profile</Text>
  </TouchableOpacity>
</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? 0 : 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.darkWalnut,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkWalnut,
    paddingVertical: 8,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  categoriesContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.darkWalnut,
    borderColor: COLORS.darkWalnut,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  announcementsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  announcementCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: COLORS.darkWalnut,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleWrapper: {
    flex: 1,
  },
announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  announcementDate: {
    fontSize: 13,
    color: COLORS.darkGray,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  announcementDescription: {
    fontSize: 14,
    color: COLORS.ebony,
    lineHeight: 20,
    marginLeft: 56,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.mediumGray,
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
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
  marginTop: 2,
},
});

export default Announcements;
