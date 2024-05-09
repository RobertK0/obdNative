import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageProps,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {HueRotate} from 'react-native-color-matrix-image-filters';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Parity,
  UsbSerial,
  UsbSerialManager,
} from 'react-native-usb-serialport-for-android';
import ColorPicker, {Panel3, returnedResults} from 'reanimated-color-picker';
import {
  area1,
  area2,
  area3,
  area4,
  systemBg,
  topDownCar,
} from '../assets/images';

const areas = [
  {index: 1, top: 109, right: 85, width: 51, height: 32, image: area1},
  {index: 2, top: 115, right: 22, width: 50, height: 23, image: area2},
  {index: 3, top: 184, right: 83, width: 45, height: 33, image: area3},
  {index: 4, top: 184, right: 32, width: 45, height: 33, image: area4},
];

type AreaProps = {
  key: number;
  hue: number;
  area: number;
  openModal: (area: number) => void;
  image: ImageSourcePropType;
  outerStyle: StyleProp<ViewStyle>;
  innerStyle: StyleProp<ImageProps>;
};

const Area = (props: AreaProps) => {
  const onPress = () => {
    props.openModal(props.area);
  };
  return (
    <HueRotate amount={props.hue} style={props.outerStyle}>
      <Pressable onPress={onPress}>
        <Image source={props.image} style={props.innerStyle} />
      </Pressable>
    </HueRotate>
  );
};

const AsyncAlert = async (message: string) =>
  new Promise(resolve => {
    Alert.alert(
      '',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            resolve('YES');
          },
        },
      ],
      {cancelable: false},
    );
  });

type StringProperty = {
  [key: string]: string;
};

type HueShiftState = {
  [key: string]: number;
};

const initialHexColorState: StringProperty = {
  '1': '#FF0000',
  '2': '#FF0000',
  '3': '#FF0000',
  '4': '#FF0000',
};

const initialHueShiftState: HueShiftState = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
};

function Ambilight() {
  const [usbSerialport, setUsbSerialport] = useState<UsbSerial | null>(null);
  const [activeArea, setActiveArea] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hueShift, setHueShift] = useState(initialHueShiftState);

  const [hexColor, setHexColor] = useState(initialHexColorState);

  const {width, height} = useWindowDimensions();

  const openModal = (area: number) => {
    setActiveArea(area);
    setShowModal(true);
  };

  const onSelectColor = ({hsl, hex}: returnedResults) => {
    const hue = +hsl.split('(')[1].split(',')[0];
    const hueRadian = hue * (Math.PI / 180);

    sendData(hex.substring(1, 7));

    setHexColor(prev => {
      const cloned = {...prev};
      cloned[activeArea.toString()] = hex;
      return cloned;
    });

    setHueShift(prev => {
      const cloned = {...prev};
      cloned[activeArea.toString()] = hueRadian;
      return cloned;
    });
  };

  useEffect(() => {
    requestUSBPermission();
  }, []);

  async function sendData(data: any) {
    console.log('trying to send command');
    if (!usbSerialport) return;
    try {
      await usbSerialport.send(`0${activeArea}`);
      await usbSerialport.send(`${data[0]}${data[1]}`);
      await usbSerialport.send(`${data[2]}${data[3]}`);
      await usbSerialport.send(`${data[4]}${data[5]}`);

      await AsyncAlert('Command sent');

      // unsubscribe
      // sub.remove();
      // usbSerialport.close();
    } catch (err) {
      console.error(err);
    }
  }

  async function requestUSBPermission() {
    try {
      const devices = await UsbSerialManager.list();
      const DEVICE_ID =
        devices.find(device => device.vendorId === 6790)?.deviceId || 2003;

      await UsbSerialManager.tryRequestPermission(DEVICE_ID);

      await AsyncAlert('Device successfully connected');

      const usbSerialport = await UsbSerialManager.open(DEVICE_ID, {
        baudRate: 9600,
        parity: Parity.None,
        dataBits: 8,
        stopBits: 1,
      });

      setUsbSerialport(usbSerialport);

      const sub = usbSerialport.onReceived(event => {
        console.log('received', event.data);
      });

      await AsyncAlert('Port opened');
    } catch (err) {
      console.error(err);
    }
  }

  const areaComponents = areas.map(area => (
    <Area
      key={area.index}
      hue={hueShift[area.index]}
      area={area.index}
      image={area.image}
      openModal={openModal}
      outerStyle={{
        position: 'absolute',
        top: 0.05 * height + area.top,
        right: 0.2 * width + area.right,
        zIndex: 999999,
      }}
      innerStyle={{width: area.width, height: area.height}}
    />
  ));

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        position: 'relative',
      }}>
      <Modal visible={showModal} transparent={true}>
        <View
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <ColorPicker
            style={{width: height * 0.8, marginTop: height * 0.1}}
            value={hexColor[activeArea]}
            onComplete={onSelectColor}>
            <Panel3 />
          </ColorPicker>
          <Pressable
            style={{flex: 1}}
            onPressOut={() => {
              setShowModal(false);
            }}
          />
        </View>
      </Modal>
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
      {areaComponents}
      <Image
        source={topDownCar}
        style={{
          width: 161,
          height: 324,
          position: 'absolute',
          top: '5%',
          right: '20%',
        }}
      />
    </GestureHandlerRootView>
  );
}

export default Ambilight;
