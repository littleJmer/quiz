import React from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import Constants from 'expo-constants';

import { Block, Text, Button, Theme } from '../../component';
import { getQuestions } from '../../utils';

import Loader from './loader';
import Score from './score';

const screenHeight = Math.round(Dimensions.get('window').height) + Constants.statusBarHeight;

class Quiz extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            actual: 1,
            time: this.props.questionDuration,
            visibleModal: false,
        }
        this.animatedHeight = new Animated.Value(screenHeight);
    }

    componentDidMount() {
        this.loadQuiz();
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    loadQuiz = () => {

        const { numberOfQuestion } = this.props;

        getQuestions(questions => {

            this.hideLoader();

            this.setState(
                { questions },
                this.startCount
            );

        }, numberOfQuestion);

    }

    hideLoader = () => {
        Animated.timing(
            this.animatedHeight,
            {
                toValue: 0,
                duration: 550
            }
        ).start();
    }

    startCount() {
        this.interval = setInterval(this.count, 1000);
    }

    stopCount() {
        clearInterval(this.interval);
    }

    count = () => {
        const { time } = this.state;
        if (time === 0) {
            this.answer(null);
            return;
        }
        this.setState({ time: time - 1 });
    }

    answer = (answered) => {
        this.stopCount();
        const actual = this.state.actual + 1;
        if (actual > this.state.questions.length) {
            this.complete();
            return;
        }
        const questions = [...this.state.questions];
        questions[this.state.actual - 1].answered = answered;
        this.setState(
            {
                time: this.props.questionDuration,
                actual,
                questions
            },
            this.startCount
        );
    }

    complete = () => {
        this.setState({ visibleModal: true });
    }

    finish = () => {
        this.setState({ visibleModal: false });
        this.props.navigation.navigate('Home');
    }

    render() {

        const { time, actual, visibleModal } = this.state;
        const { numberOfQuestion } = this.props;

        let question = '-';
        let category = '-';
        if (this.state.questions.length) {
            if (actual <= this.state.questions.length) {
                question = this.state.questions[actual - 1].text;
                category = this.state.questions[actual - 1].category;
            }
        }

        return (
            <Block>

                <Loader style={{ height: this.animatedHeight }} />

                <Score visible={visibleModal} data={this.state.questions} onPress={this.finish} />

                <Block color="accent">
                    <Block style={{ flex: 0.8 }} middle>
                        <Text center semibold color="white" style={{ fontSize: 70 }}>{time} sec</Text>
                    </Block>
                    <Block flex={false} style={styles.question}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: Theme.sizes.paddingxs
                        }}>
                            <Text caption>Question {actual}/{numberOfQuestion}</Text>
                            <Text caption>{category}</Text>
                        </View>
                        <Text center h1>{question}</Text>
                    </Block>
                    <Block middle color="white">
                        <View style={styles.row}>
                            <Button color="#fc4b55" shadow style={styles.button} onPress={() => this.answer(0)}>
                                <Text center h1 color="white">No</Text>
                            </Button>
                            <Button color="primary" shadow style={styles.button} onPress={() => this.answer(1)}>
                                <Text center h1 color="white">Yes</Text>
                            </Button>
                        </View>
                    </Block>
                </Block>

            </Block>
        );

    }
}

const styles = StyleSheet.create({

    question: {
        backgroundColor: 'white',
        margin: Theme.sizes.padding,
        padding: Theme.sizes.padding,
        borderRadius: Theme.sizes.radius,
        // for android
        elevation: 2
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: Theme.sizes.padding
    },

    button: { height: 120, width: 120, borderRadius: 120 }

});

Quiz.defaultProps = {
    questionDuration: 10,
    numberOfQuestion: 10,
}

export default Quiz;