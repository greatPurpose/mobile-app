import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from './Colors';
import GroupsSVG from '../assets/icons/groups'
import CalendarSVG from "../assets/icons/calendar";
import MyBotSVG from "../assets/icons/myBotIco";
import WalletSVG from "../assets/icons/wallet";
import ProfileSVG from "../assets/icons/profile";
import {ImageBackground} from "react-native-web";
import CogsSVG from "../assets/icons/cogsIco";

export default class BottomNav extends Component {


  navigate(to){
    const { navigate } = this.props;
    navigate(to);
  }

  onTapGroup = () => {
    // this.props.active = 'group';
    this.navigate('Colony');
  };

  onTapCalendar = () => {
    // this.props.active = 'calendar';
    this.navigate('ShiftPreference');
  };

  onTapBot = () => {
    // this.props.active = 'bot';
    this.navigate('MyBot');
  };

  onTapWallet = () => {
    // this.props.active = 'wallet';
    this.navigate('Wallet');
  };

  onTapProfile = () => {
    // this.props.active = 'profile';
    this.navigate('Profile');
  };

  onTapSettings = () => {
    // this.props.active = 'profile';
    this.navigate('Settings');
  };


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
      <View style={styles.navBox}>
        <View style={styles.navButton}>
          <View style={this.choseStyle(this.props.active, 'colony')} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {navigate('Colony')}}>
            <View style={{width: 32, height: 32}}>
              <GroupsSVG />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.navButton}>
          <View style={this.choseStyle(this.props.active, 'wallet')} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {navigate('Wallet')}}>
            <View style={{width: 32, height: 32}}>
              <WalletSVG />
            </View>
            </TouchableOpacity>
        </View>
        <View style={styles.navButton}>
          <View style={this.choseStyle(this.props.active, 'bot')} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {navigate('MyBot')}}>
            <View style={{width: 42, height: 42}}>
              <MyBotSVG />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.navButton}>
          <View style={this.choseStyle(this.props.active, 'profile')} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {navigate('Profile')}}>
            <View style={{width: 32, height: 32}}>
              <ProfileSVG />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.navButton}>
          <View style={this.choseStyle(this.props.active, 'settings')} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {navigate('Settings')}}>
            <View style={{width: 32, height: 32}}>
              <CogsSVG />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBox: {
    position: 'absolute',
    bottom: 0,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#000000',
  },

  navButton: {
    width: '20%',
    alignItems: 'center',
  },

  activeOp: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.greenblue,
    marginTop: 10,
    marginBottom: 7,
  },

  inactiveOp: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.greenblue,
    opacity: 0,
    marginBottom: 17,
  },

  navIcon: {
    height: 32,
    width: 32,
  },
});
