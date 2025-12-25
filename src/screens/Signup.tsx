import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, StatusBar,  Animated, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';

import axios from 'axios';
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import {RootStackPramList} from "../App"

type SignupProps = NativeStackScreenProps<RootStackPramList, "Signup">


 
export default function Signup({navigation}: SignupProps) {

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EnrollmentNumber, setEnrollmentNumber] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    try {
       const response = await axios.post(
        "https://vlx-server.onrender.com/api/v1/users/register",
        {
          fullName,
          email,
          password,
          EnrollmentNumber, 
          phone,
        },
        
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      // Only navigate if success
      console.log(response.data);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      
    }
  }

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
      
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              {/* Styled to look like the GetKart logo branding */}
              <Text style={styles.logoText}>VLX</Text>
              <View style={styles.logoDot} />
            </View>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>
              Join VLX today and Sell your Products Easily
            </Text>
          </View>

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
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Full Name"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="words"
                onChangeText={setfullName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enrollment Number</Text>
              <TextInput
                style={styles.input}
                placeholder="BT25MMEXXX"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="words"
                onChangeText={setEnrollmentNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="yourEmail@students.vnit.ac.in"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="phone-pad"
                autoCapitalize="none"
                onChangeText={setPhone}
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

            <TouchableOpacity 
              style={styles.primaryBtn}
              activeOpacity={0.8}
              onPress={async () => {
               await handleSignup()
                
              }}
            >
              <Text style={styles.primaryBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


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
    marginBottom: 30,
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
    color: COLORS.text, 
    letterSpacing: -1,
  },
  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary, 
    marginLeft: 2,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
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
    color: COLORS.text,
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
    // Add subtle shadow for depth
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
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
    marginTop: 30,
    marginBottom: 20,
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