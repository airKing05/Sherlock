import React from 'react';
import { CopyBlock, CodeBlock, dracula } from 'react-code-blocks';

const customData = `for(let i = 0; i<=5; i++){
    console.log(i)
    }`;
export default function CodeCard({data = customData}) {
   
    return (
            <CodeBlock
                style={{ background: 'yellow' }}
                text={data}
                language={'javaScript'}
                showLineNumbers={true}
                theme={dracula}
                codeBlock
                lines={['1:2', 8]}
            ></CodeBlock>
    )
}
