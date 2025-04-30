import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { processVoiceWithVapi } from '../services/vapiService';

const useVoiceAssistant = ({ onResponse }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    // Configure audio mode for voice recording
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
      } catch (err) {
        setErrorMessage('Failed to configure audio: ' + err.message);
      }
    };

    setupAudio();
  }, []);

  const startRecording = async () => {
    try {
      // Request audio recording permissions
      if (!permissionResponse?.granted) {
        const { granted } = await requestPermission();
        if (!granted) {
          setErrorMessage('Permission to record audio was denied');
          return;
        }
      }

      setErrorMessage(null);
      setIsRecording(true);

      // Create and prepare a new recording with specific format for VAPI
      console.log("Starting new recording...");
      const { recording: newRecording } = await Audio.Recording.createAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      setRecording(newRecording);
      console.log("Recording started successfully");

    } catch (err) {
      setIsRecording(false);
      setErrorMessage('Failed to start recording: ' + err.message);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      setIsProcessing(true);

      // Stop the recording
      console.log("Stopping recording...");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording URI:", uri);
      setRecording(null);

      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error('Recording file doesn\'t exist');
      }
      console.log("File exists, size:", fileInfo.size, "bytes");

      // Read the audio file as base64
      console.log("Reading audio file as base64...");
      const audioData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Audio data read successfully, length:", audioData.length);

      // Process the audio with VAPI
      console.log("Sending to VAPI service...");
      const { userInput, aiResponse } = await processVoiceWithVapi(audioData);
      console.log("Received response from VAPI:", { userInput, aiResponse });
      
      // Call the response callback
      if (onResponse) {
        onResponse(userInput, aiResponse);
      }

    } catch (err) {
      console.error("Error in stopRecording:", err);
      setErrorMessage('Error processing audio: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    errorMessage,
  };
};

export default useVoiceAssistant;