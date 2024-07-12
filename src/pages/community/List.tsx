import Button from '@components/Button';
import Search from '@components/Search';

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import ListItem from './ListItem';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@api/post';
import { Posts } from '#types/post';

function List() {
  const navigate = useNavigate();
  const params = useParams();

  const type = params.type;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const page = Number(searchParams.get('page') || '1'); // TODO: number with NaN
  const limit = 10;

  const { data, error, isLoading } = useQuery({
    queryKey: [type, keyword, page],
    queryFn: () =>
      getPosts<Posts>(
        `type=_${type}${keyword ? `&keyword=${keyword}` : ''}${
          page ? `&page=${page}` : ''
        }&limit=${limit}&sort={"_id": -1}`
      ),
  });

  if (!data) return <div>로딩중...</div>;
  const start = Math.floor((page - 1) / 10) * 10 + 1;
  const end = Math.min(
    Math.floor((page - 1) / 10) * 10 + 10,
    data!.data.pagination.totalPages
  );

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search />

        <Button onClick={() => navigate(`/${type}/new`)}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  로딩중...
                </td>
              </tr>
            )}

            {/* 에러 메세지 출력 */}

            {error && (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  에러 메세지
                </td>
              </tr>
            )}

            {/* 본문 출력 */}
            {data?.data.item.map((post) => (
              <ListItem key={post._id} {...post} />
            ))}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <div>
          <ul className="flex justify-center gap-3 m-4">
            {data!.data.pagination.totalPages > 1 && (
              <>
                {/* 처음 */}
                <li>
                  <Link
                    to={`/${type}?page=1${
                      keyword ? `&keyword=${keyword}` : ''
                    }`}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    처음
                  </Link>
                </li>

                {/* 10페이지 단위로 보여주기
                 */}
                {start > 1 && (
                  <li>
                    <Link
                      to={`/${type}?page=${start - 1}${
                        keyword ? `&keyword=${keyword}` : ''
                      }`}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      이전
                    </Link>
                  </li>
                )}
                {[...Array(end - start + 1).keys()].map((i) => (
                  <li key={i}>
                    <Link
                      to={`/${type}?page=${start + i}${
                        keyword ? `&keyword=${keyword}` : ''
                      }`}
                      className={`p-2 border border-gray-300 rounded-md ${
                        start + i === data?.data.pagination.page
                          ? 'bg-gray-300'
                          : ''
                      }`}
                    >
                      {start + i}
                    </Link>
                  </li>
                ))}
                {end < data!.data.pagination.totalPages && (
                  <li>
                    <Link
                      to={`/${type}?page=${end + 1}${
                        keyword ? `&keyword=${keyword}` : ''
                      }`}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      다음
                    </Link>
                  </li>
                )}

                {/* 끝 */}
                <li>
                  <Link
                    to={`/${type}?page=${data?.data.pagination.totalPages}${
                      keyword ? `&keyword=${keyword}` : ''
                    }`}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    끝
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default List;
