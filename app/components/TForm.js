import React, {Component } from 'react'
import t from 'tcomb-form-native'
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight , 
 } from 'react-native'

 var Form = t.form.Form;

 // here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

var options = {}; // optional rendering options (see documentation)

class TForm extends Component {
    constructor(props) {
        super(props);    
        this.state = {   
                    formVal: {
                       name: 'Giulio',
                      surname: 'Canti'
                    },                                                             
        }
    }

  componentDidMount() {
    // give focus to the name textbox
    this.form.getComponent('name').refs.input.focus();
  }

  onChange(value) {
    this.setState({formVal : value});
  }
  
  clearForm() {
    // clear content from all textbox
    this.setState({ formVal: null });
  }

   onPress() {
    // call getValue() to get the values of the form
    var value = this.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      // clear all fields
      this.clearForm();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref={(frm) => {
            this.form = frm;
          }}
          type={Person}
          value={this.state.formVal}
          onChange = {this.onChange.bind(this)}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }   
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default TForm