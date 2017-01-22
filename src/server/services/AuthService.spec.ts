import {AuthService} from './AuthService';
let validCred = {'username': 'test', 'password': 'test'};
let invalidCred = {'username': 'test', 'password': 'test2'};

describe('Auth Service', () => {
    it('Should return a token for a valid credential', () => {
        let token = AuthService.authenticate(validCred);
        expect(token).not.toBeNull();
        expect(token.length).not.toBe(0);
    });

    it('Should return null for an invalid credential', () => {
        let token = AuthService.authenticate(invalidCred);
        expect(token).toBeNull();
    });

    it('Should return true for a valid token', () => {
        let token = AuthService.authenticate(validCred);
        let result = AuthService.validateToken(token);
        expect(result).toBeTruthy();
    });

    it('Should return false for an invalid token', () => {
        let result = AuthService.validateToken('invalid');
        expect(result).toBeFalsy();
    });
});
