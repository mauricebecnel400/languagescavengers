import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet, 
} from 'react-native';
import { Camera, Permissions } from 'expo';

import TakePictureButton from '../components/ButtonTakePhoto';

export default class ExpoCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.handleTakePicture});
    }
    this.props.clickHandler();
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
          <View style={styles.container}>
              <TakePictureButton style={styles.CameraButton} clickHandler = {this.takePicture}/>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  FlipButton: {
    alignItems: 'center',
    padding: 10,
  },
  FlipText: {
    fontSize: 18,
    marginBottom: 10, 
    color: 'white',
  },
  CameraButton: {

  }
})