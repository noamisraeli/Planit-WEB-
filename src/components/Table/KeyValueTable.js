import React from 'react';
import './Table.css';

const KeyValueTable = props => {
    const {
        id,
        keyValueArray
    } = props;
    return (
        <table className="key-value-table">
            <tbody>
                <tr className="key-value-table-row">
                    <th className="key-value-table-header">id</th>
                    <th className="key-value-table-header">{id}</th>
                </tr>
                {keyValueArray.map((row, index) => {
                    return (
                        <tr className="key-value-table-row" key={index}>
                            <td className="key-value-table-cell">{row.key}</td>
                            <td className="key-value-table-cell">{row.value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default KeyValueTable