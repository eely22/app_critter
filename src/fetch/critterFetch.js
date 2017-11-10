import AppConfig from '../appConfig'

class CritterFetch {
    static handleErrors(response) {
        if (!response.ok) {
            console.log("ERROR: " + response.status)
            throw Error(response.status);
        }
        return response;
    }

    static getDevices(token) {

        return fetch(AppConfig.critterApiUrl+"/devices?token="+token, {
            method: 'GET'
        }).then(CritterFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }

    static getDevice(deviceID) {

        return fetch(AppConfig.critterApiUrl+"/device/"+deviceID, {
            method: 'GET'
        }).then(CritterFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }

    static getEvents(deviceID) {

        console.log("Fetching " + AppConfig.critterApiUrl+"/device/"+deviceID+"/events")
        return fetch(AppConfig.critterApiUrl+"/device/"+deviceID+"/events", {
            method: 'GET'
        }).then(CritterFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }
}

export default CritterFetch;