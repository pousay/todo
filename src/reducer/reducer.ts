import Cases from "./Cases";

interface Todo {
  id: number;
  task: string;
  isDone: boolean;
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case Cases.FirstSave:
      return { ...state, todos: action.payload };

    case Cases.AddTodo:
      let id;
      if (state.todos.length > 0) {
        id = state.todos[state.todos.length - 1].id;
      } else {
        id = 0;
      }
      const NewTodo: Todo = {
        id: id + 1,
        task: action.payload,
        isDone: false,
      };

      return { ...state, todos: [...state.todos, NewTodo] };

    case Cases.RemoveTodo:
      const notRemovedTodos = state.todos.filter(
        (todo: any) => todo.id !== action.payload
      );

      return { ...state, todos: notRemovedTodos };

    case Cases.DoneUnDone:
      const notCompletedTodo = state.todos.filter(
        (todo: any) => todo.id !== action.payload
      );
      var CompletedTodo = state.todos.filter(
        (todo: any) => todo.id === action.payload
      )[0];

      CompletedTodo.isDone = !CompletedTodo.isDone;

      return {
        ...state,
        todos: [...notCompletedTodo, CompletedTodo].sort((a: any, b: any) => {
          return a.id - b.id;
        }),
      };

    case Cases.Reset:
      return { ...state, todos: [] };

    case Cases.EditTodo:
      const EditedTask = state.todos.filter(
        (task: any) => task.id === action.id
      )[0];
      const NewTaskValue = action.NewTaskValue;
      EditedTask.task = NewTaskValue;

      var NewTasks = state?.todos.filter((task: any) => task.id !== action.id);

      NewTasks = [...NewTasks, EditedTask];
      NewTasks.sort((a: any, b: any) => a.id - b.id);

      return { ...state, todos: NewTasks };
    default:
      break;
  }
};

export const initState: {
  todos: Todo[];
  theme: "dark" | "light";
  DeleteOnDone: boolean;
  Sounds: boolean;
} = {
  todos: [],
  theme: "dark",
  DeleteOnDone: false,
  Sounds: true,
};
