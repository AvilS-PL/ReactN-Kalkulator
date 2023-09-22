import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';

import Screen from './components/Screen';
import Calc from './components/Calc';
import CalcPro from './components/CalcPro';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orientation: true, exp: "", res: "" };

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation:
          this.isPortrait()
      })
    })
  }

  getData = (v) => {

    let outcome = this.state.exp
    let result = ""
    if (v == "Del") {
      outcome = ""
    } else if (v == "C") {
      outcome = outcome.slice(0, -1)
    } else if (v == "=") {
      if (outcome[outcome.length - 1].search(/\*|\+|\/|\-|\./g) != -1) {
        outcome = outcome.slice(0, -1)
      }
      result = eval(outcome)
    } else if (v == "." || v == "/" || v == "*" || v == "-" || v == "+") {
      if (outcome.length > 0) {
        if (outcome[outcome.length - 1].search(/\*|\+|\/|\-|\./g) == -1) {
          if (v == ".") {
            let temp = outcome.split(/\*|\+|\/|\-/g)
            if (temp[temp.length - 1].search(/\./) == -1) {
              outcome = outcome + v
            }
          } else {
            if (outcome[outcome.length - 1] != v) {
              outcome = outcome + v
            }
          }
        }
      }

    } else if (v == "Sqrt" || v == "Pow" || v == "Sin" || v == "Cos") {

    } else if (v == "C") {
      outcome = outcome.slice(0, -1)
    } else {
      outcome = outcome + v
    }

    this.setState({
      orientation: this.state.orientation,
      exp: outcome,
      res: result

    })
    //, () => { console.log("po: ") }
  }

  isPortrait = () => {
    let dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  render() {
    if (this.state.orientation) {
      return (
        <View style={[styles.main, { backgroundColor: "grey" }]}>
          <StatusBar />
          <Screen expression={this.state.exp} result={this.state.res} />
          <Calc getData={this.getData} />
        </View>
      )
    }
    else {

      return (
        <View style={[styles.main, { backgroundColor: "blue" }]}>
          <StatusBar />
          <Screen expression={this.state.exp} result={this.state.res} />
          <CalcPro getData={this.getData} />
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