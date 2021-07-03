import * as React from 'react';

interface ResultsTableProps {
    results: {
        rule: {
            id: string,
            description: string,
            businessDescription: string
        },
        result: boolean
    }[];
};

export const ResultsTable: React.FC<ResultsTableProps> = (props) => {
    const {
        results
    } = props;

    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Result</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            { results.map(r => <tr key={r.rule.id}>
                <th>{r.rule.id}</th>
                <td>{r.result ? "✔️" : "❌"}</td>
                <td>{r.rule.description}</td>
            </tr>) }
        </tbody>
    </table>;
};
