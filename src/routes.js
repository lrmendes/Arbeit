import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import RegisterUser from './pages/User/RegisterUser';
import FindOffer from './pages/User/FindOffer';
import RegisterEnterprise from './pages/Enterprise/RegisterEnterprise';
import ListOffer from './pages/Enterprise/ListOffer';
import CreateOffer from './pages/Enterprise/CreateOffer';
import ListCandidates from './pages/Enterprise/ListCandidates';
import ViewCandidate from './pages/Enterprise/ViewCandidate';

const AppStack = createStackNavigator();

const Routes = () => {
   return (
      <NavigationContainer>
         <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="RegisterUser" component={RegisterUser} />
            <AppStack.Screen name="FindOffer" component={FindOffer} />
            <AppStack.Screen name="RegisterEnterprise" component={RegisterEnterprise} />
            <AppStack.Screen name="CreateOffer" component={CreateOffer} />
            <AppStack.Screen name="ListOffer" component={ListOffer} />
            <AppStack.Screen name="ListCandidates" component={ListCandidates} />
            <AppStack.Screen name="ViewCandidate" component={ViewCandidate} />
         </AppStack.Navigator>
      </NavigationContainer>
   )
}

export default Routes;