import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

const RecordButton = ({ isRecording, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isRecording ? styles.recording : {},
        disabled ? styles.disabled : {}
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        <View style={[styles.microphone, isRecording ? styles.stopIcon : {}]} />
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop' : 'Speak'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#d32f2f',
  },
  disabled: {
    backgroundColor: '#b0b0b0',
    opacity: 0.7,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  microphone: {
    width: 20,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  stopIcon: {
    width: 20,
    height: 20,
    borderRadius: 2,
  },
  buttonText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default RecordButton;

