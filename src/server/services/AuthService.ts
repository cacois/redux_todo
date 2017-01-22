import {UserCredential} from '../models/userCredential';

export class AuthService {
    private static tokens: string[] = [];

    public static authenticate(userCredential: UserCredential): string {
        if (userCredential.username === 'test' && userCredential.password === 'test') {
            let token = AuthService.tokens.length * 1000;
            AuthService.tokens.push(token.toString());
            return token.toString();
        } else {
            return null;
        }
    }

    public static validateToken(token: string): boolean {
        return AuthService.tokens.indexOf(token) > -1;
    }
}
