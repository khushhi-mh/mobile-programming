import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const BOTTOM_PADDING = Platform.OS === 'ios' ? 40 : 20;

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
};

export default function ReportComplaint({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Water', 'Electricity', 'WiFi', 'Sanitation', 'Other'];
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: BOTTOM_PADDING + 40 }
        ]}
      >

        <Text style={styles.headerTitle}>Report Complaint</Text>

        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepActive]}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepLine} />
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepInactive]}>
              <Text style={styles.stepNumberInactive}>2</Text>
            </View>
            <View style={styles.stepLine} />
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepInactive]}>
              <Text style={styles.stepNumberInactive}>3</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Briefly describe the issue"
            placeholderTextColor={COLORS.mediumGray}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Provide more details..."
            placeholderTextColor={COLORS.mediumGray}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority</Text>
          <View style={styles.priorityContainer}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  selectedPriority === p && styles.priorityButtonActive,
                ]}
                onPress={() => setSelectedPriority(p)}
              >
                <Text style={[
                  styles.priorityText,
                  selectedPriority === p && styles.priorityTextActive,
                ]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
  style={styles.nextButton}
  onPress={() => navigation.navigate("ComplaintDetails")}
>
  <Text style={styles.nextButtonText}>Next →</Text>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 22, 
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },

  headerTitle: {
    fontSize: 26, 
    fontWeight: '700',
    color: COLORS.darkWalnut,
    marginBottom: 20,
  },

  stepsContainer: {
    flexDirection: 'row',
    marginBottom: 28,
  },

  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepLine: {
    width: 40, 
    height: 2,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 6,
  },

  stepActive: { backgroundColor: COLORS.darkWalnut },
  stepInactive: { backgroundColor: COLORS.lightGray },

  stepNumber: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },

  stepNumberInactive: {
    color: COLORS.mediumGray,
    fontSize: 13,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.darkWalnut,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
  },

  categoryButtonActive: {
    backgroundColor: COLORS.darkWalnut,
  },

  categoryText: {
    fontSize: 13,
    color: COLORS.darkWalnut,
  },

  categoryTextActive: {
    color: 'white',
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },

  textArea: {
    height: 90,
  },

  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },

  priorityButtonActive: {
    backgroundColor: COLORS.darkWalnut,
  },

  priorityText: {
    fontSize: 13,
    color: COLORS.darkWalnut,
  },

  priorityTextActive: {
    color: 'white',
  },
  uploadButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.gray,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },

  uploadText: {
    marginTop: 6,
    color: COLORS.saddleBrown,
  },

  nextButton: {
    backgroundColor: COLORS.darkWalnut,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
