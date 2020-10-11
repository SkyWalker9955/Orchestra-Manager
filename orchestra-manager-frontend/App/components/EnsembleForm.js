import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const EnsembleForm = ({ onSubmit, initialValues }) => {

  const [title, setTitle] = useState(initialValues.title);

  ///////////////STATE_FOR_FETCHED_DATA//////////////////////////
  const [instruments, setInstruments] = useState([]);
  const [users, setUsers] = useState([]);
  //state of picked value in instrument picker///////////////////
  const [selectedValue, setSelectedValue] = useState([]);
  //state of picked value in user picker/////////////////////////
  const [selectedValueUser, setSelectedValueUser] = useState([]);
  //state of both pickers in object
  const [chairs, setChairs] = useState(initialValues.chairs);
  
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios.get("http://f112eb72.ngrok.io/instruments").then((res) => {
      setInstruments(res.data);
      //console.log(instruments)
    });
    ///////////////////////////////////////////////////////////
    axios.get("http://f112eb72.ngrok.io/users").then((res) => {
      setUsers(res.data);
      //console.log(users)
    });
  }, []);
  ////////////////////////////////////////////////////////
  console.log(selectedValue);
  console.log(selectedValueUser);
  console.log(chairs);
  ////////////////////////////////////////////////////////

  function Separator() {
    return <View style={styles.separator} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Create Ensemble Name"}
        placeholderTextColor="grey"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          padding: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
          fontSize: 18,
          margin: 10,
        }}
      />

      <Separator />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select Instrument:{" "}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {instruments.map((instrument) => (
            <Picker.Item
              key={instrument._id}
              label={instrument.name}
              value={instrument.name}
            />
          ))}
        </Picker>
      </View>
      <View>
        <Separator />
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Select User:{" "}
        </Text>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={selectedValueUser}
          onValueChange={(userItemValue, userItemIndex) =>
            setSelectedValueUser(userItemValue)
          }
        >
          {users.map((user) => (
            <Picker.Item
              key={user._id}
              label={user.fName + " " + user.lName}
              value={user.fName + " " + user.lName}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.firstButtonPosition}
        onPress={() => {
          setChairs([
            ...chairs,
            {
              selectedValue,
              selectedValueUser,
              isReturned: false,
              key:
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15),
            },
          ]);
        }}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={chairs}
        keyExtractor={(chair) => chair.key}
        style={{ width: "100%", borderColor: "black", borderWidth: 1 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatlistViewStyle}>
              <Text style={styles.flatlistTextStyle}>
                {item.selectedValue + " - " + item.selectedValueUser}
              </Text>
              <TouchableOpacity onPress={() => console.log(item.key)}>
                <Ionicons style={styles.icon} name="md-remove-circle-outline" />
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
      <TouchableOpacity
        style={styles.secondButtonPosition}
        onPress={() => onSubmit(chairs, title)}>
        <Text style={styles.buttonText}>Save Ensemble</Text>
      </TouchableOpacity>
    </View>
  );
};

//INITIALISED_INITIALvALUES_FOR_CREATEeNSEMBLE_SCREEN//
EnsembleForm.defaultProps = {
  initialValues: {
    chairs: [],
    title: ""
  }
};
///////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
  pickerContainer: {
    flexDirection: "row",
  },
  //////////////////////////
  flatlistViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 2,
    padding: 5,
    //borderTopWidth: 0.5,
    //borderTopColor: 'grey',
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    /////////////////////
  },
  //////////////////////
  flatlistTextStyle: {
    fontSize: 18,
    marginVertical: 12,
  },

  separator: {
    marginVertical: 10,
  },

  firstButtonPosition: {
    backgroundColor: "#008080",
    height: 35,
    width: 90,
    alignItems: "center",
    margin: 10,
  },

  secondButtonPosition: {
    backgroundColor: "#008080",
    height: 35,
    width: 200,
    alignItems: "center",
    margin: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    marginTop: 5,
  },
  icon: {
    fontSize: 25,
  },
});

export default EnsembleForm;