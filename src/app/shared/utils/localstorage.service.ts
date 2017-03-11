import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    private tokenKey:string = 'app_token';

    public store(key:string, content:Object) {
        localStorage.setItem(key, JSON.stringify(content));
    }

    public retrieve(key:string) {
        let value = localStorage.getItem(key);
        return JSON.parse(value);
    }

    public remove(key:string) {
        localStorage.removeItem(key);
    }

    private storeByToken(content:Object) {
        localStorage.setItem(this.tokenKey, JSON.stringify(content));
    }

    private retrieveByToken() {
        let storedToken:string = localStorage.getItem(this.tokenKey);
        if(!storedToken) throw 'no token found';
        return storedToken;
    }

    public generateNewToken() {
        let token:string = '...';//custom token generation;
        let currentTime:number = (new Date()).getTime() + 7 * 24 * 3600;
        this.storeByToken({ttl: currentTime, token});
    }

    public retrieveToken() {

        let currentTime:number = (new Date()).getTime(), token = null;
        try {
            let storedToken = JSON.parse(this.retrieveByToken());
            if(storedToken.ttl < currentTime) throw 'invalid token found';
            token = storedToken.token;
        }
        catch(err) {
            console.error(err);
        }
        return token;

    }

}