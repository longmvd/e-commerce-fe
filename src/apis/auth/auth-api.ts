import { LoginRequest } from '@/entities/auth/auth';
import { BaseApi } from '../base/base-api';

export class AuthApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'authService/api/Auths';
  }
  login(loginRequest: LoginRequest) {
    return this.post('/login', loginRequest);
  }
}

export default new AuthApi();
