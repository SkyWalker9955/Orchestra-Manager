import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const axios = require("axios");

function Separator() {
  return <View style={styles.separator} />;
}

console.disableYellowBox = true;

class Registration extends React.Component {
  constructor() {
    super();
  }

  onRegistrationPressed() {
    axios
      .post("http://f112eb72.ngrok.io/users/add", {
        userType: this.state.userType,
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
      })
      .then(function (response) {
        console.log(response);
      });
      
    const { userType, userName, fName, lName, email, password} = this.state;

    if (userType == null || userName == null || fName == null || lName == null || email == null || password == null) {
      alert('Please fill all fields.');
    }
    else {
      Alert.alert("Registration successful! Please login.");
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Separator />
          <Separator />
          <Text style={styles.title}>Registration</Text>
          <Separator />
          <Separator />

          <TextInput
            placeholder="User Role (ex. Librarian)"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(val) => this.setState({ userType: val })}
          />
          <Separator />

          <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(val) => this.setState({ userName: val })}
          />
          <Separator />

          <TextInput
            placeholder="First Name"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(val) => this.setState({ fName: val })}
          />
          <Separator />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(val) => this.setState({ lName: val })}
          />
          <Separator />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="grey"
            style={styles.input}
            autoCapitalize = "none"
            onChangeText={(val) => this.setState({ email: val })}
          />
          <Separator />

          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize = "none"
            onChangeText={(val) => this.setState({ password: val })}
          />
          <Separator />

          <TextInput
          //Will add back in later: to confirm matching passwords
          // placeholder="Confirm Password"
          //placeholderTextColor="grey"
          //secureTextEntry={true}
          //style={styles.input}
          //onChangeText = {(val) => this.setState({confirmPassword: val})}
          //Then Separator component after
          />

          <View>
            <TouchableOpacity
              style={styles.buttonPosition}
              onPress={this.onRegistrationPressed.bind(this)}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <Separator />

          <View>
            <Text style={styles.regText}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.linkButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  },

  separator: {
    marginVertical: 10,
  },

  title: {
    fontSize: 30,
    color: "#2f4f4f",
    alignItems: "center",
    marginLeft: 18,
  },

  buttonPosition: {
    backgroundColor: "#008080",
    height: 35,
    width: 200,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 18,
  },

  input: {
    height: 35,
    width: 200,
    padding: 10,
    backgroundColor: "white",
    borderBottomColor: "#696969",
    borderBottomWidth: 1,
    alignItems: "center",
  },

  linkButton: {
    color: "black",
    textDecorationLine: "underline",
    alignItems: "center",
  },

  regText: {
    alignItems: "center",
    marginLeft: 20,
  },
});

export default Registration;
