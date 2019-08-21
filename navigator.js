import { createStackNavigator } from "react-navigation";
import HomeScreen from './src/screen/home';
import QuizScreen from './src/screen/quiz';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Quiz: {
            screen: QuizScreen
        },
    }
);

export default AppNavigator;