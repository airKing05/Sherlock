import React from 'react';
import { CopyBlock, CodeBlock, dracula } from 'react-code-blocks';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';


export default function CodeCard() {
    const code = `for(let i = 0; i<=5; i++){
    console.log(i)
    }`;
    return (
        <CardLayout title="Code Support">
            <CodeBlock
                style={{ background: 'yellow' }}
                text={code}
                language={'javaScript'}
                showLineNumbers={true}
                theme={dracula}
                codeBlock
                lines={['1:2', 8]}
            ></CodeBlock>
        </CardLayout>

    )
}
