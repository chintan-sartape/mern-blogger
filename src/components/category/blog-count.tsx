import { useEffect, useState } from 'react'

import apiConfig from '../axios/services';

const BlogCount = ({ catID }: any) => {

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await apiConfig.get(`blogs/category/${catID}`);
      setCount(result.data.length);
    }
    loadBlogs();
  }, [catID]);
  return (
    <div>
      {count}
    </div>
  )
}

export default BlogCount;
