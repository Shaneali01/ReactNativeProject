// app/(tabs)/Preferences.jsx
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function Preferences() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Beauty & Personal Care",
    "Health & Fitness",
    "Books & Stationery",
    "Kids & Toys",
    "Home & Kitchen",
    "Skincare Products",
    "Sports & Outdoors",
    "Home & Kitchen",
    "Home & Kitchen",
    "Electronics",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Home & Kitchen",
    "Clothing",
    "Home & Kitchen",
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
      {/* Teal Header */}
      <Header title="Preferences" />

      {/* Rounded White Container */}
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Categories Grid */}
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Select Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 85,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryChip: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 25,
    marginBottom: 4,
  },
  categoryChipSelected: {
    backgroundColor: TEAL,
  },
  categoryText: {
    fontSize: 14,
    color: "#1E1E1E",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
  },
  selectButton: {
    backgroundColor: TEAL,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 50,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    fontStyle:'medium',
    fontfamily:'inter',
    lineHeight: '140%',
  },
});