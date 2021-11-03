import React from 'react'


const Filter = ({ filter, filterBy }) => {
    return (
        <div>
            filter shown with: <input value={filter} onChange={filterBy} />
            <br />
        </div>
    );
}

export default Filter;