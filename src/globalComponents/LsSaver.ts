import { Todo } from "../reducer/reducer";

export default function SaveTodos(todos: []) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function fetchTodos(): Todo[] {
  const todos = localStorage.getItem("todos");
  if (todos !== null) {
    return JSON.parse(todos);
  } else {
    return [];
  }
}

export function saveSettings(): any {
  /* in next version */
}

export function fetchSettings(): any {
  /* in next version */
}
