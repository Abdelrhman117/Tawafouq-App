import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const MatchCard = ({ profile, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadowColor }]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      <View style={styles.imageContainer}>
        {profile.profileImage ? (
          <Image source={{ uri: profile.profileImage }} style={styles.image} />
        ) : (
          <LinearGradient colors={[colors.primaryDark, colors.primaryLight]} style={styles.imagePlaceholder}>
            <Ionicons name="person" size={48} color={colors.secondaryGold} />
          </LinearGradient>
        )}
        <LinearGradient colors={colors.goldGradient} style={styles.matchBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={[styles.matchText, { color: colors.primaryDark }]}>{profile.match}٧٪</Text>
          <Text style={[styles.matchLabel, { color: colors.primaryDark }]}>توافق</Text>
        </LinearGradient>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{profile.name}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={14} color={colors.secondaryGold} />
          <Text style={[styles.detail, { color: colors.textSecondary }]}>{profile.age} سنة · {profile.city}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="school-outline" size={14} color={colors.secondaryGold} />
          <Text style={[styles.detail, { color: colors.textSecondary }]}>{profile.education}</Text>
        </View>
        <View style={styles.tags}>
          {profile.marriageType && profile.marriageType.map((t, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: colors.chipBackground }]}>
              <Text style={[styles.tagText, { color: colors.chipText }]}>{t}</Text>
            </View>
          ))}
          <View style={[styles.tag, { backgroundColor: colors.chipBackground }]}>
            <Text style={[styles.tagText, { color: colors.chipText }]}>{profile.religion}</Text>
          </View>
        </View>
        <Button title="مشاهدة الملف" onPress={onPress} style={styles.button} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { width: 220, borderRadius: 20, overflow: 'hidden', marginRight: 14, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 6 },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 180 },
  imagePlaceholder: { width: '100%', height: 180, alignItems: 'center', justifyContent: 'center' },
  matchBadge: { position: 'absolute', bottom: 10, left: 10, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' },
  matchText: { fontSize: 16, fontWeight: '800' },
  matchLabel: { fontSize: 10, fontWeight: '600' },
  info: { padding: 14 },
  name: { fontSize: 17, fontWeight: '800', textAlign: 'right', marginBottom: 8 },
  detailRow: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 4, gap: 4 },
  detail: { fontSize: 13 },
  tags: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginVertical: 8, gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagText: { fontSize: 11, fontWeight: '600' },
  button: { marginTop: 4 },
});

export default MatchCard;
