import Button from '@components/Button';
import Submit from '@components/Submit';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '@api/user';
import { postFile } from '@api/file';
import { useState } from 'react';
import { HttpStatus } from '@utils/enum';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ExtendedUser,
  SignupUserErrorResponse,
  SignupUserForm,
  SignupUserResponse,
} from '#types/user';
import { PostFileResponse } from '#types/file';
import { AxiosError } from 'axios';

function Signup() {
  const [invalidMsg, setInvalidMsg] = useState<ExtendedUser>({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();
  const { mutate: signup } = useMutation({
    mutationFn: signupUser<SignupUserResponse>,
    onSuccess: () => {
      navigate('/user/login');
    },
    onError: (error: AxiosError<SignupUserErrorResponse>) => {
      const invalidMsg: ExtendedUser = { email: '', password: '', name: '' };
      if (error.response?.status === HttpStatus.CONFLICT) {
        setInvalidMsg(invalidMsg);
        toast(error.response.data.message);
      } else if (error.response?.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        error.response.data.errors?.forEach((error) => {
          invalidMsg[error.path] = error.msg;
        });
        setInvalidMsg(invalidMsg);
      }
    },
  });

  const { mutate: files } = useMutation({
    mutationFn: postFile<PostFileResponse>,
    onSuccess: (data) => {
      setForm({ ...form, profileImage: data.data.item[0].path });
    },
    onError: (error) => {
      console.log('error!!!');
      console.error(error);
    },
  });

  const [form, setForm] = useState<SignupUserForm>({
    type: 'user',
    name: '',
    email: '',
    password: '',
    profileImage: '',
  });

  return (
    <>
      <ToastContainer />
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              회원 가입
            </h2>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              // history.back(); // useMutation onSuccess에서 진행해야. onSuccess가 진행되는 중에 페이지가 이동됨.
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="name"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="name"
                onChange={(event) => {
                  setForm({ ...form, name: event.target.value });
                }}
                value={form.name}
              />

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.name}
              >
                {invalidMsg.name}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>

              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="email"
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value });
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
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="password"
                onChange={(event) => {
                  setForm({ ...form, password: event.target.value });
                }}
                value={form.password}
              />

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.password}
              >
                {invalidMsg.password}
              </p>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="profileImage"
              >
                프로필 이미지
              </label>

              {/* 프로필 이미지 선택 완료 시 백엔드 서버에 업로드 */}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                placeholder="이미지를 선택하세요"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                name="profileImage"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // 취소 시에도 onChange 작동하므로 if문으로 가드 필수
                  const file = event.target.files![0]; // TODO: type 단언 제거 -> if문으로 null 체크
                  const formData = new FormData();
                  formData.append('attach', file);
                  files(formData);
                }}
              />
            </div>

            <div className="mt-10 flex justify-center items-center">
              <Submit
                onClick={() => {
                  signup(form);
                }}
              >
                회원가입
              </Submit>
              <Button
                type="reset"
                bgColor="gray"
                onClick={() => history.back()}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </main>{' '}
    </>
  );
}

export default Signup;
