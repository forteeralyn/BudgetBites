import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_CONFIG = {
  'All': { icon: 'grid-outline', color: '#ff6b35' },
  '30-50 Pesos': { icon: 'cash-outline', color: '#10b981' },
  '51-100 Pesos': { icon: 'wallet-outline', color: '#3b82f6' },
  'Breakfast': { icon: 'sunny-outline', color: '#f59e0b' },
  'Lunch': { icon: 'restaurant-outline', color: '#ef4444' },
  'Dinner': { icon: 'moon-outline', color: '#8b5cf6' },
  'Vegetable': { icon: 'leaf-outline', color: '#10b981' },
  'Egg': { icon: 'ellipse-outline', color: '#f59e0b' },
  'Noodles': { icon: 'reorder-four-outline', color: '#f97316' },
  'Canned': { icon: 'archive-outline', color: '#6b7280' },
};

export default function CategoryChip({ label, selected, onPress }) {
  const config = CATEGORY_CONFIG[label] || { icon: 'pricetag-outline', color: '#ff6b35' };

  return (
    <TouchableOpacity
      style={[styles.chip, selected && { backgroundColor: config.color, borderColor: config.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={config.icon}
        size={13}
        color={selected ? '#fff' : config.color}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },
  labelSelected: {
    color: '#fff',
  },
});