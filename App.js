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
      if (outcome.length > 0) {
        if (outcome[outcome.length - 1].search(/\*/g) != -1) {
          outcome = outcome.slice(0, -1)
          if (outcome.length > 0) {
            if (outcome[outcome.length - 1].search(/\*/g) != -1) {
              outcome = outcome.slice(0, -1)
            }
          }
        } else if (outcome[outcome.length - 1].search(/n|s/g) != -1) {
          outcome = outcome.slice(0, -3)
        } else {
          outcome = outcome.slice(0, -1)
        }
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
          if (v == "Sqrt") {
            outcome = outcome + "*√"
          } else if (v == "Sin") {
            outcome = outcome + "*sin"
          } else if (v == "Cos") {
            outcome = outcome + "*cos"
          }
        } else if (outcome[outcome.length - 1].search(/\*|\+|\/|\-/g) != -1) {
          if (v == "Sqrt") {
            outcome = outcome + "√"
          } else if (v == "Sin") {
            outcome = outcome + "sin"
          } else if (v == "Cos") {
            outcome = outcome + "cos"
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
  }

  getExpression = (e) => {
    let spSIN = e.split(/sin/g)
    if (spSIN.length > 1) {
      let w = spSIN[0]

      for (let i = 1; i < spSIN.length; i++) {
        let temp = spSIN[i]
        let sp = ""
        let lit = ""

        for (let j = 0; j < temp.length; j++) {
          if (temp[j].search(/[0-9]/g) == -1) {
            lit = temp.slice(j)
            break
          } else {
            sp += temp[j]
          }
        }

        sp = (sp * Math.PI) / 180

        w += "(Math.round(Math.sin(" + sp + ")*1000)/1000)" + lit
      }
      e = w
    }

    let spCOS = e.split(/cos/g)
    if (spCOS.length > 1) {
      let w = spCOS[0]

      for (let i = 1; i < spCOS.length; i++) {
        let temp = spCOS[i]
        let sp = ""
        let lit = ""

        for (let j = 0; j < temp.length; j++) {
          if (temp[j].search(/[0-9]/g) == -1) {
            lit = temp.slice(j)
            break
          } else {
            sp += temp[j]
          }
        }

        sp = (sp * Math.PI) / 180

        w += "(Math.round(Math.cos(" + sp + ")*1000)/1000)" + lit
      }
      e = w
    }

    let spSQ = e.split(/√/g)
    if (spSQ.length > 1) {
      let w = spSQ[0]

      for (let i = 1; i < spSQ.length; i++) {
        let temp = spSQ[i]
        let sp = ""
        let lit = ""

        for (let j = 0; j < temp.length; j++) {
          if (temp[j].search(/[0-9]/g) == -1) {
            lit = temp.slice(j)
            break
          } else {
            sp += temp[j]
          }
        }

        w += "(Math.sqrt(" + sp + "))" + lit
      }
      e = w
    }

    return eval(e)
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