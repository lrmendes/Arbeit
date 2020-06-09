import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}


/*

Topicos para o Submit  *** Nao Remover ***

## Inspiration

## What it does

## How I built it

## Challenges I ran into

## Accomplishments that I'm proud of

## What I learned

## What's next for Arbeit

*/
