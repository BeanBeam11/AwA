import { NativeBaseProvider } from "native-base";
import Navigation from './src/navigation';
import { theme } from './src/theme';
import { Provider } from "react-redux";
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Navigation /> 
      </NativeBaseProvider>
    </Provider>
  );
}