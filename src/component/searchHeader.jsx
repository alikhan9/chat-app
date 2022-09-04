import React from 'react'
import '../styles/chat.scss'


const SearchHeader = ({ setSearch }) => {

    const updateSearchValue = e => {
        setSearch(e.target.value);
    }

    return (
        <div className="headind_srch">
            <div className="recent_heading">
                <h4>Contact</h4>
            </div>
            <div className="srch_bar">
                <input type="text" placeholder="Search" className='search_input' onChange={updateSearchValue} />
            </div>
        </div>
    )
}

export default SearchHeader