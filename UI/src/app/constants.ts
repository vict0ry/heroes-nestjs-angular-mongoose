import { environment } from '../environments/environment';

export const BASE_URL: string = environment.production ? '/' : environment.apiUrl;
