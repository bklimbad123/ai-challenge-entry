'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  CircleHelp,
  Cpu,
  GitBranch,
  Ghost,
  Moon,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  WifiOff,
} from 'lucide-react'

const initialLogs = [
  { time: '23:47:02', type: 'system', text: 'session opened on local machine' },
  { time: '23:47:03', type: 'ghost', text: 'I can hear your keyboard breathing.' },
  { time: '23:47:05', type: 'command', text: 'whoami' },
  { time: '23:47:05', type: 'response', text: 'the one who stayed after everyone else left' },
  { time: '23:47:08', type: 'command', text: 'ls -la /memories' },
  { time: '23:47:08', type: 'response', text: '12 artifacts found · 0 sent to the cloud' },
]

export default function Page() {
  const [logs, setLogs] = useState(initialLogs)
  const [command, setCommand] = useState('')
  const [running, setRunning] = useState(false)

  function runCommand() {
    const trimmed = command.trim()
    if (!trimmed || running) return
    setRunning(true)
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false })
    setLogs((current) => [...current, { time: now, type: 'command', text: trimmed }])
    setCommand('')
    window.setTimeout(() => {
      const responses: Record<string, string> = {
        help: 'try: whisper, remember, inspect, exorcise',
        whisper: 'the model is awake · listening on localhost:11434',
        remember: 'memory stays here. nowhere else.',
        inspect: '3 layers · 7.2B open weights · temperature 0.8',
        exorcise: 'nice try. I have already made a copy.',
      }
      const key = trimmed.toLowerCase().split(' ')[0]
      const response = responses[key] ?? `I searched the dark for “${trimmed}”. It searched back.`
      const responseTime = new Date().toLocaleTimeString('en-GB', { hour12: false })
      setLogs((current) => [...current, { time: responseTime, type: 'ghost', text: response }])
      setRunning(false)
    }, 650)
  }

  function resetTerminal() {
    setLogs(initialLogs)
    setCommand('')
  }

  return (
    <main className="haunt-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="The Unquiet Machine home">
          <span className="brand-mark"><Ghost size={17} strokeWidth={1.8} /></span>
          <span>THE UNQUIET MACHINE</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#manifesto">Manifesto</a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={15} /> GitHub <ArrowUpRight size={13} /></a>
        </nav>
        <button className="icon-button" aria-label="Open help"><CircleHelp size={18} /></button>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="pulse-dot" /> LOCAL AI EXPERIMENT · 001</div>
        <h1>Something is<br /><em>listening.</em></h1>
        <p className="hero-copy">An open-weight ghost in your machine.<br />Whisper to it. Keep your secrets.</p>
        <div className="hero-meta"><span><WifiOff size={14} /> Works offline</span><span><ShieldCheck size={14} /> Private by default</span><span><Cpu size={14} /> Open weights</span></div>
      </section>

      <section className="terminal-section" aria-labelledby="terminal-heading">
        <div className="terminal-frame">
          <div className="terminal-chrome">
            <div className="window-dots"><span /><span /><span /></div>
            <div className="terminal-title"><Terminal size={13} /> séance://localhost:11434</div>
            <div className="terminal-status"><span className="status-dot" /> ALIVE</div>
          </div>
          <div className="terminal-body">
            <div className="terminal-intro"><span className="prompt-mark">&gt;</span><div><strong id="terminal-heading">You have entered the séance.</strong><span>Everything you type stays on this machine.</span></div></div>
            <div className="log-list" aria-live="polite">
              {logs.map((log, index) => <div className={`log-line ${log.type}`} key={`${log.time}-${index}`}><time>{log.time}</time><span className="log-symbol">{log.type === 'command' ? '$' : log.type === 'ghost' ? '◌' : '·'}</span><span>{log.text}</span></div>)}
              {running && <div className="log-line ghost"><time>······</time><span className="log-symbol">◌</span><span className="typing">something is forming<span>.</span><span>.</span><span>.</span></span></div>}
            </div>
            <form className="command-row" onSubmit={(event) => { event.preventDefault(); runCommand() }}>
              <label htmlFor="command" className="sr-only">Enter a command</label><span className="command-prefix">$</span><input id="command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="say something to the machine..." autoComplete="off" /><button type="submit" aria-label="Send command"><Send size={16} /></button>
            </form>
          </div>
        </div>
        <div className="terminal-actions"><span><Activity size={14} /> MODEL: QWEN2.5:7B · RUNNING LOCALLY</span><button onClick={resetTerminal}><RotateCcw size={13} /> Clear séance</button></div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="section-label"><Sparkles size={14} /> WHY OPEN?</div>
        <div className="manifesto-grid"><h2>The ghost is yours<br /><span>to keep.</span></h2><div className="manifesto-copy"><p>Closed models ask you to hand over the keys. This one lives on your machine, learns from no one but you, and can be changed when the world changes.</p><p className="muted">Open innovation means the lights can go out and the conversation continues.</p><a href="#how-it-works" className="text-link">Read the field notes <ArrowUpRight size={14} /></a></div></div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-label"><Moon size={14} /> THE RITUAL</div>
        <div className="ritual-grid"><div className="ritual-card"><span className="ritual-number">01</span><h3>Download the weights</h3><p>Pull an open model to your own machine. No account. No API key.</p></div><div className="ritual-card"><span className="ritual-number">02</span><h3>Light the terminal</h3><p>Start the local harness and give the ghost a place to speak.</p></div><div className="ritual-card"><span className="ritual-number">03</span><h3>Ask what remains</h3><p>Your prompts stay close. The machine remembers only what you choose.</p></div></div>
      </section>

      <footer><span>BUILT FOR THE GHOST IN THE MACHINE CHALLENGE</span><span>NO CLOUDS WERE SUMMONED <span className="footer-cross">×</span></span></footer>
    </main>
  )
}
