const Content = () => {
    const part1 = 'Fundamentals of React'
    const part2 = 'Using props to pass data'
    const part3 = 'State of a component'
    return (
      <div>
        <Part part={part1}/>
        <Part part={part2}/>
        <Part part={part3}/>
      </div>
    )
  }

const Part = (props) => {
    return (
      <div>
        <p>{props.part}</p>
      </div>
    )
  }

export default Content