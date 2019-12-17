import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';

// 3
export default class App extends Component {
  state = {
    searchText: '',
  }
  submitSearch() { 
    alert('Buscar:' + this.state.searchText);
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
          <Button title='' style={styles.botaoFav} />
        </View>
        <View style={styles.results}>
          <Text>{this.state.searchText}</Text>
        </View>
      </View>
    );
  }
}

// 5
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  search: {
    flex: 1,
    width: 300,    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  input: {
    marginTop: 0, 
    marginLeft: 10,   
    height: 45,
    width: 250,
    borderColor: 'lightgray',
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
    flex: 4,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
});