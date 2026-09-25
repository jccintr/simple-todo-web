import { apiClient } from './client';

export function listCategories(token) {
  return apiClient.get('/categories', token);
}

export function createCategory({ name }, token) {
  return apiClient.post('/categories', { name }, token);
}

export function updateCategory(id, { name }, token) {
  return apiClient.put(`/categories/${id}`, { name }, token);
}

// Pode retornar 409 se a categoria ainda tiver tarefas (a API bloqueia de
// propósito). O apiClient já transforma isso num throw com a mensagem
// pronta ("Categoria possui tarefas...") — a tela só precisa exibir
// err.message.
export function deleteCategory(id, token) {
  return apiClient.delete(`/categories/${id}`, token);
}
