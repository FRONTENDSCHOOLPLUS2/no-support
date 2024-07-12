import { PostReplyResponse } from '#types/post';
import { getAccessToken } from '@api/auth';
import { postReply } from '@api/post';
import Button from '@components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatus } from '@utils/enum';
import { AxiosError } from 'axios';
import { useState } from 'react';

function CommentNew({ _id }: { _id: string }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { mutate: insertReply } = useMutation({
    mutationFn: postReply<PostReplyResponse>,
    onSuccess: (data) => {
      console.log('done!');
      console.log(data);
      setContent('');
      queryClient.invalidateQueries({
        queryKey: ['replies', _id],
      });
    },
    onError: async (error: AxiosError) => {
      if (error.response?.status === HttpStatus.UNAUTHORIZED) {
        const result = await getAccessToken();
        console.log('after access token', result);
        localStorage.setItem('accessToken', result.data.accessToken);
        insertReply({ _id, content: content });
      }
    },
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form>
        <div className="mb-4">
          <textarea
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          {/* 에러 메세지 출력 */}
          {/* <p className="ml-2 mt-1 text-sm text-red-500" hidden>에러 메세지</p> */}
        </div>
        <Button
          size="sm"
          onClick={() => {
            insertReply({ _id, content: content });
            // 적용되지 않음. onSuccess에서 수행해야 적용됨.
            // queryClient.invalidateQueries(['replies', _id]);
          }}
        >
          댓글 등록
        </Button>
      </form>
    </div>
  );
}

export default CommentNew;
