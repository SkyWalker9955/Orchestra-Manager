import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Item,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/EnsembleContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ShowEnsemble = ({ navigation }) => {
  const { state } = useContext(Context);

  const ensemble = state.find(
    (ensemble) => ensemble._id === navigation.getParam("_id")
  );

  useEffect(() => {
    axios.get("http://96c75fc9.ngrok.io/instruments").then((res) => {
      console.log(res.data[0].name);
      console.log(res.data[1].name);
      console.log(res.data[2].name);
      console.log(res.data[3].name);
    });
  });

  //celloURL: 'https://www.dropbox.com/home/Pieces/W.A.Mozart-Eine.Kleine%2CK.525/Cello?preview=Orchestra+Manager+-+Cello.pdf'
  // violaURL: 'https://www.dropbox.com/home/Pieces/W.A.Mozart-Eine.Kleine%2CK.525/Viola?preview=Viola.pdf'
  //  violin1URL: 'https://www.dropbox.com/home/Pieces/W.A.Mozart-Eine.Kleine%2CK.525/Violin1?preview=Violin1.pdf'
  //  violin2URL: 'https://www.dropbox.com/home/Pieces/W.A.Mozart-Eine.Kleine%2CK.525/Violin2?preview=Violin2.pdf'

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{ensemble.title}</Text>
      </View>
      <FlatList
        style={{ width: "80%" }}
        data={ensemble.chairs}
        renderItem={({ item }) => {
        
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.dropbox.com/home/Pieces/W.A.Mozart-Eine.Kleine%2CK.525/" +
                      item.selectedValue +
                      "?preview=" +
                      item.selectedValue +
                      ".pdf"
                  )
                }
              >
                <Entypo name="align-bottom" size={25} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.playerText}>
                {item.selectedValue + " - " + item.selectedValueUser}
              </Text>
            </View>
          );
        }}
        //keyExtractor={(ensemble.chair) => ensemble.chair}
      ></FlatList>
    </View>
  );
};

//////////HEADER_FEATHER_FRO_NAVIGATION_TO_EDITeNSEMBLE///////////
ShowEnsemble.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditEnsemble", { _id: navigation.getParam("_id") })
        }
      >
        <Entypo name="feather" size={25} style={styles.featherStyle} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 23,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    shadowColor: "#000",
    paddingHorizontal: 25,
   // elevation: 0.2,
    color: "#008080",
  },
  titleView: {
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 20,
    marginTop: 15,
  },
  screenContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  featherStyle: {
    marginRight: 8,
  },
  titleViewStyle: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
  },
  titleTextStyle: {
    fontSize: 20,
  },
  chairView: {
    marginHorizontal: 20,
  },
  chairStyle: {
    fontSize: 18,
    padding: 10,
    justifyContent: "space-between",
    borderColor: "grey",
  },
  playerText: {
    fontSize: 18,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 25,
    paddingTop: -25,
    marginTop: -10,
  },

  icon: {
    alignSelf: "flex-end",
    marginTop: 10,
    alignItems: "center",
  },
});

export default ShowEnsemble;
