import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userProfile } from '../data/mockData';

const ProfileContext = createContext();

const PROFILE_KEY = 'tawafouq_profile';

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (_) {}
  };

  const saveProfile = async (data) => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    } catch (_) {}
  };

  const updateProfile = (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    saveProfile(updated);
  };

  const updateProfileImage = (uri) => {
    const updated = { ...profile, profileImage: uri };
    setProfile(updated);
    saveProfile(updated);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};
