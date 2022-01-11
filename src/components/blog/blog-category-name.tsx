import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiConfig from "../axios/services";

const BlogCategoryName = ({blogCategoryID}: any) => {

  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const loadAuthorDetails = async () => {
      const result = await apiConfig.get(`categories/${blogCategoryID}`);
      setCategoryName(result.data.name);
    }
    loadAuthorDetails();
  }, [blogCategoryID]);

  return (
    <>
      <Link to={`/view/blogs/category/${blogCategoryID}`}>
        {categoryName}
      </Link>
    </>
  )
}

export default BlogCategoryName;
