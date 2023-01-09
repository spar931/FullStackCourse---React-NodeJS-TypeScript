const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id}
            name={part.name}
            exercises={part.exercises}
          />
        )}
      </div>
    )
}

const Part = ({name, exercises}) => <div><p>{name} {exercises}</p></div>
    

export default Content