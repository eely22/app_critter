import React, { Component } from 'react';
import { BottomNavigation, Icon } from 'react-native-material-ui';
import { Text, View } from 'react-native';
import Account from './account.js'
import Devices from './devices.js'
import Events from './events.js'
import TokenFetch from '../fetch/tokenFetch.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "devices"
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.active == "devices" && <Devices/>}
                    {this.state.active == "events" && <Events/>}
                    {this.state.active == "account" && <Account/>}
                </View>
                <BottomNavigation active={this.state.active} hidden={false} >
                    <BottomNavigation.Action
                        key="devices"
                        icon="devices-other"
                        label="Devices"
                        onPress={() => this.setState({ active: 'devices' })}
                    />
                    <BottomNavigation.Action
                        key="events"
                        icon="chat"
                        label="Events"
                        onPress={() => this.setState({ active: 'events' })}
                    />
                    <BottomNavigation.Action
                        key="account"
                        icon="account-box"
                        label="Account"
                        onPress={() => this.setState({ active: 'account' })}
                    />
                </BottomNavigation>
            </View>
        );
    }

    componentDidMount = () => {
        TokenFetch.getToken().then( (token) => {
            if (token === null || token === undefined) {
                this.setState({active: "account"})
            }
        });
    }
}

