// Profile.jsx
import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Avatar, Badge, Chip } from 'react-native-paper';

const Profile = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Background */}
      <View style={styles.headerBackground}>
       

        {/* Profile Picture with Badge */}
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={{ uri: 'https://randomuser.me/api/portraits/men/86.jpg' }} // Replace with actual image
            style={styles.avatar}
          />
          <Badge style={styles.onlineBadge} size={28}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </Badge>
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Name and Rating */}
        <Text style={styles.name}>Ibrar Naveed</Text>
        <Text style={styles.joinDate}>Joined Date: 26/07/2025</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>4.8</Text>
          <Text style={styles.reviewCount}>(25)</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={styles.activeTab}>Personal</Text>
        <Text style={styles.inactiveTab}>Travel History</Text>
        <Text style={styles.inactiveTab}>Reviews</Text>
      </View>

      <View style={styles.content}>
        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Ibrar</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Ibrar.naveed@gmail.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>0300 0000000</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>123 Main St, Cityville</Text>
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Text>
          </View>

          <Text style={styles.preferencesTitle}>Preferences</Text>
          <View style={styles.chipsContainer}>
            {['Beauty & Personal Care', 'Clothing', 'Electronics', 'Kids & Toys', 'Home & Kitchen', 'Fashion & Apparel'].map((item) => (
              <Chip key={item} mode="outlined" style={styles.chip} textStyle={styles.chipText}>
                {item}
              </Chip>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#008080',
    paddingBottom: 60,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    left: '58%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  joinDate: {
    fontSize: 14,
    color: '#E0F7FA',
    textAlign: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
  },
  reviewCount: {
    color: '#E0F7FA',
    marginLeft: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 5,
   
  },
  activeTab: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00A19D',
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#00A19D',
  },
  inactiveTab: {
    flex: 1,
    textAlign: 'center',
    color: '#999',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editText: {
    color: '#00A19D',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 16,
    fontSize: 15,
    color: '#444',
  },
  aboutSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  aboutText: {
    color: '#666',
    lineHeight: 22,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    marginBottom: 8,
    backgroundColor: '#F0FDFA',
    borderColor: '#00A19D',
  },
  chipText: {
    fontSize: 13,
    color: '#00A19D',
  },
});

export default Profile;