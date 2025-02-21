import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Slot />
    </Provider>
  );
}