import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import PropertyCard from "../components/PropertyCard";

const sampleProperties = [
  {
    id: "1",
    title: "Cozy 1BR in Downtown",
    price: 1200,
    image: "https://placeimg.com/640/480/arch",
  },
  {
    id: "2",
    title: "Spacious 2BR with Balcony",
    price: 1800,
    image: "https://placeimg.com/640/480/arch",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Homes for rent</Text>
      <FlatList
        data={sampleProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => navigation.navigate("Details", { property: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
});
