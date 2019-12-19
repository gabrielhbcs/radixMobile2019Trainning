import React, {Component} from 'react'; 
import {Text, View, StyleSheet, TextInput, Button, Alert, FlatList, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Vibration} from 'react-native';
import noimg from './imagens/noimg.png';
import heart from './imagens/heart.png'
import api from './service/api';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const Card = ({item}) => (<View style={{flex: 1, flexDirection: 'row'}}>
<Image
  onLoadStart={()=>console.log(`baixando... ${item.show.name}`)}
  onLoadEnd={()=>console.log(`finalizado ${item.show.name}`)}
  style = {styles.imageResultado}
  source={!item.show.image ? noimg : {uri: (item.show.image.original || item.show.image.medium) }}
/>
<View style = {styles.caixaResultado}>
  <Text style={styles.nomeSerie}>{" " + item.show.name}</Text>
  <Text style={styles.styleGenre}>{item.show.genres == null ? 'Sem gênero' : " " + item.show.genres.join(", ")}</Text>
</View>
</View>);



class App extends Component {
  state = {
    searchText: '',
    searchResults: null,
  }
  submitSearch = async () => { // 1
    if (this.state.searchText != '') { // 2
      try { // 3
        const response = await api.get('/search/shows', { // 4
          params: { q: this.state.searchText } // 5
        });
        this.setState({ searchResults: response.data })
      } catch(error) { 
        alert(JSON.stringify(error));
      }
    }
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.search}>
          <TextInput
            placeholder={'Procure uma série'}
            alignItems={'center'}
            style={styles.input}
            onChangeText={(text) => this.setState({ searchText: text })}
            onSubmitEditing={() => this.submitSearch()}
            />
             {/* pattern funciona assim: para x, vibra x, para x ...... nesse caso: para 100ms, vibra 300ms, para 200ms...... */}
            <TouchableOpacity onPress={() => Vibration.vibrate([100, 300, 200, 100, 150, 100, 150, 100, 200, 200, 500, 150, 300, 150])}><Image source={heart}/></TouchableOpacity>
        </View>
          <View style={{backgroundColor: 'rgb(240,240,240)'}}>          
            <Text style={{alignSelf: "flex-start", fontSize: 30, fontWeight: 'bold'}}>Resultados:</Text>
          </View>
        <View style={styles.results}>
          
            <FlatList style={{paddingHorizontal: 5}}
              data = {this.state.searchResults}
              renderItem = {({item, index}) =>  <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {item: item})}>
                                                  <Card item={item} key={index} />
                                                </TouchableOpacity>}
              keyExtractor = {(item,index) => `${index}`}/>
          
        </View>
      </View>
    );
  }
}

class DetailsScreen extends Component {
  
  render() {
    const item = this.props.navigation.getParam("item");
    return (
      <View style={{padding: 5, flexWrap: "wrap", alignItems: 'center'}}>
        <View>
          <Image
            onLoadStart={()=>console.log(`baixando... ${item.show.name}`)}
            onLoadEnd={()=>console.log(`finalizado ${item.show.name}`)}
            style = {styles.imageDetail}
            source={!item.show.image ? noimg : {uri: (item.show.image.original ) }}
          />
        </View>
        <View>
          <Text style={{fontSize: 23}}>{item.show.name}</Text>
          <Text style={{fontSize: 15}}>{item.show.genres.join(", ")}</Text>
          <Text style={{fontSize: 12}}>{item.show.summary}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  search: {
    flex: 1,    
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  imageDetail:{
    resizeMode: "contain",
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  imageResultado:{
    width: 80,
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
    marginRight: 5
  },
  nomeSerie:{
    color: "rgb(70, 70, 70)",
    fontSize: 13,
  },
  styleGenre:{
    fontSize: 10,
    color: "rgb(70,70,70)",
    
  },
  caixaResultado: {
    backgroundColor: 'rgb(235,235,235)',
    flex: 1,
    
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(220,220,220)',
    marginVertical: 5,
  },
  input: {
    marginTop: 0, 
    marginLeft: 10,   
    height: 45,
    width: 250,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
  },
  botaoFav: {
    marginLeft: 270,
    height: 45,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  results: {
    flex: 5,
    backgroundColor: 'rgb(240,240,240)',
    alignContent: 'space-around',    
    flexDirection: 'column',
  },
});

const AppStack = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: "Detalhes da série",
    }
  }
},
{
  initialRoute: 'Home',
});

export default createAppContainer(AppStack);