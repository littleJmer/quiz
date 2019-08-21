import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import theme from './Theme';

class Button extends React.Component {

    backgroundColor = (color) => {
        const { colors } = theme;
        if (colors[color]) {
            return { backgroundColor: colors[color] }
        }
        return { backgroundColor: color }
    }

    render() {

        const {
            shadow,
            color,
            style,
            children,
            ...props
        } = this.props;

        const css = [
            styles.default,
            shadow && styles.shadow,
            color && this.backgroundColor(color),
            style // rewrite predefined styles
        ];

        return (
            <TouchableOpacity
                style={css}
                activeOpacity={0.8}
                {...props}
            >
                {children}
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    default: {
        borderRadius: theme.sizes.radius,
        height: theme.sizes.base * 3,
        justifyContent: 'center',
        marginVertical: theme.sizes.paddingxs,
    },
    shadow: {
        // for ios
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // for android
        elevation: 2,
    },
});

export default Button;