import axios from 'axios';

// Replace with your actual VAPI API key and endpoint
const VAPI_API_KEY = 'ec1d423e-e84f-4585-8dc1-06dfa472c356'; 
const VAPI_ENDPOINT = 'https://api.vapi.ai/voice/conversation';


export const processVoiceWithVapi = async (audioBase64) => {
  try {
    console.log('Starting VAPI request preparation...');
    
    // Check for network connectivity
    const networkState = await checkNetworkConnectivity();
    if (!networkState.isConnected) {
      throw new Error('No internet connection. Please check your network and try again.');
    }
    
    console.log('Network connectivity confirmed. Endpoint:', VAPI_ENDPOINT);
   
    console.log('Using mock response for development');
    return mockVapiResponse(audioBase64);
    
    // Uncomment the code below when ready to test with actual VAPI
    /*
    console.log('Sending request to VAPI...');
    const response = await axios.post(
      VAPI_ENDPOINT,
      {
        audio: audioBase64,
        audioFormat: 'wav',  // Assuming expo-av produces WAV format
        // Additional parameters as required by VAPI
        model: 'gpt-4', // Or whatever model VAPI uses
        voice: 'alloy', // Specify the voice you want to use
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${VAPI_API_KEY}`,
        },
        timeout: 30000, // 30-second timeout
      }
    );
    
    console.log('VAPI response received:', response.status);
    
    if (!response.data) {
      console.log('No data in response, using mock');
      return mockVapiResponse(audioBase64);
    }

    return {
      userInput: response.data.userInput || "Unknown input",
      aiResponse: response.data.response || "Sorry, I couldn't process that request."
    };
    */
  } catch (error) {
    console.error('VAPI API Error:', error);
    console.log('Error details:', JSON.stringify(error, null, 2));
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Response error data:', error.response.data);
      console.log('Response status:', error.response.status);
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request made but no response received');
      throw new Error('No response from server. Please check your connection and API endpoint URL.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error in request setup:', error.message);
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Mock function for development without VAPI credentials
const mockVapiResponse = (audioBase64) => {
  // This is a fallback when the actual API isn't working
    const mockResponses = [
    {
      userInput: "Tell me about yourself",
      aiResponse: "I'm an AI voice assistant created for your internship project. I can help answer questions and assist with various tasks. I'm currently running in fallback mode since there might be an issue with the VAPI API connection."
    },
    {
      userInput: "What can you do?",
      aiResponse: "I can answer questions, provide information, and have conversations with you. Currently, I'm running in fallback mode, but with a proper API connection, I would have more capabilities."
    },
    {
      userInput: "Hello there",
      aiResponse: "Hello! How can I help you today? I'm currently operating in fallback mode due to API connection issues, but I'm still here to assist you."
    },
    {
      userInput: "What time is it?",
      aiResponse: "I can't access the current time directly, but you can check the time on your device. In full functionality mode, I would have more capabilities."
    }
  ];
  
  // Select a random response
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  // Simulate processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomResponse);
    }, 1500);
  });
};

const checkNetworkConnectivity = async () => {
  // This is a placeholder
  return { isConnected: true };
};