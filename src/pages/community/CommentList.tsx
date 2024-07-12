import { getReplies } from '@api/post';
import CommentNew from '@pages/community/CommentNew';
import { useQuery } from '@tanstack/react-query';
import CommentItem from './CommentItem';
import { useParams } from 'react-router-dom';
import { Replies } from '#types/post';

function CommentList() {
  const params = useParams();
  const _id = params._id!;
  const { data, status } = useQuery({
    queryKey: ['replies', _id],
    queryFn: () => getReplies<Replies>(_id), // TODO: async await을 붙이는 게 나은지? X && 타입 단언 수정 - 고민
  });

  return (
    status === 'success' && (
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 {data?.data.item.length}개</h4>

        {/* 댓글 */}
        {data?.data.item.map((item) => (
          // TODO: 타입 단언
          <CommentItem key={item._id} {...item} postId={_id!} />
        ))}

        {/* 댓글 입력 */}
        {/* TODO: 타입 단언 */}
        <CommentNew _id={_id!} />
      </section>
    )
  );
}

export default CommentList;
