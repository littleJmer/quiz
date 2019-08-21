import React from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigator";

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

const AppContainer = createAppContainer(AppNavigator);

export default class Root extends React.Component {

    state = {
        isReady: false,
    };

    async _loadAssetsAsync() {

        const imageAssets = cacheImages([
            require('./assets/guides-1.png'),
            require('./assets/guides-2.jpg'),
            require('./assets/guides-3.png'),
            require('./assets/home-1.gif'),
            require('./assets/loader-1.gif'),
        ]);

        await Promise.all([...imageAssets]);
    }

    render() {

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        return <AppContainer />

    }
}

