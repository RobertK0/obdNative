import React, {useContext} from 'react';
import {
  Image,
  NativeModules,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  useWindowDimensions,
  View,
} from 'react-native';
import {Context} from './Home';
import {systemBg} from '../assets/images';

const {SetTimerModule} = NativeModules;

const updateTimerInterval = (interval: number) => {
  SetTimerModule.setTimerInterval(interval);
};

export const Settings = () => {
  const {width, height} = useWindowDimensions();

  const data = useContext(Context);

  const changeScale = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (e.nativeEvent.text) {
      data.setTpmsImageScale(+e.nativeEvent.text);
    }
  };

  const changeRefreshRate = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    updateTimerInterval(+e.nativeEvent.text);
  };

  return (
    <>
      <View>
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
        <Text>Settings</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>TPMS Image scale </Text>
          <TextInput
            style={styles.input}
            onSubmitEditing={changeScale}
            placeholder={`${data.tpmsImageScale}`}
            placeholderTextColor={'white'}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Refresh speed in miliseconds </Text>
          <TextInput
            style={styles.input}
            onSubmitEditing={changeRefreshRate}
            placeholder={`1000`}
            placeholderTextColor={'white'}
            keyboardType="numeric"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {flex: 1, color: 'white'},
  input: {
    borderColor: '#eee',
    backgroundColor: '#00000044',
    color: 'white',
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
});
