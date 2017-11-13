import AppConfig from '../appConfig'
import 'url-search-params-polyfill';

class ParticleFetch {
    static handleErrors(response) {
        if (!response.ok) {
            console.log("ERROR: " + response.status);
            throw Error(response.status);
        }
        return response;
    }

    static login(username, password) {
        var params = new URLSearchParams ();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        params.append('expires_in', '604800');

        return fetch(AppConfig.particleApiUrl+"/oauth/token", {
            method: 'POST',
            headers: {
                "authorization": "Basic cGFydGljbGU6cGFydGljbGU=",
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            },
            body: params.toString()
        }).then(ParticleFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }

    static logout(token) {
        var params = new URLSearchParams();
        params.append('access_token', token);

        return fetch(AppConfig.particleApiUrl+"/v1/access_tokens/current", {
            method: 'DELETE',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: params.toString()
        }).then(ParticleFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }
}

export default ParticleFetch;