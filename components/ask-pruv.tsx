'use client';

import { useState } from 'react';

const quickQuestions = ['What changed most?', 'Was my result mixed?', 'Which scores went down?'];

export function AskPruv() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    setLoading(true);
    const response = await fetch('/api/agent/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(response.ok ? data.answer : data.error);
    setLoading(false);
  }

  return (
    <section className="mt-10 rounded-[8px] border border-[#E8E8E8] bg-white p-6">
      <h2 className="text-xl font-extrabold">Ask Pruv about your Proof</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {quickQuestions.map((question) => (
          <button className="rounded-full border border-[#D8D8D8] px-4 py-2 text-sm font-bold hover:border-[#111111]" key={question} onClick={() => ask(question)}>
            {question}
          </button>
        ))}
      </div>
      {loading ? <p className="mt-4 text-sm text-[#666666]">Reading your Proof...</p> : null}
      {answer ? <p className="mt-5 leading-7 text-[#666666]">{answer}</p> : null}
      <p className="mt-4 text-xs text-[#666666]">Pruv explains measured results. It does not provide medical diagnosis or treatment advice.</p>
    </section>
  );
}
