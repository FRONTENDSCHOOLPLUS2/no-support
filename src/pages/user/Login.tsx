import { loginUser } from '@api/user';
import Submit from '@components/Submit';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HttpStatus } from '@utils/enum';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import { LoginUserErrorResponse, LoginUserResponse, User } from '#types/user';

function Login() {
  const navigate = useNavigate();

  const [invalidMsg, setInvalidMsg] = useState({
    email: '',
    password: '',
  });

  const [form, setForm] = useState<User>({
    email: '',
    password: '',
  });

  const { mutate: login } = useMutation({
    mutationFn: loginUser<LoginUserResponse>,
    onSuccess: (loginUserResponse) => {
      console.log('done', loginUserResponse);
      localStorage.setItem(
        'accessToken',
        loginUserResponse.data.item.token.accessToken
      );
      localStorage.setItem(
        'refreshToken',
        loginUserResponse.data.item.token.refreshToken
      );
      localStorage.setItem('email', loginUserResponse.data.item.email);
      localStorage.setItem('name', loginUserResponse.data.item.name);
      localStorage.setItem(
        'profileImage',
        JSON.stringify(loginUserResponse.data.item.profileImage)
      );
      navigate('/');
    },
    onError: (error: AxiosError<LoginUserErrorResponse>) => {
      console.log(error);
      const invalidMsg: User = { email: '', password: '' };
      if (!error.response?.data.ok) {
        if (error.response?.status === HttpStatus.UNPROCESSABLE_ENTITY) {
          error.response.data.errors?.forEach((error) => {
            invalidMsg[error.path] = error.msg;
          });
          setInvalidMsg(invalidMsg);
        } else if (error.response?.status === HttpStatus.FORBIDDEN) {
          toast(error.response.data.message);
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              login(form);
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="email"
                onChange={(event) => {
                  setForm({
                    ...form,
                    email: event.target.value,
                  });
                }}
                value={form.email}
              />

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.email}
              >
                {invalidMsg.email}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="password"
                value={form.password}
                onChange={(event) => {
                  setForm({
                    ...form,
                    password: event.target.value,
                  });
                }}
              />

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.password}
              >
                {invalidMsg.password}
              </p>
              <Link
                to="#"
                className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <Submit>로그인</Submit>
              <Link
                to="/user/signup"
                className="ml-8 text-gray-800 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
