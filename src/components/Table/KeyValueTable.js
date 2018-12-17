import React from 'react';
import './Table.css';

const KeyValueTable = props => {
    const {
        id,
        title,
        keyValueArray
    } = props;
    return (
        <table>
            <tbody>
                <tr>
                    <th>id</th>
                    <th>{id}</th>
                </tr>
                {keyValueArray.map((row, index) => {
                    return (
                        <tr key={index}>
                            <td>{row.key}</td>
                            <td>{row.value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default KeyValueTable