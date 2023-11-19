import { BaseApi } from '../base/base-api';

export class UserApi extends BaseApi<any> {
  constructor() {
    super('');
    this.controller = 'userService/api/Users';
  }
}

export default new UserApi();
