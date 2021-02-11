// Home.js
import React, {useEffect} from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from 'react-native';

const posts = [
  {
    id: '1',
    character: 'Dog',
    quote: 'Bark Bark Bark.',
    pic: require('./assets/dog.png'),
  },
  {
    id: '2',
    character: 'Cat',
    quote: 'Meow Meow Meow',
    pic: require('./assets/cat.png'),
  },
];

const Home = ({navigation}) => {
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      navigateHandler(url);
    });
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', handleOpenURL);
    }
    return () => {
      if (Platform.OS === 'ios') {
        Linking.removeEventListener('url', handleOpenURL);
      }
    };
  }, []);

  const handleOpenURL = (event) => {
    console.log('handleOpenURL: ' + event.url);
    navigateHandler(event.url);
  };

  const navigateHandler = async (url) => {
    if (url) {
      const {navigate} = navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const post = posts.find((item) => item.id === id);
      console.log('navigateHandler id: ' + id);
      if (!post) {
        Alert.alert('No post found');
      } else {
        navigate('Post', {post: post});
      }
    }
  };

  const {row, image, title, separator, container} = styles;
  return (
    <View style={container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Post', {post: item})}>
            <View style={row}>
              <Image source={item.pic} style={image} resizeMode="cover" />
              <Text style={title}>{item.character}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={separator} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 16,
    color: 'black',
    margin: 10,
  },
  separator: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 0.5,
    width: '100%',
  },
});

export default Home;
