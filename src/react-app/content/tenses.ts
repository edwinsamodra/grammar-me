import type { TenseContent } from "./types";

// =====================================================================
// PRESENT
// =====================================================================

const presentSimple: TenseContent = {
  id: "present-simple",
  tagline: "Habits, routines, facts and schedules.",
  core: "Something that is generally true or happens regularly — not just at this moment.",
  timeline: [
    { type: "repeat", label: "every day", from: 8, to: 92 },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Habits & routines", detail: "Things you do regularly. Often used with adverbs of frequency (always, usually, often, sometimes, never).",
      examples: ["{s|I} {adv|usually} {v|wake} {pt|up} {t|at 6 a.m.}", "{s|She} {v|drinks} {o|coffee} {t|every morning}.", "{s|We} {adv|never} {v|eat} {o|dinner} {prep|in front of the TV}."] },
    { title: "Facts & general truths", detail: "Things that are always or generally true.",
      examples: ["{s|Water} {v|boils} {prep|at 100°C}.", "{s|The supermarket} {v|closes} {prep|at 10 p.m.}", "{s|My brother} {v|works} {prep|in a bank}."] },
    { title: "Schedules & timetables", detail: "Fixed, official schedules — even when they are in the future.",
      examples: ["{s|The bus} {v|leaves} {t|at 7:15}.", "{s|The movie} {v|starts} {t|at 8 tonight}."] },
    { title: "States (stative verbs)", detail: "Verbs of feeling, thinking, owning and senses (like, love, want, know, need, believe, have = own) are normally simple, not continuous.",
      examples: ["{s|I} {v|need} {o|a new phone}.", "{s|He} {v|doesn't} {v|like} {o|spicy food}.".replace("{v|doesn't}", "{a|doesn't}")] },
    { title: "Instructions & directions", detail: "Telling someone how to do something step by step.",
      examples: ["{adv|First}, {s|you} {v|boil} {o|the water}. {adv|Then} {s|you} {v|add} {o|the noodles}."] },
  ],
  signalWords: ["always", "usually", "often", "sometimes", "rarely", "never", "every day / week / morning", "on Mondays", "once a week", "twice a day", "in the morning", "at night"],
  notes: [
    { title: "Spelling of -s / -es (he, she, it)", items: [
      "Most verbs: + s → eats, works, reads",
      "-s, -sh, -ch, -x, -z, -o: + es → washes, watches, fixes, goes, does",
      "consonant + y: y → ies → study → studies, carry → carries",
      "vowel + y: + s → play → plays, pay → pays",
      "have → has (irregular)",
    ] },
    { title: "Position of frequency adverbs", items: [
      "Before the main verb: I {usually} take the bus.",
      "After be: She is {always} late.",
      "Between auxiliary and main verb: I don't {often} cook.",
    ] },
  ],
  mistakes: [
    { wrong: "She cook dinner every night.", right: "She cooks dinner every night.", why: "He / she / it / singular noun needs -s in the positive." },
    { wrong: "He doesn't likes coffee.", right: "He doesn't like coffee.", why: "After does / doesn't the main verb goes back to V1 — the -s moves to does." },
    { wrong: "Does she works here?", right: "Does she work here?", why: "Only one -s per clause: does already carries it." },
    { wrong: "I am agree with you.", right: "I agree with you.", why: "agree is a verb. Don't add am/is/are before a main verb in the simple present." },
    { wrong: "My mother don't drink tea.", right: "My mother doesn't drink tea.", why: "'My mother' = she → doesn't." },
    { wrong: "I am usually wake up at six.", right: "I usually wake up at six.", why: "Don't mix be + V1. Either 'I usually wake up' or 'I am usually awake'." },
    { wrong: "I'm liking this song.", right: "I like this song.", why: "like is a stative verb → simple present, not continuous." },
  ],
  compare: [
    { with: "present-continuous", difference: "Simple = routine / always. Continuous = right now / temporary.", a: "I work from home on Fridays.", b: "I'm working from home today." },
  ],
  passive: { note: "am / is / are + V3. Use it when the action matters more than who does it.",
    examples: ["{s|The trash} {a|is} {v|collected} {t|every Tuesday}.", "{s|The bills} {a|are} {v|paid} {ag|by my father}.", "{s|English} {a|is} {v|spoken} {prep|all over the world}."] },
  detect: [
    "Is the subject he / she / it / a singular noun? → the positive verb needs -s/-es.",
    "Is there do / does / don't / doesn't? → the main verb must be V1 (no -s).",
    "Is there a frequency word (always, every day)? → simple present, not continuous.",
    "Is the verb stative (like, want, know, need)? → don't use -ing.",
  ],
  story: "{s|My day} {v|starts} {t|early}. {s|I} {v|wake} {pt|up} {t|at six}, {v|make} {o|coffee} {conj|and} {v|check} {o|my phone}. {s|My wife} {v|takes} {o|the kids} {prep|to school} {conj|while} {s|I} {v|wash} {o|the dishes}. {s|We} {adv|rarely} {v|eat} {pt|out} {prep|on weekdays} {conj|because} {s|it} {v|costs} {o|too much}.",
};

const presentContinuous: TenseContent = {
  id: "present-continuous",
  tagline: "Happening now, temporary situations and fixed future plans.",
  core: "An action in progress around now — it started and has not finished yet.",
  timeline: [
    { type: "range", from: 38, to: 62, label: "in progress", open: true },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Right now (at the moment of speaking)", detail: "The action is happening as you speak.",
      examples: ["{s|I}{a|'m} {v|cooking} {o|dinner} {t|right now}.", "{s|Shh}! {s|The baby} {a|is} {v|sleeping}.".replace("{s|Shh}", "Shh"), "{s|They} {a|are} {v|watching} {o|a movie} {t|at the moment}."] },
    { title: "Around now (temporary)", detail: "Something happening in this period, but maybe not exactly this second.",
      examples: ["{s|I}{a|'m} {v|reading} {o|a great book} {t|this week}.", "{s|My sister} {a|is} {v|staying} {prep|with us} {t|this month}."] },
    { title: "Future arrangements", detail: "Plans that are already arranged (time, place, people). Usually with a future time word.",
      examples: ["{s|We}{a|'re} {v|having} {o|dinner} {prep|with my parents} {t|tonight}.", "{s|I}{a|'m} {v|seeing} {o|the dentist} {t|tomorrow at 10}."] },
    { title: "Changing / developing situations", detail: "Trends that are in progress.",
      examples: ["{s|Prices} {a|are} {v|going} {pt|up} {t|every month}.", "{s|Your English} {a|is} {v|getting} {adj|better}."] },
    { title: "Annoying habits (with always)", detail: "always + continuous shows irritation.",
      examples: ["{s|He}{a|'s} {adv|always} {v|leaving} {o|his socks} {prep|on the floor}!"] },
  ],
  signalWords: ["now", "right now", "at the moment", "currently", "today", "this week / month", "these days", "Look!", "Listen!", "tonight (plans)"],
  notes: [
    { title: "Spelling of -ing", items: [
      "Most verbs: + ing → cook → cooking, eat → eating",
      "Silent -e: drop e → make → making, drive → driving",
      "-ie: → ying → lie → lying, die → dying",
      "Short CVC verb (1 syllable): double the consonant → run → running, sit → sitting, shop → shopping",
      "Stressed final syllable: double → begin → beginning, but visit → visiting (stress on first)",
    ] },
    { title: "Stative verbs — usually NOT continuous", items: [
      "Feelings: like, love, hate, want, prefer, need",
      "Thinking: know, understand, believe, remember, mean",
      "Possession: have (= own), own, belong",
      "Senses: see, hear, smell, taste (involuntary)",
      "Exception: 'have' as an action is fine → I'm having lunch.",
    ] },
  ],
  mistakes: [
    { wrong: "I cooking now.", right: "I'm cooking now.", why: "Continuous always needs be (am/is/are) + V-ing." },
    { wrong: "She is cook dinner.", right: "She is cooking dinner.", why: "After continuous be, use V-ing, not V1." },
    { wrong: "I am knowing the answer.", right: "I know the answer.", why: "know is stative → simple present." },
    { wrong: "Are you wanting some tea?", right: "Do you want some tea?", why: "want is stative." },
    { wrong: "They is playing outside.", right: "They are playing outside.", why: "they → are." },
    { wrong: "What you are doing?", right: "What are you doing?", why: "Questions: WH + be + subject + V-ing." },
  ],
  compare: [
    { with: "present-simple", difference: "Continuous = temporary / now. Simple = permanent / regular.", a: "She's living with her aunt (for now).", b: "She lives in Jakarta (permanently)." },
    { with: "future-simple", difference: "Continuous for future = already arranged. Will = decided now / prediction.", a: "I'm meeting Tom at 7 (we planned it).", b: "I'll call Tom later (just decided)." },
  ],
  passive: { note: "am / is / are + being + V3.",
    examples: ["{s|The kitchen} {a|is} {a|being} {v|cleaned} {t|right now}.", "{s|Dinner} {a|is} {a|being} {v|prepared} {ag|by my dad}.", "{s|My car} {a|is} {a|being} {v|repaired} {t|this week}."] },
  detect: [
    "Is there am / is / are before the V-ing? (no be = wrong)",
    "Does be agree with the subject? I am · he/she/it is · you/we/they are",
    "Is the verb stative (know, like, want, need)? → change to simple present.",
    "Does the context say now / at the moment / this week?",
  ],
  story: "{t|It's Saturday morning}. {s|My husband} {a|is} {v|making} {o|pancakes} {conj|and} {s|the kids} {a|are} {v|watching} {o|cartoons}. {s|I}{a|'m} {v|sitting} {prep|on the balcony} {conj|and} {v|drinking} {o|my tea}. {s|We}{a|'re} {v|visiting} {o|my parents} {t|this afternoon}.",
};

const presentPerfect: TenseContent = {
  id: "present-perfect",
  tagline: "Past actions connected to now — results, experiences, unfinished time.",
  core: "Something happened before now, and it still matters now. The exact time is NOT said.",
  timeline: [
    { type: "cross", x: 30, label: "sometime before" },
    { type: "range", from: 30, to: 50, dashed: true, label: "result now" },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Result now", detail: "A past action with a visible result in the present.",
      examples: ["{s|I}{a|'ve} {v|lost} {o|my keys}. ({s|I} {v|can't} {v|get} {adv|in} {t|now}.)".replace("{v|can't}", "{a|can't}"), "{s|Someone} {a|has} {v|eaten} {o|my cake}!"] },
    { title: "Life experience (ever / never)", detail: "Have you done it at any time in your life? The time doesn't matter.",
      examples: ["{a|Have} {s|you} {adv|ever} {v|tried} {o|durian}?", "{s|I}{a|'ve} {adv|never} {v|been} {prep|to Japan}."] },
    { title: "Recent news (just / already / yet)", detail: "Very recent actions or checking whether something has happened.",
      examples: ["{s|I}{a|'ve} {adv|just} {v|finished} {o|my homework}.", "{a|Have} {s|you} {v|paid} {o|the bill} {adv|yet}?", "{s|She}{a|'s} {adv|already} {v|left}."] },
    { title: "Unfinished time period", detail: "Within a time period that is still going on (today, this week, this year).",
      examples: ["{s|I}{a|'ve} {v|drunk} {o|three cups of coffee} {t|today}.", "{s|We} {a|haven't} {v|gone} {pt|out} {t|this month}."] },
    { title: "Started in the past, still true (for / since) — states", detail: "With stative verbs, how long until now.",
      examples: ["{s|I}{a|'ve} {v|known} {o|her} {t|for ten years}.", "{s|They}{a|'ve} {v|lived} {prep|here} {t|since 2019}."] },
  ],
  signalWords: ["already", "yet", "just", "ever", "never", "so far", "recently", "lately", "since + point", "for + period", "today / this week (unfinished)", "How long…?", "once / twice / three times"],
  notes: [
    { title: "for vs since", items: ["for + a period: for two hours, for a week, for years", "since + starting point: since Monday, since 8 a.m., since I was a child"] },
    { title: "been vs gone", items: ["He has gone to the market. → he is there now (not back).", "He has been to the market. → he went and came back (experience)."] },
    { title: "Position of just / already / yet / ever", items: ["just, already, ever, never: between have/has and V3 → I've just eaten.", "yet: end of negative and question → I haven't eaten yet. / Have you eaten yet?"] },
  ],
  mistakes: [
    { wrong: "I have finished it yesterday.", right: "I finished it yesterday.", why: "A finished past time (yesterday, last week, in 2020, ago) → simple past, never present perfect." },
    { wrong: "I have went there.", right: "I have gone there.", why: "After have/has use V3 (gone), not V2 (went)." },
    { wrong: "She have eaten.", right: "She has eaten.", why: "he / she / it → has." },
    { wrong: "I live here since 2019.", right: "I have lived here since 2019.", why: "since/for + until now → present perfect (not simple present)." },
    { wrong: "Did you ever try sushi?", right: "Have you ever tried sushi?", why: "Life experience without a time → present perfect (in British English especially)." },
    { wrong: "I've already finished it yet.", right: "I've already finished it. / I haven't finished it yet.", why: "already = positive; yet = negatives and questions." },
  ],
  compare: [
    { with: "past-simple", difference: "Perfect = time not said / connected to now. Past = specific finished time.", a: "I've seen that movie. (some time in my life)", b: "I saw that movie last Sunday." },
    { with: "present-perfect-continuous", difference: "Perfect = result / how much / how many. Perfect continuous = activity / how long.", a: "I've cleaned two rooms.", b: "I've been cleaning all morning." },
  ],
  passive: { note: "have / has + been + V3.",
    examples: ["{s|The dishes} {a|have} {a|been} {v|washed}.", "{s|Your order} {a|has} {a|been} {v|shipped}.", "{s|The bill} {a|hasn't} {a|been} {v|paid} {adv|yet}."] },
  detect: [
    "Is there have / has + V3? (V2 after have = wrong: have went ✗)",
    "Is there a finished time word (yesterday, ago, last…, in 2020)? → must be simple past instead.",
    "Is there for / since + until now? → present perfect (not simple present).",
    "he / she / it → has; others → have.",
  ],
  story: "{s|What a busy morning}! {s|I}{a|'ve} {adv|already} {v|done} {o|the laundry} {conj|and} {v|ironed} {o|my shirts}. {s|My husband} {a|has} {adv|just} {v|taken} {pt|out} {o|the trash}. {conj|But} {s|we} {a|haven't} {v|cleaned} {o|the bathroom} {adv|yet}. {a|Have} {s|you} {adv|ever} {v|tried} {v|cleaning} {o|it} {prep|with vinegar}?".replace("{s|What a busy morning}", "What a busy morning"),
};

const presentPerfectContinuous: TenseContent = {
  id: "present-perfect-continuous",
  tagline: "An activity that started in the past and has continued until now.",
  core: "Focus on the duration or the activity itself, from the past up to now (and maybe continuing).",
  timeline: [
    { type: "range", from: 22, to: 50, label: "for 2 hours", open: true },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "How long until now (duration)", detail: "With for / since / How long. The action may still be going on.",
      examples: ["{s|I}{a|'ve} {a|been} {v|waiting} {prep|for the bus} {t|for 20 minutes}.", "{s|She}{a|'s} {a|been} {v|working} {prep|from home} {t|since March}.", "{wh|How long} {a|have} {s|you} {a|been} {v|learning} {o|English}?"] },
    { title: "Recently finished activity with visible evidence", detail: "The activity just stopped and you can see the effect.",
      examples: ["{s|Your eyes} {v|are} {adj|red}. {a|Have} {s|you} {a|been} {v|crying}?".replace("{v|are}", "{v|are}"), "{s|I}{a|'m} {adj|tired} {conj|because} {s|I}{a|'ve} {a|been} {v|cleaning} {o|the house}.".replace("{a|'m}", "{v|'m}")] },
    { title: "Repeated actions up to now", detail: "Something done again and again recently.",
      examples: ["{s|He}{a|'s} {a|been} {v|calling} {o|me} {t|all day}.", "{s|We}{a|'ve} {a|been} {v|eating} {pt|out} {adv|a lot} {t|lately}."] },
  ],
  signalWords: ["for", "since", "How long…?", "all day / all morning", "lately", "recently", "the whole week"],
  notes: [
    { title: "Not with stative verbs", items: ["✗ I've been knowing him for years.", "✓ I've known him for years."] },
  ],
  mistakes: [
    { wrong: "I am waiting for an hour.", right: "I have been waiting for an hour.", why: "Duration up to now (for an hour) → perfect continuous, not present continuous." },
    { wrong: "I have been wait here since 9.", right: "I have been waiting here since 9.", why: "After been use V-ing." },
    { wrong: "She has being working all day.", right: "She has been working all day.", why: "have/has + been (V3 of be), not being." },
    { wrong: "I've been knowing her since school.", right: "I've known her since school.", why: "know is stative." },
    { wrong: "I've been writing three emails.", right: "I've written three emails.", why: "A number / completed result → present perfect simple." },
  ],
  compare: [
    { with: "present-perfect", difference: "Perfect continuous = how long / the activity. Perfect = how many / the result.", a: "I've been cooking all afternoon.", b: "I've cooked three dishes." },
    { with: "present-continuous", difference: "Present continuous = now only. Perfect continuous = from the past until now (duration).", a: "I'm studying.", b: "I've been studying for three hours." },
  ],
  passive: { note: "have / has + been + being + V3 — grammatically possible but very rare. Use the present perfect passive or an active sentence instead.",
    examples: ["(rare) The road has been being repaired for months.", "{s|They}{a|'ve} {a|been} {v|repairing} {o|the road} {t|for months}. (better)"] },
  detect: [
    "Is there have/has + been + V-ing? (missing been or V-ing = wrong)",
    "Is there for / since / How long? → good fit for this tense (or present perfect with stative verbs).",
    "Is the verb stative? → use present perfect simple.",
    "Is a number / completed result given? → use present perfect simple.",
  ],
  story: "{s|I}{a|'ve} {a|been} {v|trying} {v|to wake} {pt|up} {adv|earlier} {t|lately}. {s|My neighbor}{a|'s} {a|been} {v|renovating} {o|his kitchen} {t|for two weeks}, {conj|so} {s|I}{a|'ve} {a|been} {v|hearing} {o|drills} {t|since 7 a.m. every day}!",
};

// =====================================================================
// PAST
// =====================================================================

const pastSimple: TenseContent = {
  id: "past-simple",
  tagline: "Finished actions at a specific time in the past.",
  core: "It started and finished in the past. The time is known or clear (yesterday, last week, in 2020).",
  timeline: [
    { type: "cross", x: 25, label: "yesterday" },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Finished action at a known time", detail: "With a finished time expression.",
      examples: ["{s|I} {v|cooked} {o|fried rice} {t|last night}.", "{s|We} {v|went} {prep|to the beach} {t|two weeks ago}.", "{s|She} {v|bought} {o|a new laptop} {t|in July}."] },
    { title: "Sequence of actions (storytelling)", detail: "One action after another in the past.",
      examples: ["{s|I} {v|got} {pt|up}, {v|took} {o|a shower} {conj|and} {v|left} {prep|for work}."] },
    { title: "Past habits (finished)", detail: "Something that was regular in the past but is not now (also: used to).",
      examples: ["{s|I} {v|walked} {prep|to school} {adv|every day} {prep|as a kid}.", "{s|He} {a|used to} {v|smoke}.".replace("{a|used to}", "{a|used to}")] },
    { title: "Past states", detail: "Situations that were true in the past.",
      examples: ["{s|We} {v|lived} {prep|in Bandung} {t|for five years}. ({s|We} {v|don't} {v|live} {adv|there} {adv|now}.)".replace("{v|don't}", "{a|don't}")] },
  ],
  signalWords: ["yesterday", "last night / week / year", "… ago", "in 2020", "when I was a child", "then", "after that", "this morning (if it's now afternoon)"],
  notes: [
    { title: "Regular verbs: + ed (spelling)", items: [
      "Most: + ed → cook → cooked, watch → watched",
      "Ending in e: + d → bake → baked",
      "Consonant + y: → ied → study → studied, carry → carried (but play → played)",
      "Short CVC: double → stop → stopped, plan → planned",
    ] },
    { title: "Common irregular verbs (daily life)", items: [
      "go → went · eat → ate · drink → drank · buy → bought · bring → brought",
      "make → made · take → took · get → got · see → saw · come → came",
      "have → had · do → did · sleep → slept · wake → woke · leave → left",
      "pay → paid · send → sent · read → read (pronounced 'red') · write → wrote",
    ] },
    { title: "was / were (past of be)", items: ["I / he / she / it → was", "you / we / they → were", "Negative: wasn't / weren't — NO did: ✗ I didn't was tired → ✓ I wasn't tired."] },
  ],
  mistakes: [
    { wrong: "Did you went to the market?", right: "Did you go to the market?", why: "After did / didn't, the main verb returns to V1." },
    { wrong: "I didn't ate breakfast.", right: "I didn't eat breakfast.", why: "Past is shown once — by did." },
    { wrong: "I go to the mall yesterday.", right: "I went to the mall yesterday.", why: "yesterday → past form (V2)." },
    { wrong: "She buyed a dress.", right: "She bought a dress.", why: "buy is irregular → bought." },
    { wrong: "I was cook dinner last night.", right: "I cooked dinner last night.", why: "Don't put was + V1. Simple past = V2 alone." },
    { wrong: "They was at home.", right: "They were at home.", why: "they → were." },
    { wrong: "I didn't was tired.", right: "I wasn't tired.", why: "be does not use did." },
  ],
  compare: [
    { with: "present-perfect", difference: "Past = specific finished time. Present perfect = no specific time / connected to now.", a: "I lost my wallet yesterday.", b: "I've lost my wallet (and I still don't have it)." },
    { with: "past-continuous", difference: "Past simple = complete action. Past continuous = in progress (background).", a: "I cooked dinner at 7. (started at 7)", b: "I was cooking dinner at 7. (in the middle of it)" },
  ],
  passive: { note: "was / were + V3.",
    examples: ["{s|The cake} {a|was} {v|made} {ag|by my grandma}.", "{s|The windows} {a|were} {v|cleaned} {t|yesterday}.", "{a|Was} {s|the package} {v|delivered} {t|this morning}?"] },
  detect: [
    "Is there a finished time (yesterday, ago, last…)? → verb must be V2 (or was/were).",
    "Is there did / didn't? → main verb must be V1 (did went ✗).",
    "Irregular verb? Check the V2 list (buyed ✗ → bought).",
    "be → was / were, never did + be.",
  ],
  story: "{t|Last Sunday} {s|we} {v|went} {prep|to the traditional market}. {s|My mother} {v|bought} {o|fresh fish} {conj|and} {s|I} {v|carried} {o|the bags}. {t|After that}, {s|we} {v|had} {o|lunch} {prep|at a small warung}. {s|It} {v|was} {adj|delicious}, {conj|but} {s|I} {a|didn't} {v|eat} {o|the sambal} — {s|it} {v|was} {adv|too} {adj|spicy}!",
};

const pastContinuous: TenseContent = {
  id: "past-continuous",
  tagline: "An action in progress at a moment in the past — often interrupted.",
  core: "Something was happening (in progress) at a particular time in the past.",
  timeline: [
    { type: "range", from: 15, to: 38, label: "was cooking" },
    { type: "cross", x: 28, label: "phone rang" },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "In progress at a past time", detail: "What were you doing at 8 p.m. last night?",
      examples: ["{t|At 8 p.m. last night} {s|I} {a|was} {v|watching} {o|TV}.", "{s|They} {a|were} {v|having} {o|dinner} {t|at that time}."] },
    { title: "Interrupted action (when + simple past)", detail: "A longer action (past continuous) is interrupted by a short one (simple past).",
      examples: ["{s|I} {a|was} {v|cooking} {conj|when} {s|the phone} {v|rang}.", "{conj|While} {s|she} {a|was} {v|driving}, {s|it} {v|started} {v|to rain}."] },
    { title: "Two actions in progress at the same time (while)", detail: "Parallel actions.",
      examples: ["{conj|While} {s|I} {a|was} {v|washing} {o|the dishes}, {s|my husband} {a|was} {v|bathing} {o|the baby}."] },
    { title: "Background in stories", detail: "Setting the scene.",
      examples: ["{s|The sun} {a|was} {v|shining} {conj|and} {s|the birds} {a|were} {v|singing}."] },
  ],
  signalWords: ["while", "when (+ past simple)", "at 7 p.m. yesterday", "at that time", "all evening", "at this time last week"],
  notes: [
    { title: "when vs while", items: ["while + longer action (past continuous): While I was sleeping, …", "when + short action (past simple): … when the alarm went off."] },
  ],
  mistakes: [
    { wrong: "I was cook when he came.", right: "I was cooking when he came.", why: "was / were + V-ing." },
    { wrong: "They was sleeping.", right: "They were sleeping.", why: "they → were." },
    { wrong: "When I was arriving, she left.", right: "When I arrived, she was leaving. / she left.", why: "Short, complete action → past simple." },
    { wrong: "I was knowing the answer.", right: "I knew the answer.", why: "know is stative." },
    { wrong: "Were you sleep at 10?", right: "Were you sleeping at 10?", why: "Question: was/were + subject + V-ing." },
  ],
  compare: [
    { with: "past-simple", difference: "Continuous = background / in progress. Simple = completed event / interruption.", a: "I was taking a shower when the lights went out.", b: "I took a shower and went to bed." },
  ],
  passive: { note: "was / were + being + V3.",
    examples: ["{s|The car} {a|was} {a|being} {v|washed} {conj|when} {s|it} {v|started} {v|to rain}.", "{s|Dinner} {a|was} {a|being} {v|served} {conj|when} {s|we} {v|arrived}."] },
  detect: [
    "Is there was / were + V-ing? Check agreement (I/he/she/it was, you/we/they were).",
    "In 'when' sentences: longer action = continuous, short action = simple past.",
    "Stative verbs → past simple.",
  ],
  story: "{t|Yesterday evening} {s|I} {a|was} {v|ironing} {o|my clothes} {conj|and} {s|my daughter} {a|was} {v|doing} {o|her homework}. {conj|Suddenly} {s|the electricity} {v|went} {pt|off}. {s|We} {a|were} {v|sitting} {prep|in the dark} {conj|when} {s|my son} {v|found} {o|a candle}.",
};

const pastPerfect: TenseContent = {
  id: "past-perfect",
  tagline: "The earlier of two past actions — 'the past before the past'.",
  core: "Something had already happened before another moment or action in the past.",
  timeline: [
    { type: "cross", x: 15, label: "had left" },
    { type: "cross", x: 33, label: "I arrived" },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Earlier past action", detail: "Shows which past event happened first.",
      examples: ["{conj|When} {s|I} {v|arrived}, {s|the bus} {a|had} {adv|already} {v|left}.", "{s|She} {a|had} {v|cooked} {o|dinner} {conj|before} {s|her husband} {v|came} {adv|home}."] },
    { title: "By + past time", detail: "Completed before a point in the past.",
      examples: ["{t|By 9 a.m.}, {s|I} {a|had} {v|finished} {o|all the chores}."] },
    { title: "Experience up to a past point", detail: "Never / ever before that time.",
      examples: ["{s|I} {a|had} {adv|never} {v|seen} {o|snow} {conj|before} {s|I} {v|went} {prep|to Korea}."] },
    { title: "Reported speech & third conditional", detail: "Backshift of present perfect / past simple; 'if' clauses about the past.",
      examples: ["{s|He} {v|said} {s|he} {a|had} {v|lost} {o|his wallet}.", "{conj|If} {s|I} {a|had} {v|known}, {s|I} {a|would} {a|have} {v|helped}."] },
  ],
  signalWords: ["already", "before", "after", "by the time", "by + past time", "when", "never … before", "just"],
  notes: [
    { title: "Is it always necessary?", items: ["With before / after the order is already clear, so the simple past is also OK: I ate after I (had) showered.", "Use the past perfect when the order would otherwise be confusing."] },
  ],
  mistakes: [
    { wrong: "When I arrived, the movie already started.", right: "When I arrived, the movie had already started.", why: "Started first (before arriving) → past perfect." },
    { wrong: "I had went home.", right: "I had gone home.", why: "had + V3." },
    { wrong: "She has finished before I came.", right: "She had finished before I came.", why: "Both actions are in the past → had, not has." },
    { wrong: "I had eat already.", right: "I had already eaten.", why: "had + V3 (eaten)." },
  ],
  compare: [
    { with: "past-simple", difference: "Past perfect = earlier. Past simple = later (or the main storyline).", a: "When I got home, my wife cooked dinner. (I arrived → then she cooked)", b: "When I got home, my wife had cooked dinner. (dinner was ready)" },
  ],
  passive: { note: "had + been + V3.",
    examples: ["{s|The house} {a|had} {a|been} {v|cleaned} {conj|before} {s|the guests} {v|arrived}.", "{s|All the cookies} {a|had} {a|been} {v|eaten} {t|by noon}."] },
  detect: [
    "Two past actions? Which happened first? → that one may need had + V3.",
    "had + V3 (not V2): had went ✗",
    "Don't use has/have for an action before another past action.",
  ],
  story: "{t|Last night} {s|I} {v|came} {adv|home} {adv|late}. {s|Everyone} {a|had} {adv|already} {v|eaten}, {conj|and} {s|my wife} {a|had} {v|washed} {o|all the dishes}. {s|I} {v|realized} {s|I} {a|had} {v|forgotten} {v|to buy} {o|the milk}.",
};

const pastPerfectContinuous: TenseContent = {
  id: "past-perfect-continuous",
  tagline: "How long something had been going on before a past moment.",
  core: "An activity continued for a period up to another point in the past.",
  timeline: [
    { type: "range", from: 10, to: 32, label: "had been waiting" },
    { type: "cross", x: 32, label: "bus came" },
    { type: "point", x: 50, label: "now" },
  ],
  uses: [
    { title: "Duration before a past point", detail: "for / since + before something happened in the past.",
      examples: ["{s|I} {a|had} {a|been} {v|waiting} {t|for an hour} {conj|when} {s|the bus} {adv|finally} {v|came}.", "{s|She} {a|had} {a|been} {v|working} {prep|there} {t|for ten years} {conj|before} {s|she} {v|quit}."] },
    { title: "Cause of a past situation", detail: "Explains a past result.",
      examples: ["{s|The ground} {v|was} {adj|wet} {conj|because} {s|it} {a|had} {a|been} {v|raining}.", "{s|He} {v|was} {adj|tired} {conj|because} {s|he} {a|had} {a|been} {v|cleaning} {t|all day}."] },
  ],
  signalWords: ["for", "since", "how long", "before", "when", "all day", "because (cause)"],
  mistakes: [
    { wrong: "I was waiting for two hours when he arrived.", right: "I had been waiting for two hours when he arrived.", why: "Duration up to a past point → had been + V-ing." },
    { wrong: "She had been work all day.", right: "She had been working all day.", why: "had been + V-ing." },
    { wrong: "They have been living there before they moved.", right: "They had been living there before they moved.", why: "Past point → had, not have." },
  ],
  compare: [
    { with: "past-perfect", difference: "Perfect continuous = how long (activity). Perfect = completed result.", a: "I had been reading for an hour.", b: "I had read three chapters." },
  ],
  passive: { note: "had + been + being + V3 — extremely rare. Prefer the active form.",
    examples: ["(rare) The road had been being repaired for weeks.", "{s|Workers} {a|had} {a|been} {v|repairing} {o|the road} {t|for weeks}. (better)"] },
  detect: [
    "had + been + V-ing — all three parts present?",
    "Is there a duration (for / since) up to a past moment? → this tense.",
    "Stative verbs → past perfect simple instead.",
  ],
  story: "{s|I} {a|had} {a|been} {v|looking} {prep|for my glasses} {t|for 20 minutes} {conj|before} {s|I} {v|realized} {s|they} {a|were} {prep|on my head}. {s|My son} {a|had} {a|been} {v|watching} {o|me} {t|the whole time} {conj|and} {v|laughing}.".replace("{a|were}", "{v|were}"),
};

// =====================================================================
// FUTURE
// =====================================================================

const futureSimple: TenseContent = {
  id: "future-simple",
  tagline: "Decisions made now, predictions, promises, offers.",
  core: "will + V1 — the future seen from now, without a prior plan.",
  timeline: [
    { type: "point", x: 50, label: "now" },
    { type: "cross", x: 75, label: "tomorrow" },
  ],
  uses: [
    { title: "Instant decisions", detail: "Decided at the moment of speaking.",
      examples: ["{s|It}{v|'s} {adj|cold}. {s|I}{a|'ll} {v|close} {o|the window}.", "{s|I}{a|'ll} {v|have} {o|the chicken}, {adv|please}."] },
    { title: "Predictions (opinion)", detail: "What you think or believe will happen (often with think, probably, I'm sure).",
      examples: ["{s|I} {v|think} {s|it} {a|will} {v|rain} {t|tonight}.", "{s|You}{a|'ll} {adv|probably} {v|love} {o|this restaurant}."] },
    { title: "Promises, offers, requests", detail: "",
      examples: ["{s|I}{a|'ll} {v|call} {o|you} {adv|later}, {s|I} {v|promise}.", "{a|Will} {s|you} {v|help} {o|me} {prep|with the bags}?", "{s|I}{a|'ll} {v|carry} {o|that} {prep|for you}."] },
    { title: "Facts about the future", detail: "",
      examples: ["{s|My son} {a|will} {v|be} {o|ten} {t|next month}.".replace("{o|ten}", "{c|ten}")] },
  ],
  signalWords: ["tomorrow", "next week / month / year", "soon", "later", "in two days", "I think …", "probably", "I'm sure", "maybe", "I promise"],
  notes: [
    { title: "will vs be going to", items: [
      "be going to + V1 = plan already decided / evidence now: I'm going to visit my parents this weekend. Look at the clouds — it's going to rain.",
      "will = decided now / opinion: OK, I'll go with you.",
      "Present continuous = arranged plan: I'm meeting him at 7.",
    ] },
    { title: "No will after when / if / before / after (time clauses)", items: ["✗ When I will arrive, I'll call you.", "✓ When I arrive, I'll call you."] },
  ],
  mistakes: [
    { wrong: "I will to call you.", right: "I will call you.", why: "will + V1 — no 'to'." },
    { wrong: "She will calls you.", right: "She will call you.", why: "No -s after will." },
    { wrong: "I will going tomorrow.", right: "I will go tomorrow. / I'm going tomorrow.", why: "will + V1 (not V-ing)." },
    { wrong: "When I will get home, I'll cook.", right: "When I get home, I'll cook.", why: "After when/if (future time clause) use the simple present." },
    { wrong: "He will be finish soon.", right: "He will finish soon. / He will be finished soon.", why: "will be + V1 is wrong; either will + V1 or will be + adjective/V3." },
  ],
  compare: [
    { with: "present-continuous", difference: "Will = no plan yet / decided now. Present continuous = already arranged.", a: "Maybe I'll visit my aunt.", b: "I'm visiting my aunt on Sunday (she's expecting me)." },
  ],
  passive: { note: "will + be + V3.",
    examples: ["{s|The package} {a|will} {a|be} {v|delivered} {t|tomorrow}.", "{s|Breakfast} {a|will} {a|be} {v|served} {prep|from 6 to 10}."] },
  detect: [
    "will + V1? (no to, no -s, no -ing, no V2)",
    "Same form for all subjects (I will, she will, they will).",
    "After when / if / before / as soon as → simple present, not will.",
  ],
  story: "{s|I}{a|'m} {adj|so} {adj|hungry}! {s|I}{a|'ll} {v|make} {o|some instant noodles}. {s|Don't worry}, {s|I}{a|'ll} {v|clean} {o|the kitchen} {adv|afterwards}. {s|I} {v|think} {s|Mom} {a|won't} {v|notice}.".replace("{s|Don't worry}", "Don't worry").replace("{s|I}{a|'m} {adj|so}", "{s|I}{v|'m} {adv|so}"),
};

const futureContinuous: TenseContent = {
  id: "future-continuous",
  tagline: "In progress at a specific time in the future.",
  core: "will be + V-ing — imagine yourself in the middle of an action at a future moment.",
  timeline: [
    { type: "point", x: 50, label: "now" },
    { type: "range", from: 65, to: 85, label: "will be working" },
    { type: "cross", x: 75, label: "this time tomorrow" },
  ],
  uses: [
    { title: "In progress at a future time", detail: "",
      examples: ["{t|This time tomorrow} {s|I}{a|'ll} {a|be} {v|flying} {prep|to Bali}.", "{t|At 8 p.m.} {s|we}{a|'ll} {a|be} {v|having} {o|dinner}."] },
    { title: "Polite questions about plans", detail: "Asking without pressuring someone.",
      examples: ["{a|Will} {s|you} {a|be} {v|using} {o|the car} {t|tonight}?", "{a|Will} {s|you} {a|be} {v|joining} {o|us} {prep|for lunch}?"] },
    { title: "Things that will happen as a matter of course", detail: "Part of the normal routine/plan.",
      examples: ["{s|I}{a|'ll} {a|be} {v|passing} {o|the supermarket} {adv|anyway}, {conj|so} {s|I} {a|can} {v|buy} {o|some milk}."] },
  ],
  signalWords: ["this time tomorrow / next week", "at 8 p.m. tomorrow", "all day tomorrow", "when you arrive", "in an hour"],
  mistakes: [
    { wrong: "I will working at 9.", right: "I will be working at 9.", why: "will + be + V-ing." },
    { wrong: "She will be cook tomorrow at noon.", right: "She will be cooking tomorrow at noon.", why: "be + V-ing." },
    { wrong: "I will be knowing the result.", right: "I will know the result.", why: "Stative verb." },
  ],
  compare: [
    { with: "future-simple", difference: "Continuous = in the middle of it. Simple = the whole action / decision.", a: "At 7 I'll be cooking (already started).", b: "At 7 I'll cook (start then)." },
  ],
  passive: { note: "will + be + being + V3 — very rare. Prefer active or 'will be + V3'.",
    examples: ["(rare) The room will be being cleaned at 10.", "{s|The cleaner} {a|will} {a|be} {v|cleaning} {o|the room} {t|at 10}. (better)"] },
  detect: ["will + be + V-ing — all three parts?", "Is there a specific future moment? → good fit."],
  story: "{t|Tomorrow at 7 a.m.} {s|I}{a|'ll} {a|be} {v|sitting} {prep|in traffic}, {conj|and} {s|my kids} {a|will} {a|be} {v|eating} {o|breakfast} {prep|at school}. {a|Will} {s|you} {a|be} {v|working} {prep|from home} {t|tomorrow}?",
};

const futurePerfect: TenseContent = {
  id: "future-perfect",
  tagline: "Completed before a point in the future.",
  core: "will have + V3 — look back from a future moment: it will already be done.",
  timeline: [
    { type: "point", x: 50, label: "now" },
    { type: "cross", x: 68, label: "finished" },
    { type: "cross", x: 82, label: "by Friday" },
  ],
  uses: [
    { title: "Done before a future deadline (by …)", detail: "",
      examples: ["{t|By 6 p.m.}, {s|I}{a|'ll} {a|have} {v|finished} {o|the report}.", "{s|They} {a|will} {a|have} {v|cleaned} {o|the house} {conj|before} {s|the guests} {v|arrive}."] },
    { title: "Duration up to a future point", detail: "With stative verbs (for …).",
      examples: ["{t|Next month} {s|we}{a|'ll} {a|have} {v|been} {v|married} {t|for ten years}.".replace("{v|been} {v|married}", "{v|been} {c|married}")] },
  ],
  signalWords: ["by tomorrow / Friday / next week", "by the time …", "before …", "in two hours (completed)", "by then"],
  mistakes: [
    { wrong: "By tomorrow I will finish it.", right: "By tomorrow I will have finished it.", why: "by + future point = completed before then → will have + V3 (will finish is common in speech but less precise)." },
    { wrong: "I will have went.", right: "I will have gone.", why: "have + V3." },
    { wrong: "She will has finished.", right: "She will have finished.", why: "After will always 'have', never 'has'." },
  ],
  compare: [
    { with: "future-simple", difference: "Future perfect = done before the moment. Future simple = happens at/around that moment.", a: "When you arrive, I'll have cooked dinner (it's ready).", b: "When you arrive, I'll cook dinner (I start then)." },
  ],
  passive: { note: "will + have + been + V3.",
    examples: ["{s|The house} {a|will} {a|have} {a|been} {v|painted} {t|by next week}.", "{s|All the invitations} {a|will} {a|have} {a|been} {v|sent} {t|by Friday}."] },
  detect: ["will + have (never has) + V3?", "Is there 'by + future time'? → strong signal."],
  story: "{s|I} {v|start} {o|my diet} {t|today}. {t|By Christmas}, {s|I}{a|'ll} {a|have} {v|lost} {o|five kilos} {conj|and} {s|I}{a|'ll} {a|have} {v|stopped} {v|eating} {o|fried food}. {adv|Hopefully}!",
};

const futurePerfectContinuous: TenseContent = {
  id: "future-perfect-continuous",
  tagline: "How long something will have been going on by a future point.",
  core: "will have been + V-ing — duration measured up to a future moment.",
  timeline: [
    { type: "range", from: 30, to: 80, label: "will have been working" },
    { type: "point", x: 50, label: "now" },
    { type: "cross", x: 80, label: "by June" },
  ],
  uses: [
    { title: "Duration up to a future point", detail: "for + period, by + future time.",
      examples: ["{t|By June}, {s|I}{a|'ll} {a|have} {a|been} {v|working} {prep|here} {t|for five years}.", "{t|At noon} {s|she}{a|'ll} {a|have} {a|been} {v|cooking} {t|for four hours}."] },
  ],
  signalWords: ["by … for …", "by the time … for …", "for + period"],
  mistakes: [
    { wrong: "By May I will be working here for a year.", right: "By May I will have been working here for a year.", why: "Duration up to a future point → will have been + V-ing." },
    { wrong: "She will have be waiting.", right: "She will have been waiting.", why: "have + been (V3 of be)." },
  ],
  compare: [
    { with: "future-perfect", difference: "Perfect continuous = how long. Perfect = result / completed.", a: "By 5 I'll have been cleaning for 3 hours.", b: "By 5 I'll have cleaned the whole house." },
  ],
  passive: { note: "will have been being + V3 — practically never used. Use the active voice.",
    examples: ["(very rare) The bridge will have been being built for two years."] },
  detect: ["will + have + been + V-ing — four parts.", "Needs a duration (for …) and a future point (by …)."],
  story: "{t|Next week} {s|my parents} {a|will} {a|have} {a|been} {v|living} {prep|in this house} {t|for thirty years}. {s|My dad} {a|will} {a|have} {a|been} {v|growing} {o|the same mango tree} {t|for just as long}!",
};

export const TENSES: TenseContent[] = [
  presentSimple, presentContinuous, presentPerfect, presentPerfectContinuous,
  pastSimple, pastContinuous, pastPerfect, pastPerfectContinuous,
  futureSimple, futureContinuous, futurePerfect, futurePerfectContinuous,
];

export function tenseContent(id: string): TenseContent | undefined {
  return TENSES.find((t) => t.id === id);
}
