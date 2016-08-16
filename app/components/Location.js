import React, {Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default class Location extends Component {
    constructor(props) {
        super(props);    
        this.state = {                                              
                  initialPosition: 'unknown',
                  lastPosition: 'unknown',                  
                };
        }
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            var initialPosition = JSON.stringify(position);
            this.setState({initialPosition});
        },
        (error) => console.log('getCurrentPosition error ' + error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
        });
        
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
        <View style={{flex: 1, backgroundColor: 'skyblue'}} >
            <Text> {'GPS'}
	        <Text style={styles.title}>Initial position: </Text>
                    {this.state.initialPosition}
            </Text>
	        <Text>
	        <Text style={styles.title}>Current position: </Text>
                {this.state.lastPosition}
            </Text>     
        </View>       
        )
    }
    
}

Location.propTypes = {
    watchID: PropTypes.number,
}

Location.defaultProps = {
    watchID: null,
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

