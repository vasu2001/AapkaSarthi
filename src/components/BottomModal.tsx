import React, {useEffect, ReactNode, useRef} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StatusBar,
} from 'react-native';
import {LAVENDER, MODAL_BACKDROP} from '../utils/colors';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import {bannerUnitId2} from '../utils/admob';

interface BottomModalProps {
  visible: boolean;
  onCancel: () => void;
  children?: ReactNode;
  contentHeight: number;
  validation?: () => boolean;
}

const SPEED = 2;

const BottomModal = ({
  visible,
  onCancel,
  contentHeight,
  children,
  validation = () => true,
}: BottomModalProps) => {
  const animate = useRef(new Animated.Value(-contentHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animate, {
        toValue: 0,
        duration: Math.floor(contentHeight / SPEED),
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const close = (): void => {
    if (validation()) {
      Animated.timing(animate, {
        toValue: -contentHeight,
        duration: Math.floor(contentHeight / SPEED),
        useNativeDriver: false,
      }).start(onCancel);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={close}>
        <View
          style={{
            flex: 1,
            backgroundColor: MODAL_BACKDROP,
          }}>
          <View style={{position: 'absolute', top: 0}}>
            <BannerAd
              unitId={bannerUnitId2}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: animate,
              padding: 30,
              backgroundColor: LAVENDER,
              width: '100%',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              overflow: 'hidden',
              paddingBottom: 10,
            }}>
            <StatusBar backgroundColor={MODAL_BACKDROP} />
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={{alignItems: 'center'}}>{children}</View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomModal;
