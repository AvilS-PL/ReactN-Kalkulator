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
      <View style={styles.main}>
        <Text> Screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main: {
        flex:2,
        backgroundColor: "green",
    }
});
