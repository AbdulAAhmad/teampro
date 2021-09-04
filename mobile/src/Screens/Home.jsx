import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "TeamPro",
      headerStyle: {
        backgroundColor: "#002E27",
      },
      headerTintColor: "#FFFDE0",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.messageCard}>
        <View style={styles.messageCardTitleContainer}>
          <Text style={styles.messageCardTitle}>Messages</Text>
        </View>
        <View style={styles.chatBubble}>
          <Text>This is a short message</Text>
        </View>
        <View style={styles.chatBubble}>
          <Text>
            This is a long message, This is a long message, This is a long
            message, This is a long message, This is a long message, This is a
            long message, This is a long message, This is a long message, This
            is a long message, This is a long message, This is a long message,
            This is a long message,
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    padding: 15,
  },
  messageCard: { backgroundColor: "white", padding: 10, borderRadius: 15 },
  messageCardTitleContainer: {
    borderBottomColor: "#002E27",
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  messageCardTitle: { fontSize: 28, color: "#002E27" },
  chatBubble: {
    marginTop: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 15,
    padding: 10,
  },
});

export default HomeScreen;
