import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Block, Text, Button, Theme } from '../component';
import { guides } from '../mocks';

class Home extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
    }

    renderGuides = () => {
        let tmp = [];
        for (let key in guides) {
            tmp.push(
                <Block flex={false} style={styles.row} key={'key:' + key}>
                    <View style={styles.imageContent}>
                        <Image
                            style={styles.image}
                            source={guides[key].image}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>{guides[key].text}</Text>
                    </View>
                </Block>
            );
        }
        return tmp;
    }

    render() {

        const { navigation } = this.props;

        return (
            <Block>
                <Block color="accent">

                    <Block middle center color="white">
                        <View
                            style={{
                                height: 250,
                                width: 500,
                                overflow: 'hidden'
                            }}
                        >
                            <Image
                                style={{ height: 250, width: 500 }}
                                source={this.props.home_1}
                            />
                        </View>
                    </Block>

                    <Block style={styles.card} flex={false}>
                        <Text center h3 semibold>HOW TO PLAY & LEARN</Text>
                        <Block flex={false} style={{ marginTop: 16 }}>{this.renderGuides()}</Block>
                        <Button shadow color="primary" onPress={() => navigation.navigate('Quiz')}>
                            <Text center color="white">START QUIZ</Text>
                        </Button>
                    </Block>

                </Block>
            </Block>
        );

    }
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: 'white',
        margin: Theme.sizes.padding,
        padding: Theme.sizes.padding,
        borderRadius: Theme.sizes.radius,
        // for android
        elevation: 2
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    imageContent: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 16,
    },

    image: { width: 50, height: 50 }

});

Home.defaultProps = {
    home_1: require('../../assets/home-1.gif'),
}

export default Home;