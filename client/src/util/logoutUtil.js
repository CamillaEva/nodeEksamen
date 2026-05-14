import { user } from '../stores/AuthStore.js';
import { fetchPost } from './fetchUtil.js';

export async function handleLogout () {
  await fetchPost('/api/logout');
  user.set(null);
  window.location.href = '/login';
}
