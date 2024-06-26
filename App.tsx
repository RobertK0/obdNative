/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';

import {background, gauge, gradient} from './assets/images';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(props: any): React.JSX.Element {
  // 46 ambiend ar temp
  // ff1273 engine kw at the wheels
  // ff1226 horsepower at the wheels
  // ff1225 torque

  const [debug, setDebug] = useState(false);
  const [rpm, setRpm] = useState(1000);
  const [speed, setSpeed] = useState(30);
  const [torque, setTorque] = useState(120);
  const scaleValue = useSharedValue(1);

  const startAnimation = (input = 2) => {
    const output = Easing.linear(input);
    scaleValue.value = withTiming(output, {
      duration: 300,
    });
  };

  function transformToOutput(input: number) {
    const slope = (2 - 1) / (6000 - 800);
    const intercept = 1 - slope * 800;
    return slope * input + intercept;
  }

  useEffect(() => {
    if (props.pids)
      if (props.isConnected) {
        if (debug) ToastAndroid.show(props.pids.toString(), ToastAndroid.SHORT);

        setRpm(props.pids[0]);
        setSpeed(props.pids[1]);

        startAnimation(transformToOutput(props.pids[0]));
      } else {
        setRpm(prev => {
          const rpm = prev + 200;

          startAnimation(transformToOutput(rpm > 5000 ? 800 : rpm));
          return rpm > 5000 ? 800 : rpm;
        });
      }

    // setInterval(test, 300);
  }, [props]);

  const onToggleDebug = () => {
    setDebug(prev => {
      return !prev;
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });
  const {width, height} = useWindowDimensions();

  return (
    <GestureHandlerRootView>
      {/* <StatusBar hidden /> */}
      <View style={{position: 'relative', flex: 1}}>
        <Image
          source={background}
          style={{
            position: 'absolute',
            top: 0,
            width: width,
            height: height,
            left: 0,
          }}
        />

        <>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.272,
              left: width * 0.156,
              fontSize: 14,
              color: '#ddd',
            }}>
            400
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.407,
              left: width * 0.146,
              fontSize: 14,
              color: '#ddd',
            }}>
            266
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.545,
              left: width * 0.146,
              fontSize: 14,
              color: '#ddd',
            }}>
            133
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.675,
              left: width * 0.156,
              fontSize: 14,
              color: '#ddd',
            }}>
            0 Nm
          </Text>

          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.272,
              left: width * 0.8,
              fontSize: 14,
              color: '#ddd',
            }}>
            136
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.407,
              left: width * 0.837,
              fontSize: 14,
              color: '#ddd',
            }}>
            90
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.545,
              left: width * 0.837,
              fontSize: 14,
              color: '#ddd',
            }}>
            45
          </Text>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.675,
              left: width * 0.808,
              fontSize: 14,
              color: '#ddd',
            }}>
            0 kW
          </Text>

          <Animated.Image
            source={gauge}
            style={[
              {
                position: 'absolute',
                top: height * 0.47 - height / 2 / 2,
                left: width * 0.5 - width / 2.8125 / 2,
                width: width / 2.8125,
                height: height / 2,
                transform: [{scale: 1}],
              },
              animatedStyle,
            ]}></Animated.Image>
        </>

        {typeof speed === typeof Number() && (
          <>
            <Text
              style={{
                fontFamily: 'TechnicalStandardVP-Regular',
                position: 'absolute',
                top: height * 0.135,
                left: 0,
                textAlign: 'center',
                width: width,
                color: '#ddd',
                fontSize: 50,
              }}>
              {speed}
            </Text>
            <Text
              style={{
                fontFamily: 'TechnicalStandardVP-Regular',
                position: 'absolute',
                top: height * 0.26,
                left: 0,
                textAlign: 'center',
                width: width,
                color: '#ddd',
                fontSize: 18,
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
              {rpm.toFixed().length > 3 ? (
                <>
                  <Text style={styles.rpmBig}>{String(rpm)[0]}</Text>
                  <Text style={styles.rpm}>
                    {String(Math.round(rpm / 100) * 100).slice(1)}
                  </Text>
                </>
              ) : (
                <Text style={styles.rpm}>
                  {String(Math.round(rpm / 10) * 10)}
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
                fontFamily: 'TechnicalStandardVP-Regular',
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
              {String(rpm).length > 3 ? (
                <>
                  <Text style={[styles.rpmBig, {opacity: 0.5}]}>
                    {String(rpm)[0]}
                  </Text>
                  <Text
                    style={[
                      styles.rpm,
                      {
                        opacity: 0.5,
                      },
                    ]}>
                    {String(Math.round(rpm / 100) * 100).slice(1)}
                  </Text>
                </>
              ) : (
                <Text
                  style={[
                    styles.rpm,
                    {
                      opacity: 0.5,
                    },
                  ]}>
                  {String(Math.round(rpm / 10) * 10)}
                </Text>
              )}

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
        <Pressable onPress={onToggleDebug}>
          <Text
            style={{
              fontFamily: 'TechnicalStandardVP-Regular',
              position: 'absolute',
              top: height * 0.1,
              left: width * 0.85,
              fontSize: 18,
              color: 'white',
            }}>
            Toggle debug
          </Text>
        </Pressable>
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
    fontFamily: 'TechnicalStandardVP-Regular',
    fontSize: 70,
    color: '#ddd',
    lineHeight: 100,
  },
  rpmBig: {
    fontFamily: 'TechnicalStandardVP-Regular',
    fontSize: 100,
    color: '#ddd',
  },
});

export default App;
