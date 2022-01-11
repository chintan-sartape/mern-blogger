import { Link } from "react-router-dom";
import { CategoryModel } from "../../models/category";

const Category = ({ allCategories }: any) => {

  return (
    <>
      {allCategories.map((category: CategoryModel) => (
        <div className="col" key={category._id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <Link
                  to={`/view/category/${category._id}`}>{category.name}
                </Link>
              </h5>
              <p className="card-text">
                {
                  category.desc.length > 74
                    ? category.desc.substring(0, 74 - 3) + "..."
                    : category.desc
                }</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">
                <Link to={`/view/blogs/category/${category._id}`}>
                  View Blogs
                </Link>
              </small>
            </div>
          </div>
        </div>
      ))
      }
    </>
  )
}

export default Category;
