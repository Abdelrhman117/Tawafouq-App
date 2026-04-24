import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../constants/globalStyles';
import { chats } from '../data/mockData';

const MessagesListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const gs = createGlobalStyles(colors);
  const [activeTab, setActiveTab] = useState('all');
  const displayed = activeTab === 'all' ? chats : chats.filter(c => c.unread > 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.chatItem, { backgroundColor: colors.surface }]} onPress={() => navigation.navigate('Chat', { user: item })} activeOpacity={0.85}>
      <View style={styles.avatarWrap}>
        <LinearGradient colors={[colors.primaryDark, colors.primaryLight]} style={styles.avatar}>
          <Ionicons name="person" size={24} color={colors.secondaryGold} />
        </LinearGradient>
        {item.online && <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.topRow}>
          {item.unread > 0
            ? <LinearGradient colors={colors.goldGradient} style={styles.unreadBadge}><Text style={[styles.unreadCount, { color: colors.primaryDark }]}>{item.unread}</Text></LinearGradient>
            : <Ionicons name="checkmark-done" size={16} color={colors.secondaryGold} />}
          <Text style={[styles.chatTime, { color: colors.textSecondary }]}>{item.time}</Text>
        </View>
        <Text style={[styles.chatName, { color: colors.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.chatPreview, { color: item.unread > 0 ? colors.textPrimary : colors.textSecondary, fontWeight: item.unread > 0 ? '600' : '400' }]} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={gs.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerGradientStart} />
      <LinearGradient colors={[colors.headerGradientStart, colors.headerGradientEnd]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>الرسائل</Text>
        <View style={[styles.tabsContainer, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
          <TouchableOpacity style={[styles.tab, activeTab === 'unread' && { backgroundColor: colors.secondaryGold }]} onPress={() => setActiveTab('unread')}>
            <Text style={[styles.tabText, { color: activeTab === 'unread' ? colors.primaryDark : 'rgba(255,255,255,0.8)' }]}>غير مقروءة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'all' && { backgroundColor: colors.secondaryGold }]} onPress={() => setActiveTab('all')}>
            <Text style={[styles.tabText, { color: activeTab === 'all' ? colors.primaryDark : 'rgba(255,255,255,0.8)' }]}>الكل</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {displayed.length === 0
        ? <View style={styles.emptyState}><Ionicons name="chatbubbles-outline" size={64} color={colors.mediumGray} /><Text style={[styles.emptyText, { color: colors.textSecondary }]}>لا توجد رسائل غير مقروءة</Text></View>
        : <FlatList data={displayed} keyExtractor={item => item.id} renderItem={renderItem} contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.lightGray }]} />} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingBottom: 16, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 14 },
  tabsContainer: { flexDirection: 'row-reverse', borderRadius: 25, padding: 4, width: '80%' },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  tabText: { fontSize: 13, fontWeight: '700' },
  listContent: { paddingTop: 8 },
  chatItem: { flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  avatarWrap: { position: 'relative', marginLeft: 14 },
  avatar: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center' },
  onlineDot: { position: 'absolute', bottom: 2, left: 2, width: 13, height: 13, borderRadius: 7, borderWidth: 2, borderColor: '#FFFFFF' },
  chatContent: { flex: 1 },
  topRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  chatTime: { fontSize: 11 },
  unreadBadge: { minWidth: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  unreadCount: { fontSize: 11, fontWeight: '800' },
  chatName: { fontSize: 16, fontWeight: '700', textAlign: 'right', marginBottom: 3 },
  chatPreview: { fontSize: 13, textAlign: 'right' },
  separator: { height: 1, marginHorizontal: 16 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyText: { fontSize: 16, fontWeight: '600' },
});

export default MessagesListScreen;
