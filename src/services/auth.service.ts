import { AuthenticationApi, LoginDto } from '@/api';
import { createConfig } from './http';

export class AuthService {
  private api: AuthenticationApi;

  constructor(token?: string) {
    this.api = new AuthenticationApi(createConfig(token));
  }

  login(payload: LoginDto) {
    return this.api.authControllerLogin(payload);
  }

  me() {
    return this.api.authControllerGetProfile();
  }
}

export const authService = new AuthService();


