const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises) 
    function sumofArray(sum, num) {
        return sum + num;
    }
    return (
        <div>
            <p><strong>Total of {exercises.reduce(sumofArray)} exercises</strong></p>
        </div>
    )
}
    
export default Total