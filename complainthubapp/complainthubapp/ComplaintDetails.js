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
  rejected: '#333d28',
  rejectedBg: '#E8E9E6',
};

const ComplaintDetails = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineEvents = [
    {
      id: 1,
      title: 'Submitted',
      date: '12 June 2026 • 12:05 PM',
      author: 'You',
      icon: 'checkmark-circle-outline',
      color: COLORS.resolved,
      isCompleted: true,
    },
    {
      id: 2,
      title: 'Assigned',
      date: '12 June 2026 • 12:05 PM',
      author: 'Assigned to: Maintenance Team',
      icon: 'people-outline',
      color: COLORS.inProgress,
      isCompleted: true,
    },
    {
      id: 3,
      title: 'In Progress',
      date: '12 June 2026 • 12:05 PM',
      author: 'Work has been started',
      icon: 'build-outline',
      color: COLORS.pending,
      isCompleted: true,
    },
    {
      id: 4,
      title: 'Resolved',
      date: 'Pending',
      author: '',
      icon: 'checkmark-done-outline',
      color: COLORS.mediumGray,
      isCompleted: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.offWhite} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}><TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.navigate('Dashboard')}
>
  <Ionicons
    name="arrow-back"
    size={24}
    color={COLORS.darkWalnut}
  />
</TouchableOpacity>
            <Text style={styles.headerTitle}>Complaint Details</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color={COLORS.darkWalnut} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: COLORS.inProgressBg }]}>
            <View style={[styles.statusDot, { backgroundColor: COLORS.inProgress }]} />
            <Text style={[styles.statusText, { color: COLORS.inProgress }]}>In Progress</Text>
          </View>
        </View>

        <View style={styles.complaintCard}>
          <Text style={styles.complaintTitle}>Water leakage in bathroom</Text>
          <View style={styles.complaintMeta}>
            <Ionicons name="location-outline" size={16} color={COLORS.darkGray} />
            <Text style={styles.complaintMetaText}>Room 101</Text>
            <View style={styles.metaDivider} />
            <Ionicons name="calendar-outline" size={16} color={COLORS.darkGray} />
            <Text style={styles.complaintMetaText}>12 June 2026 • 7:52 AM</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Category</Text>
              <View style={[styles.categoryTag, { backgroundColor: COLORS.inProgressBg }]}>
                <Ionicons name="water-outline" size={16} color={COLORS.inProgress} />
                <Text style={[styles.categoryTagText, { color: COLORS.inProgress }]}>Water</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Priority</Text>
              <View style={[styles.priorityTag, { backgroundColor: COLORS.pendingBg }]}>
                <View style={[styles.priorityDot, { backgroundColor: COLORS.pending }]} />
                <Text style={[styles.priorityTagText, { color: COLORS.pending }]}>Medium</Text>
              </View>
            </View>
          </View>

          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>
            There is a water leakage in the bathroom near the washbasin.
          </Text>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          
          {timelineEvents.map((event, index) => (
            <View key={event.id} style={styles.timelineItem}>
              {index < timelineEvents.length - 1 && (
                <View style={[
                  styles.timelineLine,
                  event.isCompleted ? styles.timelineLineActive : styles.timelineLineInactive
                ]} />
              )}

              <View style={[
                styles.timelineIconContainer,
                event.isCompleted ? styles.timelineIconActive : styles.timelineIconInactive
              ]}>
                <Ionicons 
                  name={event.icon} 
                  size={20} 
                  color={event.isCompleted ? event.color : COLORS.mediumGray} 
                />
              </View>
              
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={[
                    styles.timelineTitle,
                    !event.isCompleted && styles.timelineTitleInactive
                  ]}>
                    {event.title}
                  </Text>
                  {event.author && (
                    <Text style={styles.timelineAuthor}>{event.author}</Text>
                  )}
                </View>
                <Text style={[
                  styles.timelineDate,
                  !event.isCompleted && styles.timelineDateInactive
                ]}>
                  {event.date}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.updateSection}>
          <View style={styles.updateHeader}>
            <Text style={styles.updateTitle}>Latest Update</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.updateCard}>
            <Text style={styles.updateText}>
              Our team is working on this issue and it will be resolved soon.
            </Text>
            <Text style={styles.updateDate}>12 June 2026 • 12:05 PM</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonPrimary}>
            <Text style={styles.actionButtonPrimaryText}>Track Status</Text>
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
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  complaintCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.darkWalnut,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  complaintTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  complaintMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  complaintMetaText: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginLeft: 4,
    marginRight: 4,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.mediumGray,
    marginHorizontal: 6,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginBottom: 6,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  priorityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  priorityTagText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  descriptionLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginBottom: 6,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.ebony,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  timelineSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 14,
    top: 28,
    width: 2,
    height: 40,
  },
  timelineLineActive: {
    backgroundColor: COLORS.resolved,
  },
  timelineLineInactive: {
    backgroundColor: COLORS.gray,
  },
  timelineIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
    backgroundColor: COLORS.white,
    borderWidth: 2,
  },
  timelineIconActive: {
    borderColor: COLORS.resolved,
    backgroundColor: COLORS.resolvedBg,
  },
  timelineIconInactive: {
    borderColor: COLORS.gray,
    backgroundColor: COLORS.offWhite,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    marginRight: 8,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  timelineTitleInactive: {
    color: COLORS.mediumGray,
  },
  timelineAuthor: {
    fontSize: 13,
    color: COLORS.darkGray,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  timelineDate: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  timelineDateInactive: {
    color: COLORS.mediumGray,
  },
  updateSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.saddleBrown,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  updateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.darkWalnut,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  updateText: {
    fontSize: 14,
    color: COLORS.ebony,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  updateDate: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontFamily: Platform.OS === 'ios' ? 'Judson' : 'serif',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  actionButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkWalnut,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
  actionButtonPrimary: {
    flex: 2,
    backgroundColor: COLORS.darkWalnut,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.darkWalnut,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: Platform.OS === 'ios' ? 'Judson-Bold' : 'serif',
  },
});

export default ComplaintDetails;
