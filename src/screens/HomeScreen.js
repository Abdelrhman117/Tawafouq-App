import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { createGlobalStyles } from '../constants/globalStyles';
import { profiles, categories, successStories } from '../data/mockData';
import MatchCard from '../components/MatchCard';
import CategoryCard from '../components/CategoryCard';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const insets = useSafeAreaInsets();
  const gs = createGlobalStyles(colors);
  const [activeFilter, setActiveFilter] = React.useState('الكل');
  const filters = ['الكل', 'زواج معلن', 'مسيار', 'تعدد'];
  const filteredProfiles = activeFilter === 'الكل' ? profiles : profiles.filter(p => p.marriageType && p.marriageType.includes(activeFilter));

  return (
    <View style={gs.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerGradientStart} />
      <LinearGradient colors={[colors.headerGradientStart, colors.headerGradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.avatarCircle, { borderColor: colors.secondaryGold }]}>
            {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.avatarImg} /> : <Ionicons name="person" size={22} color={colors.secondaryGold} />}
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>السلام عليكم</Text>
            <Text style={styles.userName}>{profile.name}</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            <View style={[styles.bellDot, { backgroundColor: colors.secondaryGold }]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.searchBar, { backgroundColor: 'rgba(255,255,255,0.15)' }]} onPress={() => navigation.navigate('Search')} activeOpacity={0.8}>
          <Ionicons name="search-outline" size={18} color="rgba(255,255,255,0.8)" />
          <Text style={styles.searchPlaceholder}>ابحث عن شريك حياتك...</Text>
          <Ionicons name="options-outline" size={18} color={colors.secondaryGold} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow} style={styles.filterScroll}>
          {filters.map(f => (
            <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} style={[styles.filterChip, { backgroundColor: activeFilter === f ? colors.secondaryGold : colors.chipBackground, borderColor: colors.secondaryGold }]}>
              <Text style={[styles.filterChipText, { color: activeFilter === f ? colors.primaryDark : colors.chipText }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity><Text style={[styles.seeAll, { color: colors.secondaryGold }]}>عرض الكل</Text></TouchableOpacity>
            <Text style={[gs.sectionTitle, { marginBottom: 0 }]}>مرشحين لك اليوم</Text>
          </View>
          <FlatList data={filteredProfiles} keyExtractor={item => item.id} horizontal inverted showsHorizontalScrollIndicator={false} contentContainerStyle={styles.matchList}
            renderItem={({ item }) => <MatchCard profile={item} onPress={() => navigation.navigate('Chat', { user: item })} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={[gs.sectionTitle, { marginHorizontal: 16 }]}>اكتشف حسب الفئات</Text>
          <View style={styles.categoryGrid}>
            {categories.map(cat => <CategoryCard key={cat.id} category={cat} onPress={() => navigation.navigate('Search')} />)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[gs.sectionTitle, { marginHorizontal: 16 }]}>قصص نجاح</Text>
          {successStories.map(story => (
            <LinearGradient key={story.id} colors={[colors.primaryDark, colors.primaryLight]} style={styles.storyCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={styles.storyTopRow}>
                <LinearGradient colors={colors.goldGradient} style={styles.storyMatchBadge}>
                  <Text style={[styles.storyMatchTxt, { color: colors.primaryDark }]}>{story.match}٪ توافق</Text>
                </LinearGradient>
                <Ionicons name="heart" size={22} color={colors.secondaryGold} />
              </View>
              <Text style={styles.storyCouple}>{story.couple}</Text>
              <Text style={styles.storyCity}>{story.city} · {story.duration}</Text>
              <Text style={styles.storyText}>"{story.story}"</Text>
            </LinearGradient>
          ))}
        </View>

        <View style={[styles.ayahCard, { backgroundColor: colors.surface, borderColor: colors.secondaryGold + '44' }]}>
          <Ionicons name="leaf-outline" size={20} color={colors.secondaryGold} style={{ marginBottom: 8 }} />
          <Text style={[styles.ayahText, { color: colors.textSecondary }]}>ﹶ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﹷ</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingBottom: 16 },
  headerRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  avatarCircle: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.15)' },
  avatarImg: { width: 42, height: 42 },
  headerCenter: { alignItems: 'center', flex: 1 },
  greeting: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  userName: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  bellBtn: { position: 'relative', padding: 4 },
  bellDot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4 },
  searchBar: { flexDirection: 'row-reverse', alignItems: 'center', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11, gap: 10, borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)' },
  searchPlaceholder: { flex: 1, color: 'rgba(255,255,255,0.7)', fontSize: 14, textAlign: 'right' },
  scrollContent: { paddingTop: 8 },
  filterScroll: { marginVertical: 12 },
  filterRow: { paddingHorizontal: 16, gap: 10, flexDirection: 'row-reverse' },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterChipText: { fontSize: 13, fontWeight: '700' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 12 },
  seeAll: { fontSize: 13, fontWeight: '600' },
  matchList: { paddingHorizontal: 16, paddingBottom: 4 },
  categoryGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 },
  storyCard: { marginHorizontal: 16, borderRadius: 20, padding: 20, marginBottom: 12 },
  storyTopRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  storyMatchBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  storyMatchTxt: { fontSize: 12, fontWeight: '700' },
  storyCouple: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', textAlign: 'right', marginBottom: 4 },
  storyCity: { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'right', marginBottom: 10 },
  storyText: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'right', lineHeight: 22, fontStyle: 'italic' },
  ayahCard: { marginHorizontal: 16, borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, marginBottom: 8 },
  ayahText: { fontSize: 14, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
});

export default HomeScreen;
