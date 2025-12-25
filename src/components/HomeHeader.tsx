import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/theme';

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Image
        source={require("./logo.png")}
        style={{ width: 100, height: 50 }}
        resizeMode="contain"
        />
        <Text style={styles.subLogoText}>Sell Fast, Earn Smart</Text>
      </View>

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
  subLogoText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  locationContainer: {
    alignItems: 'flex-end',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 4,
  },
  locationIconCircle: {
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});