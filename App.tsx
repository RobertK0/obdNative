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
  const [rpm, setRpm] = useState([860]);
  const scaleValue = useSharedValue(1);

  const startAnimation = (input = 2) => {
    scaleValue.value = withTiming(input, {duration: 500});
  };

  useEffect(() => {
    const test = () => {
      function generateRandomNumber() {
        // Generate a random number between -1 and 1
        const randomFraction = Math.random() + 1;

        setRpm([((randomFraction - 1) / (2 - 1)) * (4000 - 800) + 800]);

        return randomFraction;
      }

      // startAnimation(generateRandomNumber());
    };
    // setInterval(test, 1000);
  }, [props.counter]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });
  const {width, height} = useWindowDimensions();

  const testData = [900];
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

        {rpm?.length && (
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
              <Text style={styles.rpmBig}>{String(rpm[0])[0]}</Text>
              <Text style={styles.rpm}>
                {String(Math.round(rpm[0] / 100) * 100).slice(1)}
              </Text>
            </View>

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
              <Text style={styles.rpmBig}>{String(rpm[0])[0]}</Text>
              <Text style={styles.rpm}>
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
