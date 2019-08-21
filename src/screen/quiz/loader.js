import React from 'react';
import { Animated, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Block, Text } from '../../component';

const screenWidth = Math.round(Dimensions.get('window').width);

export default (props) => (
    <Animated.View style={[styles.default, props.style]}>
        <Block middle>
            <View>
                <Image
                    style={{ width: 350, height: 350 }}
                    source={require('../../../assets/loader-1.gif')}
                />
                <Text center h2 light>Don't sleep, your Quiz will be ready soon</Text>
            </View>
        </Block>
    </Animated.View >
);

const styles = StyleSheet.create({
    default: {
        backgroundColor: '#fafafa',
        width: screenWidth,
        alignItems: 'center'
    }
});