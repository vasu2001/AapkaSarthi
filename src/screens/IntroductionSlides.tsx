import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Intro1} from './Intro1';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomButton} from '../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import WelcomeScreen from './Welcome';

export interface IntroductionSlidesProps {
  navigation: NavigationProp<any>;
}

const N = 1;
const {width} = Dimensions.get('screen');

export function IntroductionSlides({navigation}: IntroductionSlidesProps) {
  const scrollViewRef = useRef<ScrollView | null>();
  const [scrollPos, setScrollPos] = useState(0);

  const goRight = () => {
    scrollViewRef.current?.scrollTo({
      x: (scrollPos + 1) * width,
      animated: true,
    });
  };

  const goLeft = () => {
    scrollViewRef.current?.scrollTo({
      x: (scrollPos - 1) * width,
      animated: true,
    });
  };

  const getStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <ScrollView
        horizontal
        scrollEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        onScroll={({nativeEvent}) => {
          setScrollPos(nativeEvent.contentOffset.x / width);
          //   console.log(scrollPos);
        }}>
        {/* <Intro1 width={width} />
        <Intro1 width={width} /> */}
        <WelcomeScreen width={width} />
      </ScrollView>
      {scrollPos > N - 1.01 && scrollPos < N - 0.99 && (
        <CustomButton
          text="Get Started"
          onPress={getStarted}
          style={styles.lastButton}
        />
      )}
      {scrollPos < N - 1.01 && (
        <TouchableOpacity style={styles.rightButton} onPress={goRight}>
          <AntDesign name="right" size={30} color="black" />
        </TouchableOpacity>
      )}
      {scrollPos > 0.99 && (
        <TouchableOpacity style={styles.leftButton} onPress={goLeft}>
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  lastButton: {
    position: 'absolute',
    bottom: 50,
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
  },
  leftButton: {
    position: 'absolute',
    left: 20,
    top: '50%',
  },
});
