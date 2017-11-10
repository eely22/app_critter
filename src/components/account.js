import React, { Component } from 'react';
import { Icon, Button } from 'react-native-material-ui';
import { Text, View, TextInput } from 'react-native';
import ParticleFetch from '../fetch/particleFetch.js';
import TokenFetch from '../fetch/tokenFetch.js';
import Toast from 'react-native-root-toast';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                    onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}
                    placeholder="username"
                    autoCapitalize="none"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 5}}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    placeholder="password"
                    secureTextEntry={true}
                />
                <Button primary raised onPress={this.login} text="Login" />

            </View>
        )
    }

    login = () => {
        ParticleFetch.login(this.state.username, this.state.password).then(response => {
            console.log("HERE!");
            console.log(response);
            Toast.show('Successfully logged in', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM
            });
            TokenFetch.saveToken(response['access_token']);
            this.props.loggedIn();
        }).catch((error) => {
            console.log(error);
            Toast.show('Invalid username/password', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM
            });
        });
    }
}

class Logout extends Component {
    render() {
        return (
            <View>
                <Text>You are logged in</Text>
                <Button primary raised onPress={this.logout} text="Logout" />
            </View>
        )
    }
    logout = () => {
        TokenFetch.deleteToken();
        this.props.loggedOut();
    }
}

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    render() {
        console.log("Rendering with " + this.state.loggedIn);
        return (
            <View>
                {!this.state.loggedIn && <Login loggedIn={this.loggedIn}/>}
                {this.state.loggedIn && <Logout loggedOut={this.loggedOut}/>}
            </View>
        );
    }

    componentDidMount = () => {
        var token = TokenFetch.getToken().then( (t) => {
            console.log("Token in promise: " + t);
            this.setState({
                loggedIn: t !== null && t !== undefined
            });
        });
    }

    loggedIn = () => {
        this.setState({loggedIn: true})
    }

    loggedOut = () => {
        this.setState({loggedIn: false})
    }
}