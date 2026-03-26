// ============================================
// Eventify - Events + Details + Admin (Frontend)
// Data stored in browser localStorage (demo)
// ============================================

const STORAGE_KEY = "eventify_events_v1";

// ---------- Toast helper ----------
function toast(title, desc, icon = "✅") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }

  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `
    <div class="ic">${icon}</div>
    <div>
      <div class="t">${title}</div>
      <div class="d">${desc}</div>
    </div>
    <button class="x" aria-label="Close">✕</button>
  `;
  wrap.appendChild(t);

  t.querySelector(".x").onclick = () => t.remove();
  setTimeout(() => t.remove(), 3500);
}

// ---------- Seed events (with your images) ----------
const seedEvents = [
  {
    id: "ev_1001",
    name: "Music Night",
    type: "live",
    city: "durgapur",
    venue: "City Arena, Durgapur",
    date: "2026-01-18",
    time: "19:00",
    price: 299,
    seats: 180,
    duration: "3 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    desc: "An energetic night with local bands and DJs. Food stalls and a photo booth included.",
    agenda: [
      "19:00 — Gates Open + Welcome",
      "19:30 — Indie Band Live",
      "20:30 — DJ Set + Light Show",
      "21:45 — Audience Requests + Finale"
    ],
    speakersList: ["DJ RaveX", "The Indie Crew", "MC Sonic"],
    faqs: [
      { q: "Is outside food allowed?", a: "No. Food stalls are available inside." },
      { q: "Is parking available?", a: "Yes, limited parking is available near the venue." },
      { q: "Can I transfer my ticket?", a: "Yes, ticket transfer is allowed until 6 hours before the event." }
    ]
  },
  {
    id: "ev_1002",
    name: "Startup Meetup",
    type: "talk",
    city: "kolkata",
    venue: "Innovation Hub, Salt Lake",
    date: "2026-01-21",
    time: "17:30",
    price: 0,
    seats: 120,
    duration: "2 hrs",
    speakers: 4,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    desc: "Network with founders, builders, and investors. Short talks + open networking.",
    agenda: [
      "17:30 — Check-in + Networking",
      "18:00 — Lightning Talks (Founders)",
      "18:45 — Open Q&A",
      "19:15 — Mixer + Closing"
    ],
    speakersList: ["Founder Panel", "Product Mentor", "Career Coach", "Investor Guest"],
    faqs: [
      { q: "Is it free to attend?", a: "Yes, but seats are limited. Booking is required." },
      { q: "Can students attend?", a: "Absolutely! Bring a notepad and your questions." },
      { q: "Do I need a printed ticket?", a: "No, digital confirmation is enough." }
    ]
  },
  {
    id: "ev_1003",
    name: "Workshop: Web Dev",
    type: "workshop",
    city: "online",
    venue: "Online (Google Meet)",
    date: "2026-01-25",
    time: "11:00",
    price: 199,
    seats: 200,
    duration: "2.5 hrs",
    speakers: 2,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    desc: "Hands-on session covering HTML/CSS/JS basics + mini project and deployment tips.",
    agenda: [
      "11:00 — Setup + Intro",
      "11:20 — HTML/CSS Layout Practice",
      "12:10 — JavaScript Interactions",
      "12:50 — Mini Project Build",
      "13:25 — Q&A + Wrap-up"
    ],
    speakersList: ["Frontend Instructor", "Backend Mentor"],
    faqs: [
      { q: "Do I need coding experience?", a: "Basic knowledge helps, but beginners can follow." },
      { q: "Will recordings be provided?", a: "Yes, a recording link will be shared after the workshop." },
      { q: "What do I need to join?", a: "Laptop + internet + a browser (Chrome recommended)." }
    ]
  },
  {
    id: "ev_2001",
    name: "Food Festival",
    type: "live",
    city: "kolkata",
    venue: "Eco Park Food Street",
    date: "2026-01-28",
    time: "12:00",
    price: 149,
    seats: 250,
    duration: "6 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    desc: "Street food, desserts, and live cooking shows — taste the best from local vendors.",
    agenda: [
      "12:00 — Festival Opens",
      "13:00 — Live Cooking Show (Chef Special)",
      "15:00 — Dessert Challenge",
      "17:30 — Food Awards + Closing"
    ],
    speakersList: ["Guest Chef", "Local Vendors", "Host Team"],
    faqs: [
      { q: "Are veg options available?", a: "Yes, many veg and vegan options are available." },
      { q: "Is entry free for kids?", a: "Kids under 8 enter free with a guardian." },
      { q: "Can I pay at stalls online?", a: "Most stalls support UPI and cards." }
    ]
  },
  {
    id: "ev_2002",
    name: "Photography Walk",
    type: "workshop",
    city: "durgapur",
    venue: "City Center (Meet at Main Gate)",
    date: "2026-01-30",
    time: "08:00",
    price: 99,
    seats: 60,
    duration: "2 hrs",
    speakers: 1,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    desc: "A guided street photography walk focusing on composition, lighting, and storytelling.",
    agenda: [
      "08:00 — Briefing + Camera Setup",
      "08:20 — Composition Techniques (On-site)",
      "09:00 — Photo Walk Session",
      "09:45 — Review + Feedback"
    ],
    speakersList: ["Mentor Photographer"],
    faqs: [
      { q: "Do I need a DSLR?", a: "No. Mobile cameras are also welcome." },
      { q: "What should I bring?", a: "Comfortable shoes + water bottle + camera/phone." },
      { q: "Is this beginner friendly?", a: "Yes, guidance is provided throughout." }
    ]
  },
  {
    id: "ev_2003",
    name: "AI Webinar",
    type: "talk",
    city: "online",
    venue: "Online (Zoom)",
    date: "2026-02-02",
    time: "19:30",
    price: 0,
    seats: 1000,
    duration: "1.5 hrs",
    speakers: 2,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    desc: "AI trends + career roadmap + live Q&A: what to learn, build, and how to grow fast.",
    agenda: [
      "19:30 — AI Trends 2026",
      "20:05 — Career Roadmap",
      "20:25 — Live Demos + Use Cases",
      "20:45 — Q&A + Closing"
    ],
    speakersList: ["AI Speaker", "Industry Guest"],
    faqs: [
      { q: "Is it free?", a: "Yes, registration is required for the meeting link." },
      { q: "Will I get a certificate?", a: "Yes, a participation certificate will be emailed." },
      { q: "Can I ask questions live?", a: "Yes, there’s a dedicated Q&A section." }
    ]
  },
  {
    id: "ev_3001",
    name: "Tech Conference 2026",
    type: "conference",
    city: "kolkata",
    venue: "Biswa Bangla Convention Centre, Kolkata",
    date: "2026-02-06",
    time: "10:00",
    price: 499,
    seats: 300,
    duration: "6 hrs",
    speakers: 5,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    desc: "A full-day tech conference with keynotes, panels, and networking sessions.",
    agenda: [
      "10:00 — Registration + Welcome",
      "10:30 — Keynote: Future of Tech",
      "12:00 — Panel: AI + Cloud",
      "14:00 — Startup Showcase",
      "16:30 — Networking + Closing"
    ],
    speakersList: ["Keynote Speaker", "Panel Experts", "Startup Founders", "Tech Lead", "Host Team"],
    faqs: [
      { q: "Will lunch be provided?", a: "Yes, lunch + refreshments are included." },
      { q: "Is there a student discount?", a: "Yes, limited student passes may be available." },
      { q: "Is parking available?", a: "Yes, paid parking is available at the venue." }
    ]
  },
  {
    id: "ev_3002",
    name: "Cricket Tournament",
    type: "live",
    city: "durgapur",
    venue: "Sports Complex Ground, Durgapur",
    date: "2026-02-09",
    time: "08:30",
    price: 99,
    seats: 500,
    duration: "8 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?auto=format&fit=crop&w=1200&q=80",
    desc: "A friendly day tournament with local teams, commentary, food stalls and prizes.",
    agenda: [
      "08:30 — Entry + Seating",
      "09:00 — Opening Match",
      "12:30 — Lunch Break",
      "14:00 — Semi Finals",
      "16:30 — Final + Prize Distribution"
    ],
    speakersList: ["Host Team", "Commentator"],
    faqs: [
      { q: "Can I bring my own water?", a: "Yes, water bottles are allowed." },
      { q: "Are kids allowed?", a: "Yes, kids under 10 enter free with guardian." },
      { q: "Is re-entry allowed?", a: "Yes, with your ticket and wristband." }
    ]
  },
  {
    id: "ev_3003",
    name: "Design Masterclass",
    type: "workshop",
    city: "online",
    venue: "Online (Google Meet)",
    date: "2026-02-12",
    time: "18:00",
    price: 149,
    seats: 250,
    duration: "2 hrs",
    speakers: 2,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    desc: "Learn UI/UX basics, Figma workflow, and build a clean landing page design live.",
    agenda: [
      "18:00 — UI/UX Fundamentals",
      "18:30 — Figma Tools + Layout",
      "19:10 — Component Design",
      "19:40 — Q&A + Resources"
    ],
    speakersList: ["UI/UX Mentor", "Design Reviewer"],
    faqs: [
      { q: "Do I need Figma installed?", a: "No, Figma works in the browser." },
      { q: "Will recordings be shared?", a: "Yes, a link will be provided after session." },
      { q: "Is it beginner friendly?", a: "Yes, we start from basics." }
    ]
  },
  {
    id: "ev_3004",
    name: "Movie & Chill Night",
    type: "live",
    city: "kolkata",
    venue: "Open Air Theatre, Kolkata",
    date: "2026-02-15",
    time: "19:00",
    price: 199,
    seats: 220,
    duration: "3 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    desc: "Open-air movie screening with snacks, music, and a cozy seating experience.",
    agenda: [
      "19:00 — Entry + Snacks Counter",
      "19:30 — Warm-up Music",
      "20:00 — Movie Screening",
      "22:20 — Exit + Photo Spot"
    ],
    speakersList: ["Host Team"],
    faqs: [
      { q: "Can I bring my own blanket?", a: "Yes, blankets are allowed." },
      { q: "Are outside snacks allowed?", a: "No, snacks are available inside." },
      { q: "What if it rains?", a: "Event may shift to an indoor hall or be rescheduled." }
    ]
  },
  {
    id: "ev_3005",
    name: "Gaming LAN Night",
    type: "live",
    city: "durgapur",
    venue: "Cyber Arena, Durgapur",
    date: "2026-02-18",
    time: "18:30",
    price: 249,
    seats: 160,
    duration: "4 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    desc: "LAN gaming + mini tournaments + prizes. Bring your squad!",
    agenda: [
      "18:30 — Entry + Registration",
      "19:00 — Team Match Qualifiers",
      "20:30 — Break + Snacks",
      "21:00 — Finals + Prize Distribution"
    ],
    speakersList: ["Host Team"],
    faqs: [
      { q: "Can I bring my own peripherals?", a: "Yes, you can bring mouse/keyboard/headset." },
      { q: "Is food available?", a: "Yes, snacks and beverages are available inside." },
      { q: "Do I need to bring a laptop?", a: "No, systems are provided at the venue." }
    ]
  },
  {
    id: "ev_3006",
    name: "Career Talk: IT Roadmap",
    type: "talk",
    city: "kolkata",
    venue: "Tech Hub Auditorium, Kolkata",
    date: "2026-02-20",
    time: "16:00",
    price: 0,
    seats: 300,
    duration: "2 hrs",
    speakers: 3,
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80",
    desc: "Career roadmap for IT: skills, projects, interviews, and Q&A.",
    agenda: [
      "16:00 — Welcome + Overview",
      "16:20 — Skills & Projects to Build",
      "17:00 — Interview Prep Tips",
      "17:30 — Live Q&A + Closing"
    ],
    speakersList: ["Industry Mentor", "Recruiter Guest", "Host Team"],
    faqs: [
      { q: "Is it free?", a: "Yes, but booking is required due to limited seats." },
      { q: "Will I get notes?", a: "Yes, a resource link will be shared after the session." },
      { q: "Can students attend?", a: "Yes, students and freshers are welcome." }
    ]
  },
  // sample events for newly added cities
  {
    id: "ev_4001",
    name: "Open Mic Night",
    type: "live",
    city: "mumbai",
    venue: "Colaba Social, Mumbai",
    date: "2026-02-25",
    time: "20:00",
    price: 199,
    seats: 150,
    duration: "4 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    desc: "Local artists perform spoken word, music, and stand-up in a relaxed lounge setting.",
    agenda: [
      "20:00 — Doors Open",
      "20:30 — Performances Begin",
      "22:30 — Open Jam",
      "23:30 — Closing Thanks"
    ],
    speakersList: [],
    faqs: [
      { q: "Is there an entry fee?", a: "Yes, tickets must be purchased in advance." },
      { q: "Can I perform?", a: "Sign-up list available at the venue." }
    ]
  },
  {
    id: "ev_4002",
    name: "Literary Meetup",
    type: "talk",
    city: "delhi",
    venue: "Cafe Mehr, Delhi",
    date: "2026-03-03",
    time: "17:00",
    price: 0,
    seats: 80,
    duration: "2 hrs",
    speakers: 3,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    desc: "Writers discuss contemporary fiction and hold a book exchange session.",
    agenda: [
      "17:00 — Welcome + Introductions",
      "17:20 — Panel Discussion",
      "18:00 — Q&A",
      "18:30 — Book Exchange"
    ],
    speakersList: ["Author A", "Author B", "Moderator"],
    faqs: [
      { q: "Do I need to register?", a: "Yes, seating is limited." }
    ]
  },
  {
    id: "ev_4003",
    name: "Yoga Retreat",
    type: "workshop",
    city: "bangalore",
    venue: "Green Gardens, Bangalore",
    date: "2026-03-10",
    time: "06:00",
    price: 249,
    seats: 100,
    duration: "3 hrs",
    speakers: 1,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    desc: "Sunrise yoga session in the park followed by a healthy breakfast.",
    agenda: [
      "06:00 — Morning Yoga",
      "07:30 — Guided Meditation",
      "08:00 — Healthy Breakfast"
    ],
    speakersList: ["Yoga Instructor"],
    faqs: [
      { q: "Do I need my own mat?", a: "Preferably, but some will be provided." }
    ]
  },
  {
    id: "ev_4004",
    name: "Carnival Fest",
    type: "live",
    city: "chennai",
    venue: "Surf Institution Grounds, Chennai",
    date: "2026-03-15",
    time: "15:00",
    price: 299,
    seats: 400,
    duration: "5 hrs",
    speakers: 0,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    desc: "Colourful parade, live music, food trucks and games for all ages.",
    agenda: [
      "15:00 — Parade Start",
      "16:00 — Live Music",
      "18:00 — Games & Prizes",
      "20:00 — Fireworks"
    ],
    speakersList: [],
    faqs: [
      { q: "Are kids free?", a: "Kids under 10 enter free." }
    ]
  },
  {
    id: "ev_4005",
    name: "Startup Pitch Night",
    type: "conference",
    city: "hyderabad",
    venue: "Technopark Auditorium, Hyderabad",
    date: "2026-03-20",
    time: "18:00",
    price: 499,
    seats: 250,
    duration: "4 hrs",
    speakers: 5,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    desc: "Early-stage founders pitch to investors and receive live feedback.",
    agenda: [
      "18:00 — Registration",
      "18:30 — Pitches",
      "20:30 — Feedback Panel",
      "21:30 — Networking"
    ],
    speakersList: ["Investor Panel", "Founder Judge", "Moderator"],
    faqs: [
      { q: "Can I attend as a guest?", a: "Yes, tickets are required." }
    ]
  }
];


// ---------- Storage helpers ----------
function getEvents() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEvents));
    return [...seedEvents];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Invalid");
    return parsed;
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEvents));
    return [...seedEvents];
  }
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// ---------- Label helpers ----------
function cityLabel(v) {
  if (v === "kolkata") return "Kolkata";
  if (v === "durgapur") return "Durgapur";
  if (v === "mumbai") return "Mumbai";
  if (v === "delhi") return "Delhi";
  if (v === "bangalore") return "Bangalore";
  if (v === "chennai") return "Chennai";
  if (v === "hyderabad") return "Hyderabad";
  if (v === "online") return "Online";
  return v;
}

function typeLabel(v) {
  if (v === "live") return "Live";
  if (v === "talk") return "Talk";
  if (v === "workshop") return "Workshop";
  if (v === "conference") return "Conference";
  return v;
}

function moneyLabel(price) {
  return price === 0 ? "Free" : `₹${price}`;
}

// ============================================
// 1) EVENTS PAGE: events.html
// ============================================
(function initEventsPage() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;

  let events = getEvents();
  let page = 1;
  const pageSize = 12;

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const cityFilter = document.getElementById("cityFilter");
  const sortBy = document.getElementById("sortBy");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pillBtns = Array.from(document.querySelectorAll(".pill-btn"));
  let quick = "all";
  // ==========================
  // Details Modal (events.html)
  // ==========================
  const modal = document.getElementById("detailsModal");
  const mBanner = document.getElementById("mBanner");
  const mTitle = document.getElementById("mTitle");
  const mTag = document.getElementById("mTag");
  const mMeta = document.getElementById("mMeta");
  const mDesc = document.getElementById("mDesc");
  const mVenue = document.getElementById("mVenue");
  const mDate = document.getElementById("mDate");
  const mTime = document.getElementById("mTime");
  const mPrice = document.getElementById("mPrice");
  const mAgenda = document.getElementById("mAgenda");
  const mSpeakers = document.getElementById("mSpeakers");
  const mBookBtn = document.getElementById("mBookBtn");

  function openModal(ev) {
    if (!modal) {
      toast("Modal missing", "Add the details modal HTML inside events.html", "⚠️");
      return;
    }

    if (mBanner) mBanner.style.backgroundImage = `url('${ev.image || ""}')`;
    if (mTitle) mTitle.textContent = ev.name;
    if (mTag) mTag.textContent = typeLabel(ev.type);
    if (mMeta) mMeta.textContent = `${cityLabel(ev.city)} • ${ev.date} • ${ev.time}`;
    if (mDesc) mDesc.textContent = ev.desc || "";

    if (mVenue) mVenue.textContent = ev.venue || "—";
    if (mDate) mDate.textContent = ev.date || "—";
    if (mTime) mTime.textContent = ev.time || "—";
    if (mPrice) mPrice.textContent = moneyLabel(ev.price ?? 0);

    if (mAgenda) {
      const a = ev.agenda || [];
      mAgenda.innerHTML = a.length
        ? a.map(x => `<div class="li"><div class="left">${x}</div><div class="right">⏳</div></div>`).join("")
        : `<div class="li"><div class="left muted">No agenda added.</div><div class="right">—</div></div>`;
    }

    if (mSpeakers) {
      const s = ev.speakersList || [];
      mSpeakers.innerHTML = s.length
        ? s.map(x => `<div class="li"><div class="left">${x}</div><div class="right">🎤</div></div>`).join("")
        : `<div class="li"><div class="left muted">No speakers listed.</div><div class="right">—</div></div>`;
    }

    if (mBookBtn) mBookBtn.href = `booking.html?id=${encodeURIComponent(ev.id)}`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Close when clicking backdrop or any element with data-close
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();               // click outside box
    if (e.target?.closest?.("[data-close]")) closeModal(); // close button
  });

  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) closeModal();
  });

  // When clicking Details button on a card
  grid.addEventListener("click", (e) => {
    const id = e.target?.dataset?.details;
    if (!id) return;

    const ev = getEvents().find(x => x.id === id);
    if (!ev) {
      toast("Not found", "Event not found.", "⚠️");
      return;
    }
    openModal(ev);
  });

  function applyFilters() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const tf = typeFilter?.value || "all";
    const cf = cityFilter?.value || "all";

    let filtered = events.filter((ev) => {
      const text = `${ev.name} ${cityLabel(ev.city)} ${typeLabel(ev.type)}`.toLowerCase();
      const matchesQ = !q || text.includes(q);
      const matchesType = tf === "all" || ev.type === tf;
      const matchesCity = cf === "all" || ev.city === cf;
      return matchesQ && matchesType && matchesCity;
    });

    // quick filters
    const now = new Date();
    if (quick === "free") filtered = filtered.filter((e) => e.price === 0);
    if (quick === "online") filtered = filtered.filter((e) => e.city === "online");
    if (quick === "thisWeek") {
      const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((e) => {
        const d = new Date(e.date + "T00:00:00");
        return d >= new Date(now.toDateString()) && d <= in7;
      });
    }

    // sorting
    const s = sortBy?.value || "date";
    filtered.sort((a, b) => {
      if (s === "date") return (a.date + a.time).localeCompare(b.date + b.time);
      if (s === "priceLow") return a.price - b.price;
      if (s === "priceHigh") return b.price - a.price;
      if (s === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  }

  function render() {
    events = getEvents(); // keep fresh (admin changes)
    const filtered = applyFilters();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, totalPages);

    const start = (page - 1) * pageSize;
    const slice = filtered.slice(start, start + pageSize);

    grid.innerHTML =
      slice
        .map(
          (ev) => `
      <article class="event-card reveal tilt">
        <div class="event-img" style="background-image:url('${ev.image || ""}')"></div>
        <div class="event-content">
          <div class="event-top">
            <h3>${ev.name}</h3>
            <span class="tag">${typeLabel(ev.type)}</span>
          </div>
          <p class="muted">${ev.desc}</p>

          <div class="meta-row">
            <span>📍 ${cityLabel(ev.city)}</span>
            <span>🗓️ ${ev.date}</span>
            <span>⏰ ${ev.time}</span>
            <span class="price">${moneyLabel(ev.price)}</span>
          </div>

          <div class="event-actions">
            <button class="btn btn-sm btn-ghost" data-details="${ev.id}" type="button">Details</button>
<a class="btn btn-sm btn-primary" href="booking.html?id=${encodeURIComponent(ev.id)}">Book</a>
          </div>
        </div>
      </article>
    `
        )
        .join("") || `<div class="details-card reveal"><p class="muted">No events found.</p></div>`;

    // ensure reveal visible even if IntersectionObserver isn't triggered immediately
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
    });

    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= totalPages;
  }

  function resetToFirstPage() {
    page = 1;
    render();
  }

  searchInput?.addEventListener("input", resetToFirstPage);
  typeFilter?.addEventListener("change", resetToFirstPage);
  cityFilter?.addEventListener("change", resetToFirstPage);
  sortBy?.addEventListener("change", resetToFirstPage);
  prevBtn?.addEventListener("click", () => {
    page = Math.max(1, page - 1);
    render();
  });
  nextBtn?.addEventListener("click", () => {
    page += 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  pillBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pillBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      quick = btn.dataset.quick || "all";
      resetToFirstPage();
    });
  });

  // Skeleton loading first, then render
  grid.innerHTML = Array.from({ length: 6 })
    .map(() => `<div class="skeleton reveal in-view"></div>`)
    .join("");

  setTimeout(() => {
    render();

    // Auto-open modal if coming from index.html?open=ev_xxxx
    const openId = new URLSearchParams(window.location.search).get("open");
    if (openId) {
      const ev = getEvents().find(x => x.id === openId);
      if (ev) openModal(ev);
    }
  }, 280);

})();

// ============================================
// 2) EVENT DETAILS PAGE: event-details.html
// ============================================
(function initDetailsPage() {
  const titleEl = document.getElementById("eventTitle");
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const events = getEvents();
  const ev = events.find((e) => e.id === id) || events[0];

  // Set banner image
  const banner = document.querySelector(".hero-banner");
  if (banner && ev?.image) {
    banner.style.backgroundImage = `url('${ev.image}')`;
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
  }

  const subtitle = document.getElementById("eventSubtitle");
  const desc = document.getElementById("eventDesc");
  const speakers = document.getElementById("eventSpeakers");
  const seats = document.getElementById("eventSeats");
  const duration = document.getElementById("eventDuration");
  const city = document.getElementById("eventCity");
  const date = document.getElementById("eventDate");
  const time = document.getElementById("eventTime");
  const price = document.getElementById("eventPrice");
  const bookBtn = document.getElementById("bookBtn");
  const bookTopBtn = document.getElementById("bookTopBtn");

  titleEl.textContent = ev.name;
  if (subtitle) subtitle.textContent = `${typeLabel(ev.type)} • ${cityLabel(ev.city)} • ${ev.date} • ${ev.time}`;
  if (desc) desc.textContent = ev.desc;
  // --- Extra details rendering (Agenda, Speakers, FAQs) ---
  const extraHTML = `
  <div class="hr"></div>

  <h3>Venue</h3>
  <p class="muted">${ev.venue || "—"}</p>

  <div class="hr"></div>

  <h3>Agenda</h3>
  <div class="list">
    ${(ev.agenda || []).map(item => `
      <div class="li">
        <div class="left">${item}</div>
        <div class="right">⏳</div>
      </div>
    `).join("")}
  </div>

  <div class="hr"></div>

  <h3>Speakers / Hosts</h3>
  <div class="list">
    ${(ev.speakersList || []).map(name => `
      <div class="li">
        <div class="left">${name}</div>
        <div class="right">🎤</div>
      </div>
    `).join("")}
  </div>

  <div class="hr"></div>

  <h3>FAQs</h3>
  <div class="list">
    ${(ev.faqs || []).map(f => `
      <div class="li">
        <div class="left"><b>${f.q}</b><div class="muted" style="margin-top:4px;">${f.a}</div></div>
        <div class="right">❓</div>
      </div>
    `).join("")}
  </div>
`;

  // Inject extra details below the description
  if (desc) {
    desc.insertAdjacentHTML("afterend", extraHTML);
  }
  if (speakers) speakers.textContent = ev.speakers ? `${ev.speakers}+` : "—";
  if (seats) seats.textContent = String(ev.seats || 0);
  if (duration) duration.textContent = ev.duration || "—";
  if (city) city.textContent = cityLabel(ev.city);
  if (date) date.textContent = ev.date;
  if (time) time.textContent = ev.time;
  if (price) price.textContent = moneyLabel(ev.price);

  const bookingLink = `booking.html?id=${encodeURIComponent(ev.id)}`;
  if (bookBtn) bookBtn.href = bookingLink;
  if (bookTopBtn) bookTopBtn.href = bookingLink;
})();

// ============================================
// 3) ADMIN PAGE: admin.html (CRUD)
// ============================================
(function initAdminPage() {
  // Login functionality
  const loginOverlay = document.getElementById("loginOverlay");
  const adminContent = document.getElementById("adminContent");
  const loginForm = document.getElementById("loginForm");
  const useridInput = document.getElementById("userid");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const logoutBtn = document.getElementById("logoutBtn");

  const ADMIN_USERID = "Kaustav";
  const ADMIN_PASSWORD = "Kaus#200614";

  // Check if already logged in
  if (sessionStorage.getItem("adminLoggedIn") === "true") {
    showAdminPanel();
  } else {
    showLoginForm();
  }

  function showLoginForm() {
    loginOverlay.style.display = "flex";
    adminContent.style.display = "none";
  }

  function showAdminPanel() {
    loginOverlay.style.display = "none";
    adminContent.style.display = "block";
    initializeAdminPanel();
  }

  function validateLogin(userid, password) {
    return userid === ADMIN_USERID && password === ADMIN_PASSWORD;
  }

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const userid = useridInput.value.trim();
    const password = passwordInput.value;

    if (validateLogin(userid, password)) {
      sessionStorage.setItem("adminLoggedIn", "true");
      loginError.style.display = "none";
      useridInput.value = "";
      passwordInput.value = "";
      showAdminPanel();
      toast("Login successful", "Welcome to the admin panel!", "🔐");
    } else {
      loginError.style.display = "block";
      useridInput.focus();
    }
  });

  logoutBtn.addEventListener("click", function() {
    sessionStorage.removeItem("adminLoggedIn");
    showLoginForm();
    toast("Logged out", "You have been logged out successfully.", "👋");
  });

  // Only proceed with admin functionality if logged in
  if (sessionStorage.getItem("adminLoggedIn") === "true") {
    initializeAdminPanel();
  }
})();

function initializeAdminPanel() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;

  let editingId = null;
  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredEvents = [];
  let selectedEvents = new Set();

  // Form elements
  const adminForm = document.getElementById("adminForm");
  const aName = document.getElementById("aName");
  const aType = document.getElementById("aType");
  const aCity = document.getElementById("aCity");
  const aVenue = document.getElementById("aVenue");
  const aDate = document.getElementById("aDate");
  const aTime = document.getElementById("aTime");
  const aPrice = document.getElementById("aPrice");
  const aSeats = document.getElementById("aSeats");
  const aDesc = document.getElementById("aDesc");
  const aImage = document.getElementById("aImage");
  const aDuration = document.getElementById("aDuration");
  const aSpeakers = document.getElementById("aSpeakers");
  const aAgenda = document.getElementById("aAgenda");
  const aSpeakersList = document.getElementById("aSpeakersList");
  const aFaqs = document.getElementById("aFaqs");

  const saveBtn = document.getElementById("saveEvent");
  const resetBtn = document.getElementById("resetForm");
  const previewBtn = document.getElementById("previewBtn");

  // Image upload
  const aImageFile = document.getElementById("aImageFile");
  const uploadBtn = document.getElementById("uploadBtn");
  const removeImageBtn = document.getElementById("removeImageBtn");
  const imagePreview = document.getElementById("imagePreview");

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Table controls
  const adminSearch = document.getElementById("adminSearch");
  const adminFilter = document.getElementById("adminFilter");
  const selectAll = document.getElementById("selectAll");
  const selectAllBtn = document.getElementById("selectAllBtn");
  const bulkDeleteBtn = document.getElementById("bulkDeleteBtn");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  // Statistics
  const totalEventsEl = document.getElementById("totalEvents");
  const paidEventsEl = document.getElementById("paidEvents");
  const totalSeatsEl = document.getElementById("totalSeats");
  const upcomingEventsEl = document.getElementById("upcomingEvents");

  // Preview elements
  const previewName = document.getElementById("previewName");
  const previewType = document.getElementById("previewType");
  const previewMeta = document.getElementById("previewMeta");
  const previewCity = document.getElementById("previewCity");
  const previewDate = document.getElementById("previewDate");
  const previewPrice = document.getElementById("previewPrice");
  const previewImg = document.getElementById("previewImg");

  function updateStatistics() {
    const events = getEvents();
    const now = new Date();
    const total = events.length;
    const paid = events.filter(e => e.price > 0).length;
    const seats = events.reduce((sum, e) => sum + (e.seats || 0), 0);
    const upcoming = events.filter(e => new Date(e.date) > now).length;

    totalEventsEl.textContent = total;
    paidEventsEl.textContent = paid;
    totalSeatsEl.textContent = seats;
    upcomingEventsEl.textContent = upcoming;
  }

  function switchTab(tabName) {
    tabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
    tabContents.forEach(content => content.classList.toggle("active", content.id === tabName));
  }

  function updatePreview() {
    const name = aName.value || "Event Name";
    const type = typeLabel(aType.value);
    const city = cityLabel(aCity.value);
    const date = aDate.value || "Date";
    const time = aTime.value || "Time";
    const price = moneyLabel(aPrice.value || 0);
    const image = aImage.value || "";

    previewName.textContent = name;
    previewType.textContent = type;
    previewMeta.textContent = `${city} • ${date} • ${time}`;
    previewCity.textContent = `📍 ${city}`;
    previewDate.textContent = `🗓️ ${date}`;
    previewPrice.textContent = price;
    previewImg.style.backgroundImage = image ? `url('${image}')` : "";
  }

  function handleImageUpload(file) {
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast("File too large", "Please select an image under 5MB", "⚠️");
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast("Invalid file", "Please select a valid image file", "⚠️");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      aImage.value = dataUrl; // Store as data URL
      imagePreview.innerHTML = `<img src="${dataUrl}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; pointer-events: none;">`;
      removeImageBtn.style.display = 'inline-flex';
      updatePreview();
    };
    reader.onerror = function() {
      toast("Upload failed", "Failed to read the image file", "⚠️");
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    aImage.value = "";
    imagePreview.innerHTML = `
      <div class="upload-placeholder">
        <div class="upload-icon">📷</div>
        <div class="upload-text">Click to upload event image</div>
        <div class="upload-subtext">JPG, PNG up to 5MB</div>
      </div>
    `;
    removeImageBtn.style.display = 'none';
    updatePreview();
  }

  function clearForm() {
    editingId = null;
    aName.value = "";
    aType.value = "conference";
    aCity.value = "kolkata";
    aVenue.value = "";
    aDate.value = "";
    aTime.value = "";
    aPrice.value = 0;
    aSeats.value = 200;
    aDesc.value = "";
    aImage.value = "";
    aDuration.value = "";
    aSpeakers.value = 0;
    aAgenda.value = "";
    aSpeakersList.value = "";
    aFaqs.value = "";
    saveBtn.textContent = "Save Event";
    switchTab("basic");
    removeImage();
    updatePreview();
  }

  function renderTable() {
    const events = getEvents();
    tbody.innerHTML = events
      .map(
        (ev) => `
      <tr>
        <td>${ev.name}</td>
        <td>${typeLabel(ev.type)}</td>
        <td>${cityLabel(ev.city)}</td>
        <td>${ev.date}</td>
        <td>${moneyLabel(ev.price)}</td>
        <td style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-sm btn-ghost" data-edit="${ev.id}" type="button">Edit</button>
          <button class="btn btn-sm btn-primary" data-del="${ev.id}" type="button">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  function loadForEdit(id) {
    const ev = getEvents().find((e) => e.id === id);
    if (!ev) return;
    editingId = ev.id;
    aName.value = ev.name;
    aType.value = ev.type;
    aCity.value = ev.city;
    aVenue.value = ev.venue || "";
    aDate.value = ev.date;
    aTime.value = ev.time;
    aPrice.value = ev.price || 0;
    aSeats.value = ev.seats || 200;
    aDesc.value = ev.desc || "";
    aImage.value = ev.image || "";
    aDuration.value = ev.duration || "";
    aSpeakers.value = ev.speakers || 0;
    aAgenda.value = (ev.agenda || []).join("\n");
    aSpeakersList.value = (ev.speakersList || []).join(", ");
    aFaqs.value = JSON.stringify(ev.faqs || [], null, 2);
    saveBtn.textContent = "Update Event";

    // Handle image display
    if (ev.image) {
      imagePreview.innerHTML = `<img src="${ev.image}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; pointer-events: none;">`;
      removeImageBtn.style.display = 'inline-flex';
    } else {
      removeImage();
    }

    updatePreview();
    toast("Edit mode", "You can update this event now.", "✏️");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function upsertEvent() {
    const name = aName.value.trim();
    const type = aType.value;
    const city = aCity.value;
    const venue = aVenue.value.trim();
    const date = aDate.value;
    const time = aTime.value;
    const price = Number(aPrice.value || 0);
    const seats = Number(aSeats.value || 200);
    const desc = aDesc.value.trim();
    const image = aImage.value.trim();
    const duration = aDuration.value.trim();
    const speakers = Number(aSpeakers.value || 0);
    const agenda = aAgenda.value.split("\n").filter(x => x.trim());
    const speakersList = aSpeakersList.value.split(",").map(x => x.trim()).filter(x => x);
    let faqs = [];
    try {
      faqs = JSON.parse(aFaqs.value || "[]");
    } catch {
      faqs = [];
    }

    if (!name || !date || !time || !desc) {
      toast("Missing fields", "Please fill all required fields.", "⚠️");
      return;
    }

    let list = getEvents();

    if (editingId) {
      list = list.map((ev) =>
        ev.id === editingId ? { ...ev, name, type, city, venue, date, time, price, seats, desc, image, duration, speakers, agenda, speakersList, faqs } : ev
      );
      toast("Updated", "Event updated successfully.");
    } else {
      const id = "ev_" + Math.floor(Math.random() * 90000 + 10000);
      list.unshift({
        id,
        name,
        type,
        city,
        venue,
        date,
        time,
        price,
        seats,
        duration,
        speakers,
        desc,
        image,
        agenda,
        speakersList,
        faqs
      });
      toast("Saved", "New event created successfully.");
    }

    saveEvents(list);
    clearForm();
    updateStatistics();
    applyFilters();
  }

  function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;
    const list = getEvents().filter((e) => e.id !== id);
    saveEvents(list);
    updateStatistics();
    applyFilters();
    toast("Deleted", "Event deleted successfully.", "🗑️");
  }

  function bulkDelete() {
    if (selectedEvents.size === 0) return;
    if (!confirm(`Delete ${selectedEvents.size} selected events?`)) return;
    const list = getEvents().filter((e) => !selectedEvents.has(e.id));
    saveEvents(list);
    selectedEvents.clear();
    updateStatistics();
    applyFilters();
    toast("Deleted", `${selectedEvents.size} events deleted.`, "🗑️");
  }

  function applyFilters() {
    const events = getEvents();
    const search = (adminSearch?.value || "").toLowerCase();
    const filter = adminFilter?.value || "all";

    filteredEvents = events.filter(ev => {
      const matchesSearch = ev.name.toLowerCase().includes(search) || ev.desc.toLowerCase().includes(search);
      const matchesFilter = filter === "all" || ev.type === filter;
      return matchesSearch && matchesFilter;
    });

    currentPage = 1;
    renderTable();
  }

  function renderTable() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageEvents = filteredEvents.slice(start, end);

    tbody.innerHTML = pageEvents
      .map(
        (ev) => `
      <tr>
        <td><input type="checkbox" class="event-checkbox" data-id="${ev.id}" /></td>
        <td>${ev.name}</td>
        <td>${typeLabel(ev.type)}</td>
        <td>${cityLabel(ev.city)}</td>
        <td>${ev.date}</td>
        <td>${moneyLabel(ev.price)}</td>
        <td style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-sm btn-ghost" data-edit="${ev.id}" type="button">Edit</button>
          <button class="btn btn-sm btn-danger" data-del="${ev.id}" type="button">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;

    // Update checkboxes
    document.querySelectorAll(".event-checkbox").forEach(cb => {
      cb.checked = selectedEvents.has(cb.dataset.id);
      cb.addEventListener("change", () => {
        if (cb.checked) selectedEvents.add(cb.dataset.id);
        else selectedEvents.delete(cb.dataset.id);
        updateBulkButtons();
      });
    });
  }

  function updateBulkButtons() {
    bulkDeleteBtn.disabled = selectedEvents.size === 0;
    selectAll.checked = selectedEvents.size === filteredEvents.length && filteredEvents.length > 0;
  }

  function toggleSelectAll() {
    if (selectAll.checked) {
      filteredEvents.forEach(ev => selectedEvents.add(ev.id));
    } else {
      selectedEvents.clear();
    }
    renderTable();
  }

  // Event listeners
  adminForm.addEventListener("submit", (e) => e.preventDefault()); // Prevent form submission
  tabBtns.forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
  previewBtn.addEventListener("click", updatePreview);
  saveBtn.addEventListener("click", upsertEvent);
  resetBtn.addEventListener("click", clearForm);

  // Image upload listeners
  uploadBtn.addEventListener("click", () => aImageFile.click());
  aImageFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  });
  imagePreview.addEventListener("click", () => aImageFile.click());
  removeImageBtn.addEventListener("click", removeImage);

  // Drag and drop for image
  imagePreview.addEventListener("dragover", (e) => {
    e.preventDefault();
    imagePreview.style.borderColor = "#007bff";
  });
  imagePreview.addEventListener("dragleave", () => {
    imagePreview.style.borderColor = "#ddd";
  });
  imagePreview.addEventListener("drop", (e) => {
    e.preventDefault();
    imagePreview.style.borderColor = "#ddd";
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  });

  adminSearch?.addEventListener("input", applyFilters);
  adminFilter?.addEventListener("change", applyFilters);
  selectAll?.addEventListener("change", toggleSelectAll);
  selectAllBtn?.addEventListener("click", () => { selectAll.checked = !selectAll.checked; toggleSelectAll(); });
  bulkDeleteBtn?.addEventListener("click", bulkDelete);
  prevPage?.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderTable(); } });
  nextPage?.addEventListener("click", () => { if (currentPage < Math.ceil(filteredEvents.length / itemsPerPage)) { currentPage++; renderTable(); } });

  tbody.addEventListener("click", (e) => {
    const editId = e.target?.dataset?.edit;
    const delId = e.target?.dataset?.del;
    if (editId) loadForEdit(editId);
    if (delId) deleteEvent(delId);
  });

  // Initialize
  updateStatistics();
  applyFilters();
  clearForm();
}