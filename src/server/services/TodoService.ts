export interface TodoItem {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

export class TodoService {
    private static todos: Map<number, TodoItem> = new Map<number, TodoItem>();

    public static clear() {
        TodoService.todos.clear();
    }

    public static getAll(): TodoItem[] {
        return Array.from(TodoService.todos.values());
    }

    public static get(id: number): TodoItem {
        return TodoService.todos.has(id) ? TodoService.todos.get(id) : null;
    }

    public static insert(item: TodoItem): number {
        item.id = Math.max(...Array.from(TodoService.todos.keys())) + 1;
        if (item.id === -Infinity) {
            item.id = 0;
        }
        TodoService.todos.set(item.id, item);
        return item.id;
    }

    public static update(item: TodoItem) {
        TodoService.todos.set(item.id, item);
        return item.id;
    }

    public static delete(id: number) {
        TodoService.todos.delete(id);
    }
}
