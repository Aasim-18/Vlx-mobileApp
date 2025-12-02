import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack"
import {RootStackPramList} from "../App"

type LoginProps = NativeStackScreenProps<RootStackPramList, "Login">


const COLORS = {
  primary: '#FF9F1C',      
  background: '#FFFFFF',   
  surface: '#F8F9FA',      
  text: '#1A1A1A',         
  textSecondary: '#757575',
  inputBg: '#FFFFFF',      
  inputBorder: '#E0E0E0',  
  shadow: '#000000',
};

export default function LoginScreen({navigation}: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EnrollmentNumber, setEnrollmentNumber] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://vlx-server.onrender.com/api/v1/users/login",
        {
          email,
          password,
          EnrollmentNumber,
        }
      );
      console.log(response);
      
      Alert.alert("Success", "You are logged in successfully!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
  }



const generateOtp = async () => {
  
  if (!email) {
    Alert.alert("Invalid Input", "Please enter a valid email address.");
    return false;
  }

  


  try {
    const response = await axios.post(
      "https://vlx-server.onrender.com/api/v1/users/Otpgenerate",
      { email }
    );

    
    if (response.status === 200 || response.status === 201) {
      console.log("OTP Sent:", response.data);
      
       
      return true;
    } 

  } catch (error: any) {
    console.log("OTP Error:", error);

    
    if (error.response) {
      
      
      Alert.alert("Error", error.response.data.message || "Server error occurred.");
    } else if (error.request) {
      
      Alert.alert("Network Error", "Please check your internet connection.");
    } else {
      
      Alert.alert("Error", "An unexpected error occurred.");
    }
    return false;


  }
};
 
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Updated Status Bar for Light Theme */}
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>VLX</Text>
              <View style={styles.logoDot} />
            </View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>
              Enter your credentials to access your workspace.
            </Text>
          </View>

          {/* Form */}
          <Animated.View 
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enrollment Number</Text>
              <TextInput
                style={styles.input}
                placeholder="BT25MMEXXX"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="none"
                onChangeText={setEnrollmentNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20}}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryBtn}
              activeOpacity={0.8}
              onPress={async () => {
                await handleLogin();
               await  generateOtp();

                navigation.navigate("EmailVerify");
              }}
            >
              <Text style={styles.primaryBtnText}>Sign In</Text>
            </TouchableOpacity>

          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
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
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.text, // Black
    letterSpacing: -1,
  },
  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary, // Orange
    marginLeft: 4,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.text, // Darker label
    marginBottom: 6,
    fontWeight: '600',
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    // Soft shadow for depth (like search bar)
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});