import { DefaultTheme } from '@react-navigation/native';
import { extendTheme } from 'native-base';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary50: '#F1FAFF',
    primary100: '#BDDAFF',
    primary200: '#94C3FF',
    secondary50: '#FFF7E7',
    secondary100: '#FFEECB',
    secondary200: '#FFE8B8',
    dark50: '#121212',
    dark100: '#292929',
    dark200: '#484848',
    dark300: '#979797',
    dark400: '#C4C4C4',
    dark500: '#E5E5E5',
    dark600: '#F8F8F8',
  },
};

const theme = extendTheme({
  colors: {
  // Add new color
    primary: {
      50: '#F1FAFF',
      100: '#BDDAFF',
      200: '#94C3FF',
    },
    secondary: {
      50: '#FFF7E7',
      100: '#FFEECB',
      200: '#FFE8B8',
    },
    dark: {
      50: '#121212',
      100: '#292929',
      200: '#484848',
      300: '#979797',
      400: '#C4C4C4',
      500: '#E5E5E5',
      600: '#F8F8F8',
    }
  },
});

export { MyTheme, theme };