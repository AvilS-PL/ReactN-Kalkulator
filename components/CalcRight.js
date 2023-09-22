import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';

export default class CalcRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let tab = ["Del","C","/","*","-","+"]
    let full = tab.map((v, i) => (<Button getData={this.props.getData} text={v} key={i} w={1} h={tab.length} />))
    return (
      <View style={styles.main}>
        {full}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
      flex:1,
      backgroundColor: "#999999",
  }
});