import React, {Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Picker, AsyncStorage } from 'react-native'

var STORAGE_KEY = '@AsyncStorageExample:Key';
var COLORS = ['red', 'orange', 'yellow', 'green', 'blue'];


export default class Storage extends Component {
    constructor(props) {
        super(props);    
        this.state = {                                              
                  selectedColor: COLORS[0],
                  messages: [],
                };
        }
    
    componentDidMount() {
        this._loadInitialState().done();
        
    }

    componentWillUnmount() {        
    }

  _appendMessage(message) {
    this.setState({messages: this.state.messages.concat(message)});
  }

async _loadInitialState() {
    // this is load by the class object.. so this is the same this.
    console.log('loadiniiState');
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({selectedColor: value});
        this._appendMessage('Recovered selection from disk: ' + value);
      } else {
        this._appendMessage('Initialized with no selection on disk.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }  
}

  async _onValueChange(selectedColor) {
    // this is called by the action. .. so this is the action item. need bind(this) to access _appendMessage and setState
    console.log('onValueChange ' + selectedColor);
    this.setState({selectedColor});        
    try {      
      await AsyncStorage.setItem(STORAGE_KEY, selectedColor);            
      this._appendMessage('Saved selection to disk: ' + this.state.selectedColor);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  }

  async _removeStorage() {
    console.log('removeStorage');
    try {      
      await AsyncStorage.removeItem(STORAGE_KEY);      
      this._appendMessage('Selection removed from disk.');
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  }


    render() {
        var color = this.state.selectedColor;

        return (
        <View style={{flex: 1, backgroundColor: 'steelblue'}} >
<Picker
  selectedValue={color}
  onValueChange={this._onValueChange.bind(this)}>
  {COLORS.map((value) => (
    <Picker.Item label={value} value={value} key={value}/>  
  ))}
    
</Picker>
<Text>
  {'Selected: '}
          <Text style={{color}}>
            {this.state.selectedColor}
          </Text>
        </Text>
        <Text>{' '}</Text>
        <TouchableHighlight 
            underlayColor='#35b5ff'
            onPress={this._removeStorage.bind(this)}
            style={styles.button}            
            > 
        <Text style={styles.label}>Press here to remove from storage.</Text>
        </TouchableHighlight>
        <Text>{' '}</Text>
        <Text>Messages:</Text>
        {this.state.messages.map((m) => <Text key={m}>{m}</Text>)}          
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
  image: {
    width: 250,
    height: 250
  },
  button: {
    height: 70,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }  
})

