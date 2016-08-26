import React, {PropTypes, Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'






class MovieRoot extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View style={{ flex: 1 }} >

        <TouchableHighlight
          underlayColor='#35b5ff'
          onPress={this.props.fetchMovie.bind(this) }
          style={styles.button}
          >
          <Text style={styles.label}>Fetch <Icon name="ios-book" color="#4F8EF7" /></Text>
        </TouchableHighlight>



        <Text>{' '}</Text>
        <Text>Messages: </Text>
        {          
          this.props.movieR.movies.map((m) =>
            <Text key={m.releaseYear}>{m.title} {m.releaseYear}</Text>)          
        }


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

MovieRoot.PropTypes = {
  movie: PropTypes.object.isRequired,
  fetchMovie: PropTypes.func.isRequired,
}
export default MovieRoot