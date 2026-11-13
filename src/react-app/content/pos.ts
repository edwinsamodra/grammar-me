import type { Marked, Mistake } from "./types";

export interface PosType { name: string; detail: string; examples: string[] }

export interface PartOfSpeech {
  id: string;
  name: string;
  tag: string;            // markup tag used for coloring
  emoji: string;
  question: string;       // the question it answers
  definition: string;
  tenseLink: string;      // how it relates to tenses / sentence structure
  types: PosType[];
  position: string[];
  examples: Marked[];
  mistakes: Mistake[];
  detect: string[];
}

export const POS: PartOfSpeech[] = [
  {
    id: "noun", name: "Noun", tag: "s", emoji: "📦", question: "Who? What?",
    definition: "A word for a person, place, thing, animal or idea.",
    tenseLink: "A noun subject decides the verb form: singular nouns behave like he/she/it (My mother cooks), plural nouns like they (The kids cook). In the passive, the object noun becomes the subject.",
    types: [
      { name: "Countable", detail: "Can be counted; have singular and plural.", examples: ["an apple → two apples", "a dish → dishes", "a child → children (irregular)"] },
      { name: "Uncountable", detail: "Cannot be counted; no plural, no a/an, singular verb.", examples: ["water, rice, coffee, money, information, advice, furniture, homework, traffic"] },
      { name: "Proper", detail: "Names — always capitalized.", examples: ["Jakarta, Monday, Indomaret, Sarah, English"] },
      { name: "Collective", detail: "A group as one unit.", examples: ["family, team, staff (usually singular in American English: My family is big.)"] },
      { name: "Compound", detail: "Two words working as one noun.", examples: ["toothbrush, bus stop, washing machine, mother-in-law"] },
      { name: "Gerund (V-ing as noun)", detail: "A verb used as a noun.", examples: ["Cooking is fun.", "I enjoy swimming."] },
    ],
    position: [
      "Subject (before the verb): The bus is late.",
      "Object (after the verb): I missed the bus.",
      "After a preposition: I waited at the bus stop.",
      "Complement (after be): She is a nurse.",
    ],
    examples: ["{s|My neighbor} {v|sells} {o|fried bananas} {prep|in front of the mosque}.", "{s|Rice} {v|is} {c|cheap} {prep|at this market}."],
    mistakes: [
      { wrong: "I need some informations.", right: "I need some information.", why: "information is uncountable." },
      { wrong: "The furnitures are new.", right: "The furniture is new.", why: "Uncountable → singular verb." },
      { wrong: "I have two child.", right: "I have two children.", why: "Plural after numbers > 1 (irregular plural)." },
      { wrong: "My family are big.", right: "My family is big.", why: "Collective noun as one unit → singular (American English)." },
    ],
    detect: ["Is the subject noun singular, plural or uncountable? Does the verb agree?", "Plural after numbers / many / several / a few?", "No a/an with uncountable nouns."],
  },
  {
    id: "pronoun", name: "Pronoun", tag: "s", emoji: "👤", question: "Replaces a noun",
    definition: "A word that replaces a noun so we don't repeat it.",
    tenseLink: "Subject pronouns select the auxiliary: I am / was · he/she/it is / was / has / does · you/we/they are / were / have / do. Object pronouns appear after 'by' in passive sentences.",
    types: [
      { name: "Subject", detail: "Before the verb.", examples: ["I, you, he, she, it, we, they"] },
      { name: "Object", detail: "After a verb or preposition.", examples: ["me, you, him, her, it, us, them"] },
      { name: "Possessive adjective", detail: "Before a noun.", examples: ["my, your, his, her, its, our, their (my phone)"] },
      { name: "Possessive pronoun", detail: "Stands alone.", examples: ["mine, yours, his, hers, ours, theirs (The phone is mine.)"] },
      { name: "Reflexive", detail: "Subject and object are the same person.", examples: ["myself, yourself, himself, herself, itself, ourselves, yourselves, themselves"] },
      { name: "Demonstrative", detail: "Points to something.", examples: ["this, that, these, those"] },
      { name: "Relative", detail: "Connects a clause.", examples: ["who, which, that, whose, whom"] },
      { name: "Indefinite", detail: "Not specific — usually singular verb!", examples: ["someone, everyone, nobody, something, everything (Everyone is here.)"] },
    ],
    position: ["Subject pronoun → before the verb: She cooks.", "Object pronoun → after the verb / preposition: I called her. / with them.", "Possessive adjective → before a noun: her bag."],
    examples: ["{s|She} {v|gave} {o|me} {o|her umbrella}.", "{s|We} {v|made} {o|it} {o|ourselves}."],
    mistakes: [
      { wrong: "Me and my sister went shopping.", right: "My sister and I went shopping.", why: "Subject position → I, not me." },
      { wrong: "He gave the book to my sister and I.", right: "He gave the book to my sister and me.", why: "After a preposition → object pronoun." },
      { wrong: "Everyone are ready.", right: "Everyone is ready.", why: "Indefinite pronouns (everyone, somebody) take a singular verb." },
      { wrong: "The cat licked it's paw.", right: "The cat licked its paw.", why: "its = possessive; it's = it is / it has." },
      { wrong: "She is my friend. She name is Rina.", right: "Her name is Rina.", why: "Before a noun → possessive adjective (her)." },
    ],
    detect: ["Subject position → I/he/she/we/they; object position → me/him/her/us/them.", "its vs it's, your vs you're, their vs they're vs there.", "everyone / nobody / someone → singular verb."],
  },
  {
    id: "verb", name: "Verb", tag: "v", emoji: "⚡", question: "What happens? What is?",
    definition: "A word for an action, state or occurrence. The heart of every sentence — and the part that carries tense.",
    tenseLink: "Tense = (auxiliary verbs) + the correct form of the main verb. Every tense is a recipe of be / have / do / will + V1 / V2 / V3 / V-ing.",
    types: [
      { name: "Main (lexical) verb", detail: "Carries the meaning.", examples: ["eat, cook, sleep, go, wash"] },
      { name: "Auxiliary (helping) verb", detail: "Builds tense, voice, negatives and questions.", examples: ["be (am/is/are/was/were/been/being) → continuous & passive", "have (have/has/had) → perfect", "do (do/does/did) → negatives & questions in simple tenses", "will → future"] },
      { name: "Modal verb", detail: "Ability, possibility, obligation; always followed by V1 (phase 2 topic).", examples: ["can, could, may, might, must, should, would, will, shall"] },
      { name: "Linking verb", detail: "Connects the subject to a description (complement) — no object.", examples: ["be, become, seem, look, feel, taste, smell, sound, get (She looks tired.)"] },
      { name: "Transitive", detail: "Needs an object → can be passive.", examples: ["I washed the car. → The car was washed."] },
      { name: "Intransitive", detail: "No object → no passive.", examples: ["I slept. She arrived. (✗ was slept)"] },
      { name: "Phrasal verb", detail: "Verb + particle with a new meaning.", examples: ["wake up, get up, turn off, take out, look for, put on"] },
      { name: "Stative vs dynamic", detail: "Stative verbs (states) are rarely continuous.", examples: ["stative: know, like, want, need, own, believe", "dynamic: run, cook, write, eat"] },
    ],
    position: ["After the subject: I cook.", "In questions, the auxiliary moves before the subject: Do you cook?", "Only the first verb shows tense and agreement — the rest are fixed forms."],
    examples: ["{s|I} {a|have} {a|been} {v|living} {prep|here} {t|for three years}.", "{s|She} {v|looks} {c|tired} {t|today}."],
    mistakes: [
      { wrong: "She can cooks.", right: "She can cook.", why: "Modal + V1." },
      { wrong: "I am go to work.", right: "I go to work. / I am going to work.", why: "be + V1 is never correct." },
      { wrong: "The accident was happened at 5.", right: "The accident happened at 5.", why: "happen is intransitive → no passive." },
      { wrong: "The food smells deliciously.", right: "The food smells delicious.", why: "Linking verb + adjective." },
    ],
    detect: ["Find the FIRST verb: it must agree with the subject and show the time.", "Check each verb after an auxiliary: do → V1, have → V3, be → V-ing / V3, will/modal → V1.", "Intransitive verbs (happen, arrive, sleep) can't be passive."],
  },
  {
    id: "adjective", name: "Adjective", tag: "adj", emoji: "🎨", question: "What kind? Which? How many?",
    definition: "A word that describes a noun or pronoun.",
    tenseLink: "Adjectives follow linking verbs (be, look, feel) in any tense: She is / was / has been / will be tired. Past participles often act as adjectives (bored, tired, broken) — don't confuse them with the passive.",
    types: [
      { name: "Descriptive", detail: "", examples: ["hot, delicious, small, beautiful, expensive"] },
      { name: "-ed vs -ing", detail: "-ed = how you feel; -ing = what causes the feeling.", examples: ["I'm bored. (feel) · The movie is boring. (cause)", "She is interested. · The topic is interesting."] },
      { name: "Comparative / superlative", detail: "", examples: ["cheap → cheaper → the cheapest", "expensive → more expensive → the most expensive", "good → better → best · bad → worse → worst"] },
      { name: "Quantity", detail: "", examples: ["many (countable), much (uncountable), a few, a little, some, any"] },
    ],
    position: ["Before a noun: a hot drink.", "After a linking verb: The drink is hot.", "Order (OSASCOMP): opinion, size, age, shape, colour, origin, material, purpose → a lovely small old round red Italian wooden dining table."],
    examples: ["{s|This} {v|is} {det|a} {adj|small} {adj|cozy} {c|café}.", "{s|The soup} {v|tastes} {adj|salty}."],
    mistakes: [
      { wrong: "I am very boring in class.", right: "I am very bored in class.", why: "-ed = how you feel." },
      { wrong: "She is more taller than me.", right: "She is taller than me.", why: "Don't use more with -er." },
      { wrong: "A car red.", right: "A red car.", why: "Adjective before the noun." },
      { wrong: "Adjectives plural: reds shoes.", right: "red shoes", why: "Adjectives never take -s." },
    ],
    detect: ["Is the word describing a noun? → adjective (not adverb).", "After look/feel/taste/smell/sound/seem → adjective.", "-ed (feel) vs -ing (cause)."],
  },
  {
    id: "adverb", name: "Adverb", tag: "adv", emoji: "🧭", question: "How? When? Where? How often?",
    definition: "A word that describes a verb, an adjective, another adverb or a whole sentence.",
    tenseLink: "Many adverbs are tense signals: always/usually (simple present), now (continuous), already/yet/just/ever (perfect), yesterday/ago (simple past), tomorrow/soon (future). Their position often goes between the auxiliary and the main verb.",
    types: [
      { name: "Manner (how)", detail: "Often adjective + ly.", examples: ["quickly, carefully, well (not good), hard, fast"] },
      { name: "Frequency (how often)", detail: "", examples: ["always 100% · usually · often · sometimes · rarely · never 0%"] },
      { name: "Time (when)", detail: "", examples: ["now, today, yesterday, tomorrow, soon, later, already, yet, just, still"] },
      { name: "Place (where)", detail: "", examples: ["here, there, outside, upstairs, home, everywhere"] },
      { name: "Degree (how much)", detail: "", examples: ["very, too, quite, really, enough, almost"] },
    ],
    position: [
      "Frequency: before the main verb (I often cook), after be (I'm often late), after the first auxiliary (I have never tried it).",
      "Manner / place / time at the end in this order: Manner → Place → Time: She sang beautifully at the party last night.",
      "Time can also start the sentence: Yesterday, I went…",
    ],
    examples: ["{s|He} {adv|always} {v|drives} {adv|carefully}.", "{s|I} {a|have} {adv|just} {v|arrived} {adv|home}."],
    mistakes: [
      { wrong: "She cooks very good.", right: "She cooks very well.", why: "Describing a verb → adverb (well)." },
      { wrong: "I go always to the gym.", right: "I always go to the gym.", why: "Frequency adverb before the main verb." },
      { wrong: "I watched yesterday a movie.", right: "I watched a movie yesterday.", why: "Don't put time between verb and object." },
      { wrong: "He drives very fastly.", right: "He drives very fast.", why: "fast, hard, late, early are the same as the adjective." },
    ],
    detect: ["Describing a verb? → adverb (-ly), not adjective.", "Frequency adverb position: before main verb / after be.", "Order at the end: manner, place, time.", "Does the time adverb match the tense? (yesterday + have done ✗)"],
  },
  {
    id: "preposition", name: "Preposition", tag: "prep", emoji: "📍", question: "Where? When? How related?",
    definition: "A word that shows the relationship (time, place, direction, means) between a noun and the rest of the sentence.",
    tenseLink: "Time prepositions are tense clues: since/for (perfect), at 8 p.m. yesterday (past continuous), by tomorrow (future perfect). After a preposition, a verb must be V-ing (before eating).",
    types: [
      { name: "Time: at / on / in", detail: "", examples: ["at + clock time / night / the weekend (at 7, at night)", "on + day / date (on Monday, on 17 August)", "in + month / year / part of day (in May, in 2025, in the morning)"] },
      { name: "Place: at / on / in", detail: "", examples: ["at + point (at the bus stop, at home, at work)", "on + surface (on the table, on the wall)", "in + inside / city / country (in the kitchen, in Jakarta)"] },
      { name: "Movement", detail: "", examples: ["to, into, out of, through, across, along, toward"] },
      { name: "Duration", detail: "", examples: ["for (a period), since (a starting point), during, until, by"] },
      { name: "Other", detail: "", examples: ["by bus / car (means), with, without, about, like"] },
    ],
    position: ["Before a noun / pronoun / V-ing: on the table, with her, before leaving.", "At the end of questions: Who are you talking to?"],
    examples: ["{s|I} {v|wake} {pt|up} {prep|at 5 a.m.} {prep|on weekdays}.", "{s|She} {v|goes} {prep|to work} {prep|by train}."],
    mistakes: [
      { wrong: "I'll see you in Monday.", right: "I'll see you on Monday.", why: "Days → on." },
      { wrong: "I go to home at 6.", right: "I go home at 6.", why: "home (adverb) has no 'to'." },
      { wrong: "I have lived here since five years.", right: "I have lived here for five years.", why: "Period → for; starting point → since." },
      { wrong: "Before eat, wash your hands.", right: "Before eating, wash your hands.", why: "After a preposition → V-ing." },
      { wrong: "She is married with a doctor.", right: "She is married to a doctor.", why: "Fixed preposition: married to." },
    ],
    detect: ["at / on / in correct for time and place?", "for (period) vs since (point)?", "Verb after a preposition → V-ing."],
  },
  {
    id: "conjunction", name: "Conjunction", tag: "conj", emoji: "🔗", question: "Connects ideas",
    definition: "A word that joins words, phrases or clauses.",
    tenseLink: "Conjunctions create time relationships between tenses: when/while (past simple + past continuous), before/after/by the time (past perfect), when/if/as soon as + present for future meaning.",
    types: [
      { name: "Coordinating (FANBOYS)", detail: "Join equal parts.", examples: ["for, and, nor, but, or, yet, so"] },
      { name: "Subordinating", detail: "Start a dependent clause.", examples: ["because, although, when, while, before, after, if, unless, until, since, as soon as"] },
      { name: "Correlative", detail: "Pairs.", examples: ["both…and, either…or, neither…nor, not only…but also"] },
    ],
    position: ["Between clauses: I was tired, so I went to bed.", "Subordinate clause first → comma: Because it was raining, we stayed home.", "Main clause first → no comma: We stayed home because it was raining."],
    examples: ["{s|I} {v|wanted} {v|to go} {pt|out}, {conj|but} {s|it} {v|was} {v|raining}.".replace("{v|was} {v|raining}", "{a|was} {v|raining}"), "{conj|When} {s|I} {v|get} {adv|home}, {s|I}{a|'ll} {v|call} {o|you}."],
    mistakes: [
      { wrong: "Although it was raining, but we went out.", right: "Although it was raining, we went out.", why: "Don't use although and but together." },
      { wrong: "Because I was hungry.", right: "I ate because I was hungry.", why: "A because-clause alone is a fragment." },
      { wrong: "If it will rain, we'll stay home.", right: "If it rains, we'll stay home.", why: "if / when + present for the future." },
      { wrong: "I was tired, I went to bed.", right: "I was tired, so I went to bed.", why: "Comma splice — two sentences need a conjunction or a period." },
    ],
    detect: ["Each clause has its own subject + verb?", "Not two conjunctions for one link (although…but, because…so).", "Time clauses (when, if, as soon as) about the future → present tense."],
  },
  {
    id: "determiner", name: "Determiner / Article", tag: "det", emoji: "🔖", question: "Which one? How many?",
    definition: "A word before a noun that tells you which one or how many: articles (a, an, the), demonstratives, possessives, quantifiers.",
    tenseLink: "Determiners decide whether the subject is singular or plural (this dish is / these dishes are; each/every + singular verb), which controls the auxiliary in every tense.",
    types: [
      { name: "a / an", detail: "One, not specific, singular countable. an before a vowel SOUND.", examples: ["a banana, a university (/j/ sound), an egg, an hour (silent h)"] },
      { name: "the", detail: "Specific — both speaker and listener know which.", examples: ["I bought a shirt. The shirt is blue.", "the sun, the bathroom (in this house)"] },
      { name: "Zero article", detail: "General plural / uncountable nouns, meals, most places.", examples: ["I like cats. Rice is cheap. We had breakfast. She goes to school / to work / home."] },
      { name: "Demonstratives", detail: "", examples: ["this / that + singular · these / those + plural"] },
      { name: "Quantifiers", detail: "", examples: ["some (positive), any (negative/question), many / few (countable), much / little (uncountable), each / every + singular"] },
    ],
    position: ["Before the noun and before adjectives: the old red car."],
    examples: ["{det|The} {s|kids} {v|ate} {det|all the} {o|cookies}.", "{det|Every} {s|morning} {s|I} {v|drink} {det|a} {o|glass of water}.".replace("{s|morning}", "morning")],
    mistakes: [
      { wrong: "I am teacher.", right: "I am a teacher.", why: "Singular countable nouns need an article." },
      { wrong: "She is a honest person.", right: "She is an honest person.", why: "Silent h → vowel sound → an." },
      { wrong: "I had a breakfast at 7.", right: "I had breakfast at 7.", why: "Meals usually have no article." },
      { wrong: "Every students has a book.", right: "Every student has a book.", why: "every + singular noun + singular verb." },
      { wrong: "This shoes are new.", right: "These shoes are new.", why: "Plural → these." },
    ],
    detect: ["Singular countable noun without a / an / the / my? → missing determiner.", "this/that + singular, these/those + plural.", "every / each + singular noun + singular verb."],
  },
  {
    id: "interjection", name: "Interjection", tag: "adv", emoji: "❗", question: "Shows emotion",
    definition: "A short word or phrase that expresses emotion. It is grammatically independent from the sentence.",
    tenseLink: "Does not affect tense or structure — usually separated by a comma or exclamation mark.",
    types: [
      { name: "Common", detail: "", examples: ["Oh!, Wow!, Oops!, Ouch!, Hey!, Well, …, Yay!, Ugh!"] },
    ],
    position: ["At the start, separated by punctuation: Oops, I dropped my phone."],
    examples: ["Oops, {s|I} {v|forgot} {o|my wallet}!", "Wow, {s|you}{a|'ve} {v|cooked} {o|so much food}!"],
    mistakes: [{ wrong: "Wow you cooked a lot.", right: "Wow, you cooked a lot!", why: "Separate the interjection with a comma." }],
    detect: ["Interjections are followed by a comma or an exclamation mark."],
  },
];
