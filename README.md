# دعوة زفاف — Animated Arabic Wedding Invitation

A luxurious, single-page animated wedding invitation. Fully RTL Arabic, built to be
white-labeled and resold: swap the names, dates and venue in two files and ship.

## Experience

1. **The envelope** — speckled fine-art paper, a gold wax seal with an engraved heart,
   and a "click to open" prompt.
2. **The opening** — the seal cracks in two, the flap swings open in 3D, and the letter
   slides out and expands seamlessly into the full invitation.
3. **The invitation** — opens with **بسم الله الرحمن الرحيم** in traditional calligraphy,
   followed by the couple's names, the invitation words, evening schedule, venue and
   dress code. Floral line-art garlands draw themselves in as each section scrolls
   into view (GSAP ScrollTrigger).
4. **The finale** — a button at the bottom unfolds a hidden section from below the page
   fold: a blooming garden of florals framing the RSVP form (Supabase) and the venue map.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4**
- **GSAP** (timelines, ScrollTrigger, ScrollTo)
- **Supabase** (RSVP storage)
- Google Fonts via `next/font`: Amiri (body), Aref Ruqaa (calligraphy display), Marhey (accent)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Supabase setup (RSVP)

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in your project URL + anon key.

Without env vars the RSVP form still completes gracefully (logged to console), so the
demo flow never breaks.

## Customizing for a client

| What | Where |
| --- | --- |
| Names, date, Quran verse, schedule, venue, dress code | `components/InvitationContent.tsx` |
| Finale texts, RSVP deadline, map embed | `components/FinaleSection.tsx` |
| Mini letter preview inside the envelope | `components/Envelope.tsx` |
| Palette (paper / ink / gold) | `app/globals.css` (`:root` variables) |
| Page title / metadata | `app/layout.tsx` |

## Accessibility

- Full RTL (`lang="ar" dir="rtl"`), semantic landmarks and headings.
- ARIA labels on the wax-seal button, finale trigger (`aria-expanded`/`aria-controls`),
  the RSVP form and the radio group; decorative SVGs are `aria-hidden`.
- `prefers-reduced-motion` respected — all animations collapse to instant states.
