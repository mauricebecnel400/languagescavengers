import {
    createStackNavigator,
  } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ScavengerModeScreen from '../screens/ScavengerModeScreen';
import SettingScreen from '../screens/SettingScreen';
import DiscoveryModeScreen from '../screens/DiscoveryModeScreen';

  const AppNavigator = createStackNavigator(
    {
      Home: {
          screen: HomeScreen
      },
      ScavengerMode: {
        screen: ScavengerModeScreen
      },
      DiscoveryMode: {
        screen: DiscoveryModeScreen
      },
      SettingMode: {
        screen: SettingScreen
      },
    },
    {
      initialRouteName: 'Home',
    }
  );

  export default AppNavigator;
