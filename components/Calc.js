import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CalcLeft from './CalcLeft';
import CalcRight from './CalcRight';

export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <CalcLeft getData={this.props.getData}></CalcLeft>
        <CalcRight getData={this.props.getData}></CalcRight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 6,
    flexDirection: "row",
  }
});