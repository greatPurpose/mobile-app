import React, { Component } from "react";
import {
  StyleSheet,
} from 'react-native';
import StatisticsIcoSVG from "../assets/icons/statsico";
import CalendarSVG from "../assets/icons/calendar";
import CryoSVG from "../assets/icons/cryoIco";

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
  },
});

export const ENTRIES1 = [
  {
    title: 'Time Card',
    icon: <CalendarSVG style={styles.icon}/>,
    to: 'ShiftPreference'
  },
  {
    title: 'Analytics',
    icon: <StatisticsIcoSVG style={styles.icon}/>,
    to: 'Tracker'
  },
  {
    title: 'aClone Manager',
    icon: <CryoSVG style={styles.icon}/>,
    to: 'aClone'
  },
];
