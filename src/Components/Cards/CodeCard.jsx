import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

const customData = `for (let i = 0; i <= 5; i++) {
    console.log(i);
}`;

export default function CodeCard({ data = customData }) {
    return (
        <div>
            <CodeBlock
                text={data}
                language="javascript"
                showLineNumbers
                theme={dracula}
            />
        </div>
    );
}




