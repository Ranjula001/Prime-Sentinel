import { NextResponse } from 'next/server'
import { products } from '@/app/data/products'

export const runtime = 'nodejs'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const contactCard =
  'Prime Sentinel Insurance Solutions can be reached at 818-600-0821 or info@sentinelinsurance.agency. The office is at 15233 Ventura Blvd Suite 500, Sherman Oaks, CA 91403. Business hours are Monday to Friday, 9:00 AM to 6:00 PM, with Saturday by appointment.'

const quickActions = [
  { label: 'Get a Quote', href: '/contact' },
  { label: 'View Products', href: '/#products' },
  { label: 'Call Now', href: 'tel:8186000821' },
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s/-]/g, ' ')
}

function findProduct(message: string) {
  const text = normalize(message)

  return products.find((product) => {
    const haystack = [
      product.slug,
      product.title,
      product.shortTitle,
      product.category,
      ...product.highlights,
      ...product.protects,
    ]
      .join(' ')
      .toLowerCase()

    return haystack
      .split(/\s+/)
      .filter((word) => word.length > 4)
      .some((word) => text.includes(word))
  })
}

function localAnswer(message: string) {
  const text = normalize(message)
  const matchedProduct = findProduct(message)

  if (matchedProduct) {
    return {
      reply: `${matchedProduct.title} is one of Prime Sentinel's core coverages. ${matchedProduct.summary} Key areas include ${matchedProduct.highlights.join(', ')}. For a quote, share your business type, state, current policy status, and any urgent requirements, or use the contact page so an advisor can review it with you.`,
      actions: [
        { label: `Open ${matchedProduct.shortTitle}`, href: `/products/${matchedProduct.slug}` },
        { label: 'Request a Quote', href: '/contact' },
      ],
    }
  }

  if (/(contact|phone|call|email|address|office|hours|location)/.test(text)) {
    return {
      reply: contactCard,
      actions: [
        { label: 'Call 818-600-0821', href: 'tel:8186000821' },
        { label: 'Email the Team', href: 'mailto:info@sentinelinsurance.agency' },
        { label: 'Open Contact Page', href: '/contact' },
      ],
    }
  }

  if (/(quote|price|cost|estimate|apply|start|consultation)/.test(text)) {
    return {
      reply:
        'I can help you prepare for a quote. Prime Sentinel will usually need your coverage type, business name, location, operations, prior insurance details, and any urgent certificates or contract requirements. The fastest next step is the quote form, or you can call the office directly.',
      actions: quickActions,
    }
  }

  if (/(finance|financing|payment|pay monthly|installment)/.test(text)) {
    return {
      reply:
        'Prime Sentinel offers a financing page where you can explore payment support for insurance premiums. If you already know the policy type, mention it in your quote request so the team can guide you toward practical payment options.',
      actions: [
        { label: 'Open Financing', href: '/financing' },
        { label: 'Ask About Payments', href: '/contact' },
      ],
    }
  }

  if (/(career|job|hire|hiring|work)/.test(text)) {
    return {
      reply:
        'For careers, visit the careers page and share your background with the Prime Sentinel team. Insurance experience, client service, and business coverage knowledge are especially relevant.',
      actions: [{ label: 'Open Careers', href: '/careers' }],
    }
  }

  return {
    reply:
      'I can help with Prime Sentinel products, quote preparation, contact details, financing, and general coverage direction. Tell me what you want to protect, such as a business, trucks, property, employees, professional services, or personal assets, and I will point you to the right next step.',
    actions: quickActions,
  }
}

async function askOpenAI(messages: ChatMessage[], fallbackReply: string) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 9000)

  try {
    const productSummary = products
      .map((product) => `${product.title}: ${product.summary}`)
      .join('\n')

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        temperature: 0.2,
        max_output_tokens: 360,
        input: [
          {
            role: 'system',
            content:
              'You are Prime Sentinel Insurance Solutions assistant. Be concise, helpful, and accurate. Do not claim a policy is bound or provide legal advice. For quotes, coverage changes, claims, or binding decisions, direct users to contact Prime Sentinel. Use only the supplied company and product facts.',
          },
          {
            role: 'system',
            content: `Company facts: ${contactCard}\nProducts:\n${productSummary}`,
          },
          ...messages.slice(-8),
        ],
      }),
      signal: controller.signal,
    })

    if (!response.ok) return null

    const data = await response.json()
    const output = data.output_text

    return typeof output === 'string' && output.trim().length > 0 ? output.trim() : fallbackReply
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const rawMessages = Array.isArray(body?.messages) ? body.messages : []
    const messages = rawMessages
      .filter(
        (item: ChatMessage) =>
          (item.role === 'user' || item.role === 'assistant') &&
          typeof item.content === 'string' &&
          item.content.trim().length > 0
      )
      .slice(-10)

    const latestMessage = [...messages].reverse().find((item) => item.role === 'user')?.content || ''
    const fallback = localAnswer(latestMessage)
    const aiReply = await askOpenAI(messages, fallback.reply)

    return NextResponse.json({
      reply: aiReply || fallback.reply,
      actions: fallback.actions,
      source: aiReply ? 'ai' : 'local',
    })
  } catch {
    return NextResponse.json(
      {
        reply:
          'I could not read that message, but I can still help. Try asking about a product, quote, financing, or how to contact Prime Sentinel.',
        actions: quickActions,
        source: 'local',
      },
      { status: 200 }
    )
  }
}
