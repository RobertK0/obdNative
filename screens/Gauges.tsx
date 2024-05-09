import React, {useContext} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {background, gauge, gradient} from '../assets/images';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Context} from './Home';

function Gauges() {
  const scaleValue = useSharedValue(1);

  const data = useContext(Context);

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

        {typeof data.speed === typeof Number() && (
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
              {data.speed}
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
        {typeof data.rpm === typeof Number() && (
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
              {data.rpm.toFixed().length > 3 ? (
                <>
                  <Text style={styles.rpmBig}>{String(data.rpm)[0]}</Text>
                  <Text style={styles.rpm}>
                    {String(Math.round(data.rpm / 100) * 100).slice(1)}
                  </Text>
                </>
              ) : (
                <Text style={styles.rpm}>
                  {String(Math.round(data.rpm / 10) * 10)}
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
              {String(data.rpm).length > 3 ? (
                <>
                  <Text style={[styles.rpmBig, {opacity: 0.5}]}>
                    {String(data.rpm)[0]}
                  </Text>
                  <Text
                    style={[
                      styles.rpm,
                      {
                        opacity: 0.5,
                      },
                    ]}>
                    {String(Math.round(data.rpm / 100) * 100).slice(1)}
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
                  {String(Math.round(data.rpm / 10) * 10)}
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
      </View>
    </GestureHandlerRootView>
  );
}

export default Gauges;

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
