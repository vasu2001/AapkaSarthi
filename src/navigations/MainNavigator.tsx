import * as React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {BottomNavigator} from './BottomNavigator';
import AuthNavigator from './AuthNavigator';

export interface MainNavigatorProps {}

export function MainNavigator(props: MainNavigatorProps) {
  const {userId} = useSelector((state: stateType) => state);
  return userId ? <BottomNavigator /> : <AuthNavigator />;
}
