import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Intro1} from './Intro';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomButton} from '../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import WelcomeScreen from './Welcome';
import {PRIMARY_BLUE, WHITE, BLUE} from '../utils/colors';

export interface IntroductionSlidesProps {
  navigation: NavigationProp<any>;
}

const N = 10;
const {width} = Dimensions.get('screen');

export function IntroductionSlides({navigation}: IntroductionSlidesProps) {
  const scrollViewRef = useRef<ScrollView | null>();
  const [scrollPos, setScrollPos] = useState(0);

  const goRight = () => {
    scrollViewRef.current?.scrollTo({
      x: (Math.round(scrollPos) + 1) * width,
      animated: true,
    });
  };

  const goLeft = () => {
    scrollViewRef.current?.scrollTo({
      x: (Math.round(scrollPos) - 1) * width,
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
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        onScroll={({nativeEvent}) => {
          setScrollPos(nativeEvent.contentOffset.x / width);
          //   console.log(scrollPos);
        }}>
        <WelcomeScreen width={width} />
        <Intro1 width={width} source={require('../assets/demo/screen1.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen2.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen3.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen4.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen5.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen6.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen7.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen8.webp')} />
        <Intro1 width={width} source={require('../assets/demo/screen9.webp')} />
      </ScrollView>
      {scrollPos > N - 1.01 && scrollPos < N - 0.99 && (
        <CustomButton
          text="Get Started"
          onPress={getStarted}
          style={styles.getStarted}
        />
      )}
      {scrollPos < N - 1.01 && scrollPos > 0.99 && (
        <TouchableOpacity style={styles.rightButton} onPress={goRight}>
          <AntDesign name="right" size={30} color={WHITE} />
        </TouchableOpacity>
      )}
      {scrollPos > 0.99 && (
        <TouchableOpacity style={styles.leftButton} onPress={goLeft}>
          <AntDesign name="left" size={30} color={WHITE} />
        </TouchableOpacity>
      )}
      {scrollPos < 0.99 && (
        <CustomButton
          text="Skip Intro"
          onPress={getStarted}
          textColor={PRIMARY_BLUE}
          style={styles.lastButton}
        />
      )}
      {scrollPos < 0.99 && (
        <CustomButton
          text="View Intro"
          onPress={goRight}
          textColor={PRIMARY_BLUE}
          style={[styles.lastButton, {bottom: 100}]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  lastButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'white',
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 20,
    padding: 5,
  },
  leftButton: {
    position: 'absolute',
    left: 20,
    top: '50%',
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 20,
    padding: 5,
  },
  getStarted: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    backgroundColor: BLUE,
  },
});
