import React, { useEffect } from "react";
import HomeScreen from "./Home";
import LandingScreen from "./Landing";
import SignupScreen from "./Signup";
import SigninScreen from "./Signin";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthDispatch, useAuthState } from "../context/auth/auth.context";
import { restoreUser } from "../context/auth/auth.actions";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { token } = useAuthState();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    restoreUser(authDispatch);
  }, [authDispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
