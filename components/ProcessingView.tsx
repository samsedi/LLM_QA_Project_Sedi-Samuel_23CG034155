import React from 'react';
import { ProcessingData } from '../types';
import { ArrowDown, Code, Type, Scissors } from 'lucide-react';

interface ProcessingViewProps {
  data: ProcessingData;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4 text-slate-500" />
          NLP Preprocessing Pipeline
        </h3>
      </div>
      
      <div className="divide-y divide-slate-100">
        {/* Step 1: Normalization */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2 text-slate-600">
            <Type className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">1. Lowercase & Normalize</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 font-mono break-words">
            {data.lowercased}
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center -my-2.5 relative z-10">
           <div className="bg-white border border-slate-200 rounded-full p-1 text-slate-400">
              <ArrowDown className="w-3 h-3" />
           </div>
        </div>

        {/* Step 2: Cleaning */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2 text-slate-600">
            <Scissors className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">2. Remove Punctuation</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 font-mono break-words">
            {data.noPunctuation}
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center -my-2.5 relative z-10">
           <div className="bg-white border border-slate-200 rounded-full p-1 text-slate-400">
              <ArrowDown className="w-3 h-3" />
           </div>
        </div>

        {/* Step 3: Tokenization */}
        <div className="p-5">
           <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-slate-600">
                <Code className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">3. Tokenization</span>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                {data.tokenCount} Tokens
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tokens.map((token, index) => (
              <span 
                key={`${token}-${index}`}
                className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded text-xs font-mono hover:bg-indigo-100 transition-colors cursor-default"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
