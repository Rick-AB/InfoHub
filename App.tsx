import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './src/screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileDetailsScreen from './src/screens/ProfileDetailsScreen';

import Strings from './src/constants/Strings';
import Colors from './src/constants/Colors';

export type RootStackParamList = {
  Profile: undefined;
  ProfileDetails: {profileData: ProfileData}; // Define navigation parameters
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          statusBarTranslucent: true,
          statusBarColor: Colors.transparent,
          statusBarStyle: 'dark',
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetailsScreen}
          options={{headerTitle: Strings.myProfileLabel}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
