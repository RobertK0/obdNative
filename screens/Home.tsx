import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {
  createContext,
  SetStateAction,
  useContext,
  Dispatch,
  useEffect,
  useState,
} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LotusIcon} from '../assets/svg/LotusIcon';
import {SettingsIcon} from '../assets/svg/SettingsIcon';
import {WheelIcon} from '../assets/svg/WheelIcon';
import {GaugeIcon} from '../assets/svg/GaugeIcon';
import {systemBg} from '../assets/images';
import Tpms from './Tpms';
import App from '../App';
import {Settings} from './Settings';
import Gauges from './Gauges';
import Ambilight from './Ambilight';
import {PersonalizationIcon} from '../assets/svg/PersonalizationIcon';

type ContextType = {
  rpm: number;
  speed: number;
  pressureOne: number;
  pressureTwo: number;
  pressureThree: number;
  pressureFour: number;
  tpmsImageScale: number;
  setTpmsImageScale: Dispatch<SetStateAction<number>>; // Correct type here
};

function Home(props: any) {
  const {width, height} = useWindowDimensions();

  const goToGauges = () => {
    props.navigation.navigate('Gauges');
  };

  const goToTPMS = () => {
    props.navigation.navigate('TPMS');
  };

  const goToAmbilight = () => {
    props.navigation.navigate('Ambilight');
  };

  const goToSettings = () => {
    props.navigation.navigate('Settings');
  };

  return (
    <GestureHandlerRootView>
      <Image
        source={systemBg}
        style={{
          position: 'absolute',
          top: 0,
          width: width,
          height: height,
          left: 0,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.homeButton} onPress={goToGauges}>
          <GaugeIcon />
          <Text style={styles.buttonText}>Gauges</Text>
        </Pressable>
        <Pressable style={styles.homeButton} onPress={goToTPMS}>
          <WheelIcon />
          <Text style={styles.buttonText}>TPMS</Text>
        </Pressable>
        <Pressable style={styles.homeButton} onPress={goToAmbilight}>
          <LotusIcon />
          <Text style={styles.buttonText}>Ambient Lighting</Text>
        </Pressable>
        <Pressable style={styles.homeButton} onPress={() => {}}>
          <PersonalizationIcon />
          <Text style={styles.buttonText}>Features</Text>
        </Pressable>
        <Pressable style={styles.homeButton} onPress={goToSettings}>
          <SettingsIcon />
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}

export default Home;

export const Context = createContext<ContextType>({
  rpm: 0,
  speed: 0,
  pressureOne: 0,
  pressureTwo: 0,
  pressureThree: 0,
  pressureFour: 0,
  tpmsImageScale: 0,
  setTpmsImageScale: () => {},
});

export function Test(props: any) {
  const [rpm, setRpm] = useState(1000);
  const [speed, setSpeed] = useState(30);
  const [torque, setTorque] = useState(120);
  const [pressureOne, setPressureOne] = useState(2.649912497849124);
  const [pressureTwo, setPressureTwo] = useState(2.5123123124124);
  const [pressureThree, setPressureThree] = useState(2.5912341209414);
  const [pressureFour, setPressureFour] = useState(2.621341241204);
  const [tpmsImageScale, setTpmsImageScale] = useState(2);

  useEffect(() => {
    if (props.pids)
      if (props.isConnected) {
        // if (debug) ToastAndroid.show(props.pids.toString(), ToastAndroid.SHORT);

        setRpm(props.pids[0]);
        setSpeed(props.pids[1]);
        setPressureOne(props.pids[2]);
        setPressureTwo(props.pids[3]);
        setPressureThree(props.pids[4]);
        setPressureFour(props.pids[5]);
        // startAnimation(transformToOutput(props.pids[0]));
        // } else if (screen === 1) {
        //   setRpm(prev => {
        //     const rpm = prev + 200;

        //     startAnimation(transformToOutput(rpm > 5000 ? 800 : rpm));
        //     return rpm > 5000 ? 800 : rpm;
        //   });
      } else {
        setPressureOne(prev => prev + 0.01);
      }

    // setInterval(test, 300);
  }, [props]);

  console.log('TEST PROPS', props);
  const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

  return (
    <NavigationContainer>
      <Context.Provider
        value={{
          rpm,
          speed,
          pressureOne,
          pressureTwo,
          pressureThree,
          pressureFour,
          tpmsImageScale,
          setTpmsImageScale,
        }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{pressureOne}}
          />
          <Stack.Screen name="TPMS" component={Tpms} />
          <Stack.Screen name="Gauges" component={Gauges} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Ambilight" component={Ambilight} />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    gap: 20,
    padding: 20,
    // borderWidth: 2,
    // borderColor: 'black',
    backgroundColor: 'transparent',
  },
  homeButton: {
    height: '70%',
    flex: 1,
    // borderWidth: 2,
    // borderColor: '#333',
    // backgroundColor: '#eee',
    borderRadius: 8,
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
