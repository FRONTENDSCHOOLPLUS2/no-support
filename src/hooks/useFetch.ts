/**
 * useFetch: Deprecated hook
 */
import { QueryKey, useQuery } from '@tanstack/react-query';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

function useFetch(queryKey: QueryKey, url: string, options: RequestInit = {}) {
  const queryFn = async <T>() => {
    const response = await fetch(`${BASE_URL}/${url}`, options);
    const data: T = await response.json();
    return data;
    // throw new Error('msg') 작성 시 catch문으로 이동. new Error는 매개변수로 string만을 받기 때문에
    // 자세한 정보를 화면에 표현할 수 없음. 따라서 try ~ catch문, if (!data.ok), throw new Error('msg')를 사용하지 않고
    // data의 값을 확인하여 에러를 처리하기로 결정
  };

  return useQuery({ queryKey, queryFn });
}

export default useFetch;
