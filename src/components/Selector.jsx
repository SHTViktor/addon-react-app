import React, {useEffect} from "react";

import '../styles/index.css';

export default function Selector(props) {

    const filters = props.filters;
    const setFilters = props.setFilters;

    const selectedFilter = props.selectedFilter;
    const setSelectedFilter = props.setSelectedFilter;

    const setSelectedFiltersJQL = props.setSelectedFiltersJQL;

    useEffect(() => {
        async function fetchJiraFilters() {
            try {
                const response = await fetch(`/api/filters/`, {
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

    useEffect(() => {
        if (selectedFilter) {
            async function fetchJiraFilterJQL() {
                try {
                    const response = await fetch(`/api/filters/${selectedFilter}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch filter');
                    }

                    const data = await response.json();
                    setSelectedFiltersJQL(data.jql);
                } catch (error) {
                    console.error('Error fetching filter:', error);
                }
            }

            fetchJiraFilterJQL();
        } else {
            setSelectedFiltersJQL("");
        }
    }, [selectedFilter, setSelectedFiltersJQL]);

    const optionsElements = filters.map(filter => (
        <option key={filter.id} value={filter.id}>{filter.name}</option>
    ));

    function changeSelector(event){
        const value = event.target.value;
        setSelectedFilter(value);
    }

    return (
        <div className="filter-container">
            <label htmlFor="issue-filter">Select issues by filter:</label>
            <select id="issue-filter" onChange={changeSelector}>
                <option value="">Select filter</option>
                {optionsElements}
            </select>
        </div>
    )
}
