import React, { useState } from 'react';
import { generateAnswer } from './services/geminiService';
import { processText } from './services/nlpUtils';
import { ProcessingData, QuestionState } from './types';
import { ProcessingView } from './components/ProcessingView';
import { ResultSection } from './components/ResultSection';
import { Header } from './components/Header';
import { BrainCircuit, Send, Sparkles } from 'lucide-react';

export default function App() {
  const [question, setQuestion] = useState('');
  const [appState, setAppState] = useState<QuestionState>('IDLE');
  const [processingData, setProcessingData] = useState<ProcessingData | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Reset UI
    setAppState('PROCESSING');
    setError(null);
    setAnswer('');
    setProcessingData(null);

    try {
      // Step 1: Simulate NLP Preprocessing (Client Side)
      // In a real NLP pipeline, this might happen before sending to a model,
      // or be part of a tokenizer. We visualize it here as per requirements.
      const processed = processText(question);
      setProcessingData(processed);

      // Short delay to allow user to see the "processing" state visually if desired,
      // but for UX we just move to loading the answer immediately.
      setAppState('LOADING_ANSWER');

      // Step 2: Call LLM API
      const llmResponse = await generateAnswer(question);
      setAnswer(llmResponse);
      setAppState('COMPLETED');

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while communicating with the AI.");
      setAppState('ERROR');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input and Processing View */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-accent" />
                  Input Query
                </h2>
                <form onSubmit={handleAsk} className="space-y-4">
                  <div>
                    <label htmlFor="question" className="sr-only">Your Question</label>
                    <textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g. What implies the concept of 'Gravity' in classical physics?"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none text-slate-700 placeholder-slate-400 transition-all h-32"
                      disabled={appState === 'PROCESSING' || appState === 'LOADING_ANSWER'}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!question.trim() || appState === 'PROCESSING' || appState === 'LOADING_ANSWER'}
                      className="flex items-center gap-2 bg-accent hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {appState === 'PROCESSING' || appState === 'LOADING_ANSWER' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Analyze & Ask</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* NLP Processing Visualization - shown when data exists */}
            {processingData && (
               <ProcessingView data={processingData} />
            )}
          </div>

          {/* Right Column: Answer Display */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full min-h-[500px] flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  AI Response
                </h2>
                {appState === 'LOADING_ANSWER' && (
                   <span className="text-xs font-medium text-accent bg-blue-50 px-2 py-1 rounded-full animate-pulse">
                     Generating Answer...
                   </span>
                )}
              </div>
              
              <div className="p-6 flex-grow">
                {appState === 'IDLE' && !answer && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <BrainCircuit className="w-8 h-8 opacity-50" />
                    </div>
                    <p>Enter a question to begin the NLP analysis.</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {answer && (
                  <ResultSection answer={answer} />
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 NLP Question-Answering System. Project 2.</p>
        </div>
      </footer>
    </div>
  );
}