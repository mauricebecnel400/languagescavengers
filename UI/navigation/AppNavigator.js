import {
    createStackNavigator,
  } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ScavengerModeScreen from '../screens/ScavengerModeScreen';

  const AppNavigator = createStackNavigator(
    {
      Home: { 
          screen: HomeScreen 
      },
      ScavengerMode: { 
        screen: ScavengerModeScreen
      },
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default AppNavigator;