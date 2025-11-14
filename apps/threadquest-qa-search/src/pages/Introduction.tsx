import React from 'react'
import { Link } from 'react-router-dom'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="text-cyan-200/80 leading-relaxed text-sm md:text-base">
      {children}
    </div>
  </section>
)

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-2 items-start">
    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></span>
    <span>{children}</span>
  </li>
)

const Introduction: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl rounded-3xl"></div>
            <h1 className="relative text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              ThreadQuest AI
            </h1>
          </div>
          <p className="mt-3 text-cyan-300/80">
            Topic discovery and Q&A search from communication threads — fast, fuzzy, and delightful.
          </p>
        </div>

        <Section title="What is this?">
          <p>
            ThreadQuest AI is a lightweight search application that helps you explore questions, answers, and topics
            sourced from communication threads (email, chat, forums, etc.). Type a query and instantly sift through the
            dataset using fuzzy matching, then open a detail view to examine the top answers with relevance scores.
          </p>
        </Section>

        <Section title="Key features">
          <ul className="space-y-2">
            <Bullet>Fuzzy search powered by Fuse.js with snappy, client-side results.</Bullet>
            <Bullet>Clean, cyberpunk-inspired UI with Tailwind CSS and smooth micro-interactions.</Bullet>
            <Bullet>Detail drawer for focused reading: full question, answers, and scores.</Bullet>
            <Bullet>CSV-driven data — drop your dataset into <code className="text-cyan-200">public/data</code>.</Bullet>
            <Bullet>Authentication with a simple Node.js + SQLite backend and JWT.</Bullet>
          </ul>
        </Section>

        <Section title="How it works">
          <ul className="space-y-2">
            <Bullet>
              On load, the app parses the CSV with PapaParse and indexes it with Fuse.js for fast, fuzzy searching.
            </Bullet>
            <Bullet>
              The search bar returns the best-matching records (limit 50 by default). Click a result to open the detail
              drawer with complete context and answer scores.
            </Bullet>
            <Bullet>
              Login/Signup is handled by a small Express API. Credentials are hashed with bcrypt and sessions use JWT.
            </Bullet>
          </ul>
        </Section>

        <Section title="Data format">
          <p className="mb-2">Place your CSV at:</p>
          <pre className="bg-slate-900/70 border border-cyan-500/20 rounded-xl p-3 text-xs text-cyan-200/90 overflow-auto">
{`/public/data/Complete_QueryResults_with_scores.csv
(or /public/data/sample.csv for demo)`}
          </pre>
          <p className="mt-3">
            The app expects fields like <code className="text-cyan-200">question_id</code>, <code className="text-cyan-200">question_text</code>,
            <code className="text-cyan-200">topic</code>, and answer-related columns with scores. You can adapt the parser if your
            schema differs.
          </p>
        </Section>

        <Section title="Tech stack">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Bullet>Vite + React + TypeScript</Bullet>
            <Bullet>Tailwind CSS</Bullet>
            <Bullet>PapaParse (CSV)</Bullet>
            <Bullet>Fuse.js (fuzzy search)</Bullet>
            <Bullet>Express + SQLite + JWT + bcrypt (auth)</Bullet>
          </ul>
        </Section>

        <Section title="Get started quickly">
          <ol className="list-decimal list-inside space-y-2">
            <li>Sign up or log in to access the app.</li>
            <li>Drop your CSV into <code className="text-cyan-200">public/data</code>.</li>
            <li>Search by keywords, topics, or phrases and open any result for details.</li>
          </ol>
          <div className="mt-4 flex gap-3">
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white border border-cyan-400/30"
            >
              Create account
            </Link>
            <Link
              to="/"
              className="px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-200 hover:bg-slate-800/70"
            >
              Go to app
            </Link>
          </div>
        </Section>

        <Section title="Credits">
          <p>
            Built by the ThreadQuest team. UI theme, interactions, and copy are tuned for clarity and speed so you can
            focus on insights instead of tooling.
          </p>
        </Section>
      </div>
    </div>
  )
}

export default Introduction
