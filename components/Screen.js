import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.tx1}> {this.props.expression} </Text>
        </View>
        <View style={styles.bot}>
          <Text style={styles.tx2}> {this.props.result} </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
    backgroundColor: "#007700",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bot: {
    flex: 1,
    backgroundColor: "#009900",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tx1: {
    fontSize: 35,
  },
  tx2: {
    fontSize: 25,
  }
});
