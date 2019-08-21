import React from 'react';
import { Image, Modal, FlatList, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Block, Text, Button, Theme } from '../../component';

export default (props) => {

    let earned = 0;
    for (let question of props.data) {
        earned += question.answer === question.answered ? 1 : 0;
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <Block>
                <Block>
                    <Block middle center>
                        <Image
                            style={{ height: 225, width: 225 }}
                            source={require('../../../assets/guides-2.jpg')}
                        />
                        <Text center h2>LoyaltyPoints earned</Text>
                        <Text bold center style={{ fontSize: 40 }}>{earned}</Text>
                    </Block>
                    <Block style={{ margin: Theme.sizes.padding }}>
                        <FlatList
                            data={props.data}
                            keyExtractor={(item, index) => 'key:' + index}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        marginBottom: Theme.sizes.paddingxs
                                    }}>
                                        <View>
                                            {
                                                item.answer === item.answered ?
                                                    (<AntDesign name="checkcircleo" color="#3db84d" size={24} />) :
                                                    (<AntDesign name="closecircleo" color="#fc4b55" size={24} />)
                                            }
                                        </View>
                                        <View style={{ flex: 1, marginLeft: Theme.sizes.paddingxs }}>
                                            <Text h3>{item.text}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </Block>
                </Block>
                <Block flex={false} style={{ paddingHorizontal: Theme.sizes.padding }}>
                    <Button shadow color="primary" onPress={props.onPress}>
                        <Text center color="white">BACK TO HOME</Text>
                    </Button>
                </Block>
            </Block>
        </Modal>
    );

}