import React from "react";

import '../styles/index.css';

export default function Selector() {



    return (
        <div className="filter-container">
            <label htmlFor="issue-filter">Select issues by filter:</label>
            <select id="issue-filter">
                <option value="">default filter</option>
            </select>
        </div>
    )
}
