import {TodoService, TodoItem} from './TodoService';

let todoItem: TodoItem = {
    id: null,
    title: 'test',
    description: 'test',
    isComplete: false
};

describe('Todo Service', () => {
    it('Should return an empty array when cleared', () => {
        TodoService.clear();
        expect(TodoService.getAll().length).toBe(0);
    });

    it('Should insert an item and return an id', () => {
        TodoService.clear();
        let id = TodoService.insert(todoItem);
        expect(id).not.toBeNull();
        expect(TodoService.getAll().length).toBeGreaterThan(0);
    });

    it('Should generate sequential ids', () => {
        TodoService.clear();
        let id = TodoService.insert(todoItem);
        let id2 = TodoService.insert(todoItem);
        expect(id).not.toBeNull();
        expect(id2).not.toBeNull();
        expect(id).not.toEqual(id2);
    });

    it('Should return an inserted item by id', () => {
        TodoService.clear();
        let id = TodoService.insert(todoItem);
        expect(id).not.toBeNull();
        let item = TodoService.get(id);
        expect(item).not.toBeNull();
    });

    it('Should return null when getting an item with an invalid id', () => {
        TodoService.clear();
        let item = TodoService.get(99);
        expect(item).toBeNull();
    });

    it('Should update an existing item', () => {
        TodoService.clear();
        let id = TodoService.insert(todoItem);
        let item = TodoService.get(id);
        item.title='updated';
        TodoService.update(item);
        item = TodoService.get(id);
        expect(item).not.toBeNull();
        expect(item.title).toEqual('updated');
    });

    it('Should delete an existing item', () => {
        TodoService.clear();
        let id = TodoService.insert(todoItem);
        TodoService.delete(id);
        expect(TodoService.getAll().length).toEqual(0);
    });
});
