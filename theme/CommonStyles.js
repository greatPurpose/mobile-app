import { StyleSheet, Dimensions } from "react-native";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const commonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  bg_image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  backbtn: {
    width: 9,
    height: 18,
    marginTop: 15,
  },
  contbtn: {
    backgroundColor: '#1B9A6A',
    borderRadius: 30,
  },
  contbtntxt: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    paddingVertical: 20,
  },
  error: {
    color: '#f00',
    marginVertical: 15,
    justifyContent: "center",
  }
});
export default commonStyles;
