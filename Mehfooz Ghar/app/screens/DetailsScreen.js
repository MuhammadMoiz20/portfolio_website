import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DetailsScreen({ route }) {
  const { property } = route.params || {};

  if (!property) {
    return (
      <View style={styles.center}>
        <Text>No property selected.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>${property.price} / month</Text>
        <Text style={styles.description}>
          This is a sample property detail. Replace with real data from your
          API.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 240 },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600" },
  price: { fontSize: 18, color: "#2a9d8f", marginTop: 8 },
  description: { marginTop: 12, lineHeight: 20 },
});
