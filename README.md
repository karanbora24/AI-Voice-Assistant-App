# AI Voice Assistant App

A React Native mobile application that uses VAPI for AI voice assistant functionality.

## Features

- Clean and user-friendly interface
- Voice interaction with a start/stop button
- Text display of conversation history
- Text-to-speech playback of AI responses
- Error handling for network and API issues

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- VAPI API key (sign up at https://vapi.ai)

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Add your VAPI API key in `src/services/vapiService.js`
4. Start the Expo server
   ```bash
   npm start
   # or
   yarn start
   ```
5. Install the Expo Go app on your device and scan the QR code to run the app

### Building APK

1. Install EAS CLI
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account
   ```bash
   eas login
   ```
3. Configure the build
   ```bash
   eas build:configure
   ```
4. Build the APK
   ```bash
   eas build -p android --profile preview
   ```

## Technical Choices

- Used functional components with React hooks for state management
- Implemented error handling for network issues and API failures
- Used Expo AV for audio recording
- Used Expo Speech for text-to-speech functionality
- Used Axios for API requests
- Clean UI with visual feedback during recording and processing

## Future Improvements

- Add conversation history persistence
- Implement more voice customization options
- Add animations for better user experience
- Implement more sophisticated error recovery

## Credits

Created by [Your Name] for [Company Name] internship assignment.
