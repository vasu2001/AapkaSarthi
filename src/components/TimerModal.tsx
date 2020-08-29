import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Modal, StatusBar, StyleSheet} from 'react-native';
import {MODAL_BACKDROP} from '../utils/colors';
import {CustomButton} from './CustomButton';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
import {bannerUnitId} from '../utils/admob';

export interface TimerModalProps {
  visible: boolean;
  onCancel: () => void;
  onSkip: () => void;
}

export function TimerModal({visible, onCancel, onSkip}: TimerModalProps) {
  const [remSec, setRemSec] = useState<number>(3);
  let intervalRef = useRef<NodeJS.Timeout>(null).current;

  useEffect(() => {
    console.log('useEffect');
    if (visible) {
      if (intervalRef === null) {
        intervalRef = setInterval(() => {
          console.log('interval ' + remSec);
          setRemSec((remSec) => remSec - 1);
        }, 1000);
      }
    } else {
      intervalRef && clearInterval(intervalRef);
      intervalRef = null;
      setRemSec(3);
    }

    return () => {
      intervalRef && clearInterval(intervalRef);
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent>
      <View style={styles.mainView}>
        <StatusBar backgroundColor={MODAL_BACKDROP} />
        <View style={{position: 'absolute', top: 0}}>
          <BannerAd
            unitId={bannerUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Calling in {remSec}s</Text>
          <CustomButton text="Skip" onPress={onSkip} style={styles.button} />
          <CustomButton
            text="Cancel"
            onPress={onCancel}
            style={styles.button}
          />
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <BannerAd
            unitId={bannerUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: MODAL_BACKDROP,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: 'black',
  },
  button: {
    marginTop: 20,
  },
});
