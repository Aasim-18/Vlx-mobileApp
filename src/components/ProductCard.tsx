import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ProductProps {
    item: {
        id: string;
        title: string;
        price: string;
        location: string;
        image: string;
    }
}

export default function ProductCard({ item }: ProductProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
        <TouchableOpacity style={styles.likeButton}>
          <Text style={{ color: COLORS.textLight }}>♡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 10,
  },
  cardImageContainer: {
    height: 140,
    width: '100%',
    backgroundColor: '#F1F1F1',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  cardPrice: {
    color: COLORS.price,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 10,
  },
  cardLocation: {
    fontSize: 10,
    color: COLORS.textLight,
    flex: 1,
  },
});