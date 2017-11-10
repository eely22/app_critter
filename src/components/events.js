import React, { Component } from 'react';
import { Icon } from 'react-native-material-ui';
import { Text, View, ScrollView } from 'react-native';
import CritterFetch from '../fetch/critterFetch.js';
import TokenFetch from '../fetch/tokenFetch.js';
import moment from 'moment';

class Event extends Component {
    render() {

        let ts = moment(Date.parse(this.props.event.event_timestamp)).format("MMMM Do YYYY, h:mm:ss a");
        return (
            <View style={{borderWidth: 1, width: 350, borderColor: "#aaa", marginBottom: 5}} >
                <Text style={{marginTop: 5}}>Critter Caught</Text>
                <Text style={{marginTop: 5, marginLeft: 15}}>{ts}</Text>
            </View>
        )
    }
}

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    render() {
        if (this.state.events.length === 0) {
            return <View><Text>No Events found</Text></View>
        }

        return (
            <ScrollView style={{marginTop: 50}}>
                <Text>Events</Text>
                {this.state.events.map((event) =>
                    <View key={event}>
                        <Event
                            event={event}
                        />
                    </View>
                )}
            </ScrollView>
        );
    }

    componentDidMount = () => {
        TokenFetch.getToken().then( (token) => {
            CritterFetch.getDevices(token).then( (devices) => {
                devices.forEach((device) => {
                    CritterFetch.getEvents(device.device_id).then( (events) => {
                        let sorted = this.state.events.concat(events['events']).sort(function (a, b) {
                            return Date.parse(b['event_timestamp']) - Date.parse(a['event_timestamp']);
                        });
                        console.log(sorted)
                        this.setState({events: sorted})
                    });
                });
            });
        });
    }
}