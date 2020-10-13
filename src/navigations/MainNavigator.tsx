import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {BottomNavigator} from './BottomNavigator';
import AuthNavigator from './AuthNavigator';

export interface MainNavigatorProps {}

export function MainNavigator() {
  const {userId} = useSelector((state: stateType) => state);

  const refVar = useRef(false);
  const [route, setRoute] = useState<string>();

  useEffect(() => {
    if (!refVar.current) {
      refVar.current = true;
    } else if (!userId) {
      console.log('signout');
      setRoute('Login');
    }
  }, [userId]);

  console.log('render', route);

  return userId ? <BottomNavigator /> : <AuthNavigator initialRoute={route} />;
}
