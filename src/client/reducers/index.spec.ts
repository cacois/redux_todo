import {rootReducer} from './index';

describe('reducers', () => {
    describe('root', () => {
        it('should provide a combined rootReducer', () => {
            expect(rootReducer).not.toBeNull();
        });
    });
});
