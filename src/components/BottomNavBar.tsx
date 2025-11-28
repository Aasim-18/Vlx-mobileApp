import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function BottomNavBar() {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navItem}>
        <Text style={[styles.navIcon, {color: COLORS.primary}]}>🏠</Text>
        <Text style={[styles.navLabel, {color: COLORS.primary}]}>Home</Text>
      </View>
      <View style={styles.navItem}>
        <Text style={styles.navIcon}>💬</Text>
        <Text style={styles.navLabel}>Chat</Text>
      </View>
      
      {/* Floating Sell Button */}
      <View style={styles.sellBtnContainer}>
         <TouchableOpacity style={styles.sellBtn}>
            <Text style={styles.sellBtnText}>Sell</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.navItem}>
        <Text style={styles.navIcon}>❤️</Text>
        <Text style={styles.navLabel}>My Ads</Text>
      </View>
      <View style={styles.navItem}>
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navLabel}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: COLORS.textLight,
  },
  navLabel: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  sellBtnContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellBtn: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sellBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});