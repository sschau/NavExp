import React, {Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class GoogleAcct extends Component {
  constructor(props) {
    console.log('GoogleAcct construct');
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{width: 120, height: 44}} 
          color={GoogleSigninButton.Color.Light} 
          size={GoogleSigninButton.Size.standard} 
          onPress={() => { this._signIn(); }}/>
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  async _setupGoogleSignin() {    
    try {
      console.log('setup Google Signin - play services');
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      
      
      console.log('setup Google Signin - config calendar');
      /*
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/calendar'],
        webClientId: '867788377702-gmfcntqtkrmdh3bh1dat6dac9nfiiku1.apps.googleusercontent.com',
        offlineAccess: true
      });
      */
      await GoogleSignin.configure({        
        webClientId: '707305482081-5o1miphkq5uk6qs3n4hc63483d9dpfo8.apps.googleusercontent.com',
        offlineAccess: true 
      });
      
      

    console.log('setup Google Signin - get current user');
      const user = await GoogleSignin.currentUserAsync();
      console.log('setup google signin with ' + user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    console.log('call Signin');
    GoogleSignin.signIn()
    .then((user) => {      
      console.log('Got user' + user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.debug('GoogleSignin Failed: WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
