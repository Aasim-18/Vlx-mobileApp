import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function HeroBanner() {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerContent}>
         {/* Decorative Circles */}
         <View style={styles.bannerCirclesLeft}>
            <View style={[styles.circle, {top: 10, left: 10}]}>
                <Text style={{fontSize: 20}}>🏠</Text>
            </View>
            <View style={[styles.circle, {bottom: 10, right: 10}]}>
                <Text style={{fontSize: 20}}>💻</Text>
            </View>
         </View>
         
         <View style={styles.bannerTextContainer}>
           <Text style={styles.bannerTitle}>BUY & SELL</Text>
           <Text style={styles.bannerSubtitle}>Anything, Anytime</Text>
           <Text style={styles.bannerDesc}>Find great deals or list your own items.</Text>
         </View>
      </View>
      
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  bannerContent: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    height: 180,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerCirclesLeft: {
    flex: 1,
    position: 'relative',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1.5,
    justifyContent: 'center',
    paddingRight: 16,
    alignItems: 'flex-end',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  bannerDesc: {
    color: '#BDC3C7',
    fontSize: 10,
    textAlign: 'right',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
});