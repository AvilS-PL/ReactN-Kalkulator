import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';

import Screen from './components/Screen';
import Calc from './components/Calc';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {orientation: true, value: ""};
    
    Dimensions.addEventListener("change", () => {
      this.setState({
         orientation: 
         this.isPortrait()
      })
    })
  }

  getData = (v) => {
    this.setState({
      orientation: this.state.orientation,
      value: v
    })
    console.log(this.state.value)
  }

  isPortrait = () => {
    let dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  render() {
    if (this.state.orientation) {
      return (
        <View style={[styles.main, {backgroundColor:"grey"}]}>
        <StatusBar/>
        <Screen></Screen>
        <Calc getData={this.getData}></Calc>
        </View>
       )
    }
    else {
      return (
        <View style={[styles.main, {backgroundColor:"blue"}]}>
        <StatusBar/>
        <Screen></Screen>
        <Calc></Calc>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});