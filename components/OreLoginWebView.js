import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import {urlParamsToArray} from './utils';

class LoginWebView extends React.Component {
    webviewUrl = null;
    callbackUrl = null;

    state = {
        key: 1,
        isWebViewUrlChanged: false,
        showWebView: true
    };

    constructor(props, context) {
      super(props);
      const {completedCallback, callbackUrl, oreIdAuthUrl, webviewUrl} = this.props;
      this.completedCallback = completedCallback; //called when OAuth flow is done
      this.callbackUrl = callbackUrl;
      this.webviewUrl = webviewUrl;
      this.oreIdAuthUrl = oreIdAuthUrl;
      this.goBack = this.goBack.bind(this);
    }

    resetWebViewToInitialUrl = () => {
        if (this.state.isWebViewUrlChanged) {
            this.setState({
              key: this.state.key + 1,
              isWebViewUrlChanged: false
            });
        }
    };

    goBack() {
        this.props.navigation.goBack();
    }

    //triggered every time web page is redirected or modified
    setWebViewUrlChanged = webviewState => {
        if (webviewState && webviewState.url && webviewState.url.startsWith(this.callbackUrl)) {
            this.setState({showWebView:false}); //hide webview so that failed redirect isnt visible
            params = urlParamsToArray(webviewState.url);
            this.completedCallback(params);
        }
        if (webviewState && webviewState.url !== this.webviewUrl) {
          this.setState({ isWebViewUrlChanged: true });
        }
    };

    //todo: provide a 'cancel' button above the webview to allow a user to back out
    render() {
        const {showWebView} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: this.backgroundColor}}>
            {showWebView && (
                <WebView
                    ref={(ref) => {this.webview = ref;}}
                    startInLoadingState={true}
                    source={{uri: this.webviewUrl}}
                    onNavigationStateChange={ this.setWebViewUrlChanged }
                />
            )}
            </View>
        );
    }
  }

  export default LoginWebView;
