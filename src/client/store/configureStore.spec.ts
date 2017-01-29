import configureStore from './configureStore';

describe('configureStore', () => {
    it('should create a store', () => {
       let store = configureStore();
       expect(store).not.toBeNull();
    });
});
