import React from "react";
import { NavigationContainer, TabActions} from '@react-navigation/native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "./Screens/Login";
import HomeScreen from "./Screens/HomeScreen";
import Registration from "./Screens/Registration";
import ShowEnsemble from "./Screens/ShowEnsemble";
import CreateEnsemble from './Screens/CreateEnsemble';
import EditEnsemble from './Screens/EditEnsemble';


////////////////////////////////////////////////////////
const work = createStackNavigator({
  //creates start-up screen to "Login"
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false, //hiding headers
    },
  },
  ////////////////////////////////////////////////////////
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      headerBackTitleVisible: true,
      headerTitleAlign: "center"
    },
  },
  ////////////////////////////////////////////////////////
  Registration: {
    screen: Registration,
    navigationOptions: {
      title: "Registration",
      headerTitleAlign: "center",
      headerShown: false
    },
  },
  ////////////////////////////////////////////////////////
  ShowEnsemble: {
    screen: ShowEnsemble,
    navigationOptions: { 
      title: "Your Ensemble", 
      headerTitleAlign: "center" 
    },
  },
  ////////////////////////////////////////////////////////
  CreateEnsemble: {
    screen: CreateEnsemble,
    navigationOptions: {
      title: "Create Ensemble", 
      headerTitleAlign: "center"
    },
  },
  ////////////////////////////////////////////////////////
  EditEnsemble: {
    screen: EditEnsemble,
    navigationOptions: {
      title: "Edit Ensemble",
      headerBackTitleVisible: true,
      headerTitleAlign: "center"
    },
  },
});


const Navigator = createAppContainer(work);

export default Navigator;
