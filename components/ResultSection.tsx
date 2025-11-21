import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultSectionProps {
  answer: string;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ answer }) => {
  return (
    <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-headings:text-slate-800 prose-strong:text-slate-900 prose-code:text-accent prose-pre:bg-slate-900 prose-pre:text-slate-50">
       <ReactMarkdown
         components={{
           // Custom renderer for code blocks to match our aesthetic
            code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                <div className="rounded-lg overflow-hidden my-4 shadow-sm border border-slate-200">
                    <div className="bg-slate-800 text-xs text-slate-300 px-3 py-1 flex items-center gap-1">
                        {match[1]}
                    </div>
                    <pre className="bg-slate-900 p-4 overflow-x-auto m-0">
                        <code className={className} {...props}>
                            {children}
                        </code>
                    </pre>
                </div>
                ) : (
                <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm font-mono border border-slate-200" {...props}>
                    {children}
                </code>
                )
            }
         }}
       >
         {answer}
       </ReactMarkdown>
    </div>
  );
};
