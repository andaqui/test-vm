# Fotbolls-VM Webbapp – MVP Design & Funktionsspecifikation

## 1. Syfte & mål

Bygga en snabb, responsiv webbapp för Fotbolls-VM där användaren kan:

- Följa alla matcher, grupper och tabeller
- Fördjupa sig i enskilda landslag
- Se matchtider och TV-kanaler i sin egen tidzon
- Göra egna predictions (tippning) utan konto

Applikationen är datadriven och använder ingen CMS i MVP.

---

## 2. Tech stack

### Frontend

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### State & lagring

- **Global UI-state:** valt landslag, checkbox-läge, tidzon
- **Predictions & inställningar:** localStorage

### Data

- Extern fotbolls-API
- Matchtider lagras i UTC

---

## 3. Responsiv design

- Mobile-first
- Anpassad för: mobil, tablet, desktop
- Samma funktionalitet på alla enheter

---

## 4. Global layout & navigation

### Header (sticky – alla sidor)

**Innehåll:**

- Logotyp → startsida
- Navigation: Grupper | Matcher | Slutspel | Predictions
- Inställningar:
  - Välj landslag ("Följ landslag")
  - Checkbox: "Göm andra landslag"
  - Tidzon (auto från browser, kan ändras manuellt)

---

## 5. Följ landslag (global funktion)

### Definition

Användaren kan välja ett landslag att följa extra noggrant. Detta är ett globalt visningsfokus, inte navigering.

### Beteende när ett landslag är valt

Gäller alla sidor utom Predictions.

**Matcher där landslaget deltar:**

- Highlightas tydligt
- Visas högre upp i listor

**Övriga landslag:**

- Nedtonas visuellt

### Checkbox: "Göm andra landslag"

| Läge | Beteende |
|------|----------|
| **Av** (default) | Alla matcher, grupper och lag visas. Valda landslaget har tydligt visuellt fokus. |
| **På** | Endast innehåll där valt landslag ingår visas. Övriga matcher, grupper och slutspelsgrenar döljs helt. |

---

## 6. Tidzon

- Tidzon detekteras automatiskt från användarens browser
- Alla matchtider visas korrekt direkt
- Användaren kan manuellt ändra tidzon i headern
- Manuellt val sparas lokalt
- Alla matcher lagras i UTC och konverteras i frontend

---

## 7. Sidor & funktioner

### 7.1 Grupper & tabeller

**URL:** `/groups`

**Innehåll:**

- Alla VM-grupper (A–H)
- Varje grupp visar: landslag, matcher spelade, målskillnad, poäng

**Funktion:**

- Klick på landslag → lagsida
- Valt landslag highlightas i sin grupp
- Om checkbox är aktiv: endast grupp(er) där valt landslag ingår visas

**Responsivitet:**

- Mobil: Accordion per grupp
- Tablet/Desktop: Grid med flera grupper

---

### 7.2 Lagsida

**URL:** `/teams/[landslag]`

**Innehåll:**

- Landslagsnamn + flagga
- Grupp
- Kommande matcher
- Spelade matcher

**Matchkort visar:**

- Datum & lokal tid
- Motståndare
- Grupp / slutspel
- Arena
- TV-kanal
- Resultat (om spelad)

---

### 7.3 Matcher & TV-tider

**URL:** `/matches`

**Innehåll:**

- Komplett lista över alla matcher

**Filter:**

- Datum
- Grupp / Slutspel
- Landslag

**Fokus-beteende:**

- Matcher med valt landslag visas överst och markeras visuellt

---

### 7.4 Slutspel

**URL:** `/playoffs`

**Struktur:**

Slutspelsträdet innehåller:

- Sextondelsfinaler
- Kvartsfinaler
- Semifinaler
- Final

**Funktion:**

- Visuellt slutspelsträd
- Matcher klickbara
- Resultat visas efter spelad match
- Valt landslag highlightas i trädet
- Checkbox påverkar synlighet av övriga grenar

**Responsivitet:**

- Mobil: horisontell scroll
- Desktop: hela trädet synligt

---

### 7.5 Predictions (Tippning)

**URL:** `/predictions`

> **Viktigt:** Påverkas inte av "Följ landslag". Alla lag visas neutralt.

**Grupp-predictions:**

- Användaren väljer slutställning (1–4) i varje grupp
- UI: Drag & drop eller select-baserad ordning

**Slutspels-predictions:**

- Sextondelsfinalerna genereras automatiskt baserat på gruppval
- Användaren klickar fram vinnare: Sextondel → Kvart → Semi → Final
- VM-vinnare markeras tydligt

**Lagring:**

- Alla predictions sparas i localStorage
- Återställs vid refresh
- Ingen inloggning i MVP

---

## 8. UI-komponenter (shadcn/ui)

- **Select** – landslag, tidzon
- **Checkbox** – göm andra landslag
- **Tabs**
- **Accordion**
- **Card**
- **Tooltip**

---

## 9. Datamodeller (frontend)

### Landslag

```typescript
interface Team {
  id: string
  name: string
  slug: string
  group: string
  flag: string
}
```

### Match

```typescript
interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  kickoffTimeUTC: string
  stage: 'group' | 'round_of_16' | 'quarter' | 'semi' | 'final'
  venue: string
  tvChannel: string
  result?: {
    home: number
    away: number
  }
}
```

---

## 10. Explicit ej MVP

- Användarkonton / inloggning
- Delning av predictions
- Poängsystem
- Redaktionellt innehåll
- CMS / admin

---

## 11. MVP är klar när

- [ ] Alla matcher, grupper och slutspel visas korrekt
- [ ] Landslagsfokus är begripligt och konsekvent
- [ ] Tidzon fungerar automatiskt + manuellt
- [ ] Predictions fungerar stabilt lokalt
- [ ] Fullt användbar på mobil
