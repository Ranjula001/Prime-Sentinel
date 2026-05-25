'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'

type Role = 'assistant' | 'user'

type ChatAction = {
  label: string
  href: string
}

type ChatMessage = {
  id: string
  role: Role
  content: string
  actions?: ChatAction[]
}

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi, I am Sentinel AI. I can help with business insurance, trucking coverage, workers comp, financing, quote prep, and how to contact the team.',
  actions: [
    { label: 'Get a Quote', href: '/contact' },
    { label: 'View Products', href: '/#products' },
  ],
}

const prompts = [
  'What coverage does my trucking business need?',
  'Help me prepare for a quote',
  'Do you offer workers comp?',
  'How can I contact Prime Sentinel?',
]

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v3M7.5 8h9A3.5 3.5 0 0 1 20 11.5v4A3.5 3.5 0 0 1 16.5 19h-9A3.5 3.5 0 0 1 4 15.5v-4A3.5 3.5 0 0 1 7.5 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 13h.01M15 13h.01M9.5 16c1.4.8 3.6.8 5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function Spark() {
  return (
    <span className="ai-bot-avatar" aria-hidden="true">
      <span className="ai-bot-core">
        <BotIcon />
      </span>
      <span className="ai-bot-ring ai-bot-ring-one" />
      <span className="ai-bot-ring ai-bot-ring-two" />
      <span className="ai-bot-ring ai-bot-ring-three" />
    </span>
  )
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const messageIdRef = useRef(0)

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const submitMessage = async (value: string) => {
    const content = value.trim()
    if (!content || loading) return

    messageIdRef.current += 1
    const userId = `user-${messageIdRef.current}`

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: userId, role: 'user', content },
    ]

    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const data = await response.json()

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${messageIdRef.current}`,
          role: 'assistant',
          content:
            typeof data.reply === 'string'
              ? data.reply
              : 'I can help with coverage, quotes, financing, and contact details. What would you like to protect?',
          actions: Array.isArray(data.actions) ? data.actions : undefined,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${messageIdRef.current}`,
          role: 'assistant',
          content:
            'I am having trouble reaching the assistant service, but Prime Sentinel can still help directly. Call 818-600-0821 or use the quote form.',
          actions: [
            { label: 'Open Contact', href: '/contact' },
            { label: 'Call Now', href: 'tel:8186000821' },
          ],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMessage(input)
  }

  return (
    <div className={`ai-chat ${open ? 'ai-chat-open' : ''}`}>
      <section className="ai-chat-panel" aria-label="Prime Sentinel AI chatbot" aria-hidden={!open}>
        <div className="ai-chat-head">
          <div className="ai-chat-title-wrap">
            <Spark />
            <div>
              <p className="ai-chat-eyebrow">Prime Sentinel Assistant</p>
              <h2 className="ai-chat-title">Sentinel AI</h2>
            </div>
          </div>
          <button type="button" className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Close chatbot">
            <CloseIcon />
          </button>
        </div>

        <div className="ai-chat-messages" ref={listRef}>
          {messages.map((message) => (
            <div key={message.id} className={`ai-chat-message ai-chat-message-${message.role}`}>
              <p>{message.content}</p>
              {message.actions && (
                <div className="ai-chat-actions">
                  {message.actions.map((action) => (
                    <a key={`${message.id}-${action.href}`} href={action.href}>
                      {action.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="ai-chat-message ai-chat-message-assistant ai-chat-typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div className="ai-chat-prompts" aria-label="Suggested questions">
          {prompts.map((prompt) => (
            <button key={prompt} type="button" onClick={() => submitMessage(prompt)} disabled={loading}>
              {prompt}
            </button>
          ))}
        </div>

        <form className="ai-chat-form" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about coverage or quotes..."
            aria-label="Ask Sentinel AI"
            disabled={loading}
          />
          <button type="submit" aria-label="Send message" disabled={loading || input.trim().length === 0}>
            <SendIcon />
          </button>
        </form>
      </section>

      <button
        type="button"
        className="ai-chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close Sentinel AI chatbot' : 'Open Sentinel AI chatbot'}
        aria-expanded={open}
      >
        <Spark />
        <span className="ai-chat-launcher-copy">
          <strong>Ask AI</strong>
          <span>Coverage help</span>
        </span>
      </button>
    </div>
  )
}
