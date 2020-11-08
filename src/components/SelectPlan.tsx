import React, {useRef, useState} from 'react';
import {
  Text,
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GRAY, PRIMARY_BLUE} from '../utils/colors';

interface SelectPlanProps {
  value: number;
  setValue: (x: number) => void;
  style?: ViewStyle;
}

const ITEM_HEIGHT = 48;

const SelectPlan = ({value, setValue, style}: SelectPlanProps) => {
  const show = useRef(new Animated.Value(ITEM_HEIGHT)).current;
  const [showState, setShowState] = useState(false);
  const N = 2;

  const toggleShow = () => {
    Animated.timing(show, {
      toValue: (showState ? 1 : N) * ITEM_HEIGHT,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setShowState(!showState);
  };

  const arrowAnimatedStyle = {
    transform: [
      {
        rotateZ: show.interpolate({
          inputRange: [ITEM_HEIGHT, ITEM_HEIGHT * N],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.main, {height: show}, style]}>
      <Animated.View style={[styles.expandView, arrowAnimatedStyle]}>
        <TouchableOpacity onPress={toggleShow}>
          <AntDesign name="down" size={18} color={GRAY} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.planItem}>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => setValue(0)}>
          <AntDesign
            name="check"
            size={15}
            color={PRIMARY_BLUE}
            style={[styles.check, {opacity: value === 0 ? 1 : 0}]}
          />

          <View style={styles.column}>
            <Text style={styles.text1}>Free</Text>
            {/* <Text style={styles.text2}>Rs. {rate}/month</Text> */}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.planItem}>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => setValue(1)}>
          <AntDesign
            name="check"
            size={15}
            color={PRIMARY_BLUE}
            style={[styles.check, {opacity: value === 1 ? 1 : 0}]}
          />

          <View style={styles.column}>
            <Text style={styles.text1}>Premium</Text>
            <Text style={styles.text2}>Rs. 100/month</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: PRIMARY_BLUE,
  },
  expandView: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2 - 11,
    right: 15,
    zIndex: 20,
  },
  planItem: {
    height: ITEM_HEIGHT,
    borderBottomWidth: 0.5,
    borderColor: GRAY,
  },
  touchableItem: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  check: {
    margin: 10,
  },
  column: {
    flex: 1,
  },
  text1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: 'black',
  },
  text2: {
    fontSize: 14,
    color: GRAY,
  },
});

export default SelectPlan;
