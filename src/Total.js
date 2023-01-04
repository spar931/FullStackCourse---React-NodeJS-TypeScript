const Total = props => {
    return (
      <div>
        <p>Total Exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
    )
  }

export default Total