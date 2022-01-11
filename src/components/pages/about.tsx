import { FC } from "react"

const About: FC = () => {
  return (
    <div className="container">
      <h1>About Project</h1>
      <p>React Redux and TypeScript Project</p>
      <p>Topics included in this project:</p>
      <ul>
        <li>Front-end developed with the help of React with TypeScript</li>
        <li>Redux is used as State management tool</li>
        <li>Back-end is developed in Nodejs with the help of Express framework</li>
        <li>DataBase is MongoDB</li>
      </ul>
    </div>
  )
}

export default About
