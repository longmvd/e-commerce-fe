export interface LoginRequest {
  UserName: string;
  Password: string;
}

export interface RegisterRequest extends LoginRequest {
  ConfirmPassword: string;
}
