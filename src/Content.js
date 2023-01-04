const Content = props => {
    return (
      <div>
        <Part part={props.part1}/>
        <Part part={props.part2}/>
        <Part part={props.part3}/>
      </div>
    )
  }

const Part = props => {
    return (
      <div>
        <p>{props.part.name}, Number of Exercises: {props.part.exercises}</p>
      </div>
    )
  }

export default Content