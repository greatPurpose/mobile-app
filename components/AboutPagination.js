import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './Colors';

const styles = StyleSheet.create({
  viewBox: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  pagBox: {
    height: 80,
    left: 13,
    width: 160,
    flexDirection: 'row',
  },

  activeOp: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.greenblue,
    marginRight: 13,
  },

  inactiveOp: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.warmGrey,
    marginRight: 13,
  },
});

export default class AboutPagination extends Component {
  choseStyle(active, currentRef) {
    if (active === currentRef) {
      return styles.activeOp;
    } else {
      return styles.inactiveOp;
    }
  }

  render() {
    const { navigate } = this.props;
    return (
      <View style={styles.viewBox}>
        <View style={styles.pagBox}>
          <View style={this.choseStyle(this.props.active, 'one')} />
          <View style={this.choseStyle(this.props.active, 'two')} />
          <View style={this.choseStyle(this.props.active, 'three')} />
          <View style={this.choseStyle(this.props.active, 'four')} />
          <View style={this.choseStyle(this.props.active, 'five')} />
        </View>
      </View>
    );
  }
}
