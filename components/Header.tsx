import React from 'react';
import { Bot, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">NLP Q&A System</h1>
            <p className="text-xs text-slate-500 font-medium">Project 2 • Gemini 2.5 Flash</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
              <Terminal className="w-4 h-4" />
              <span>Web GUI Mode</span>
           </div>
        </div>
      </div>
    </header>
  );
};
