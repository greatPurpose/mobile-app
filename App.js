/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { createAppContainer } from "react-navigation";
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './apollo';
import AppNavigatorMain from './navigation/AppNavigatorMain';
import AppNavigatorLogin from './navigation/AppNavigatorLogin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import { google_bootstrap } from './Authentication/GoogleAuth'
import LoadingOverlay from "./components/Loading";
import sign_in_anon from "./Authentication/AnonymusAuth";
import {HttpLink} from "apollo-link-http";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {WebSocketLink} from "apollo-link-ws";

export function App() {
  // Set an initializing state whilst Firebase connects
  const LoginAppContainer = createAppContainer(AppNavigatorLogin);
  const MainAppContainer = createAppContainer(AppNavigatorMain);
  // const client = createApolloClient();
  const [initializing, setInitializing] = useState(true);
  const [authState, setAuthState] = useState({ status: "loading" });
    const headers = authState.status === "in" ? { Authorization: `Bearer ${authState.token}` }:{};

    const httpLink = new HttpLink({
        uri: "https://beautiful-hasura-dev.herokuapp.com/v1/graphql",
        headers
    });

    const wsLink = new WebSocketLink({
        uri: "wss://beautiful-hasura-dev.herokuapp.com/v1/graphql",
        options: {
            reconnect: true,
            lazy: true,
            connectionParams: {
                headers
            }
        }
    });

    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
    );


    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    });

  // async function componentDidMount(): void {
  //   await google_bootstrap()
  //       .then(
  //           console.log('Google Boot Strapped')
  //       )
  //       .catch(error => {
  //       if (error.code === 'auth/operation-not-allowed') {
  //         console.log('Enable google auth in your firebase console.');
  //       }
  //       console.error(error);
  //       });
  // }

    useEffect(() => {
        return auth().onAuthStateChanged(async user => {
            if (user) {
                const token = await user.getIdToken();
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim =
                    idTokenResult.claims["https://hasura.io/jwt/claims"];

                if (hasuraClaim) {
                    setAuthState({ status: "in", user, token });
                } else {
                    // Check if refresh is required.
                    const metadataRef = database()
                        .ref("metadata/" + user.uid + "/refreshTime");

                    metadataRef.on("value", async (data) => {
                        if(!data.exists) return;
                        // Force refresh to pick up the latest custom claims changes.
                        const token = await user.getIdToken(true);
                        setAuthState({ status: "in", user, token });
                    });
                }
            } else {
                setAuthState({ status: "out" });
            }
        });
    }, []);

  if (authState.status === 'loading'){
    return (
        < LoadingOverlay />
    );
  }

  if ( authState.status !== "in" ) {
    return (
        <ApolloProvider client={client}>
          <LoginAppContainer />
        </ApolloProvider>
    );
  }

  return (
      <ApolloProvider client={client}>
        <MainAppContainer />
      </ApolloProvider>
  );
}




// export default class App extends React.Component {
//
//   componentDidMount() {
//     // SplashScreen.hide();
//     google_bootstrap();
//   }
//
//   onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }
//
//   render() {
//     useEffect(() => {
//       const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//       return subscriber; // unsubscribe on unmount
//     }, []);
//
//     if (initializing) return null;
//
//     if (!user) {
//       return (
//           <View>
//             <Text>Login</Text>
//           </View>
//       );
//     }
//
//     return (
//       <ApolloProvider client={client}>
//         <AppContainer />
//       </ApolloProvider>
//     );
//   }
// }
