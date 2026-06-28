import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ReportComplaint from "./ReportComplaint";
import MyComplaints from "./MyComplaints";
import ComplaintDetails from "./ComplaintDetails";
import Announcements from "./Announcements";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen 
          name="Login" 
          component={Login} 
        />

        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
        />

        <Stack.Screen
          name="ReportComplaint"
          component={ReportComplaint}
        />

        <Stack.Screen
          name="MyComplaints"
          component={MyComplaints}
        />

        <Stack.Screen
          name="ComplaintDetails"
          component={ComplaintDetails}
        />

        <Stack.Screen
          name="Announcements"
          component={Announcements}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}