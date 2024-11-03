import React from 'react'

import '../styles/index.css';

export default function Table() {



    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Assignee 1</th>
                    <th>Status 1</th>
                    <th>Status 2</th>
                    <th>Status 3</th>
                    <th>Status 4</th>
                    <th>Status 5</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Assignee 1</td>
                    <td><a href="#">2</a></td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">5</a></td>
                    <td><a href="#">15</a></td>
                    <td><a href="#">4</a></td>
                </tr>
                <tr>
                    <td>Assignee 2</td>
                    <td><a href="#">8</a></td>
                    <td><a href="#">2</a></td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">0</a></td>
                </tr>
                <tr>
                    <td>Assignee 3</td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">0</a></td>
                    <td><a href="#">10</a></td>
                    <td><a href="#">3</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}