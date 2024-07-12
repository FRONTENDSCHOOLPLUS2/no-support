import Button from '@components/Button';
import { useNavigate, useParams } from 'react-router-dom';

import CommentList from './CommentList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost } from '@api/post';
import { HttpStatus } from '@utils/enum';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteResponse, PostResponse } from '#types/post';
import { AxiosError } from 'axios';

function Detail() {
  const queryClient = useQueryClient();
  const { type, _id } = useParams();
  const { data, status, error } = useQuery({
    queryKey: [type, _id],
    queryFn: async () => await getPost<PostResponse>(_id!), // TODO: 타입 단언
    retry: false,
  });

  const { mutate: delPost } = useMutation({
    mutationFn: deletePost<DeleteResponse>,
    onSuccess: (data) => {
      console.log('done!');
      console.log(data);
      // queryClient.invalidateQueries([type, _id]); // [type]을 무효화해야
      queryClient.invalidateQueries({
        queryKey: [type],
      });
      navigate(`/${type}`);
    },
    onError: (error: AxiosError<DeleteResponse>) => {
      console.error(error.response);
      if (error.response?.status === HttpStatus.UNAUTHORIZED) {
        toast(error.response.data.message);
      }
      if (error.response?.status === HttpStatus.NOT_FOUND) {
        toast(error.response.data.message);
      }
    },
  });

  const navigate = useNavigate();

  if (status === 'pending') return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    status === 'success' && (
      <>
        <ToastContainer />
        <main className="container mx-auto mt-4 px-4">
          <section className="mb-8 p-4">
            <div className="font-semibold text-xl">{data?.data.item.title}</div>
            <div className="text-right text-gray-400">
              작성자 : {data?.data.item.user.name}
            </div>
            <div className="mb-4">
              <div>
                <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                  {data?.data.item.content}
                </pre>
              </div>
              <hr />
            </div>
            <div className="flex justify-end my-4">
              <Button onClick={() => history.back()}>목록</Button>
              <Button
                bgColor="gray"
                onClick={() =>
                  // useLocation, Link의 state
                  navigate(`/${type}/${_id}/edit`, { state: data?.data.item })
                }
              >
                수정
              </Button>
              <Button
                bgColor="red"
                onClick={() => {
                  delPost(_id!); // TODO: 타입 단언 수정
                }}
              >
                삭제
              </Button>
            </div>
          </section>

          {/* 댓글 목록 */}
          <CommentList />
        </main>
      </>
    )
  );
}

export default Detail;
