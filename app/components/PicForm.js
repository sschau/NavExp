import React, {Component } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, Image } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Camera from 'react-native-camera';

export default class PicForm extends Component {
    constructor(props) {
        super(props);    
        this.state = {   
                    text: 'Type here',                                           
                  imagePath: {      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'},                };
        }
    

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        
        //var imgPath = '.' + data.path.substring(7);
        var imgPath = { uri: data.path, isStatic : true } ; 
        console.log(imgPath);
        //this.setState({imagePath: require(imgPath) });
        this.setState({imagePath: imgPath });
        
      })
      .catch(err => console.error(err));
  }

    render() {
        return (
        <View style={{flex: 1, backgroundColor: 'skyblue'}} >
<Image source={this.state.imagePath} style={{width: 200, height: 100}}/>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          >
          <Icon.Button name="add-a-photo" size={30} color="#4F8EF7" onPress={this.takePicture.bind(this) } >
            <Text style={styles.capture} >[SNAP]</Text>
            </Icon.Button>
        </Camera>

        <TextInput
            {... this.props}
            style={{ borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline = {true}
            numberOfLines = {4}        
            editable = {true}
            maxLength = {40}        
        />      
    
        
        </View>       
        )
    }
    
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10a2f0',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginTop: 100,
    fontSize: 24,
    textAlign: 'center'
  },
preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height/4,
    width: Dimensions.get('window').width/2
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },  
})

