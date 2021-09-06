import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, AppState } from "react-native";

import { useAuthState, useAuthDispatch } from "../context/auth/auth.context";

import io from "socket.io-client";
import CustomButton from "../components/CustomButton";
import { signout } from "../context/auth/auth.actions";
import getEnvVars from "../../environment";
import useNotifications from "../hooks/useNotifications";

const { socketUrl, putTokenUrl } = getEnvVars();

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

  const [socket, setSocket] = useState();
  const { user_id, token } = useAuthState();
  const authDispatch = useAuthDispatch();
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    const newSocket = io(socketUrl, { autoConnect: false });

    newSocket.auth = { user_id };
    newSocket.connect();

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("history", (res) => {
        setMessages(res); //Avoids duplicate entries
      });

      socket.on("message", (res) => {
        setMessages((prev) => [...prev, res]);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
        socket.off("history");
      }
    };
  }, [socket]);

  useEffect(() => {
    const sendPushToken = async () => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ push_token: expoPushToken }),
      };
      try {
        const response = await fetch(putTokenUrl, requestOptions);
        if (response.ok) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };
    if (expoPushToken) {
      console.log("Sending token");
      sendPushToken();
    }
  }, [expoPushToken]);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <View style={styles.messageCard}>
          <View style={styles.messageCardTitleContainer}>
            <Text style={styles.messageCardTitle}>Messages</Text>
          </View>
          {messages.length === 0 && (
            <Text style={styles.noMessagesText}>
              You dont have any messages...
            </Text>
          )}
          {messages.map((message) => (
            <View style={styles.chatBubble} key={message._id}>
              <Text>{message.text}</Text>
            </View>
          ))}
        </View>
        <CustomButton
          title="Sign Out"
          variant="secondary"
          onPress={() => signout(authDispatch, token)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8E8E8",
    padding: 15,
  },
  noMessagesText: {
    margin: 20,
    textAlign: "center",
  },
  messageCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    width: "100%",
  },
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
