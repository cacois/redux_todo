export interface IAppState {
    counter: number | null;
    authToken: string | null;
    isWaiting: Boolean;
    routing: any; // Here for tests
}
