import { Post } from '#types/post';
import { useNavigate } from 'react-router-dom';

function ListItem({
  _id,
  type,
  title,
  user,
  views,
  repliesCount,
  createdAt,
}: Post) {
  const TYPE = type.substr(1);
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{_id}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/${TYPE}/${_id}`)}
      >
        {title}
      </td>
      <td className="p-2 text-center truncate">{user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {createdAt}
      </td>
    </tr>
  );
}

export default ListItem;
