import React, { Component } from 'react';
import { Icon } from 'react-native-material-ui';
import { Text, View } from 'react-native';
import CritterFetch from '../fetch/critterFetch.js';
import TokenFetch from '../fetch/tokenFetch.js';
import moment from 'moment';

class Device extends Component {
    render() {
        let onlineText = this.props.device.online ? "Online" : "Offline";
        let ts = moment(Date.parse(this.props.device.last_reported_timestamp)).format("MMMM Do YYYY, h:mm:ss a");
        var batteryPercent = "25%";
        if (this.props.device.last_reported_voltage > 2.9) {
            var batteryPercent = "100%";
        } else if (this.props.device.last_reported_voltage > 2.75) {
            var batteryPercent = "75%";
        } else if (this.props.device.last_reported_voltage > 2.6) {
            var batteryPercent = "50%";
        }

        return (
            <View style={{borderWidth: 1, width: 350, borderColor: "#aaa", marginBottom: 5}} >
                <Text style={{marginTop: 5}}>{this.props.device.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="check"></Icon>
                    <Text style={{marginTop: 5, marginLeft: 15}}>{onlineText}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="chat"></Icon>
                    <Text style={{marginTop: 5, marginLeft: 15}}>Last: {ts}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="battery-full"></Icon>
                    <Text style={{marginTop: 5, marginLeft: 15}}>{batteryPercent}</Text>
                </View>
            </View>
        )
    }
}

export default class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
    }

    render() {
        if (this.state.devices.length === 0) {
            return <View><Text>No devices found</Text></View>
        }

        return (
            <View>
                <Text>Devices</Text>
                {this.state.devices.map((device) =>
                    <View key={device.device_id}>
                        <Device
                            device={device}
                        />
                    </View>
                )}
            </View>
        );
    }

    componentDidMount = () => {
        TokenFetch.getToken().then( (token) => {
            CritterFetch.getDevices(token).then( (devices) => {
                this.setState({
                    devices: devices
                })
            }).catch((error) => {
                TokenFetch.deleteToken();
            });
        });
    }
}