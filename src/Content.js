const Content = props => {
    console.log(props)
    return (
      <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </div>
    )
  }

const Part = props => {
    return (
      <div>
        <p>{props.part.name}, No. of Exercises: {props.part.exercises}</p>
      </div>
    )
  }

export default Content