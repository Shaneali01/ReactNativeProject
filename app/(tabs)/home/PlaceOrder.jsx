// screens/PlaceOrder.jsx
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryTagInput from "../../../components/OrderPlacing/CategoryTagInput";
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function PlaceOrder() {
  const [websiteLink, setWebsiteLink] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
     <Header title="Place Order" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Website Link */}
        <Text style={styles.label}>Website Link</Text>
        <View style={styles.smallInput}>
          <Ionicons name="link" size={18} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.smallInputText}
            placeholder="Link"
            placeholderTextColor="#aaa"
            value={websiteLink}
            onChangeText={setWebsiteLink}
          />
        </View>

        {/* Product Name */}
        <Text style={styles.label}>Product Name</Text>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.smallInputText}
            placeholder="Product Name"
            placeholderTextColor="#aaa"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Product Description */}
        <Text style={styles.label}>Product Description</Text>
        <View style={styles.smallInputMultiline}>
          <TextInput
            style={styles.smallInputTextMultiline}
            placeholder="Product Description"
            placeholderTextColor="#aaa"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Category Tags */}
        <Text style={styles.label}>Product Category</Text>
        <CategoryTagInput categories={categories} setCategories={setCategories} />

        {/* Upload Image */}
        <Text style={styles.label}>Upload product image</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <View style={styles.uploadIcon}>
                <Ionicons name="image-outline" size={36} color="#ccc" />
                <Ionicons
                  name="arrow-up"
                  size={18}
                  color="#ccc"
                  style={{ position: "absolute", bottom: -6, right: -6 }}
                />
              </View>
              <Text style={styles.uploadText}>Upload an image less than 5 MB</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Smaller Next Button - Matching PlaceOrder2 */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home/PlaceOrder2")}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },

  // Compact Label Style (same as PlaceOrder2)
  label: {
    marginTop: 14,
    marginBottom: 5,
    fontSize: 8,
    fontWeight: "700",
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Same input style as PlaceOrder2
  smallInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  smallInputText: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
  smallInputMultiline: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    minHeight: 70,
  },
  smallInputTextMultiline: {
    fontSize: 12,
    color: "#333",
    flex: 1,
  },

  // Upload Box - slightly smaller & modern
  uploadBox: {
    marginTop: 10,
    height: 100,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: { marginBottom: 6, position: "relative" },
  uploadText: { fontSize: 11, color: "#999", textAlign: "center" },
  uploadedImage: { width: "100%", height: "100%", borderRadius: 8 },

  // Smaller Next Button (same as PlaceOrder2)
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  nextButton: {
    backgroundColor: TEAL,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});