import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackPramList } from "../App";
import axios from 'axios';

type EmailVerifyProps = NativeStackScreenProps<RootStackPramList, "EmailVerify">;

const COLORS = {
  primary: '#FF9F1C',      
  background: '#FFFFFF',   
  text: '#1A1A1A',         
  textSecondary: '#757575',
  inputBg: '#F8F9FA',      
  border: '#E0E0E0',
  error: '#FF4D4D',
};

export default function EmailVerify({ navigation }: EmailVerifyProps) {
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  
  
  const inputRefs = useRef<Array<TextInput | null>>([]);

  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Input Change
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if text is entered
    if (text.length !== 0 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
    const Otp = await axios.post(
      "https://vlx-server.onrender.com/api/v1/users/verify",
    )
    {
      otp
    }
      
    } catch (error) {
            Alert.alert("Error", "Error While verifing Otp");
      
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      Alert.alert("Code Sent", "A new code has been sent to your email.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          
          {/* Header Icon/Text */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✉️</Text>
            </View>
            <Text style={styles.title}>Verify Email</Text>
            <Text style={styles.subtitle}>
              Please enter the 4-digit code sent to{"\n"}
              <Text style={styles.emailText}>name@vnit.ac.in</Text>
            </Text>
          </View>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpBox,
                  { borderColor: digit ? COLORS.primary : COLORS.border }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            style={styles.verifyBtn}
            activeOpacity={0.8}
            onPress={handleVerify}
          >
            <Text style={styles.verifyBtnText}>Verify Account</Text>
          </TouchableOpacity>

          {/* Resend Timer */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text style={[
                styles.resendLink, 
                { color: timer > 0 ? COLORS.textSecondary : COLORS.primary }
              ]}>
                {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center', // Centers content vertically
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFF2DF', // Light Orange tint
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  emailText: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  
  // OTP Styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    width: '100%',
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: COLORS.inputBg,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.text,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  // Button Styles
  verifyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  verifyBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Footer Styles
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  resendLink: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

