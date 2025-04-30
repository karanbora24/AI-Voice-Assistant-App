
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

const ResponseCard = ({ userQuery, aiResponse, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const speakResponse = () => {
    Speech.speak(aiResponse, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userQueryContainer}>
        <Text style={styles.userQueryText}>{userQuery}</Text>
      </View>
      
      <View style={styles.aiResponseContainer}>
        <Text style={styles.aiResponseText}>{aiResponse}</Text>
        <View style={styles.responseFooter}>
          <Text style={styles.timestamp}>{formattedTime}</Text>
          <TouchableOpacity
            onPress={speakResponse}
            style={styles.speakButton}
          >
            <Text style={styles.speakButtonText}>Listen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  userQueryContainer: {
    backgroundColor: '#e1f5fe',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
    marginLeft: 40,
    marginBottom: 8,
  },
  userQueryText: {
    fontSize: 15,
    color: '#01579b',
  },
  aiResponseContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    marginRight: 40,
  },
  aiResponseText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  responseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  speakButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  speakButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ResponseCard;