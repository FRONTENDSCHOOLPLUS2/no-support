import { DeleteResponse, Reply } from '#types/post';
import { deleteReply } from '@api/post';
import Button from '@components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function CommentItem(props: Reply & { postId: string }) {
  const queryClient = useQueryClient();
  const { mutate: delReply } = useMutation({
    mutationFn: deleteReply<DeleteResponse>,
    onSuccess: (data) => {
      console.log('done!');
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['replies', props._id],
      });
    },
    onError: (error) => {
      console.log('error!!!');
      console.error(error);
    },
  });

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={`${import.meta.env.VITE_BACKEND_URL}${props.user.profile?.path}`}
          alt="프로필 이미지"
        />
        <Link to="" className="text-orange-400">
          {props.user?.name}
        </Link>
        <time className="ml-auto text-gray-500" dateTime={props.createdAt}>
          {props.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{props.content}</pre>
        {props.user.name === localStorage.getItem('name') && (
          <Button
            bgColor="red"
            size="sm"
            onClick={() => {
              delReply({ _id: props.postId, replyId: props._id.toString() });
              // 적용되지 않음. onSuccess에서 수행해야 적용됨.
              // queryClient.invalidateQueries(['replies', props.postId]);
            }}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
