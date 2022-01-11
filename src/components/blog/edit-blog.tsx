import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addBlog, selectedBlog, setBlogs } from "../../redux/actions/blog-actions";

import { resetLoader, setLoader } from "../../redux/actions/loader-actions";
import { RootState } from "../../redux/reducers/root-reducer";
import GetCategories from "./get-categories";

import apiConfig from "../axios/services";
import { BlogModel, initBlog } from "../../models/blog";
import { CategoryModel } from "../../models/category";

const EditBlog: FC = () => {

  const { id } = useParams();
  const allCategories: CategoryModel[] = useSelector((state: RootState) => state.allCategories.categorirs);
  const [blog, setBlog] = useState<BlogModel>(initBlog);
  const [searchCategory, setsearchCategory] = useState<string>("");
  const { _id, title, category, desc, author_id, blogImg } = blog;
  const BASEURL = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const loadBlogDetails = async () => {
      const result = await apiConfig.get(`blogs/${id}`);
      setBlog(result.data);
      dispatch(setLoader(true));
      dispatch(selectedBlog(result.data));
      dispatch(resetLoader(false));
    }
    loadBlogDetails();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState<Blob>();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const errorsObj = initBlog;
  const [errors, setErrors] = useState(errorsObj);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (category === '') {
      errorObj.category = 'Category is required';
      error = true;
    }
    if (title === '') {
      errorObj.title = 'Blog title is required';
      error = true;
    }
    if (desc === '') {
      errorObj.desc = 'Description is required';
      error = true;
    }

    setErrors(errorObj);

    if (!error) {

      // blogState.author_id = _id;
      blog.blogImg = selectedImage;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('desc', desc);
      // formData.append('author_id', author_id);
      formData.append('blogImg', blog.blogImg);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      // console.log(formData); return false;
      const result = await apiConfig.patch(`blogs/${id}`, formData, config);

      if (result.data.errors) {

        const serverErrors = { ...errorsObj };
        error = true;

        for (const key in result.data.errors) {
          // console.log(key);
          // console.log(result.data.errors[key].message);
          if (key === "category") {
            serverErrors.category = result.data.errors[key].message;
          } else {
            serverErrors.desc = result.data.errors[key].message;
          }
        }

        setErrors(serverErrors);

      } else {

        toast.success('Blog added successfully...', {
          position: "top-right",
        });

        dispatch(addBlog(result.data));
        navigate(-1);

      }
    }
  }

  return (
    <div className="container">
      <h1>Update Blog Details</h1>
      <form onSubmit={(e) => onFormSubmit(e)} >
        <div className="mb-3">
          <input
            type="text"
            className="form-control  w-50"
            name="title"
            value={title}
            onChange={(e) => onInputChange(e)}
            placeholder="Blog Title" />
          {errors.title && <div className="errorText">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <div onChange={onInputChange}>
            <div onChange={onInputChange}>
              {allCategories.map((cat: CategoryModel) => (
                <div key={cat._id}>
                  <input
                    type="radio"
                    name="category"
                    value={cat._id}
                    onChange={(e) => setsearchCategory(e.target.value)}
                    checked={category === cat._id}
                  />
                  &nbsp; {cat.name}
                </div>
              ))}
            </div>
          </div>
          {errors.category && <div className="errorText">{errors.category}</div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control  w-50"
            name="desc"
            value={desc}
            onChange={(e) => onInputChange(e)}
            placeholder="desc" />
          {errors.desc && <div className="errorText">{errors.desc}</div>}
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control  w-50"
            name="blogImg"
            onChange={(event: any) => {
              setSelectedImage(event.target.files[0]);
            }}
            placeholder="blogImg" />
          {
            selectedImage
              ? (
                <div>
                  <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                  <br />
                  <button onClick={() => setSelectedImage(undefined)}>Remove</button>
                </div>
              )
              : blogImg && (
                <div>
                  <img alt={title} width={"250px"} src={BASEURL + '/' + blogImg} />
                </div>
              )
          }
          {errors.blogImg && <div className="errorText">{errors.blogImg}</div>}
        </div>
        <button
          className="btn btn-success w-50">Submit Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
