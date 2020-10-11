import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

const axios = require("axios");

function Separator() {
  return <View style={styles.separator} />;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  onLoginPressed() {
    const that = this;
  
    axios
      .post("http://f112eb72.ngrok.io/users/auth/", {
        //email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
      })
      .then(function(response) {
        if (response.status == 200) {
         that.props.navigation.navigate('Home');
        }
        
      })  
      .catch (function(err){
          alert('Invalid username or password - please try again.');
      })

  
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Orchestra Manager</Text>

          <Separator />
          <Separator />
          <Separator />

          <TextInput
            placeholder="Email Address/Username"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(val) => this.setState({ userName: val })}
          />
          <Separator />

          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(val) => this.setState({ password: val })}
          />

          <View>
            <Separator />
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonPosition}
              onPress={this.onLoginPressed.bind(this)}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Separator />
          </View>

          <View>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => this.props.navigation.navigate("Registration")}
            >
              <Text style={styles.linkButton}>Create an Account</Text>
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
    justifyContent: "center",
    padding: 20,
  },

  separator: {
    marginVertical: 10,
  },

  title: {
    fontSize: 30,
    color: "#2f4f4f",
 
  },

  buttonPosition: {
    backgroundColor: "#008080",
    height: 35,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },

  input: {
    height: 35,
    width: 200,
    padding: 10,
    marginLeft: 25,
    backgroundColor: "white",
    borderBottomColor: "#696969",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  linkButton: {
    color: "black",
    textDecorationLine: "underline",
    alignItems: "center",
  },
});

export default Login;
