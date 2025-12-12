import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

import slides from "../../constants/OnboardingSlideData.js";
// --- Single Slide Component ---
const OnboardingItem = ({ item }) => (
  // Ensure the image path is correct relative to this file's location!
  <ImageBackground source={item.image} style={styles.imageBackground}>
    <View style={styles.overlay}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  </ImageBackground>
);
// --- Main Component ---
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const slidesRef = useRef(null);
  const completeOnboarding = async () => {
    router.replace('/OTP'); 
  };
  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      // Scroll to the next index
      slidesRef.current.scrollToIndex({ 
          index: currentIndex + 1, 
          animated: true 
      });
    } else {
      // Last slide: Finish onboarding
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };
  // Updates the currentIndex state when a new slide becomes visible
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Renders the pagination dots
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === currentIndex ? '#1B9A8B' : 'rgba(255, 255, 255, 0.5)' },
            { width: i === currentIndex ? 24 : 8 }, // Active dot is wider
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* SKIP Button (Hidden on the last screen) */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Main Slides using FlatList for efficient paging */}
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.key}
        onScrollToIndexFailed={() => {}} 
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        ref={slidesRef}
      />

      {/* Footer Area with Dots and Button */}
      <View style={styles.footer}>
        {renderDots()}
        <TouchableOpacity style={styles.button} onPress={scrollToNext}>
          <Text style={styles.buttonText}>{slides[currentIndex].buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBackground: {
    width,
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Darken the image
    justifyContent: 'flex-end',
    paddingBottom: 150, // Space for the button/dots
  },
  textContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 50,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#008080', // Your brand color
    paddingVertical: 15,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 10,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});