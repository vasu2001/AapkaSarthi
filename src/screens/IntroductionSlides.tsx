import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Intro1} from './Intro';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomButton} from '../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import WelcomeScreen from './Welcome';
import {PRIMARY_BLUE, WHITE} from '../utils/colors';
import AsyncStorage from '@react-native-community/async-storage';

export interface IntroductionSlidesProps {
  navigation: NavigationProp<any>;
}

const N = 11;
const {width} = Dimensions.get('screen');

export const IntroductionSlides: React.FunctionComponent<IntroductionSlidesProps> = ({
  navigation,
}: IntroductionSlidesProps) => {
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

  useEffect(() => {
    AsyncStorage.getItem('firstOpen')
      .then((firstOpen) => {
        if (firstOpen) {
          getStarted();
        } else {
          AsyncStorage.setItem('firstOpen', 'yes');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Intro1
          width={width}
          source={require('../assets/demo/screen1.1.png')}
        />
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
          // textColor={PRIMARY_BLUE}
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
};

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
    width: '100%',
    // backgroundColor: WHITE,
    borderWidth: 3,
    borderColor: WHITE,
  },
});
