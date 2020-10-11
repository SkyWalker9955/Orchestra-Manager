//This screen must contain list of ensables created by the user, 
//as well as a button that allows to create new ensamble.
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Context } from "../context/EnsembleContext";
import { Ionicons, AntDesign } from '@expo/vector-icons';
////////////////////////////////////////////////////////
const PRIME_COLOR = "#008082";
////////////////////////////////////////////////////////
const HomeScreen = ({ navigation }) => {
  const { state, addEnsemble, deleteEnsemble, getEnsemble } = useContext(Context);
  console.log(state)

  useEffect(() => {
    getEnsemble();

    const listener = navigation.addListener('didFocus', () => {
      getEnsemble();
    })

    return () => {
      listener.remove();
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Ensembles stored here:</Text>
      </View>
      <FlatList
        data={state}
        style={{ width: '88%' }}
        keyExtractor={(ensemble) => ensemble.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ShowEnsemble', { _id: item._id})}>
              <View style={styles.flatlistViewStyle}>
                <Text style={styles.flatlistTextStyle}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => deleteEnsemble(item._id)}>
                  <Ionicons style={styles.icon} name="md-remove-circle-outline" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
////////////////////////////////////////////////////////
HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => 
      <TouchableOpacity onPress={() => navigation.navigate('CreateEnsemble')}>
        <AntDesign name="pluscircleo" size={24} style={styles.headerButton} />
      </TouchableOpacity>
  }
}
////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 23,
    borderWidth: 1,
    padding: 5 ,
    borderRadius: 5,
    shadowColor: "#000",
    paddingHorizontal: 25,
   // elevation: 0.2,
    color: "#008080"
  },
  flatlistViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 5,
    //borderTopWidth: 0.5,
    //borderTopColor: 'grey',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  flatlistTextStyle: {
    fontSize: 18,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'grey'
  },
  titleView: {
    paddingVertical: 10,
    marginTop: 8
  },
  icon: {
    fontSize: 25
  },
  headerButton: {
    marginRight: 8
  }
});
////////////////////////////////////////////////////////
export default HomeScreen;