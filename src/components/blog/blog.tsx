import { Link } from "react-router-dom";
import BlogAuthorName from "./blog-author-name";
import BlogCategoryName from "./blog-category-name";

import { BlogModel } from '../../models/blog';
import { env } from "process";

const Blog = ({ blogs }: any) => {
  const BASEURL = process.env.REACT_APP_BASEURL;
  return (
    <>
      {
        blogs.map((blog: BlogModel) => (
          <div className="col" key={blog._id}>
            <div className="card h-100">
              <img height={250} src={BASEURL + '/' + blog.blogImg} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/view/blog/${blog._id}`}>{blog.title}
                  </Link>
                </h5>
                <p className="card-text">
                  {
                    blog.desc.length > 74
                      ? blog.desc.substring(0, 74 - 3) + "..."
                      : blog.desc
                  }</p>
              </div>
              <div className="card-footer">
                <small className="text-muted"><BlogCategoryName blogCategoryID={blog.category} /></small>
              </div>
              <div className="card-footer">
                <small className="text-muted"><BlogAuthorName blogAuthorID={blog.author_id} /></small>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default Blog;
