/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import Home from './src/components/home.js'

const uiTheme = {
  palette: {
    primaryColor: COLOR.green300,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends Component<{}> {
  render() {
    return (
        <ThemeProvider uiTheme={uiTheme}>
          <Home />
        </ThemeProvider>
    );
  }
}