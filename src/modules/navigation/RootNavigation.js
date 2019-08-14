import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Login from '../login/LoginView';

import {colors, fonts} from '../../styles';
import ProjectsScreen from "../projects/ProjectsView";
import ProjectDetailScreen from "../detail/DetailView";

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Projects: {
      screen: ProjectsScreen,
      navigationOptions: {
        title: 'Projects',
      },
    },
    ProjectDetail: {
      screen: ProjectDetailScreen,
      navigationOptions: {
        title: 'Project Detail',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{flex: 1}}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
