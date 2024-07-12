import { PatchPostResponse, PostResponse } from '#types/post';
import { patchPost, getPost } from '@api/post';
import Button from '@components/Button';
import Submit from '@components/Submit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
  const { type, _id } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
  });
  const { data, status } = useQuery({
    queryKey: [type, _id],
    queryFn: async () => await getPost<PostResponse>(_id!),
  });
  // TODO(urgent): 글자를 작성할 때마다 리렌더링되어 쿼리 요청 중 - i)수정 페이지로 갈 때 정보를 넘겨주는 방법
  //  history 객체에서 state 속서으로 정보를 넘겨주는 방법
  // useNavigate
  // console.log(data?.data.item);
  const { mutate: edit } = useMutation({
    mutationFn: patchPost<PatchPostResponse>,
    onSuccess: (data) => {
      console.log('done!');
      console.log(data);
    },
  });

  return (
    status === 'success' && (
      <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            게시글 수정
          </h2>
        </div>
        <section className="mb-8 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const param = {
                ...data.data.item,
                ...post,
              };
              edit(param);
              history.back();
            }}
          >
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">
                제목
              </label>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                name="title"
                defaultValue={data.data.item.title}
                onChange={(event) => {
                  setPost({
                    ...post,
                    title: event.target.value,
                  });
                }}
              />
              {/* 입력값 검증 에러 출력 */}
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                에러 메세지
              </p>
            </div>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="content">
                내용
              </label>
              <textarea
                rows={15}
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                name="content"
                defaultValue={data.data.item.content}
                onChange={(event) => {
                  setPost({
                    ...post,
                    content: event.target.value,
                  });
                }}
              ></textarea>
              {/* 입력값 검증 에러 출력 */}
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                에러 메세지
              </p>
            </div>
            <hr />
            <div className="flex justify-end my-6">
              <Submit>수정</Submit>
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
    )
  );
}

export default Edit;
