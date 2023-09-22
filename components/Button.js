import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.getData(this.props.text)} style={styles((100/this.props.w)+"%", (100/this.props.h)+"%").main}>
        <Text style={styles().tx}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}

const styles = (x,y) => StyleSheet.create({
    main: {
        // backgroundColor:"red",
        width:x,
        height:y,
        alignItems: "center",
        justifyContent: "center"
    },
    tx: {
        fontSize: 30,
    }
});