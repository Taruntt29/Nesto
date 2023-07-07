import React from 'react';
import {
  NavigationAction,
  NavigationState,
} from '@react-navigation/native';

export const navigationRef = React.createRef<any>();

export function navigate(
  routeName: string,
  params: { [key: string]: object | string | undefined } = {},
): void {
  navigationRef.current?.navigate(routeName, params);
}

export function push(
  routeName: string,
  params: { [key: string]: object | string | undefined } = {},
): void {
  navigationRef.current?.push(routeName, params);
}

export const reset = (state: any) => {
  navigationRef.current?.replace(state);
};

export function currentRoute(){
  return navigationRef?.current?.getCurrentRoute()
}

export function dispatch(
  action: NavigationAction | ((state: NavigationState) => NavigationAction),
): void {
  navigationRef.current?.dispatch(action);
}

export function goBack(){
  return navigationRef?.current.goBack()
}


export function replace(
  routeName: string,
  params: { [key: string]: object | string | undefined } = {},
): void {
  navigationRef.current?.replace(routeName, params);
}