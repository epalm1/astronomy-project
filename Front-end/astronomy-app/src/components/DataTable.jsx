import React from 'react';

export default function DataTable({ columns = [], data = [] }) {
    return (
        <div className="table-content">
            <table className="custom-data-table">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th
                            key={index}
                            className={col.className || "heading-normal"}
                            style={{ textAlign: col.align || 'left' }}
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data && data.length > 0 ? (
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{ textAlign: col.align || 'left' }}
                                >
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                            Andmed puuduvad
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}