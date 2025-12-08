// app/(tabs)/profile/components/Reviews.jsx
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TEAL = "#008080";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      reviewerName: "Sarah Johnson",
      reviewerImage: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent traveler! Very reliable and the item arrived in perfect condition. Great communication throughout the process. Highly recommend!",
      product: "iPhone 15 Pro Max",
    },
    {
      id: 2,
      reviewerName: "Michael Chen",
      reviewerImage: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      date: "1 week ago",
      comment: "Outstanding service! The delivery was faster than expected and the product was well protected. Will definitely work with again.",
      product: "MacBook Pro 16",
    },
    {
      id: 3,
      reviewerName: "Emma Williams",
      reviewerImage: "https://i.pravatar.cc/150?img=47",
      rating: 4,
      date: "2 weeks ago",
      comment: "Good experience overall. Item arrived safely and on time. Communication could be better but no major issues.",
      product: "Sony WH-1000XM5",
    },
    {
      id: 4,
      reviewerName: "David Martinez",
      reviewerImage: "https://i.pravatar.cc/150?img=51",
      rating: 5,
      date: "3 weeks ago",
      comment: "Professional and trustworthy! Made the whole process smooth and easy. Would highly recommend to others.",
      product: "iPad Air",
    },
  ];

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color={star <= rating ? "#FFD700" : "#ddd"}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Overall Rating Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingNumber}>4.8</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={12} color="#FFD700" />
            ))}
          </View>
          <Text style={styles.totalReviews}>25 reviews</Text>
        </View>

        <View style={styles.ratingBars}>
          {[
            { stars: 5, percentage: 85 },
            { stars: 4, percentage: 10 },
            { stars: 3, percentage: 3 },
            { stars: 2, percentage: 2 },
            { stars: 1, percentage: 0 },
          ].map((item) => (
            <View key={item.stars} style={styles.ratingBarRow}>
              <Text style={styles.starLabel}>{item.stars}★</Text>
              <View style={styles.barBackground}>
                <View 
                  style={[styles.barFill, { width: `${item.percentage}%` }]} 
                />
              </View>
              <Text style={styles.percentageText}>{item.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Individual Reviews */}
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image
              source={{ uri: review.reviewerImage }}
              style={styles.reviewerImage}
            />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.reviewerName}</Text>
              <View style={styles.ratingRow}>
                {renderStars(review.rating)}
                <Text style={styles.dateText}> • {review.date}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.reviewComment}>{review.comment}</Text>

          <View style={styles.productTag}>
            <Ionicons name="cube-outline" size={14} color={TEAL} />
            <Text style={styles.productTagText}>{review.product}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  ratingCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: "700",
    color: TEAL,
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  ratingBars: {
    flex: 1,
    justifyContent: "center",
  },
  ratingBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  starLabel: {
    fontSize: 12,
    color: "#666",
    width: 25,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 11,
    color: "#999",
    width: 35,
    textAlign: "right",
  },

  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  reviewHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reviewerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },

  reviewComment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },

  productTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  productTagText: {
    fontSize: 12,
    color: TEAL,
    fontWeight: "600",
  },
});