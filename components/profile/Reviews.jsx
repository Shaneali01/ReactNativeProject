import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

// --- Constants ---
const PRIMARY_COLOR = "#1F2937"; // Dark text/headings
const GRAY_TEXT = "#6B7280"; // Location and date text
const STAR_COLOR = "#954D0E"; // Gold color for stars
const Normal_Star="#FF9500"

// --- Dummy Data ---
const reviews = [
  {
    id: 1,
    name: "Davis Kim",
    location: "Los Angeles, CA",
    date: "Jan 20, 2025",
    rating: 4,
    isTopRated: false,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    avatarUrl: "https://i.pravatar.cc/150?img=68", // Random avatar
  },
  {
    id: 2,
    name: "Aisha Khan",
    location: "New York, NY",
    date: "Jan 15, 2025",
    rating: 5,
    isTopRated: false,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    avatarUrl: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 3,
    name: "John Smith",
    location: "London, UK",
    date: "Jan 10, 2025",
    rating: 3,
    isTopRated: false,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
  },
];

// --- ReviewCard Component ---
const ReviewCard = ({ review }) => {
  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? Normal_Star : GRAY_TEXT}
          style={styles.star}
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <View style={styles.reviewCard}>
      <Image
        source={{ uri: review.avatarUrl }}
        style={styles.avatar}
        resizeMode="cover"
      />

      <View style={styles.reviewContent}>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.name}>{review.name}</Text>
            <Text style={styles.location}>{review.location}</Text>
          </View>
          {review.isTopRated && (
            <View style={styles.topRatedBadge}>
              <Ionicons name="star" size={14} color={STAR_COLOR} />
              <Text style={styles.topRatedText}>Top Rated</Text>
            </View>
          )}
        </View>

        <View style={styles.ratingDateRow}>
          {renderStars(review.rating)}
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{review.date}</Text>
        </View>

        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

// --- Main Component ---
export default function Reviews() {
  // We use ListHeaderComponent for the "Reviews" title and "Top Rated" badge
  const ReviewListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.headerTitle}>Reviews</Text>
      <View style={styles.topRatedBadge}>
        <Ionicons name="star" size={14} color={STAR_COLOR} />
        <Text style={styles.topRatedText}>Top Rated</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ReviewCard review={item} />}
      ListHeaderComponent={ReviewListHeader}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      // Add a separator for better visual distinction if needed
      // ItemSeparatorComponent={() => <View style={styles.separator} />} 
    />
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  listContainer: {
    // Add margin top to push content below the tabs in the parent ProfileScreen
    paddingTop: 30, 
    // Ensure horizontal padding is controlled by the parent View for the whole content area
    paddingHorizontal: 0, 
    paddingBottom: 100,
  },
  
  // Header styles (for the main "Reviews" title)
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16, // Match padding of cards
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'semibold',
    color: '#1A1C1E',
    fontfamily: 'Inter',
  },

  // Review Card styles
  reviewCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 2,
    marginHorizontal: 16,
    padding: 8,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    // Removed border and shadow for a cleaner look consistent with the image
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  reviewContent: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: '#1E1E1E',
  },
  location: {
    fontSize: 12,
    color: '#6C7278',
    fontWeight: '400',
    fontfamily: 'Inter',
  },

  // Rating and Date Row
  ratingDateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginHorizontal: 1,
  },
  dot: {
    fontSize: 12,
    color: GRAY_TEXT,
    marginHorizontal: 8,
    lineHeight: 18,
  },
  date: {
    fontSize: 12,
    color: GRAY_TEXT,
  },
  
  // Review Text
  reviewText: {
    fontSize: 12,
    lineHeight: '100%',
    color: '#6C7278',
  },

  // Top Rated Badge
  topRatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3', // Light yellow background
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: STAR_COLOR,
    // Add margin to separate the badge from the rest of the content if used inside the card
    // marginVertical: 4, 
  },
  topRatedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#954D0E',
    marginLeft: 4,
  },
});