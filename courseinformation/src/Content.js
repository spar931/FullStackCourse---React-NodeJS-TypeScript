const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        <Part name={parts[0].name} exercises={parts[0].exercises} />
        <Part name={parts[1].name} exercises={parts[1].exercises} />
        <Part name={parts[2].name} exercises={parts[2].exercises} />
      </div>
    )
  }

const Part = ({name, exercises}) => <div><p>{name}, No. of Exercises: {exercises}</p></div>
    

export default Content