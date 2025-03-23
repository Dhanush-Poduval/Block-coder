'use client';
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function JSCompiler() {
    const [code, setCode] = useState("console.log('Hello, World!');");
    const [output, setOutput] = useState('');

    const runCode = () => {
        try {
            const log = console.log;
            let logs = [];
            console.log = (...args) => logs.push(args.join(' '));
            new Function(code)();
            setOutput(logs.join('\n') || 'No output');
            console.log = log;
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        }
    };

    return (
        <div className="flex flex-col h-screen p-3 bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-lg font-bold">Code Runner</h1>
                <button onClick={runCode} className="bg-blue-500 px-4 py-2 rounded">Run</button>
            </div>
            <div className="flex flex-grow">
                <div className="w-1/2 border border-gray-700 rounded">
                    <Editor
                        height="100%"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={(val) => setCode(val || '')}
                    />
                </div>
                <div className="w-1/2 bg-black text-green-400 p-3 ml-3 border border-gray-700 rounded overflow-auto">
                    <h3 className="font-bold">Output:</h3>
                    <pre className="mt-2">{output}</pre>
                </div>
            </div>
        </div>
    );
}