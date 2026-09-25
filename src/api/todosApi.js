import { apiClient } from './client';

// Não existe "listar todas as tarefas do usuário" na API — só por
// categoria. Por isso a navegação do app é Categorias -> Tarefas da
// categoria, e não uma lista única com filtro.
export function listTodosByCategory(categoryId, token) {
  return apiClient.get(`/todos/category/${categoryId}`, token);
}

export function createTodo({ description, categoryId, priority }, token) {
  return apiClient.post('/todos', { description, categoryId, priority }, token);
}

// Todos os campos são opcionais no PATCH — manda só o que mudou.
export function updateTodo(id, changes, token) {
  return apiClient.patch(`/todos/${id}`, changes, token);
}

export function deleteTodo(id, token) {
  return apiClient.delete(`/todos/${id}`, token);
}
