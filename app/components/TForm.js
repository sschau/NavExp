import React, {Component } from 'react'
import t from 'tcomb-form-native'
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight , 
 } from 'react-native'

 

 
 var Form = t.form.Form;

Form.i18n = {
   optional: '',
   required: ' (req)'
 };


 // here we are: define your domain model



const Country = t.enums({
  'IT' : 'Italy',
  'US' : 'United States'
}, 'Country');



var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean,        // a boolean
  disable: t.Boolean,
});

var options = {
  fields: {
    name : {}
  }
}; // optional rendering options (see documentation)

class TForm extends Component {
    constructor(props) {
      const value = {};
        super(props);    
        this.state = {   
                    formVal: value
                    /* 
                    {
                       name: 'Giulio',
                      surname: 'Canti'
                    }*/
                    ,
                    formOpts : options,         
                    formType : this.getType(value)                                                    
        }
    }

  componentDidMount() {
    // give focus to the name textbox
    //console.log('found name component ' + this.form.getComponent('name'));

//    this.form.getComponent('name').refs.input.focus();    
  }

  onChange(value) {
    console.log('value is ' + value.disable);
    var options = t.update(this.state.formOpts, {
      fields: {
        name: {
          editable: {'$set': !value.disable}
        }
      }
    }); 

    const type = value.country != this.state.formVal.country?
      this.getType(value) : this.state.formType;

    this.setState({formVal : value,
      formOpts: options,
      formType: type});
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


  getType(value) {
    if (value.country === 'IT') {
      return t.struct({
        country : Country,
        rememberMe : t.Boolean
      });
    } else if (value.country === 'US') {
      return t.struct({
        country: Country,
        name: t.String
      });
    } else {
      return t.struct({
        country: Country
      });
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
          type={this.state.formType}
          options={this.state.formOpts}
          value={this.state.formVal}
          onChange = {this.onChange.bind(this)}          
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