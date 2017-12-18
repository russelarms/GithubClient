import { Buffer } from 'buffer';

export function encode (value) {
    return new Buffer(value).toString('base64');
}

export var ApiUtils = {
    checkStatus: function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};