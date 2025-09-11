import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Ziggy route fonksiyonunu global olarak tanımla
import { route } from 'ziggy-js';
window.route = route;
