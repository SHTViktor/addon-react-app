import React, {useState} from 'react';

import '../styles/index.css';
import Selector from "./Selector";
import Table from "./Table";

function App() {

    const [issues, setIssues] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();
    const [selectedFilterJQL, setSelectedFilterJQL] = useState();

    return (
        <div className="App">
            <Selector
                filters={filters}
                setFilters={setFilters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                selectedFilterJQL={selectedFilterJQL}
                setSelectedFiltersJQL={setSelectedFilterJQL}
            />

            <Table
                issues={issues}
                setIssues={setIssues}
                statuses={statuses}
                setStatuses={setStatuses}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                selectedFilterJQL={selectedFilterJQL}
            />
        </div>
    );
}

export default App;
