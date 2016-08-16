import React, {Component, PropTypes } from 'react'
import { NetInfo, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'



class ConnectionInfoSubscription extends Component {
    constructor(props) {
        super(props);    
        this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this);
        this.state = {                                              
                  connectionHistory: [],                                    
                };
    }
    
    componentDidMount() {
        NetInfo.addEventListener('change', this._handleConnectionInfoChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange);
    }

    _handleConnectionInfoChange(connectionInfo) {
        const history = this.state.connectionHistory.slice();
        history.push(connectionInfo);
        this.setState({
                connectionHistory : history,
        });
    }

    render() {
        return (
        <View style={{flex: 1, backgroundColor: 'skyblue'}} >
            <Text>History : {JSON.stringify(this.state.connectionHistory)} </Text>
        </View>       
        )
    }
    
}



class ConnectionInfoCurrent extends Component {
    constructor(props) {
        super(props);   
        this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this); 
        this.state = {                                              
                connectionType: null,                                
        };
    }

    componentDidMount() {
        NetInfo.addEventListener(
            'change', this._handleConnectionInfoChange);
        NetInfo.fetch().done(
            (connectionInfo) => {this.setState({connectionType : connectionInfo});}
        );
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            'change', this._handleConnectionInfoChange
            );
    }

    _handleConnectionInfoChange(connectionInfo) {
        this.setState({
            connectionType : connectionInfo,
        });
    }

    render() {
        return (
            <View>
                <Text>Connection Type : {this.state.connectionType}</Text>
            </View>
        )
    }
}


class IsConnected extends Component {
    constructor(props) {
        super(props);
        this._handleConnectivityChange = this._handleConnectivityChange.bind(this);        
        this.state = {
            ConnectionStatus : null,
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change', this._handleConnectivityChange
        );
        
        NetInfo.isConnected.fetch().then(
            (isConnected) => {
                console.log('Is Connected fetch done - ' + isConnected);
                this.setState({ConnectionStatus : isConnected} );
            }
        );
    }
        
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change', this._handleConnectivityChange
        );        
    }   

    _handleConnectivityChange(isConnected) {
        console.log('what is this ' + this);
        this.setState({
            ConnectionStatus : isConnected ,
        });
    } 

    render() {
        return (
            <View>
                <Text>Device is : {this.state.ConnectionStatus ? 'Online': 'Offline'} </Text>
            </View>
        );
    }

}

class IsConnectionExpensive extends Component {
    constructor(props) {
        super(props);
        this._checkIfExpensive = this._checkIfExpensive.bind(this);
        this.state = {
            ConnectionExpensive : null,
        };
    }

    _checkIfExpensive() {
        NetInfo.isConnectionExpensive().then(
            (connExpensive) => {this.setState({ConnectionExpensive : connExpensive }); }
        ).catch(
            (reason) => {console.log('check expensive catch ' + reason);}
        );
    }

    render() {
        return (
        <View>
          <TouchableWithoutFeedback onPress={this._checkIfExpensive}>
            <View>
              <Text>Click to see if connection is expensive:
                {this.state.ConnectionExpensive === true ? 'Expensive' :
                this.state.ConnectionExpensive === false ? 'Not expensive'
                : 'Unknown'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        )
    }
}


export default class DevConnectionInfo extends Component {
    render() {
        return (
            <View>
            <IsConnected  />
            <ConnectionInfoCurrent />
            <ConnectionInfoSubscription />
            <IsConnectionExpensive />
            </View>
        );
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
  }
})

