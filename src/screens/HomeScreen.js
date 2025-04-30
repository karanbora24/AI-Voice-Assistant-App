import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import RecordButton from '../components/RecordButton';
import ResponseCard from '../components/ResponseCard';
import useVoiceAssistant from '../hooks/useVoiceAssistant';

const HomeScreen = () => {
  const [conversations, setConversations] = useState([]);
  const {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    errorMessage,
  } = useVoiceAssistant({
    onResponse: (userInput, aiResponse) => {
      setConversations(prev => [
        ...prev,
        { user: userInput, ai: aiResponse, timestamp: new Date() }
      ]);
    }
  });

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK', onPress: () => console.log('Error alert closed') }],
        { cancelable: true }
      );
    }
  }, [errorMessage]);

  // Auto-scroll to the bottom of conversation when new messages arrive
  const scrollViewRef = React.useRef();
  useEffect(() => {
    if (scrollViewRef.current && conversations.length > 0) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversations]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Voice Assistant</Text>
        <Text style={styles.subtitle}>Ask me anything</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.conversationContainer}
        contentContainerStyle={styles.conversationContent}
        showsVerticalScrollIndicator={false}
      >
        {conversations.length === 0 ? (
          <View style={styles.emptyState}>
            <Image 
              source={{ uri: '/api/placeholder/200/200' }} 
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateText}>
              Tap the microphone and clearly speak your question
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Make sure you're connected to the internet and speak clearly for best results
            </Text>
          </View>
        ) : (
          conversations.map((convo, index) => (
            <ResponseCard
              key={index}
              userQuery={convo.user}
              aiResponse={convo.ai}
              timestamp={convo.timestamp}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="small" color="#6200ee" />
            <Text style={styles.processingText}>
              {isRecording ? 'Listening...' : 'Processing your voice query...'}
            </Text>
          </View>
        )}
        <RecordButton
          isRecording={isRecording}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  conversationContainer: {
    flex: 1,
    marginVertical: 16,
  },
  conversationContent: {
    paddingBottom: 24,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  processingText: {
    marginLeft: 8,
    color: '#555',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;