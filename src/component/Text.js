import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from './Theme';

class Block extends React.Component {

    constructor(props) {
        super(props)
    }

    color = (val) => {
        const { colors } = theme;
        if (colors[val]) {
            return { color: colors[val] }
        }
        return { color: val }
    }

    render() {

        const {
            color,
            h1,
            h2,
            h3,
            caption,
            center,
            bold,
            semibold,
            medium,
            light,
            style,
            children,
            ...props
        } = this.props;

        const css = [
            styles.default,
            color && this.color(color),
            h1 && styles.h1,
            h2 && styles.h2,
            h3 && styles.h3,
            caption && styles.caption,
            center && styles.center,
            bold && styles.bold,
            semibold && styles.semibold,
            medium && styles.medium,
            light && styles.light,
            style
        ]

        return (
            <Text style={css}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({

    default: {
        fontSize: theme.sizes.font,
        color: theme.colors.black,
    },

    center: { textAlign: 'center' },

    h1: { fontSize: theme.sizes.h1 },
    h2: { fontSize: theme.sizes.h2 },
    h3: { fontSize: theme.sizes.h3 },
    caption: { fontSize: theme.sizes.caption },

    bold: { fontWeight: "bold" },
    semibold: { fontWeight: "500" },
    medium: { fontWeight: "500" },
    light: { fontWeight: "200" },

});

export default Block;