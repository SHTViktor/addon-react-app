import React, { useEffect, useState } from 'react'

import '../styles/index.css';

export default function Table(props) {

    const jiraDomain = process.env.REACT_APP_JIRA_DOMAIN;

    const issues = props.issues;
    const setIssues = props.setIssues;

    const statuses = props.statuses;
    const setStatuses = props.setStatuses;

    const selectedFilter = props.selectedFilter;
    const selectedFilterJQL = props.selectedFilterJQL;

    const statusOptions = statuses.map((status, index) => (
        <th key={index}>{status.name}</th>
    ));

    const assignees = issues.reduce((acc, issue) => {
        const assignee = issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned';
        if (!acc[assignee]) {
            acc[assignee] = {};
        }
        const statusName = issue.fields.status.name;
        acc[assignee][statusName] = (acc[assignee][statusName] || 0) + 1;
        return acc;
    }, {});

    const tableRows = Object.entries(assignees).map(([assignee, statusCounts], index) => (
        <tr key={index}>
            <td>{assignee}</td>
            {statuses.map((status, statusIndex) => {
                const taskCount = statusCounts[status.name] || 0;

                const matchingIssue = issues.find(issue => issue.fields.assignee?.displayName === assignee);
                const assigneeAccountId = matchingIssue ? encodeURIComponent(matchingIssue.fields.assignee.accountId) : "empty";

                const statusQuery = encodeURIComponent(status.name);
                const link = `${jiraDomain}/issues/?jql=assignee%3D${assigneeAccountId}%20AND%20status%3D%22${statusQuery}%22`;

                return (
                    <td key={statusIndex}>
                        {taskCount > 0 ? (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {taskCount}
                            </a>
                        ) : (
                            taskCount
                        )}
                    </td>
                );
            })}
        </tr>
    ));

    useEffect(() => {
        async function fetchJiraStatuses() {
            try {
                const response = await fetch(`/api/boardConfig`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch statuses');
                }

                const data = await response.json();
                setStatuses(data.columnConfig.columns);

            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        }

        fetchJiraStatuses();
    }, []);

    useEffect(() => {
        async function fetchJiraIssues() {
            const url = selectedFilterJQL
                ? `/api/search?selectedFilterJQL=${encodeURIComponent(selectedFilterJQL)}`
                : `/api/search`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch issues');
                }

                const data = await response.json();
                setIssues(data.issues);

            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        }

        fetchJiraIssues();
    }, [selectedFilter, selectedFilterJQL]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Assignees</th>
                        {statusOptions}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}