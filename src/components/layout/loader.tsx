import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className='container'>
      <h1>
        Loading ....
      </h1>
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>
    </div>
  )
}

export default Loader;
