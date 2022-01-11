import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import BlogAuthorName from './blog-author-name';
import BlogCategoryName from './blog-category-name';
import { RootState } from '../../redux/reducers/root-reducer';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';

import apiConfig from '../axios/services';
import { initBlog, BlogModel } from '../../models/blog'
import { selectedBlog } from '../../redux/actions/blog-actions';
import { UserModel } from '../../models/user';

const BlogDetails = () => {

  const loginUser: UserModel = useSelector((state: RootState) => state.loginUser);
  const loginUserRole: any = useSelector((state: RootState) => state.userRole);
  const [blog, setBlog] = useState<BlogModel>(initBlog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const BASEURL = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const loadBlogDetails = async () => {
      const result = await apiConfig.get(`blogs/${id}`);
      dispatch(setLoader(true));
      setBlog(result.data);
      dispatch(selectedBlog(result.data));
      dispatch(resetLoader(false));
    }
    loadBlogDetails();
  }, [id]);


  const [showModal, setShowModal] = useState<boolean>(false);
  const { _id, title, category, author_id, desc, blogImg } = blog;
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const actionLinks = () => {
    return (
      <>
        <Link
          to={`/edit/blog/${_id}`}
          className="btn btn-primary">Edit
        </Link>
        &nbsp;
        <button
          onClick={handleShowModal}
          className="btn btn-danger">Delete
        </button>
        &nbsp;
      </>
    )
  }

  return (
    <div className="container">
      <h1>Blog Details</h1>
      <div>
        <div className="mb-3">
          <h4>Blog Title: {title}</h4>
        </div>
        <div className="mb-3">
          Category: <BlogCategoryName blogCategoryID={category} />
        </div>
        <div className="mb-3">
          Desc: {desc}
        </div>
        <div className="mb-3">
          Author: <BlogAuthorName blogAuthorID={author_id} />
        </div>
        <div className="mb-3">
          <img alt={title} width={"250px"} src={BASEURL+'/'+blogImg} />
        </div>

        {
          (
            (loginUser && author_id && loginUserRole.role && loginUser._id === author_id)
            || (loginUserRole.role === 'admin') || (loginUserRole.role === 'editor')
          ) && actionLinks()
        }

        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary">Go back
        </button>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete user: </h3>
          <b>Blog: {title} </b>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}>Close
          </Button>
          {/* <Button
            className="btn btn-danger"
            variant="Danger"
            onClick={handleDeleteUser}>Yes delete
          </Button> */}
        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default BlogDetails;
