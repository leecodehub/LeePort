# Steven B. Lee — Pack Shelf Portfolio

A full-screen collectible-card portfolio for **Steven B. Lee**, a third-year BSIT student and aspiring frontend developer. There is no scrolling portfolio page. The whole site behaves like a small card collection.

- React 19 + TypeScript + Vite
- Framer Motion for the intro and screen transitions
- Hand-built SVG/CSS artwork — no brands, characters, or stock imagery
- Static frontend only: no accounts, backend, analytics, or tracking
- Per-device project and certificate boards saved in `localStorage`
- Keyboard, touch, and reduced-motion support

## The experience

1. **Intro pack** — an original sealed pack floats on a paper-white stage. Drag or swipe to turn it, use ← → to flip it, and click or press Enter to zoom, cut the seal, and reveal the profile card. Click the profile card to enter the pack shelf. `Skip intro` and `Escape` are always available.
2. **Pack shelf** — five identical booster packs sit on a 3D wheel. Drag or swipe to spin, use ← → or the arrow buttons, click a side pack to bring it to the centre, then click the centre pack or **Open …** to enter a section.
3. **Section cards** — About, Skills, and Contact are single fixed cards with no internal scrolling. About includes the original ink-wave line work.
4. **Project displays** — a portrait gallery of acrylic display boards with four corner screws, blurred indoor scenes, and reserved cards. Boards are local and editable.
5. **Certificate board** — a pastel collage of 12 scattered slots with visibility, tags, a counter, add, and an arrange control. **View card fan** opens the dark-green fan view.
6. **Certificate fan** — 12 matte black cards fanned from a gold pivot, showing only pastel ranks and suits. Scroll, swipe, or use ↑ ↓ to rotate the whole fan.

The intro plays once per browser session. Add `?intro=1` to the URL to replay it.

## Run locally

Requires **Node.js 20.19+** (22 LTS or newer recommended).

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

```bash
npm run build
npm run lint
npm run preview
```

> If Windows PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`, or adjust the execution policy.

## Controls and accessibility

- The app is locked to the viewport; there is no page-level scrolling or horizontal scrolling.
- Pack wheel: drag/swipe, ← →, Home/End, and the on-screen arrow buttons.
- Fan: wheel/trackpad scroll, vertical swipe, and ↑ ↓ / ← →. The rotation is unbounded, so the fan keeps looping.
- Focus moves to the new screen heading after navigation; native `<dialog>` elements handle their own focus trap and return focus on close.
- All decorative artwork is hidden from assistive technology. Every interactive control has a visible focus ring and an accessible name.
- `prefers-reduced-motion` shortens or removes CSS transitions, the slot pulse, and Framer Motion movement. The intro and pack wheel also switch to their immediate state paths.

## Local-only data

Project displays and the certificate board are saved **in this browser only**. They are not uploaded and are not shared with other visitors.

| Storage key | Contents |
| --- | --- |
| `sbl-intro-seen` | Session flag so the intro does not replay on refresh |
| `sbl-project-displays` | Project board order, scene, case style, and reserved card choice |
| `sbl-certificate-board` | Slot positions, filled certificate ids, visibility, and tags |

Clearing site data resets both boards. The app still works for the current session if storage is unavailable.

## Project displays

Each board has:

- one of six **reserved** card designs;
- one blurred background scene: **Atelier**, **Green room**, or **Dusk**;
- one acrylic case style: **Silver**, **Noir**, or **Frost**.

From the gallery you can add a board, open it full-screen, move it left or right, edit it in a native dialog, or delete it with a confirmation. No fake projects are rendered. Real project cards can replace the reserved artwork when the content exists.

## Certificates

The board starts with 12 scattered slots. Two labelled placeholder entries are available to fill them: **SoloLearn** and **Certiport**. Titles, dates, credentials, and images are intentionally blank and shown as “Title pending / Details pending”.

- Click any slot to add, replace, or remove a placeholder.
- The top bar controls visibility (Public / Friends only / Private), tags, the filled-slot counter, and the next empty slot.
- The pencil opens **Arrange slots**, with **Shuffle**, **Reset**, and **Done**. Slot positions are saved locally.
- **View card fan** is a visual archive only. The fan cards use original ranks and suits; they are not scans of real certificates.

Do not add invented certificate titles, dates, credential URLs, or images.

## Editing content

All editable content is in `src/data/portfolio.ts`:

- `site` — name, role, introduction, email, optional placeholder phone, and social links.
- `chapters` — titles, numbers, summaries, and metadata for the five packs.
- `about` — the facts used by the About card.
- `learningGroups` — the confirmed learning log.
- `certificates` — SoloLearn and Certiport placeholders. Add real details only when verified.
- `projects` — intentionally empty. Reserved cards are shown until real projects are added.
- `pack` — the profile details on the intro pack back and reveal card.

Social links are inactive until a full URL is supplied. The email is live at `leesprospects@gmail.com`. The phone number on the pack back is a clearly marked placeholder.

## Artwork

The booster packs, profile card, acrylic cases, reserved cards, ink waves, and certificate fan are original CSS/SVG compositions created for this prototype. They contain no logos, characters, or brand marks.

## Deployment

The app builds to static files in `dist/`. Any static host works (Vercel, Firebase Hosting, Render, or a plain file server). Existing Vercel and Firebase configuration files are retained, but Firebase is used for static hosting only — there is no Firestore, Auth, Storage, or Firebase SDK.

Local boards stay per browser after deployment. Shared boards would require a backend, authentication, and server-side authorization rules.

## Security and limitations

- No API secrets or private credentials are in the frontend.
- No Cloudinary upload flow or third-party runtime requests are included. Fonts are bundled locally.
- Certificate images and other deployed assets are publicly downloadable by nature.
- The certificate entries are placeholders, not verified awards. The project slots are empty by design.
- Project and certificate board data is local only and is not a secure store.
