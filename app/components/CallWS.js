import React, {Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import RNFS from 'react-native-fs'
import {FileUpload} from 'NativeModules';




export default class CallWS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      fsStatus: '',
    };
  }


  fetchCall() {
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

  async getMoviesFromApi() {
    try {
      let response = await fetch('http://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();

      let movies = responseJson.movies;
      this.setState({ movies })
      //return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }

  testFS() {
    // undefined
    console.log('RNFS.MainBundlePath ' + RNFS.MainBundlePath);

    // /data/user/0/com.navexp/files
    console.log('RNFS.DocumentDirectoryPath  ' + RNFS.DocumentDirectoryPath);


    console.log('RNFS.PicturesDirectoryPath  ' + RNFS.PicturesDirectoryPath);
    var path = RNFS.PicturesDirectoryPath + '/RCTCameraModule';

    console.log('Read path ' + path)
    RNFS.readDir(path)
      .then((result) => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        console.log('statResult ', statResult)
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log('File content' + contents);
      })
      .catch((err) => {
        console.log('Exception' + err.message, err.code);
      });
  }



  testFSUpload() {

    var uploadUrl = 'http://requestb.in/z8j7gwz8?inspect';

    // create an array of objects of the files you want to upload
    var files = [
      {
        name: 'test1',
        filename: 'IMG_20160804_162958.jpg',
        filepath: RNFS.PicturesDirectoryPath + '/RCTCameraModule/IMG_20160804_162958.jpg',
        filetype: 'JPEG/Exif'
      }, {
        name: 'test2',
        filename: 'IMG_20160804_163111.jpg',
        filepath: RNFS.PicturesDirectoryPath + '/RCTCameraModule/IMG_20160804_163111.jpg',
        filetype: 'JPEG/Exif'
      }
    ];

    var uploadBegin = (response) => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = (response) => {
      var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };


    // upload files
    // not support in android
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'hello': 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise.then((response) => {
      if (response.statusCode == 200) {
        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    })
      .catch((err) => {
        if (err.description === "cancelled") {
          // cancelled by user
        }
        console.log(err);
      });
  }

  testFSFileCreate() {
    console.log('test FS file create');
    // create a path you want to write to
    var path = RNFS.PicturesDirectoryPath + '/test.txt';

    // write the file
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then((success) => {
        this.setState({fsStatus : 'Created'});
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  testFSFileDelete() {
    console.log('test FS file delete');
    // create a path you want to delete
    var path = RNFS.PicturesDirectoryPath + '/test.txt';

    return RNFS.unlink(path)
      .then(() => {
        this.setState({fsStatus: 'Deleted'});
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  }


  testFileUpload() {
    console.log('define file upload object');

    var obj = {
      uploadUrl: 'http://requestb.in/z8j7gwz8?inspect',
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'hello': 'world',
      },
      files: [
        {
          //            name: 'one', // optional, if none then `filename` is used instead
          //            filename: 'one.w4a', // require, file name
          //            filepath: '/xxx/one.w4a', // require, file absoluete path
          //            filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension

          name: 'test1',
          filename: 'IMG_20160804_162958.jpg',
          filepath: RNFS.PicturesDirectoryPath + '/RCTCameraModule/IMG_20160804_162958.jpg',
          filetype: 'image/jpeg'


        },
      ]
    };

    console.log('call upload');
    FileUpload.upload(obj, function (err, result) {
      console.log('upload:', err, result);
    })

  }

  render() {
    return (
      <View style={{ flex: 1 }} >

        <TouchableHighlight
          underlayColor='#35b5ff'
          onPress={this.getMoviesFromApi.bind(this) }
          style={styles.button}
          >
          <Text style={styles.label}>Fetch <Icon name="ios-book" color="#4F8EF7" /></Text>
        </TouchableHighlight>


        <Icon name="ios-person" size={30} color="#4F8EF7" onPress={this.testFS.bind(this) } />

        <Icon name="ios-cloud-upload" size={30} color="#4F8EF7" onPress={this.testFileUpload.bind(this) } />

        <Icon name="md-create" size={30} color="#4F8EF7" onPress={this.testFSFileCreate.bind(this) } />

        <Icon name="md-cut" size={30} color="#4F8EF7" onPress={this.testFSFileDelete.bind(this) } />


        <Text>{' '}</Text>
        <Text>Messages: </Text>
        {this.state.movies.map((m) =>
          <Text key={m.releaseYear}>{m.title} {m.releaseYear}</Text>) }

         <Text>File FS:  {this.state.fsStatus} </Text>
                    
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

