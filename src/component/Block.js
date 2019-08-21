import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from './Theme';

class Block extends React.Component {

    constructor(props) {
        super(props)
    }

    backgroundColor = (color) => {
        const { colors } = theme;
        if (colors[color]) {
            return { backgroundColor: colors[color] }
        }
        return { backgroundColor: color }
    }

    render() {

        const {
            flex,
            center,
            middle,
            color,
            style,
            children,
            ...props
        } = this.props;

        const css = [
            styles.default,
            flex === false && { flex: 0 },
            center && styles.center,
            middle && styles.middle,
            color && this.backgroundColor(color),
            style,
        ]

        return (
            <View style={css} {...props}>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    default: { flex: 1 },
    middle: { justifyContent: 'center' },
    center: { alignItems: 'center' },

});

export default Block;