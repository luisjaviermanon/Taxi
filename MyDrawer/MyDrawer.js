import { createDrawerNavigator } from 'react-navigation-drawer';

// screens
import Login from '../screens/login';
//import CustomDrawerContent from '../components/CustomDrawerContent';

const DrawerStack = createDrawerNavigator(
  {
    Login
  },
  {
    //contentComponent: CustomDrawerContent,
    headerMode: 'none',
    hideStatusBar: true
  }
);

export default DrawerStack;