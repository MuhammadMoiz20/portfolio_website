import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function PropertyCard({ property, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>${property.price}/mo</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
    elevation: 2,
  },
  image: { width: 120, height: 90 },
  info: { padding: 12, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "500" },
  price: { marginTop: 6, color: "#2a9d8f", fontWeight: "600" },
});
