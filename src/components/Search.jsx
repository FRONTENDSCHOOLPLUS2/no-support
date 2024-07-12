import Submit from '@components/Submit';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/${type}${keyword ? `?keyword=${keyword}` : ''}`);
        setKeyword('');
      }}
    >
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
