import React, {useEffect, useState} from "react";

import '../styles/index.css';

export default function Selector(props) {

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        async function fetchJiraFilters() {
            try {
                const response = await fetch(`/api/filters`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch filters');
                }

                const data = await response.json();
                setFilters(data);

            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        }

        fetchJiraFilters();
    }, []);

    const optionsElements = filters.map(filter => (
        <option key={filter.id} value={filter.name}>{filter.name}</option>
    ));

    return (
        <div className="filter-container">
            <label htmlFor="issue-filter">Select issues by filter:</label>
            <select id="issue-filter">
                <option value="">Select filter</option>
                {optionsElements}
            </select>
        </div>
    )
}
