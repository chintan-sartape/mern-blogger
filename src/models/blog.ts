export interface BlogModel {
  _id: string,
  title: string,
  category: string,
  author_id: string,
  desc: string,
  blogImg: any,
};

export const BlobState = {
  fieldname: 'blogImg',
  originalname: 'sample-5.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads/',
  filename: '1641814372417-sample-5.jpg',
  path: 'uploads\\1641814372417-sample-5.jpg',
  size: 39793
}

export const initBlog = {
  _id: "",
  title: "",
  category: "",
  author_id: "",
  desc: "",
  blogImg: "",
};
