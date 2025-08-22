export interface SetPasswordReqDTO {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UpdatePasswordReqDTO {
  username: string;
  passwordOld: string;
  passwordNew: string;
  confirmPasswordNew: string;
}

export interface ForgotPasswordReqDTO {
  username: string;
  passwordNew: string;
  confirmPasswordNew: string;
}

export interface MenuResDTO {
  code?: string;
  id?: number;
  name?: string;
  service?: string[];
}

export interface PermissionServiceResDTO {
  menu: MenuResDTO[];
  menuCode: string[];
}
