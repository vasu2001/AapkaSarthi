import React, {createRef, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {BottomNavigator} from './BottomNavigator';
import AuthNavigator from './AuthNavigator';

export interface MainNavigatorProps {}

export function MainNavigator() {
  const {userId} = useSelector((state: stateType) => state);

  return userId ? <BottomNavigator /> : <AuthNavigator />;
}
