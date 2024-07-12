import { PostPostErrorResponse, PostPostResponse } from '#types/post';
import { postPost } from '@api/post';
import Button from '@components/Button';
import Submit from '@components/Submit';
import { useMutation } from '@tanstack/react-query';
import { HttpStatus } from '@utils/enum';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function New() {
  const { type } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const [invalidMsg, setInvalidMsg] = useState({
    title: '',
    content: '',
  });

  const { mutate: insertPost } = useMutation({
    mutationFn: postPost<PostPostResponse>,
    onSuccess: (data) => {
      console.log('done!');
      console.log(data);
      history.back();
    },
    onError: (error: AxiosError<PostPostErrorResponse>) => {
      console.error(error.response);
      if (error.response?.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        const invalidMsg = { title: '', content: '' };
        error.response.data.errors.forEach((err) => {
          invalidMsg[err.path] = err.msg;
        });
        setInvalidMsg(invalidMsg);
      } else if (error.response?.status === HttpStatus.UNAUTHORIZED) {
        toast(error.response.data.message);
      }
    },
  });

  return (
    <>
      <ToastContainer />

      <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            게시글 등록
          </h2>
        </div>
        <section className="mb-8 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const param = {
                type: `_${type}`,
                ...post,
              };
              insertPost(param);
            }}
          >
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요."
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                name="title"
                onChange={(event) => {
                  setPost({
                    ...post,
                    title: event.target.value,
                  });
                }}
              />

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.title}
              >
                {invalidMsg.title}
              </p>
            </div>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="content">
                내용
              </label>
              <textarea
                id="content"
                rows={15}
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                name="content"
                onChange={(event) => {
                  setPost({
                    ...post,
                    content: event.target.value,
                  });
                }}
              ></textarea>

              <p
                className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"
                hidden={!invalidMsg.content}
              >
                {invalidMsg.content}
              </p>
            </div>
            <hr />
            <div className="flex justify-end my-6">
              <Submit>등록</Submit>
              <Button
                type="reset"
                bgColor="gray"
                onClick={() => history.back()}
              >
                취소
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default New;
