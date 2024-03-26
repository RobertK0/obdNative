/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {background, gauge} from './assets/images';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(props: any): React.JSX.Element {
  const isDarkMode = true;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {width, height} = useWindowDimensions();
  console.log(width, height);
  const testData = [1600];
  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>{props.counter}</Text>
    //       </Section>
    //       <Section title="See Your Changes">
    //         {props.doubleArray?.length && (
    //           <>
    //             <Text style={styles.rpmBig}>
    //               {String(props.doubleArray[0])[0]}
    //             </Text>
    //             <Text style={styles.rpm}>
    //               {String(Math.round(props.doubleArray[0] / 10) * 10).slice(1)}
    //             </Text>
    //           </>
    //         )}
    //       </Section>
    //       <Section title="Debug">
    //         is ecu connected: {`${props.isConnected}`}
    //       </Section>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
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
      <Image
        source={gauge}
        style={{
          position: 'absolute',
          top: height * 0.5 - height / 1.7335 / 2,
          left: width * 0.5 - width / 2.8125 / 2,
          width: width / 2.8125,
          height: height / 1.7335,
        }}></Image>

      {testData?.length && (
        <View
          style={{
            position: 'absolute',
            bottom: height * 0.1,
            right: width * 0.4,
            height: 'auto',
            transform: [{scaleY: 0.85}, {skewX: '30deg'}],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text style={styles.rpmBig}>{String(testData[0])[0]}</Text>
          <Text style={styles.rpm}>
            {String(Math.round(testData[0] / 10) * 10).slice(1)}
          </Text>
        </View>
      )}
    </View>
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
