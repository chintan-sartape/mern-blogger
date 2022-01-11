import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers/root-reducer";

import { CategoryModel } from "../../models/category";

const GetCategories = ({ catID }: any) => {

  const allCategories: CategoryModel[] = useSelector((state: RootState) => state.allCategories.categorirs);
  const [searchCategory, setsearchCategory] = useState<string>("");

  return (
    <>
      {allCategories.map((cat: CategoryModel) => (
        <div key={cat._id}>
          <input
            type="radio"
            name="category"
            value={cat._id}
            onChange={(e) => setsearchCategory(e.target.value)}
            checked={catID === cat._id}
          />
          &nbsp; {cat.name}
        </div>
      ))}
    </>
  )
}

export default GetCategories;

