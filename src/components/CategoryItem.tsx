import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface CategoryItemProps {
    name: string;
    icon: string;
}

export default function CategoryItem({ name, icon }: CategoryItemProps) {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryIconBox}>
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <Text style={styles.categoryText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIconBox: {
    width: 70,
    height: 70,
    backgroundColor: '#FFF2DF', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
});