import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CalcLeft from './CalcLeft';
import CalcRight from './CalcRight';
import CalcMiddle from './CalcMiddle';

export default class CalcPro extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <CalcLeft getData={this.props.getData} />
        <CalcMiddle getData={this.props.getData} />
        <CalcRight getData={this.props.getData} />
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