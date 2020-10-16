import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default class MyBotSVG extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg
          width="100%"
          height="100%"
          fill="#FFFFFF"
          viewBox="0 0 38 38">
          <Path
            id="rect894"
            d="M 18.524701,0.78155601 C 14.841885,0.84317822 11.169731,2.1465683 8.3996872,4.5967512 5.644105,7.0341417 3.8034416,10.625931 3.784259,15.151937 c -2.45e-5,0.0058 -0.00186,0.0111 -0.00188,0.0169 a 0.59761103,0.59761103 0 0 0 -0.00188,0.04133 c -2.8e-6,0.0038 0,0.0075 0,0.01127 v 3.646132 a 0.59761103,0.59761103 0 0 0 -0.2291748,0.08077 C 1.3540317,20.23502 0.87374528,22.135717 0.95339115,23.535597 1.0109532,24.54772 1.3820577,25.42274 1.8813608,26.073425 2.380664,26.724109 2.996446,27.181376 3.6959737,27.268139 a 0.59810378,0.59810378 0 0 0 0.084531,0.0037 v 4.140173 c 0,1.91944 0.4013975,3.41342 1.3994684,4.418187 0.9980709,1.004768 2.49343,1.418253 4.4369724,1.418253 H 27.802519 c 2.33865,0 3.86315,-0.416262 4.77322,-1.465214 0.910069,-1.048954 1.065099,-2.518248 1.065099,-4.371226 v -4.251003 c 0.0054,-0.0086 0.01155,-0.01578 0.01691,-0.02442 0.622703,-0.18211 1.154841,-0.645574 1.592951,-1.264219 0.508739,-0.71837 0.881173,-1.662326 0.912942,-2.708769 0.01846,-0.608336 -0.01481,-1.31931 -0.341883,-2.036274 -0.32707,-0.716962 -0.942903,-1.405434 -1.959255,-2.000582 a 0.59761103,0.59761103 0 0 0 -0.221662,-0.08077 v -3.824589 c 0,-0.167729 -0.02083,-0.338416 -0.0526,-0.510946 C 33.453479,10.210553 31.594268,6.6998193 28.850711,4.3563056 26.002104,1.9230604 22.244939,0.7193076 18.524701,0.78155601 Z M 18.543489,1.97627 c 3.448104,-0.057695 6.930727,1.0677463 9.531413,3.2892205 1.91295,1.6340186 3.355126,3.8565606 3.988015,6.6798785 C 31.962,11.826206 31.872964,11.703627 31.766118,11.586579 30.692135,10.410058 29.303389,9.3849995 27.802523,9.3849995 h -8.704881 l 0.120223,-4.4670281 a 0.59761103,0.59761103 0 0 0 -0.0037,-0.060111 0.59761103,0.59761103 0 0 0 -0.0075,-0.058232 A 0.59761103,0.59761103 0 0 0 19.04136,4.485922 0.59761103,0.59761103 0 0 0 18.94931,4.410783 0.59761103,0.59761103 0 0 0 18.89671,4.380727 0.59761103,0.59761103 0 0 0 18.84411,4.356306 0.59761103,0.59761103 0 0 0 18.78588,4.335643 0.59761103,0.59761103 0 0 0 18.609302,4.313101 0.59761103,0.59761103 0 0 0 18.432726,4.343157 0.59761103,0.59761103 0 0 0 18.323774,4.390119 0.59761103,0.59761103 0 0 0 18.227974,4.459623 0.59761103,0.59761103 0 0 0 18.184764,4.500949 0.59761103,0.59761103 0 0 0 18.08333,4.6474693 0.59761103,0.59761103 0 0 0 18.042,4.7601781 0.59761103,0.59761103 0 0 0 18.023212,4.8860363 L 17.901044,9.3849995 H 9.616943 a 0.59761103,0.59761103 0 0 0 -0.04884,0.00188 C 7.8015698,9.5330918 6.5301853,10.502631 5.6533478,11.629784 5.5237948,11.796321 5.4155095,11.970467 5.3001933,12.14261 5.9027079,9.376173 7.3097695,7.1563706 9.1905277,5.4927867 11.724523,3.2513953 15.130356,2.0333797 18.543486,1.97627 Z m -8.8814625,8.603443 h 8.8213475 9.319145 c 0.903154,0 2.135712,0.777514 3.080709,1.812734 0.873123,0.956486 1.443795,2.130207 1.529084,2.678715 4.73e-4,0.05143 0.0075,0.09854 0.0075,0.150278 h 0.0263 v 11.580836 c -1.856598,2.816692 -4.176107,3.924924 -6.105063,4.339292 -1.504344,0.323154 -2.725512,0.223362 -3.268558,0.1484 V 30.34697 c 0,-0.773003 -0.641493,-1.414496 -1.414496,-1.414496 h -5.03433 c -0.773003,0 -1.414496,0.641493 -1.414496,1.414496 v 1.068856 c -0.210287,0.04531 -0.624908,0.118205 -1.11206,0.01127 -0.317643,-0.06973 -0.604717,-0.206034 -0.843439,-0.479013 -0.238723,-0.272978 -0.448749,-0.706405 -0.512825,-1.453945 a 0.59761103,0.59761103 0 0 0 -0.595478,-0.554151 0.59761103,0.59761103 0 0 0 -0.59548,0.65559 c 0.08025,0.936239 0.372209,1.645848 0.803991,2.13959 0.431782,0.493741 0.983556,0.747787 1.487757,0.858466 0.533861,0.117189 1.011367,0.09072 1.367534,0.03945 v 0.525975 c 0,0.773003 0.641493,1.414496 1.414496,1.414496 h 5.03433 c 0.773003,0 1.414496,-0.641493 1.414496,-1.414496 v -0.674375 c 0.693594,0.0826 1.967042,0.158555 3.518394,-0.174699 1.826076,-0.392266 3.996995,-1.386966 5.855227,-3.529666 v 2.631753 c 0,1.775669 -0.197965,2.924032 -0.773935,3.587898 -0.575969,0.663867 -1.672538,1.053828 -3.869671,1.053828 H 9.616943 c -1.7758177,0 -2.8977058,-0.368384 -3.5897774,-1.065099 C 5.3350937,34.291982 4.9752161,33.166631 4.9752161,31.41207 V 15.36984 c 0.4121104,-0.9325 0.8977599,-2.075695 1.6211292,-3.00557 0.7447955,-0.957416 1.6774495,-1.667642 3.0656812,-1.784557 z m 1.9273215,9.146325 c -1.875299,0 -3.4094432,1.534145 -3.4094432,3.409443 0,1.875299 1.5341442,3.409443 3.4094432,3.409443 1.875299,0 3.409444,-1.534144 3.409444,-3.409443 0,-1.875298 -1.534145,-3.409443 -3.409444,-3.409443 z m 14.650274,0 c -1.875299,0 -3.409443,1.534145 -3.409443,3.409443 0,1.875299 1.534144,3.409443 3.409443,3.409443 1.875299,0 3.409444,-1.534144 3.409444,-3.409443 0,-1.875298 -1.534145,-3.409443 -3.409444,-3.409443 z M 3.7805021,20.23135 v 5.830805 C 3.552132,26.006327 3.1570312,25.773218 2.8281122,25.344575 2.4714231,24.879742 2.189377,24.22675 2.1462235,23.467972 2.0872995,22.432306 2.2939421,21.257286 3.7805021,20.23135 Z m 29.8603359,0.182212 c 0.588965,0.412763 0.914041,0.816845 1.093276,1.209742 0.216117,0.473744 0.251119,0.967544 0.234811,1.504664 -0.02369,0.780401 -0.313684,1.517333 -0.69316,2.053179 -0.201621,0.284701 -0.431273,0.495124 -0.634927,0.638684 z m -22.05149,0.629291 c 1.1631,0 2.092628,0.929528 2.092628,2.092628 0,1.1631 -0.929528,2.090749 -2.092628,2.090749 -1.163099,0 -2.0926278,-0.927649 -2.0926278,-2.090749 0,-1.1631 0.9295288,-2.092628 2.0926278,-2.092628 z m 14.650274,0 c 1.1631,0 2.092628,0.929528 2.092628,2.092628 0,1.1631 -0.929528,2.090749 -2.092628,2.090749 -1.163101,0 -2.092628,-0.927649 -2.092628,-2.090749 0,-1.1631 0.929527,-2.092628 2.092628,-2.092628 z m -9.615945,9.084334 h 5.03433 c 0.131588,0 0.219783,0.08819 0.219783,0.219783 v 2.812087 c 0,0.131588 -0.08819,0.217904 -0.219783,0.217904 h -5.03433 c -0.131588,0 -0.217904,-0.08632 -0.217904,-0.217904 V 30.34697 c 0,-0.131588 0.08632,-0.219783 0.217904,-0.219783 z" />
        </Svg>
      </View>
    );
  }
}