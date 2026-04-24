import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primaryLight, '#145F5F']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.logoSection}>
            <View style={[styles.logoCircle, { borderColor: colors.secondaryGold }]}>
              <Ionicons name="heart" size={42} color={colors.secondaryGold} />
            </View>
            <Text style={styles.appName}>تَوَافُق</Text>
            <Text style={styles.tagline}>ابحث عن شريك حياتك بثقة</Text>
          </View>

          <View style={[styles.card, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
            <Text style={styles.welcomeTitle}>أهلاً وسهلاً</Text>
            <Text style={styles.welcomeSub}>سجّل دخولك للمتابعة</Text>

            <Input icon="mail-outline" placeholder="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.inputOverride} />
            <Input icon="lock-closed-outline" placeholder="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputOverride} />

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={[styles.forgotText, { color: colors.secondaryLight }]}>نسيت كلمة المرور؟</Text>
            </TouchableOpacity>

            <Button title="تسجيل الدخول" onPress={handleLogin} style={styles.loginButton} />

            <View style={styles.divider}>
              <View style={[styles.divLine, { backgroundColor: colors.secondaryGold + '55' }]} />
              <Text style={[styles.divText, { color: colors.secondaryLight }]}>أو</Text>
              <View style={[styles.divLine, { backgroundColor: colors.secondaryGold + '55' }]} />
            </View>

            <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.secondaryGold + '80', backgroundColor: 'rgba(255,255,255,0.06)' }]} onPress={handleLogin}>
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text style={[styles.socialText, { color: '#FFFFFF' }]}>متابعة مع Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.secondaryGold + '80', backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 10 }]} onPress={handleLogin}>
              <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
              <Text style={[styles.socialText, { color: '#FFFFFF' }]}>متابعة مع Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerRow}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[styles.registerLink, { color: colors.secondaryGold }]}>سجّل الآن</Text>
            </TouchableOpacity>
            <Text style={styles.registerText}> ليس لديك حساب؟ </Text>
          </View>

          <Text style={styles.ayah}>ﹶ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا ﹷ</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoCircle: { width: 90, height: 90, borderRadius: 45, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(201,168,76,0.15)', marginBottom: 14 },
  appName: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', letterSpacing: 2, marginBottom: 6 },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.75)' },
  card: { width: '100%', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: 'rgba(201,168,76,0.25)', marginBottom: 20 },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', textAlign: 'right', marginBottom: 4 },
  welcomeSub: { fontSize: 14, color: 'rgba(255,255,255,0.65)', textAlign: 'right', marginBottom: 20 },
  inputOverride: { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(201,168,76,0.5)' },
  forgotRow: { alignItems: 'flex-start', marginTop: 4, marginBottom: 16 },
  forgotText: { fontSize: 13, fontWeight: '600' },
  loginButton: { width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  divLine: { flex: 1, height: 1 },
  divText: { fontSize: 13, fontWeight: '600' },
  socialBtn: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', borderRadius: 12, borderWidth: 1, paddingVertical: 13, gap: 10 },
  socialText: { fontSize: 15, fontWeight: '600' },
  registerRow: { flexDirection: 'row', marginBottom: 24 },
  registerText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  registerLink: { fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' },
  ayah: { color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center', fontStyle: 'italic', paddingHorizontal: 16 },
});

export default LoginScreen;
