import React, {Component } from 'react'
import t from 'tcomb-form-native'
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight , 
    ScrollView,
 } from 'react-native'

 
 
 const Form = t.form.Form;


 // here we are: define your domain model

const Nationality = t.enums.of([
  'US Citizen',
  'Canadian',
  'Other'
], 'Nationality');

const KnownCountry = t.struct({
    nationality: Nationality
}, 'KnownCountry');

const UnknownCountry = KnownCountry.extend({
    otherCountry: t.String,
}, 'UnknownCountry');

// Union
const Citizenship = t.union([KnownCountry, UnknownCountry], 'Citizenship');

// Final form Type
const citizenshipType = t.list(Citizenship);
//const citizenshipType = Citizenship;  // single select

// if Citizenship type is 'other' return the UnknownCountry type (case sensitive)
Citizenship.dispatch = value => value && value.nationality === 'Other' ? UnknownCountry : KnownCountry;




const Country = t.enums({  
  'US' : 'United States',
  'CA' : 'Canada'
}, 'Country');

const CAProv = t.enums({
  'ON' : 'Ontario',
  'QC' : 'Quebec',
  'BC' : 'British Columbia',
}, 'CAProv');

const USState = t.enums({
  NY : 'New York',
  NJ : 'New Jersey',
  TX : 'Texas',
});



// t.refinement(type, predicate)
const Positive = t.refinement(t.Number, function (n) {
  return n >= 0;
});

Positive.getValidationErrorMessage = function(value, path, context) {
  return 'Cannot be neg: ' + context.locale;
};


const CAPerson = t.struct({
  country : Country,
  province : CAProv,
  citizenships : citizenshipType,
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: Positive,               // a required number, refinement
    
  disable: t.Boolean,
  
  birthday: t.Date // a date field
});

const USPerson = t.struct({
  country : Country,
  state : USState,
  citizenships : citizenshipType,
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: Positive,               // a required number
    
  disable: t.Boolean,
  
  birthday: t.Date // a date field
});

let options = {
  i18n : {
    optional: ' (opt)',
    required: '',
    add: 'Add+',   // add button
    remove: '✘-',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button    
  },
  auto: 'placeholders',       // infield placeholder, 'none' have neither lables or placeholders
  order: ['country', 'province', 'state',  'citizenships', 'disable', 'name', 'surname', 'age', 'birthday'],
//hasError: true,   // show error msg on load
//error: 'custom msg',
  //label: 'Form level label',   // form legend
  fields: {
    country : {
      nullOption : {value : '', text: '<Select Country>'},
      order: 'asc',
    },
    province : {
      nullOption : {value : '', text: '<Select Province>'},
    },
    state : {
      nullOption : {value : '', text: '<Select State>'},
    },    
    disable : {      
      label : 'Show Name',
    },
    name : {
      placeholder: 'First Name', // placeholder display
      //label: 'Name label'   //name field label
      //help: 'Need help?',
      error: 'Invalid name',
      //autoFocus: true,
      //autoCorrect: false,
      //maxLength : 10,
      multiline: true,
      numberOfLines:2,
      password: true,
    },
    surname : {
      //label: 'Surname op'
    },    
    birthday :{
      //format : (date) => String(date) ,
      mode : 'time', //'date', 'time', 'datetime
    },
    citizenships  :{
      label: 'Have Citizenship',
      item: [
        // one option object per concrete type of the union
        {
          //label: 'KnownCountry'
        },
        {
          //label: 'UnknownCountry'
        }

      ]      
    },
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
    let options = t.update(this.state.formOpts, {
      fields: {
        name: {
          //editable : 
          hidden: {'$set': !value.disable}
        }
      }
    }); 

    // render difference type by country
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
    let value = this.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      // clear all fields
      this.clearForm();
    }
  }


  getType(value) {
    if (value.country === 'CA') {
      return CAPerson;
    } else if (value.country === 'US') {
      return USPerson;
    } else {
      // init display
      return t.struct({
        country: Country
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        ref = {(scrollView) => {this.scrollView = scrollView;}}
        automaticallyAdjustContentInsets = {true}
        //onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        sytle = {styles.scrollView} >


        {/* display */}
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        
        <Form
          ref={(frm) => {
            this.form = frm;
          }}
          type={this.state.formType}
          options={this.state.formOpts}
          

          value={this.state.formVal}
          context={{locale: 'contextLocale'}}
          onChange = {this.onChange.bind(this)}          
        />
        </ScrollView>
      </View>
    );
  }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    
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
  },
    scrollView: {
    backgroundColor: '#6A85B1',
    height: 100,
  },
});

export default TForm