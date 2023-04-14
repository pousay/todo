export default function SaveTodos(todos: []) {
  if (todos?.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

export function fetchTodos(): any {
  const todos = localStorage.getItem("todos");
  if (todos !== null) {
    return JSON.parse(todos);
  } else {
    return [];
  }
}
