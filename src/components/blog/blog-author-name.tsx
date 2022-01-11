import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiConfig from "../axios/services";

const BlogAuthorName = ({ blogAuthorID }: any) => {

  const [authorName, setAuthorName] = useState<string>('');

  useEffect(() => {
    const loadAuthorDetails = async () => {
      const result = await apiConfig.get(`users/${blogAuthorID}`);
      setAuthorName(result.data.name);
    }

    loadAuthorDetails();
  }, [blogAuthorID]);

  return (
    <>
      <Link to={`/user/${blogAuthorID}`}>
        {authorName}
      </Link>
    </>
  )
}

export default BlogAuthorName;
