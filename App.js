import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import Navigation from './src/navigation';
import { theme } from './src/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation /> 
    </NativeBaseProvider>
  );
}