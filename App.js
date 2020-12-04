import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root, Container, Button } from 'native-base';

import { selectFromCameraRoll, takePhoto } from './src/services/ImagePickerService';
export default class App extends React.Component {
    async gallery(){
        const photo = await selectFromCameraRoll();
        this.setState({image:photo});
    }

    async takePhoto(){
        const photo = await takePhoto();
        this.setState({image:photo});
    }
    render(){
        return (
            <Root>
                <Container>
                    <View style={styles.View}>
                        <Button large block onPress={()=>this.gallery()}>
                            <Text>
                                Grab image
                            </Text>
                        </Button>
                        <Button large block success onPress={()=>this.takePhoto()}>
                            <Text>
                                Take photo
                            </Text>
                        </Button>
                    </View>
                    
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    View: {
        padding: 100
    }
})