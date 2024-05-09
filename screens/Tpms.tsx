import React, {useContext} from 'react';
import {systemBg, topDownCar} from '../assets/images';
import {Image, Text, useWindowDimensions, View} from 'react-native';
import {Context} from './Home';

function Tpms(props: any) {
  const {width, height} = useWindowDimensions();
  const data = useContext(Context);

  console.log(data.tpmsImageScale);
  return (
    <>
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
      <View style={{position: 'relative'}}>
        <Image
          source={topDownCar}
          resizeMode="contain"
          style={{
            position: 'absolute',
            width: 427 / data.tpmsImageScale,
            height: 864 / data.tpmsImageScale,
            top: height / 2 - 864 / (data.tpmsImageScale * 2),
            left: width / 2 - 427 / (data.tpmsImageScale * 2),
          }}
        />
        <Text
          style={{
            fontFamily: 'TechnicalStandardVP-Regular',
            position: 'absolute',
            top: height / 2 + 864 / (data.tpmsImageScale * 4),
            left: width / 2 + 427 / (data.tpmsImageScale * 2),
            color: '#ddd',
            fontSize: 40,
          }}>
          {+data.pressureOne.toFixed(2)}
        </Text>
        <Text
          style={{
            fontFamily: 'TechnicalStandardVP-Regular',
            position: 'absolute',
            top: height / 2 + 864 / (data.tpmsImageScale * 4),
            right: width / 2 + 427 / (data.tpmsImageScale * 2),
            color: '#ddd',
            fontSize: 40,
          }}>
          {+data.pressureTwo.toFixed(2)}
        </Text>

        <Text
          style={{
            fontFamily: 'TechnicalStandardVP-Regular',
            position: 'absolute',
            top: height / 2 - 864 / (data.tpmsImageScale * 4),
            right: width / 2 + 427 / (data.tpmsImageScale * 2),
            color: '#ddd',
            fontSize: 40,
          }}>
          {+data.pressureThree.toFixed(2)}
        </Text>
        <Text
          style={{
            fontFamily: 'TechnicalStandardVP-Regular',
            position: 'absolute',
            top: height / 2 - 864 / (data.tpmsImageScale * 4),
            left: width / 2 + 427 / (data.tpmsImageScale * 2),
            textAlign: 'left',
            // width: width,
            color: '#ddd',
            fontSize: 40,
          }}>
          {+data.pressureFour.toFixed(2)}
        </Text>
      </View>
    </>
  );
}

export default Tpms;
