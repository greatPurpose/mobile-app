import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path, Rect, SvgCss} from 'react-native-svg';
import AnimatedSVG from "react-native-svg-animations/utils/AnimatedSVG";
import * as Animated from "react-native-web";
import { AnimatedSvgPath } from "react-native-svg-animations";

// const xml = `
// <svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: none; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
//   <circle cx="6.451612903225806" cy="66.3228" r="2.79321" fill="#4a90e2">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="0s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate>
//   </circle>
//   <circle cx="6.451612903225806" cy="33.6772" r="3.20679" fill="#27b4ff">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-0.5s"></animate>
//   </circle><circle cx="16.129032258064512" cy="58.5535" r="2.55321" fill="#4a90e2">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate>
//   </circle><circle cx="16.129032258064512" cy="41.4464" r="3.44679" fill="#27b4ff">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-0.7s"></animate>
//   </circle><circle cx="25.806451612903224" cy="44.917" r="2.48679" fill="#4a90e2">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate>
//   </circle><circle cx="25.806451612903224" cy="55.083" r="3.51321" fill="#27b4ff">
//     <animate attributeName="r" values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-0.9s"></animate>
//   </circle><circle cx="35.48387096774193" cy="35.0926" r="2.72679" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate>
//   </circle><circle cx="35.48387096774193" cy="64.9074" r="3.27321" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.1s"></animate>
//   </circle><circle cx="45.16129032258064" cy="32.0377" r="2.96679" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate>
//   </circle><circle cx="45.16129032258064" cy="67.9623" r="3.03321" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.3s"></animate>
//   </circle><circle cx="54.838709677419345" cy="33.6772" r="3.20679" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate>
//   </circle><circle cx="54.838709677419345" cy="66.3228" r="2.79321" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.5s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.5s"></animate>
//   </circle><circle cx="64.51612903225805" cy="41.4464" r="3.44679" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate>
//   </circle><circle cx="64.51612903225805" cy="58.5535" r="2.55321" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.7s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.7s"></animate>
//   </circle><circle cx="74.19354838709677" cy="55.083" r="3.51321" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate>
//   </circle><circle cx="74.19354838709677" cy="44.917" r="2.48679" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.9s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.9s"></animate>
//   </circle><circle cx="83.87096774193547" cy="64.9074" r="3.27321" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate>
//   </circle><circle cx="83.87096774193547" cy="35.0926" r="2.72679" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.1s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-2.1s"></animate>
//   </circle><circle cx="93.54838709677418" cy="67.9623" r="3.03321" fill="#4a90e2">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate>
//   </circle>
//   <circle cx="93.54838709677418" cy="32.0377" r="2.96679" fill="#27b4ff">
//     <animate attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.3s"></animate>
//     <animate attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></animate>
//     <animate attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-2.3s"></animate>
//   </circle>
// <!-- [ldio] generated by https://loading.io/ -->
// </svg>
// `;
//
// export default () => <SvgCss xml={xml} />;

export default class DefaultDNA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // this.state = { circleRadius: new Animated.Value(50) };
    //     //
    //     // this.state.circleRadius.addListener( (circleRadius) => {
    //     //   this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
    //     // });
    //     //
    //     // setTimeout( () => {
    //     //   Animated.spring( this.state.circleRadius, { toValue: 100, friction: 3 } ).start();
    //     // }, 2000)
  }

  // ToDo:
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={[{margin: 'auto', background: 'none', shapeRendering: 'auto'}]}
          width="200px"
          height="200px"
          viewBox="0 0 100 100">
          <Circle cx="6.451612903225806" cy="66.3228" r="2.79321" fill="#4a90e2">
            <AnimatedSvgPath
              attributeName="r"
              values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.5s">
            </AnimatedSvgPath>
            <AnimatedSVG
              attributeName="cy"
              keyTimes="0;0.5;1"
              values="32;68;32"
              dur="2s"
              repeatCount="indefinite"
              begin="0s"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="fill"
              keyTimes="0;0.5;1"
              values="#4a90e2;#1fce88;#4a90e2"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.5s">
            </AnimatedSVG>
          </Circle>
          <Circle cx="6.451612903225806" cy="33.6772" r="3.20679" fill="#27b4ff">
            <AnimatedSVG
              attributeName="r"
              values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
              dur="2s"
              repeatCount="indefinite"
              begin="-1.5s">

            </AnimatedSVG>
            <AnimatedSVG
              attributeName="cy"
              keyTimes="0;0.5;1"
              values="32;68;32"
              dur="2s"
              repeatCount="indefinite"
              begin="-1s"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="fill"
              keyTimes="0;0.5;1"
              values="#27b4ff;#ffffff;#27b4ff"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.5s">
            </AnimatedSVG>
          </Circle>
          <Circle cx="16.129032258064512" cy="58.5535" r="2.55321" fill="#4a90e2">
            <AnimatedSVG
              attributeName="r"
              values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.7s">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="cy"
              keyTimes="0;0.5;1"
              values="32;68;32"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.2s"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="fill"
              keyTimes="0;0.5;1"
              values="#4a90e2;#1fce88;#4a90e2"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.7s">
            </AnimatedSVG>
          </Circle>
          <Circle cx="16.129032258064512" cy="41.4464" r="3.44679" fill="#27b4ff">
            <AnimatedSVG
              attributeName="r"
              values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
              dur="2s"
              repeatCount="indefinite"
              begin="-1.7s">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="cy"
              keyTimes="0;0.5;1"
              values="32;68;32"
              dur="2s"
              repeatCount="indefinite"
              begin="-1.2s"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline">
            </AnimatedSVG>
            <AnimatedSVG
              attributeName="fill"
              keyTimes="0;0.5;1"
              values="#27b4ff;#ffffff;#27b4ff"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.7s">
            </AnimatedSVG>
          </Circle>
          <Circle cx="25.806451612903224" cy="44.917" r="2.48679" fill="#4a90e2">
          <AnimatedSVG
            attributeName="r"
            values="2.4000000000000004;3.5999999999999996;2.4000000000000004"
            dur="2s"
            repeatCount="indefinite"
            begin="-0.9s">
          </AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-0.9s"></AnimatedSVG>
          </Circle>
          <Circle cx="25.806451612903224" cy="55.083" r="3.51321" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-0.9s"></AnimatedSVG>
          </Circle>
          <Circle  cx="35.48387096774193" cy="35.0926" r="2.72679" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.1s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.1s"></AnimatedSVG>
          </Circle>
          <Circle  cx="35.48387096774193" cy="64.9074" r="3.27321" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.1s"></AnimatedSVG>
          </Circle>
          <Circle  cx="45.16129032258064" cy="32.0377" r="2.96679" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.3s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-0.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.3s"></AnimatedSVG>
          </Circle>
          <Circle  cx="45.16129032258064" cy="67.9623" r="3.03321" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.3s"></AnimatedSVG>
          </Circle>
          <Circle  cx="54.838709677419345" cy="33.6772" r="3.20679" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.5s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.5s"></AnimatedSVG>
          </Circle>
          <Circle  cx="54.838709677419345" cy="66.3228" r="2.79321" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.5s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.5s"></AnimatedSVG>
          </Circle>
          <Circle  cx="64.51612903225805" cy="41.4464" r="3.44679" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.7s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.7s"></AnimatedSVG>
        </Circle>
          <Circle  cx="64.51612903225805" cy="58.5535" r="2.55321" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.7s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.7s"></AnimatedSVG>
        </Circle>
          <Circle  cx="74.19354838709677" cy="55.083" r="3.51321" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-1.9s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-1.9s"></AnimatedSVG>
        </Circle>
          <Circle  cx="74.19354838709677" cy="44.917" r="2.48679" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.9s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.4s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-1.9s"></AnimatedSVG>
        </Circle>
          <Circle  cx="83.87096774193547" cy="64.9074" r="3.27321" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.1s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-2.1s"></AnimatedSVG>
        </Circle>
          <Circle  cx="83.87096774193547" cy="35.0926" r="2.72679" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.1s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.6s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-2.1s"></AnimatedSVG>
        </Circle>
          <Circle  cx="93.54838709677418" cy="67.9623" r="3.03321" fill="#4a90e2">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-2.3s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-1.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#4a90e2;#1fce88;#4a90e2" dur="2s" repeatCount="indefinite" begin="-2.3s"></AnimatedSVG>
        </Circle>
          <Circle  cx="93.54838709677418" cy="32.0377" r="2.96679" fill="#27b4ff">
          <AnimatedSVG attributeName="r"  values="2.4000000000000004;3.5999999999999996;2.4000000000000004" dur="2s" repeatCount="indefinite" begin="-3.3s"></AnimatedSVG>
          <AnimatedSVG attributeName="cy" keyTimes="0;0.5;1" values="32;68;32" dur="2s" repeatCount="indefinite" begin="-2.8s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" calcMode="spline"></AnimatedSVG>
          <AnimatedSVG attributeName="fill" keyTimes="0;0.5;1" values="#27b4ff;#ffffff;#27b4ff" dur="2s" repeatCount="indefinite" begin="-2.3s"></AnimatedSVG>
        </Circle>
        </Svg>
      </View>
    );
  }
}
