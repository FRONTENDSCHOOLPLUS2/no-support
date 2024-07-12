import { Link } from 'react-router-dom';

function Pagination() {
  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        <li className="text-bold text-blue-700">
          <Link to="/info?page=1">1</Link>
        </li>
        <li>
          <Link to="/info?page=2">2</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
