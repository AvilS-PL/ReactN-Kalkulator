import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';

import Screen from './components/Screen';
import Calc from './components/Calc';
import CalcPro from './components/CalcPro';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orientation: false, exp: "", res: "" };

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
      if (outcome.length > 0 && outcome[outcome.length - 1].search(/[0-9]/g) == -1) {
        while (outcome.length > 0 && outcome[outcome.length - 1].search(/[0-9]/g) == -1) {
          outcome = outcome.slice(0, -1)
        }
      } else if (outcome.length > 0) {
        outcome = outcome.slice(0, -1)
      }
    } else if (v == "=") {
      if (outcome.length > 0) {
        if (outcome[outcome.length - 1].search(/\*|\+|\/|\-|\.|√/g) != -1) {
          outcome = outcome.slice(0, -1)
          if (outcome.length > 0) {
            if (outcome[outcome.length - 1].search(/\*/g) != -1) {
              outcome = outcome.slice(0, -1)
            }
          }
        } else if (outcome[outcome.length - 1].search(/n|s/g) != -1) {
          outcome = outcome.slice(0, -3)
        }
        result = this.getExpression(outcome)
      }
    } else if (v == "." || v == "/" || v == "*" || v == "-" || v == "+" || v == "Pow") {
      if (outcome.length > 0) {
        if (outcome[outcome.length - 1].search(/\*|\+|\/|\-|\.|√|n|s/g) == -1) {
          if (v == ".") {
            let temp = outcome.split(/\*|\+|\/|\-/g)
            if (temp[temp.length - 1].search(/\./) == -1) {
              outcome = outcome + v
            }
          } else if (v == "Pow") {
            outcome = outcome + "**"
          } else {
            outcome = outcome + v
          }
        }
      }

    } else if (v == "Sqrt" || v == "Sin" || v == "Cos") {
      if (outcome.length > 0) {
        if (outcome[outcome.length - 1].search(/\*|\+|\/|\-|\.|√|n|s/g) == -1) {
          //dodaj opcję pierwiastka w pierwiastku zamieast * pierwiastek, to samo do sin i cos
          if (v == "Sqrt") {
            outcome = outcome + "*√"
          } else if (v == "Sin") {
            outcome = outcome + "*sin"
          } else if (v == "Cos") {
            outcome = outcome + "*cos"
          }
        }
      } else {
        if (v == "Sqrt") {
          outcome = outcome + "√"
        } else if (v == "Sin") {
          outcome = outcome + "sin"
        } else if (v == "Cos") {
          outcome = outcome + "cos"
        }
      }
    } else if (v == "C") {
      outcome = outcome.slice(0, -1)
    } else {
      if (outcome.length == 1) {
        if (outcome[outcome.length - 1] == "0") {
          outcome = outcome.slice(0, -1)
        }
      } else if (outcome.length > 1) {
        if (outcome[outcome.length - 1] == "0" && outcome[outcome.length - 2].search(/\*|\+|\/|\-|\.|√|n|s/g) != -1) {
          outcome = outcome.slice(0, -1)
        }
      }
      outcome = outcome + v
    }

    this.setState({
      orientation: this.state.orientation,
      exp: outcome,
      res: result

    })
    //, () => { console.log("po: ") }
  }

  getExpression = (e) => {
    let spSIN = e.split(/sin/g)
    console.log(spSIN)
    if (spSIN.length > 1) {
      let temp = spSIN[0]
      for (let i = 1; i < spSIN.length; i++) {
        temp += "Math.sin(" + spSIN[i] + ")"
      }
      e = temp
    }
    console.log(e)
    return eval("1")
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