import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BlogModel } from "../../models/blog";
import { setOtherUserBlogs } from "../../redux/actions/blog-actions";
import { resetLoader, setLoader } from "../../redux/actions/loader-actions";
import { RootState } from "../../redux/reducers/root-reducer";
import apiConfig from "../axios/services";
import Blog from "./blog";

const OtherUserBlogs: FC = () => {
  const { userID } = useParams();
  const blogs: BlogModel[] = useSelector((state: RootState) => state.otherUserBlogs.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOtherUserBlogs = async () => {
      const result = await apiConfig.get(`blogs/userblogs/${userID}`);
      dispatch(setLoader(true));
      dispatch(setOtherUserBlogs(result.data));
      dispatch(resetLoader(false));
    }

    loadOtherUserBlogs();
  }, [userID]);

  const noBlogs = () => {
    return (
      <>
        <h1>No Blogs</h1>
      </>
    )
  }

  return (
    <div>
      {
        Object.keys(blogs).length > 0
          ?
          <>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <Blog blogs={blogs} />
            </div>
          </>
          : noBlogs()
      }
    </div>
  )
}

export default OtherUserBlogs;
