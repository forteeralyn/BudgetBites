import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Image,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={styles.logoArea}>
            <Image
              source={require('../assets/images/Login_Screen_Icon.png')}
              style={styles.logoImage}
            />
            <Text style={styles.logoTitle}>Budget{'\n'}Bites</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Email */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#bbb"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Remember me */}
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRemember(!remember)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, remember && styles.checkboxActive]}>
                {remember && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.rememberText}>Remember for 30 days</Text>
            </TouchableOpacity>

            {/* Log In Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.replace('Main')}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>LOG IN</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 12 }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpGray}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign up</Text>
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
    backgroundColor: '#F97040',
    // salmon-orange gradient simulation with solid bg
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
    // gradient effect via bg
    backgroundColor: '#F97040',
    // The gradient goes from #F97040 top to #F45C3A bottom — approximated
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 42,
    gap: 16,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'transparent',
  },
  logoTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 44,
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    gap: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 10,
  },
  inputIcon: {
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#7B2FBE',
    borderColor: '#7B2FBE',
  },
  rememberText: {
    color: '#fff',
    fontSize: 13,
  },
  loginBtn: {
    backgroundColor: '#7B2FBE',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  forgotText: {
    color: '#fff',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  signUpRow: {
    flexDirection: 'row',
    marginTop: 28,
  },
  signUpGray: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  signUpLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});