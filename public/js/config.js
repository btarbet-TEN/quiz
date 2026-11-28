// =============================================================================
// Elementary Music Success Scorecard: ALL editable content and IDs live here.
// Updating copy, IDs, trainings or URLs should never require touching quiz logic.
//
// Anything still starting with "PLACEHOLDER" is treated as "not set yet":
//   - Tracking IDs: that tracker is skipped entirely.
//   - Flodesk form IDs: that pillar's gate logs a console error and shows the
//     "Show my results" fallback (never another pillar's form).
// =============================================================================

export const CONFIG = {
  site: {
    title: 'Your Elementary Music Success Scorecard | TEN',
    brandUrl: 'https://tarbeteducationnetwork.com',
    logoSrc: '/assets/ten-logo-black.png',
    logoAlt: 'Tarbet Education Network',
  },

  // --- Tracking (skipped while placeholder) ---------------------------------
  tracking: {
    META_PIXEL_ID: 'PLACEHOLDER_META_PIXEL_ID',
    GA4_MEASUREMENT_ID: 'PLACEHOLDER_GA4_MEASUREMENT_ID',
    CLARITY_PROJECT_ID: 'PLACEHOLDER_CLARITY_PROJECT_ID',
  },

  // --- Flodesk: one form per GROWTH pillar ----------------------------------
  // Each form adds the subscriber to that pillar's segment, which starts the
  // pillar's email workflow. Keys are pillar slugs.
  flodesk: {
    forms: {
      'expectations-procedures': '6abffc0d14eff99404fef9c4',
      'approaches-pedagogy': '6ac3b7a4d3fb39ccdb8a7da1',
      'inclusion-differentiation': '6ac3b801147b36f92f884771',
      'curriculum-planning': '6ac3b81e147b36f92f884773',
      'teacher-fulfillment': '6ac3b8379c6b79a7586772e7',
    },
    // If the form hasn't rendered by then (e.g. an ad blocker), offer a way through.
    renderTimeoutMs: 6000,
    // Offer a manual way through if Flodesk does not confirm a submission.
    confirmationTimeoutMs: 8000,
  },

  // --- Links ----------------------------------------------------------------
  links: {
    edgeBase: 'https://www.thatmusicteacher.com/edge',
    edgeUtm: {
      utm_source: 'pillar-quiz',
      utm_medium: 'quiz',
      utm_campaign: 'scorecard',
      // utm_content is set to the growth pillar slug automatically.
    },
    privacy: 'https://www.thatmusicteacher.com/privacy',
    terms: 'https://www.thatmusicteacher.com/tou',
    disclaimer: 'https://www.thatmusicteacher.com/disclaimer',
    contact: 'mailto:hello@thatmusicteacher.com',
    pdfFooterLink: 'thatmusicteacher.com/edge',
  },

  // --- Screen copy ----------------------------------------------------------
  copy: {
    intro: {
      // Approved copy: use exactly.
      heading: ['Your Elementary Music', 'Success Scorecard'],
      body: 'Discover your Growth Pillar: the one area of the Pillars of General Music Success that will make the biggest difference in your teaching right now.',
      button: 'Start My Free Audit',
    },
    // Shown after the intro, before Pillar 1.
    about: {
      eyebrow: 'Before you begin',
      heading: 'What Are the Pillars of General Music Success?',
      paragraphs: [
        'The Pillars of General Music Success are the five non-negotiable areas where every elementary music teacher needs to keep growing to avoid burnout and truly thrive in this work.',
        "This framework isn't theory. It was built through deep work with music teachers around the world to pinpoint exactly where the time-wasting, frustration and overwhelm really come from.",
        "Think of this scorecard as your personalized PD blueprint. In about five minutes, you'll see how confident you feel in each pillar right now, and you'll get a clear, strategic plan to level up your teaching, boost student engagement and get out the door on time.",
      ],
      pillarsHeading: 'The five pillars',
      howHeading: 'How it works',
      steps: [
        'Rate 25 statements, five for each pillar, from 1 (Strongly Disagree) to 5 (Strongly Agree).',
        'Go with your first instinct. There are no right or wrong answers, just an honest snapshot of where you are today.',
        "Enter your name and email to unlock your results. We'll send your personalized growth plan straight to your inbox.",
        'Discover your Growth Pillar, your Foundation Pillar and your personalized next steps.',
      ],
      button: "Let's Begin",
    },
    scale: { low: 'Strongly Disagree', high: 'Strongly Agree' },
    question: {
      next: 'Next',
      // On the last pillar the button leads to the email gate / results.
      finish: 'See My Results',
      incomplete: 'Answer all 5 statements to continue.',
    },
    tie: {
      heading: 'Where would you like to start?',
      explanation: 'These pillars tied at {score}/25. Choose the one you’d most like to work on first.',
      allEqual: 'Your scores are even across all five pillars. Choose the one you’d most like to work on first.',
      prompt: 'Choose your Growth Pillar',
    },
    gate: {
      heading: 'Your results are ready.',
      subtext: 'Enter your name and email to see your scorecard and personalized growth plan.',
      blockedMessage: "We couldn't load the sign-up form. It may be blocked by your browser or an ad blocker.",
      unconfirmedMessage: "We couldn't confirm your signup. You can submit the form again or view your score now.",
      blockedButton: 'Show my results',
    },
    results: {
      intro: 'Here is where focused growth will make the biggest difference in your teaching right now.',
      scoresHeading: 'Your Pillar Scores',
      foundationHeadingPrefix: 'Your Foundation Pillar:',
      growthHeadingPrefix: 'Your Growth Plan:',
      trainingsHeading: 'Recommended Trainings',
      alsoAttentionLabel: 'Also worth your attention:',
      // One-line definitions shown under "Your Pillar Scores".
      growthDefinition: 'Your lowest-scoring pillar, where focused growth will make the biggest difference.',
      foundationDefinition: 'Your strongest pillar, a strength to build on.',
      // Shown when a pick was decided by framework order rather than a clear score.
      tieAllEqual: 'All five of your scores are tied, so your Growth and Foundation Pillars were chosen by their order in the framework.',
      tieAllEqualChosen: 'Your scores were even across all five pillars. You chose where to start, and the first remaining pillar in the framework is shown as your Foundation Pillar.',
      tieGrowthChosen: 'You chose your Growth Pillar from the pillars tied for your lowest score.',
      tieLegacyGrowth: 'Your Growth Pillar tied with another area. The first tied pillar in the framework was chosen.',
      tieFoundation: 'These pillars scored equally high: {pillars}. Your Foundation Pillar appears first in the framework order.',
      supportHeading: 'The support you need',
      supportBody: 'Every training recommended above lives inside Elementary Music EDGE®, the professional development membership for elementary music teachers. Join to start your growth plan today, with on-demand trainings, ready-to-use resources and a community of music teachers who get it.',
      supportButton: 'Join Elementary Music EDGE®',
      downloadHeading: 'Keep your scorecard',
      nameFieldLabel: 'Name to print on your scorecard',
      downloadButton: 'Download My Scorecard',
    },
    cookie: {
      text: 'This site uses cookies to improve your experience and measure our marketing.',
      linkText: 'Privacy Policy',
      button: 'Got It',
    },
    footer: {
      copyright: '© Tarbet Education Network',
    },
    pdf: {
      filename: 'My-Elementary-Music-Success-Scorecard.pdf',
      title: 'My Elementary Music Success Scorecard',
      scoresHeading: 'My Pillar Scores',
      footerCopyright: '© {year} That Music Teacher, LLC d/b/a Tarbet Education Network',
      footerCta: 'Continue your growth plan: thatmusicteacher.com/edge',
    },
  },

  // --- Pillars (framework order = tie-break order; do not reorder) ----------
  pillars: [
    {
      slug: 'expectations-procedures',
      name: 'Expectations & Procedures',
      // Radar labels: two lines on wide screens, one short word on phones.
      chartLabel: ['EXPECTATIONS &', 'PROCEDURES'],
      shortLabel: 'EXPECTATIONS',
      description: 'Clear expectations and procedures are essential for creating a positive learning environment. This pillar focuses on classroom management, student routines, and maintaining a learning-focused atmosphere.',
      statements: [
        'I have clearly communicated classroom expectations that students understand and follow.',
        'I consistently enforce classroom procedures and rules.',
        'My students can independently follow routines without frequent reminders.',
        'I feel confident in managing classroom behavior effectively.',
        'My classroom environment supports learning by minimizing disruptions.',
      ],
      foundationCopy: 'PLACEHOLDER: Your classroom runs on clear expectations and dependable routines. Lean into this strength by using your procedures to free up more time for music-making, and share what works with colleagues.',
      growthCopy: 'PLACEHOLDER: Clear expectations and consistent procedures create the calm, focused room every music lesson needs. Small changes to routines and transitions can quickly give you back teaching time.',
      trainings: [
        { title: "Maximizing Instructional Time Through Engaging Transitions", speakers: ["bryson-tarbet"], description: "Stop losing precious instructional minutes to chaotic instrument passes and unfocused line-ups. Learn how to turn dead time into musical, engaging transitions that keep students on task and give you back hours of teaching time every semester." },
        { title: "Google Organization Tips for Busy Music Teachers", speakers: ["theresa-hoover"], description: "Ditch the digital clutter and stop hunting for that one slide deck five minutes before class starts. Discover practical Google Workspace systems—from Drive folders to lesson-planning workflows—built specifically for the way elementary music teachers work." },
        { title: "Sub Smarter, Not Harder", speakers: ["rainy-montague"], description: "Take a sick day or personal day without spending four hours writing emergency sub plans the night before. Build a stress-free, plug-and-play sub tub that keeps your students engaged and musical—even when your sub doesn't read a single note." },
      ],
    },
    {
      slug: 'approaches-pedagogy',
      name: 'Approaches & Pedagogy',
      chartLabel: ['APPROACHES &', 'PEDAGOGY'],
      shortLabel: 'APPROACHES',
      description: 'This pillar emphasizes teaching strategies and methodologies. It includes your ability to apply diverse approaches like Kodály, Orff, and Dalcroze to engage students effectively.',
      statements: [
        'I regularly use a variety of teaching approaches to meet the needs of all students.',
        'I feel confident applying different methodologies in my teaching.',
        'I adapt my teaching style based on the content and/or needs of the class.',
        'I can effectively engage students through hands-on and active music-making experiences.',
        'My teaching reflects a solid understanding of age-appropriate practices.',
      ],
      foundationCopy: 'PLACEHOLDER: You bring a rich toolbox of approaches to your teaching. Lean into this strength by building lessons around the approaches your students respond to most.',
      growthCopy: 'PLACEHOLDER: Growing your toolbox of approaches like Kodály, Orff and Dalcroze helps every student find a way into the music.',
      trainings: [
        { title: "Different Ways to Use Boomwhackers", speakers: ["tyler-swick"], description: "Go way beyond basic play-along videos and unlock the full musical potential of your Boomwhackers. Walk away with fresh, creative ways to teach rhythm, melody, harmony, and ensemble skills across multiple grade levels." },
        { title: "Instant Improvisation with Rhythmic Building Blocks", speakers: ["david-row"], description: "Take the intimidation out of improvisation for both you and your students. Learn a simple, repeatable framework using rhythmic building blocks that gets every child creating original music with confidence in a single class period." },
        { title: "Strategies for Keeping Upper Elementary Students Excited About Choir", speakers: ["bryson-tarbet"], description: "Win over your reluctant 4th- and 5th-grade singers and turn choir into the highlight of their week. Explore practical rehearsal strategies, repertoire tips, and culture-building habits that boost buy-in and keep upper elementary students coming back." },
      ],
    },
    {
      slug: 'inclusion-differentiation',
      name: 'Inclusion & Differentiation',
      chartLabel: ['INCLUSION &', 'DIFFERENTIATION'],
      shortLabel: 'INCLUSION',
      description: 'Creating inclusive classrooms ensures all students feel valued and supported. This pillar addresses adapting lessons for diverse needs and integrating culturally relevant content.',
      statements: [
        'I feel confident differentiating instruction to meet diverse learning needs.',
        'I create an inclusive classroom where all students feel valued and supported.',
        'I have strategies in place to adapt lessons for students with IEPs, 504s, and other accommodations.',
        'I integrate culturally relevant music and practices into my lessons.',
        'I design lessons that are accessible to students of varying abilities and backgrounds.',
      ],
      foundationCopy: 'PLACEHOLDER: Your classroom is a place where every student belongs. Lean into this strength by making your adaptations part of how you plan every unit.',
      growthCopy: 'PLACEHOLDER: Practical strategies for differentiation and inclusion help every student take part fully, without adding hours to your planning.',
      trainings: [
        { title: "Harmony in the Hyphen: Embracing Filipino-American Heritage Through Music, Dance, & Identity", speakers: ["melissa-fuller-flores"], description: "Deepen your students' connection to culture and identity through authentic Filipino-American music and movement. Gain ready-to-use songs, dances, and respectful teaching context you can bring into your classroom right away." },
        { title: "Guided Accessibility Audit", speakers: ["bryson-tarbet"], description: "Spot the hidden barriers in your music room before they hold a student back. Walk step-by-step through your physical space, materials, and routines to make simple, high-impact adjustments that ensure every learner can fully participate." },
        { title: "Culturally Responsive Music Ed in Action", speakers: ["ashley-cuthbertson"], description: "Move past buzzwords and see what culturally responsive teaching actually looks like in a K–5 music room. Learn concrete strategies for selecting repertoire, honoring student backgrounds, and creating a classroom where every child feels seen and valued." },
      ],
    },
    {
      slug: 'curriculum-planning',
      name: 'Curriculum & Planning',
      chartLabel: ['CURRICULUM &', 'PLANNING'],
      shortLabel: 'CURRICULUM',
      description: 'Effective curriculum planning ensures you meet your learning goals and standards. This pillar focuses on long-term planning, pacing, repertoire selection, and assessment strategies.',
      statements: [
        'I have a clear long-term plan for what I want students to learn by the end of the year.',
        "My lesson plans are aligned with national/state/local standards and/or my district's curriculum.",
        'I have a consistent process for selecting repertoire and activities that support student learning goals.',
        'I feel confident designing assessments to accurately measure student progress.',
        'My lessons are well-paced and manageable for the time allotted.',
      ],
      foundationCopy: 'PLACEHOLDER: You plan with purpose and know where your students are headed. Lean into this strength by using your long-range plan to make room for creativity and student choice.',
      growthCopy: 'PLACEHOLDER: A clear long-range plan, well-paced lessons and simple assessments make every class period count and take the guesswork out of your week.',
      trainings: [
        { title: "Elementary Music Centers 101", speakers: ["becca-davis"], description: "Ready to try music centers without the classroom chaos? Learn how to design, prep, and manage independent, high-engagement learning stations that reinforce musical concepts while giving you time to assess and connect with small groups." },
        { title: "Work Smarter, Not Harder: Double Duty Songs", speakers: ["tanya-lejeune", "carrie-nicholas"], description: "Stop reinventing the wheel for every single grade level. Discover how to stretch your favorite songs across multiple concepts, skills, and age groups so you spend less time planning and more time making music." },
        { title: "Low-Stress Concert Planning", speakers: ["bryson-tarbet"], description: "Take the overwhelm out of performance season with a clear, repeatable concert-planning system. From picking repertoire and organizing rehearsals to communicating with families, learn how to pull off memorable shows without burning out." },
      ],
    },
    {
      slug: 'teacher-fulfillment',
      name: 'Teacher Fulfillment',
      chartLabel: ['TEACHER', 'FULFILLMENT'],
      shortLabel: 'FULFILLMENT',
      description: 'Teacher fulfillment reflects how supported, balanced, and purposeful you feel in your role. This pillar includes personal well-being, self-advocacy, and professional satisfaction.',
      statements: [
        'I feel a sense of joy and purpose in my teaching role.',
        'I have a good work/life balance that allows me to recharge outside of school.',
        'I reflect regularly on my teaching to identify areas of growth and to celebrate successes.',
        'I feel supported by my school, colleagues, administration, and community.',
        'I am confident in advocating for myself and my program when necessary.',
      ],
      foundationCopy: 'PLACEHOLDER: You find joy and purpose in your work. Lean into this strength by protecting the habits that keep you balanced, and let that energy carry into your classroom.',
      growthCopy: 'PLACEHOLDER: You can only pour from a full cup. Support, balance and self-advocacy help you keep loving this work for the long haul.',
      trainings: [
        { title: "Bye-Bye Teaching Frenzy", speakers: ["grace-stevens"], description: "Step off the hamster wheel of constant exhaustion and reclaim your calm during the school day. Learn practical mindset shifts and boundary-setting strategies designed to help busy music teachers reduce stress and feel grounded again." },
        { title: "The Performance Season Pressure Release", speakers: ["bryson-tarbet"], description: "When concert prep starts taking over your evenings and weekends, hit pause with this quick, grounding reset. Let go of perfectionism, refocus on what actually matters for your students, and protect your peace through your busiest weeks." },
        { title: "Teacher’s Pet: Loving Your Voice While Teaching Your Students", speakers: ["jennifer-whitehead"], description: "Your voice is your most important instrument—and teaching K–5 music all day puts it to the test. Learn practical vocal health habits, warm-ups, and classroom techniques to prevent fatigue, protect your voice, and still model healthy singing for your students." },
      ],
    },
  ],
};

export const isPlaceholder = (value) => !value || String(value).startsWith('PLACEHOLDER');

export const SPEAKERS = {
  "bryson-tarbet": { name: "Bryson Tarbet, M.M.Ed.", headshot: "/assets/speakers/bryson-tarbet.webp" },
  "theresa-hoover": { name: "Theresa Hoover", headshot: "/assets/speakers/theresa-hoover.webp" },
  "rainy-montague": { name: "Rainy Montague", headshot: "/assets/speakers/rainy-montague.webp" },
  "tyler-swick": { name: "Tyler Swick", headshot: "/assets/speakers/tyler-swick.webp" },
  "david-row": { name: "David Row", headshot: "/assets/speakers/david-row.webp" },
  "melissa-fuller-flores": { name: "Melissa Fuller Flores", headshot: "/assets/speakers/melissa-fuller-flores.webp" },
  "ashley-cuthbertson": { name: "Ashley Cuthbertson", headshot: "/assets/speakers/ashley-cuthbertson.webp" },
  "becca-davis": { name: "Becca Davis", headshot: "/assets/speakers/becca-davis.webp" },
  "tanya-lejeune": { name: "Tanya LeJeune", headshot: "/assets/speakers/tanya-lejeune.webp" },
  "carrie-nicholas": { name: "Carrie Nicholas", headshot: "/assets/speakers/carrie-nicholas.webp" },
  "grace-stevens": { name: "Grace Stevens", headshot: "/assets/speakers/grace-stevens.webp" },
  "jennifer-whitehead": { name: "Dr. Jennifer Whitehead", headshot: "/assets/speakers/jennifer-whitehead.webp" },
};
