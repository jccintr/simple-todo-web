import { apiClient } from './client';

// POST /auth/register — não retorna token (o backend não loga
// automaticamente); só { message, user }. A API já cria 3 categorias
// padrão (Pessoal, Trabalho, Compras) pro usuário novo.
export function register({ name, email, password }) {
  return apiClient.post('/auth/register', { name, email, password });
}

// POST /auth/login — retorna { name, email, ..., token }.
export function login({ email, password }) {
  return apiClient.post('/auth/login', { email, password });
}

// GET /auth/me — valida o token salvo e retorna os dados atuais do usuário.
export function fetchCurrentUser(token) {
  return apiClient.get('/auth/me', token);
}

// PATCH /auth/me — só atualiza o nome (único campo que o backend aceita
// aqui; não muda email nem senha). Retorna o usuário atualizado.
export function updateProfile({ name }, token) {
  return apiClient.patch('/auth/me', { name }, token);
}
