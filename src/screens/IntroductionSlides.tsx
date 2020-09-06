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
import {PRIMARY_BLUE, WHITE} from '../utils/colors';

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
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        onScroll={({nativeEvent}) => {
          setScrollPos(nativeEvent.contentOffset.x / width);
          //   console.log(scrollPos);
        }}>
        <WelcomeScreen width={width} />
        <Intro1 width={width} source={require('../assets/demo/screen1.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen2.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen3.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen4.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen5.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen6.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen7.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen8.png')} />
        <Intro1 width={width} source={require('../assets/demo/screen9.png')} />
      </ScrollView>
      {scrollPos > N - 1.01 && scrollPos < N - 0.99 && (
        <CustomButton
          text="Get Started"
          onPress={getStarted}
          textColor={PRIMARY_BLUE}
          style={styles.lastButton}
        />
      )}
      {scrollPos < N - 1.01 && (
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
          text="Skip"
          onPress={getStarted}
          textColor={PRIMARY_BLUE}
          style={styles.lastButton}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  lastButton: {
    position: 'absolute',
    bottom: 50,
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
});
