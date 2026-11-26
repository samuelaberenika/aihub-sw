# AI Hub South West

AI Hub SW is website aimed to connect businesses, AI professionals, educators, students and the wider community across the South West of England.

The goal of the platform is to make AI knowledge, expertise and opportunities more accessible for non-technical and curious minds in need of such services.

## Technologies

- TypeScript
- React / Next.js
- Python
- FastAPI
- PostgreSQL

## Running the app

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, the same one the host runs
```

The site is deployed from the `prod` branch. Work goes to `dev` first so it can be
seen on a preview address before it reaches the live one.

## What is built so far

The account journey: creating an account, confirming an email address, choosing
which of the four groups you belong to, and landing on the dashboard that suits
that choice, plus the sign-in screen.

Two things are deliberately not connected yet, and the screens say so rather than
pretending otherwise:

- **Accounts and passwords.** The forms validate properly, but there is no account
  store behind them, so nothing is saved and no sign-in is checked. This arrives
  with the back end.
- **Google and LinkedIn sign-in.** Both need an application registered with the
  provider, under the Hub's own accounts. The buttons explain that when pressed
  instead of failing silently.

Browsing and starting a match are designed to need no account at all, so the
sign-in sits at the point where somebody wants to save something or get in
touch, not at the door.

## Where things live

```
app/            one folder per page; the account steps are signup, verify, choose
components/     the shared pieces: the page frame, form fields, notices, cards
lib/            the brand palette, the form rules, and the sign-up journey state
public/         images served as-is, including the Hub's wordmark
```

## Accessibility

The account pages aim at WCAG 2.2 AA. Every colour pairing used was measured:
ink on each brand colour, and white on plum, all clear the 4.5:1 needed for body
text. Form fields carry their own label, errors are announced rather than only
coloured, and the colour combinations never carry meaning on their own.

## Licence

Built by Team 15 for AI Hub South West CIC as part of COMP2003, University of
Plymouth.
