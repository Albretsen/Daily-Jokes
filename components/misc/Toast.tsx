import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state-management/reduxStore';
import Text from '../generalUI/Text';
import ContentBox from '../layout/ContentBox';

export function Toast() {
    const { visible, message } = useSelector((state: RootState) => state.toast);
    // Use useRef to persist the animated value without causing re-renders
    const bottomValue = useRef(new Animated.Value(-150)).current; // Start below the screen

    useEffect(() => {
        Animated.timing(bottomValue, {
            toValue: visible ? 100 : -150, // Animate to bottom: 100 if visible, otherwise to bottom: -80
            duration: 300, // Duration of the animation
            useNativeDriver: false, // Use native driver for better performance
        }).start();
    }, [visible, bottomValue]);

    return (
        <Animated.View style={[styles.container, { bottom: bottomValue }]}>
            <ContentBox rainbowBorder width={"100%"} style={{ minHeight: 0, gap: 0 }} text={message} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 9999,
        alignSelf: 'center',
        // Adjust padding, justifyContent, and alignItems for better text alignment if necessary
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
        padding: 10, // Add some padding around the text
    },
});
