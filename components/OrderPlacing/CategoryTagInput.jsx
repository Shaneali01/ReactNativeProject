// components/CategoryTagInput.jsx
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const TEAL = "#008080";

export default function CategoryTagInput({ categories, setCategories }) {
  const [categoryInput, setCategoryInput] = useState("");
  const inputRef = useRef(null);

  const addCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    setCategoryInput("");
    inputRef.current?.focus();
  };

  const removeCategory = (catToRemove) => {
    setCategories((prev) => prev.filter((c) => c !== catToRemove));
  };

  return (
    <View style={styles.container}>
      {/* Render Tags */}
      {categories.map((cat) => (
        <View key={cat} style={styles.tag}>
          <Text style={styles.tagText}>{cat}</Text>
          <TouchableOpacity onPress={() => removeCategory(cat)} style={styles.closeButton}>
            <Ionicons name="close" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Input */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={categories.length === 0 ? "Type category and press Enter" : ""}
        placeholderTextColor="#999"
        value={categoryInput}
        onChangeText={setCategoryInput}
        onSubmitEditing={addCategory}
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    minHeight: 50,
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: TEAL,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  closeButton: {
    marginLeft: 6,
  },
  input: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 8,
    fontSize: 12,
    color: "#333",
  },
});