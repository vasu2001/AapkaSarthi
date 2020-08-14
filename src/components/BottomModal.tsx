import React, {useEffect, ReactNode, useRef} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StatusBar,
} from 'react-native';
import {LAVENDER} from '../utils/colors';

interface BottomModalProps {
  visible: boolean;
  onCancel: () => void;
  children?: ReactNode;
  contentHeight: number;
}

const SPEED = 2;

const BottomModal = ({
  visible,
  onCancel,
  contentHeight,
  children,
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
    Animated.timing(animate, {
      toValue: -contentHeight,
      duration: Math.floor(contentHeight / SPEED),
      useNativeDriver: false,
    }).start(onCancel);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={close}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
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
            <StatusBar backgroundColor="rgba(0,0,0,0.3)" />
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
