import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const Input = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
}) => {
  const { colors } = useTheme();
  const [secure, setSecure] = useState(secureTextEntry);
  const showToggle = secureTextEntry;

  return (
    <View style={[styles.container, { backgroundColor: colors.inputBackground, borderColor: colors.border }, style]}>
      {showToggle ? (
        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.rightIcon}>
          <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.secondaryGold} />
        </TouchableOpacity>
      ) : rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Ionicons name={rightIcon} size={20} color={colors.secondaryGold} />
        </TouchableOpacity>
      ) : null}

      <TextInput
        style={[
          styles.input,
          {
            color: colors.textPrimary,
            flex: 1,
            textAlign: 'right',
            minHeight: multiline ? numberOfLines * 40 : undefined,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />

      {icon ? (
        <View style={styles.leftIcon}>
          <Ionicons name={icon} size={20} color={colors.secondaryGold} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 6,
  },
  input: {
    fontSize: 15,
    paddingVertical: 10,
  },
  leftIcon: { marginLeft: 8 },
  rightIcon: { marginRight: 8 },
});

export default Input;
