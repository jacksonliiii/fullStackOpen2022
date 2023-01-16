const Filter = ({filter, handleFilterChange}) => {
    return (
      <form>
        <div>Filter by Name: <input value={filter} onChange={handleFilterChange}/></div>
      </form>
    )
}

export default Filter