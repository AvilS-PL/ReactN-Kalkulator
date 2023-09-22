import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';

export default class CalcLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let tab = ["1","2","3","4","5","6","7","8","9",".","0","=",]
    let full = tab.map((v, i) => (<Button getData={this.props.getData} text={v} key={i} w={3} h={tab.length/3} />))
    // for (let i = 0; i < (tab.length/3); i++) {
    //     let el = []
    //     for (let j = 0; j < 3; j++) {
    //         let x = i*3 + j 
    //         el.push(<Button text={tab[x]} key={x} />)
    //     }
    //     full.push(<View style={{flex:1, flexDirection: "row"}}>{el}</View>)
    // }

    return (
      <View style={styles.main}>
        {full}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main: {
        flex: 3,
        backgroundColor: "#bbbbbb",
        flexDirection: "row",
        flexWrap: "wrap",
    }
});