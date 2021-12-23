import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';

var rnw;
var cbc = false;


const App = () => {


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        if (cbc && rnw) {
          rnw.goBack();
          return true;
        } else {
          Alert.alert('앱 종료', '앱을 종료하시겠습니까?',
            [
              {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "확인", onPress: () => BackHandler.exitApp() }
            ])
        }
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  function onMessage(event) {
    console.log(event.nativeEvent.data)

    if (event.nativeEvent.data == 'phonetoken') {
      if (pushToken === '' || pushToken === null || pushToken === undefined) {
        rnw.postMessage('phonetoken/null')
        console.log('phonetoken/null')
      } else {
        rnw.postMessage(`phonetoken/${pushToken}`)
        console.log(`phonetoken/${pushToken}`)
      }
    }

    if (event.nativeEvent.data == 'phonetype') {
      if (pushToken === '' || pushToken === null || pushToken === undefined) {
        rnw.postMessage('phonetoken/null')
        console.log('phonetoken/null')
      } else {
        rnw.postMessage(`phonetoken/${pushToken}`)
        console.log(`phonetoken/${pushToken}`)
      }
    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={wb => { rnw = wb }}
        onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
        userAgent='Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36'
        source={{ uri: 'https://sniffeed.cafe24.com/bbs/content.php?co_id=privacy' }}
        style={{ flex: 1 }}
        onMessage={event => {
          onMessage(event)
        }}
        onLoadEnd={() => { SplashScreen.hide(); }}
      />
    </SafeAreaView>
  )
}

export default App;