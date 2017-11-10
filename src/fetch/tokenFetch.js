import { AsyncStorage } from 'react-native';

class TokenFetch {
    static saveToken = async (token) => {
        await AsyncStorage.setItem('access_token', token);
    };
    static getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        return token;
    };
    static deleteToken = async () => {
        await AsyncStorage.removeItem('access_token');
    };
}

export default TokenFetch;