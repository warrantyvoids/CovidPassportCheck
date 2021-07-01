import * as React from 'react';

interface ErrorProps {
    error: string;
};

export const Error: React.FC<ErrorProps> = (props) => {
    const { error } = props;

    const lines = error.split("\n");

    return <>
        <header>
            <h1>Covid Passport Check</h1>
        </header>
        <main>
            <div>
                {lines.map(l => <p>{l}</p>)}
                <a className="button" href="/">
                    <span className="button__label">
                        Refresh page
                    </span>
                </a>
            </div>
        </main>
    </>;
};
