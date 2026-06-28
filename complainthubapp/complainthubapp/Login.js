import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
                }}
                style={styles.houseIcon}
              />
            </View>

            <Text style={styles.title}>ComplaintHub</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>
            <TextInput placeholder="Enter username" style={styles.input} />

            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter password"
                secureTextEntry={!passwordVisible}
                style={styles.passwordInput}
              />

              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#414833"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate("Dashboard")}
>
  <Text style={styles.loginText}>Login</Text>
</TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://developers.google.com/static/identity/images/g-logo.png",
                }}
                style={styles.socialLogo}
              />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/512px-LinkedIn_logo_initials.png",
                }}
                style={styles.socialLogo}
              />
              <Text style={styles.socialText}>Continue with LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.signup}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  logoCircle: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: "#414833",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  houseIcon: {
    width: 28,
    height: 28,
    tintColor: "white",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#414833",
  },

  form: {
    flex: 1,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#414833",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D8D6CE",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8D6CE",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: 8,
    color: "#656D4A",
  },

  loginButton: {
    backgroundColor: "#414833",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  loginText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D8D6CE",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#6B6A63",
  },

  socialButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D8D6CE",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  socialLogo: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  socialText: {
    marginLeft: 10,
    fontWeight: "500",
    color: "#333",
  },

  signup: {
    textAlign: "center",
    marginTop: 10,
    color: "#656D4A",
  },
});
