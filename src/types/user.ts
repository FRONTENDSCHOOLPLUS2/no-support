export type SignupUserForm = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  type: 'user' | 'seller';
  profileImage?: string;
  extra?: unknown;
};

export type SignupUserResponse = {
  ok: number;
  item: {
    _id: number;
    email: string;
    name: string;
    type: 'user' | 'seller';
    phone?: string;
    address?: string;
    profileImage?: {
      path: string;
      name: string;
      originalname: string;
    };
    extra?: unknown;
    createdAt: string;
    updatedAt: string;
  };
};

export type SignupUserErrorResponse = {
  ok: 0;
  message: string;
  errors?: {
    type: string;
    value: string;
    msg: string;
    path: 'email' | 'password' | 'name';
    location: string;
  }[];
};

// User, LoginUserResponse, LoginUserErrorResponse: 로그인 시 폼 데이터 타입과 응답 데이터 타입을 정의
export type User = {
  email: string;
  password: string;
};

export type ExtendedUser = User & {
  name: string;
};

export type LoginUserResponse = {
  ok: number;
  item: {
    _id: number;
    email: string;
    name: string;
    type: string;
    loginType: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    profileImage?: {
      path: string;
      name: string;
      originalname: string;
    };
  };
};

export type LoginUserErrorResponse = {
  ok: 0;
  message: string;
  errors?: {
    type: string;
    value: string;
    msg: string;
    path: 'email' | 'password';
    location: string;
  }[];
};
