/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';

import {background, gauge, gradient} from './assets/images';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(props: any): React.JSX.Element {
  const [rpm, setRpm] = useState(1200);
  const [speed, setSpeed] = useState(30);
  const scaleValue = useSharedValue(1);

  const startAnimation = (input = 2) => {
    scaleValue.value = withTiming(input, {duration: 300});
  };

  useEffect(() => {
    if (props.isConnected && props.pids) {
      setRpm(props.pids[0]);
      setSpeed(props.pids[1]);
    }

    function transformToOutput(input: number) {
      const slope = (2 - 1) / (6000 - 800);
      const intercept = 1 - slope * 800;
      console.log(slope * input + intercept);
      return slope * input + intercept;
    }

    startAnimation(transformToOutput(rpm));

    // setInterval(test, 300);
  }, [props]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });
  const {width, height} = useWindowDimensions();

  console.log('rpm', rpm);

  return (
    <GestureHandlerRootView>
      <View style={{position: 'relative', flex: 1}}>
        <Image
          source={background}
          style={{
            position: 'absolute',
            top: 0,
            width: width,
            height: height,
            left: 0,
          }}></Image>
        <Animated.Image
          source={gauge}
          style={[
            {
              position: 'absolute',
              top: height * 0.47 - height / 1.7335 / 2,
              left: width * 0.5 - width / 2.8125 / 2,
              width: width / 2.8125,
              height: height / 1.7335,
              transform: [{scale: 1}],
            },
            animatedStyle,
          ]}></Animated.Image>
        {typeof speed === typeof Number() && (
          <>
            <Text
              style={{
                fontFamily: 'TechnicalStandardVP-Medium',
                position: 'absolute',
                top: height * 0.05,
                left: 0,
                textAlign: 'center',
                width: width,
                color: '#ddd',
                fontSize: 50,
              }}>
              30
            </Text>
            <Text
              style={{
                fontFamily: 'TechnicalStandardVP-Medium',
                position: 'absolute',
                top: height * 0.17,
                left: 0,
                textAlign: 'center',
                width: width,
                color: '#ddd',
                fontSize: 20,
              }}>
              km/h
            </Text>
          </>
        )}
        {typeof rpm === typeof Number() && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: height,
              width: width,
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: height * 0.1,
                right: width * 0.4,
                height: 'auto',
                transform: [{scaleY: 0.85}],
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {String(rpm).length > 3 ? (
                <>
                  <Text style={styles.rpmBig}>{String(rpm)[0]}</Text>
                  <Text style={styles.rpm}>
                    {String(Math.round(rpm / 100) * 100).slice(1)}
                  </Text>
                </>
              ) : (
                <Text style={styles.rpm}>
                  {String(Math.round(rpm / 100) * 100)}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: 20,
                position: 'absolute',
                bottom: height * 0 - 30,
                zIndex: 99,
                right: width * 0.4,
                height: 100,
                width: 100,
                color: '#bbb',
                fontFamily: 'TechnicalStandardVP-Medium',
              }}>
              rpm
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0 - height * 0.1,
                right: width * 0.4,
                height: 'auto',
                transform: [{scaleY: 0.85}, {rotateX: '180deg'}],
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text style={[styles.rpmBig, {opacity: 0.5}]}>
                {String(rpm[0])[0]}
              </Text>
              <Text
                style={[
                  styles.rpm,
                  {
                    opacity: 0.5,
                  },
                ]}>
                {String(Math.round(rpm[0] / 10) * 10).slice(1)}
              </Text>
              <Image
                source={gradient}
                style={{
                  position: 'absolute',
                  top: -130,
                  left: -50,
                  width: 200,
                  transform: [{rotateX: '180deg'}],
                }}></Image>
            </View>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  rpm: {
    fontFamily: 'TechnicalStandardVP-Medium',
    fontSize: 70,
    color: '#ddd',
    lineHeight: 100,
  },
  rpmBig: {
    fontFamily: 'TechnicalStandardVP-Medium',
    fontSize: 100,
    color: '#ddd',
  },
});

export default App;
