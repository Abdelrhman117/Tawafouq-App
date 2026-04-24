import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CategoryCard = ({ category, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper} activeOpacity={0.85}>
      <LinearGradient colors={category.color} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Ionicons name={category.icon} size={30} color={colors.secondaryGold} />
        <Text style={styles.title}>{category.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '47%', marginBottom: 12, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  card: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 100, gap: 10 },
  title: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', textAlign: 'center' },
});

export default CategoryCard;
