import { useState, useEffect, useRef } from "react";

const STAGES=[
  {id:"explorers",label:"🌸 Explorers",ages:"Ages 3–6",color:"#ec4899",g:"#ec4899,#f472b6"},
  {id:"builders",label:"🏗️ Builders",ages:"Ages 6–10",color:"#f59e0b",g:"#f59e0b,#fbbf24"},
  {id:"discoverers",label:"🔭 Discoverers",ages:"Ages 10–14",color:"#3b82f6",g:"#3b82f6,#60a5fa"},
  {id:"innovators",label:"⚡ Innovators",ages:"Ages 14–16",color:"#8b5cf6",g:"#8b5cf6,#a78bfa"},
  {id:"pioneers",label:"🚀 Pioneers",ages:"Ages 16–18",color:"#ef4444",g:"#ef4444,#f87171"},
];

const SUBJECTS_16=[
  {id:"math",e:"🔢",name:"Mathematics",desc:"Arithmetic → Calculus",bg:"#4facfe,#00f2fe"},
  {id:"science",e:"🧪",name:"Science",desc:"Biology, Chemistry, Physics",bg:"#43e97b,#38f9d7"},
  {id:"english",e:"📖",name:"Language Arts",desc:"Reading, Writing, Speaking",bg:"#a18cd1,#fbc2eb"},
  {id:"history",e:"🏛️",name:"History",desc:"Local, National, World",bg:"#f093fb,#f5576c"},
  {id:"geography",e:"🌍",name:"Geography",desc:"Physical & Human",bg:"#4facfe,#43e97b"},
  {id:"coding",e:"💻",name:"Computer Science",desc:"Coding, AI, Cybersecurity",bg:"#667eea,#764ba2"},
  {id:"arts",e:"🎨",name:"Arts & Music",desc:"Drawing, Music Theory",bg:"#fa709a,#fee140"},
  {id:"pe",e:"⚽",name:"Physical Education",desc:"Sport, Health, Nutrition",bg:"#84fab0,#8fd3f4"},
  {id:"life",e:"🧠",name:"Life Skills",desc:"Cooking, First Aid, Comms",bg:"#fda085,#f6d365"},
  {id:"finance",e:"💰",name:"Financial Literacy",desc:"Budgeting, Investing",bg:"#0ba360,#3cba92"},
  {id:"languages",e:"🗣️",name:"World Languages",desc:"50+ Languages",bg:"#667eea,#764ba2"},
  {id:"env",e:"🌱",name:"Environmental Science",desc:"Climate, Ecology",bg:"#11998e,#38ef7d"},
  {id:"philosophy",e:"🤔",name:"Philosophy & Ethics",desc:"Critical thinking",bg:"#8e2de2,#4a00e0"},
  {id:"social",e:"🏘️",name:"Social Studies",desc:"Civics, Economics",bg:"#fc4a1a,#f7b733"},
  {id:"special",e:"🌈",name:"Special Education",desc:"All learners",bg:"#f7971e,#ffd200"},
  {id:"religion",e:"🕊️",name:"Religious Studies",desc:"World religions",bg:"#b8c6db,#8e9eab"},
];

const CUR={
  explorers:[
    {name:"Language & Literacy",icon:"📚",syl:"Phonics, letters, storytelling, vocabulary, pre-reading/writing, listening, oral expression.",ls:[
      {t:"The Alphabet Adventure",c:"Explore letters A–Z! Each has a sound and shape. A says 'aah.' Find things starting with A — Apple, ant, airplane! Practice writing A: two diagonal lines with a bridge."},
      {t:"Story Circle Time",c:"Today's story: a tiny seed grew into a giant sunflower. Listen for: seed, soil, sun, water, grow. Draw your sunflower and retell the story — beginning, middle, end."},
      {t:"Rhyme & Rhythm",c:"Cat, hat, bat — they rhyme! Clap: cat-hat-bat! What rhymes with 'dog'? Log! Fog! Frog! Rhyming helps brains understand how sounds work together."}]},
    {name:"Numbers & Early Math",icon:"🔢",syl:"Counting 1–100, shapes, patterns, sorting, comparing, simple addition & subtraction through play.",ls:[
      {t:"Counting to 10",c:"Hold up fingers: 1,2,3,4,5. Other hand: 6,7,8,9,10! Count chairs, toys. We count steps walking, fruits eating, stars dreaming."},
      {t:"Shape Explorers",c:"Circle = round like a plate. Square = 4 equal sides. Triangle = 3 sides like pizza slice. Shape hunt: find 3 of each at home!"},
      {t:"Patterns",c:"Pattern repeats: red,blue,red,blue — next? Red! Clap-stomp-clap-stomp = body pattern! Create your own with blocks or drawings."}]},
    {name:"Nature & Science",icon:"🌿",syl:"Seasons, weather, plants, animals, five senses, experiments, observation, caring for living things.",ls:[
      {t:"Our Five Senses",c:"Eyes SEE, Ears HEAR, Nose SMELL, Tongue TASTE, Hands TOUCH. Use all five to explore nature today! Draw something for each sense."},
      {t:"Growing a Seed",c:"Fill cup with soil, small hole, drop bean seed, cover, add water. Window spot. In a week — a tiny green sprout! That's life beginning!"},
      {t:"Weather Watchers",c:"Sunny ☀️, cloudy ☁️, rainy 🌧️, windy 🌬️? Draw weather daily. Count sunny vs rainy days. You're a weather scientist!"}]},
    {name:"Creative Arts",icon:"🎨",syl:"Drawing, painting, music, movement, colour theory, crafting, self-expression.",ls:[
      {t:"Colour Mixing Magic",c:"RED+YELLOW=ORANGE! YELLOW+BLUE=GREEN! BLUE+RED=PURPLE! Try with paint or food colouring in water. Mix and discover!"},
      {t:"Music & Movement",c:"Clap=percussion! Stomp=bass drum! Hum=melody! Fast music → dance like butterfly. Slow → move like turtle. Feel the rhythm!"},
      {t:"Draw Your World",c:"Close eyes, think of your favourite place. Draw it with every colour. No mistakes in art — every line is perfect from YOUR imagination."}]},
    {name:"Social & Emotional",icon:"💛",syl:"Emotions, sharing, kindness, friendship, self-regulation, empathy, confidence.",ls:[
      {t:"Feelings Rainbow",c:"HAPPY😊=sunshine. SAD😢=rain. ANGRY😤=fire. SCARED😨=butterflies. ALL feelings are okay. Breathe in 1,2,3... out 1,2,3. You are safe."},
      {t:"Kindness Challenge",c:"Do 3 kind things today: say something nice, help with a task, share with a friend. Notice how kindness makes YOU feel good too!"},
      {t:"Being a Good Friend",c:"Listen, share, take turns, say sorry, celebrate others. Tell a friend one thing you like about them today. Kindness is a superpower!"}]},
  ],
  builders:[
    {name:"Language Arts",icon:"📖",syl:"Reading fluency, creative writing, grammar, spelling, comprehension, poetry, public speaking.",ls:[
      {t:"Story Structure",c:"BEGINNING: characters+setting. MIDDLE: problem/adventure. END: problem solved. Read a story, identify the three parts, then write your own!"},
      {t:"Nouns, Verbs, Adjectives",c:"NOUN=person/place/thing. VERB=action. ADJECTIVE=describes. Write 5 sentences — underline nouns blue, verbs red, adjectives green."},
      {t:"Persuasive Writing",c:"1) STATE opinion. 2) GIVE reasons with evidence. 3) Strong CONCLUSION. Topic: 'Should recess be longer?' Use 'because' and 'therefore.'"}]},
    {name:"Mathematics",icon:"➕",syl:"Multiplication, division, fractions, decimals, geometry, measurement, data, graphs.",ls:[
      {t:"Multiplication",c:"3×4 means '3 groups of 4': 4+4+4=12. Order doesn't matter: 3×4=4×3. Draw groups for 2×5, 4×3, 5×6. Times tables are patterns!"},
      {t:"Fractions",c:"Pizza into 4 slices, eat 1 = 1/4. Bottom = total parts, top = parts you have. Draw circle, divide into 4, colour 3. You drew 3/4!"},
      {t:"Perimeter & Area",c:"PERIMETER: add all sides. Rectangle 5×3: 5+3+5+3=16cm. AREA: length×width = 5×3=15 sq cm. Measure your room!"}]},
    {name:"Science & Tech",icon:"🔬",syl:"Scientific method, ecosystems, human body, machines, states of matter, earth science, coding.",ls:[
      {t:"Scientific Method",c:"1) ASK question. 2) HYPOTHESIZE. 3) EXPERIMENT. 4) OBSERVE. 5) CONCLUDE. This method works for ANY question in the universe!"},
      {t:"States of Matter",c:"SOLID: fixed shape. LIQUID: flows. GAS: spreads everywhere. Temperature changes state: ice→water→steam. Cooling reverses it!"},
      {t:"Ecosystems",c:"Living+non-living things depend on each other. Trees→oxygen, insects→pollinate, birds→eat insects. Remove one and everything changes!"}]},
    {name:"World Cultures",icon:"🌍",syl:"Ancient civilizations, geography, cultural traditions, map skills, timelines, festivals.",ls:[
      {t:"Ancient Civilizations",c:"EGYPT: pyramids. MESOPOTAMIA: first writing+wheel. INDUS VALLEY: planned cities. CHINA: paper+compass. MAYA: advanced calendar. All amazing!"},
      {t:"Map Skills",c:"Maps need: TITLE, COMPASS ROSE, SCALE, KEY. 7 continents, 5 oceans. Label a blank world map — how many can you name?"},
      {t:"Cultural Celebrations",c:"DIWALI: lights. CHINESE NEW YEAR: dragons. EID: generosity. CHRISTMAS: giving. HANUKKAH: resilience. CARNIVAL: music+dance. All beautiful!"}]},
    {name:"Digital Literacy",icon:"💻",syl:"Typing, internet safety, coding basics, digital creativity, computational thinking.",ls:[
      {t:"Internet Safety",c:"NEVER share personal info online. Tell trusted adults if uncomfortable. Not everything online is true. Be KIND. Always ask before downloading."},
      {t:"Coding Logic",c:"Coding = step-by-step instructions. Write sandwich-making instructions — be VERY specific! That's computational thinking in action!"},
      {t:"Digital Creativity",c:"Art: Tux Paint. Music: Chrome Music Lab. Stories: text+images. Animation: stick figures. Express who YOU are digitally!"}]},
  ],
  discoverers:[
    {name:"English & Literature",icon:"📚",syl:"Analytical reading, essays, world literature, poetry, debate, research, media literacy.",ls:[
      {t:"Analytical Essays",c:"P.E.E. method: Point, Evidence, Explain. Ask 'HOW does the author create meaning?' not just 'WHAT happens?' Go deeper!"},
      {t:"World Poetry",c:"HAIKU: 17 syllables. PRAISE POETRY: rhythmic. QASIDA: imagery. SONNETS: 14 lines. Read poetry from 3 different cultures this week."},
      {t:"Media Literacy",c:"WHO created this? WHY? What TECHNIQUES are used? What's INCLUDED vs LEFT OUT? Analyze any advertisement you see today!"}]},
    {name:"Mathematics",icon:"📐",syl:"Algebra, geometry, statistics, probability, ratios, linear equations, coordinate geometry.",ls:[
      {t:"Algebra Basics",c:"x+5=12 → x=7. Whatever you do to one side, do to the other. Try: x+3=10; 2x=14; x-7=3. Algebra is a superpower!"},
      {t:"Statistics",c:"MEAN: sum÷count. MEDIAN: middle when sorted. MODE: most frequent. RANGE: max-min. Data 4,7,7,9,13: Mean=8, Median=7, Mode=7."},
      {t:"Coordinate Geometry",c:"(3,5)=go 3 right, 5 up. Plot (1,1),(3,1),(3,4),(1,4), connect = rectangle! Coordinates are addresses on a number grid."}]},
    {name:"Integrated Sciences",icon:"🧬",syl:"Biology (cells, genetics), Chemistry (atoms), Physics (forces), Earth science.",ls:[
      {t:"Cell Biology",c:"37 TRILLION cells in your body! NUCLEUS=brain+DNA. MITOCHONDRIA=powerhouse. MEMBRANE=gatekeeper. RIBOSOMES=protein factories. Amazing!"},
      {t:"Atoms & Elements",c:"118 elements. Hydrogen=1 proton. Carbon=6 (basis of all life). Gold=79. Atoms combine into molecules like H₂O = water!"},
      {t:"Forces & Motion",c:"Newton's Laws: 1) Inertia. 2) F=ma. 3) Equal+opposite reaction. Roll a ball on different surfaces — which has more friction?"}]},
    {name:"Social Sciences",icon:"🏛️",syl:"World history, economics, government, human rights, geography, global issues.",ls:[
      {t:"Government Systems",c:"DEMOCRACY: citizens vote. MONARCHY: king/queen rules. REPUBLIC: elected representatives. AUTHORITARIAN: one leader, limited freedom. Compare them!"},
      {t:"Economics",c:"SCARCITY: not enough for everyone. SUPPLY & DEMAND: rare+wanted=expensive. OPPORTUNITY COST: every choice means giving something up."},
      {t:"Human Rights",c:"1948 UN Declaration: 30 articles. Dignity, freedom, equality for ALL humans. Right to life, education, work. Where aren't they protected today?"}]},
    {name:"Tech & Computing",icon:"🖥️",syl:"Python, HTML/CSS, data literacy, AI awareness, cybersecurity.",ls:[
      {t:"Python Basics",c:"print('Hello!') Variables: name='Alex'. IF: if age>=13: print('teen'). FOR: for i in range(5): print(i). Build your first calculator!"},
      {t:"How the Internet Works",c:"URL→DNS→IP address→routers→server→HTML/CSS/JS→browser renders. Physical: underwater cables, satellites, servers — amazing infrastructure!"},
      {t:"Understanding AI",c:"ML learns from data, not rules. 10,000 cat pics→recognizes cats. Used for translation, self-driving cars, medical diagnosis. Can be biased!"}]},
  ],
  innovators:[
    {name:"Advanced Literature",icon:"📝",syl:"Rhetoric, research papers, world literature, public speaking, philosophy.",ls:[
      {t:"Rhetoric",c:"Aristotle: ETHOS (credibility), PATHOS (emotion), LOGOS (logic). Analyze a famous speech, then write your own using all three elements."},
      {t:"Research Papers",c:"Focused question→credible sources→notes+citations→thesis→outline→write→revise. Academic integrity: never plagiarize. Cite everything!"},
      {t:"Philosophy of Knowledge",c:"EMPIRICISM: knowledge from senses. RATIONALISM: knowledge from logic. Each has limits. What do YOU think is the most reliable source of knowledge?"}]},
    {name:"Advanced Mathematics",icon:"∑",syl:"Trigonometry, pre-calculus, statistics, modeling, financial math.",ls:[
      {t:"Trigonometry",c:"SOH-CAH-TOA: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj. Used in architecture, navigation, music production, and video games!"},
      {t:"Financial Mathematics",c:"Compound interest: A=P(1+r/n)^(nt). €1,000 at 7% for 30 years→€7,612. Start saving early — time is your greatest financial asset!"},
      {t:"Mathematical Modelling",c:"Bacteria doubling: P=100×2^t. After 5h: 3,200. Used in epidemiology, climate science, economics, and engineering design."}]},
    {name:"Sciences",icon:"⚗️",syl:"Genetics, chemistry, electromagnetism, ecology, lab methodology.",ls:[
      {t:"Genetics & DNA",c:"Double helix, 4 bases: A-T, C-G. ~20,000 genes. Punnett square: Bb×Bb = 25% bb (blue eyes). Your DNA is 99.9% identical to every other human!"},
      {t:"Chemical Reactions",c:"Conservation of Mass. Balance: 2H₂+O₂→2H₂O. Types: Synthesis, Decomposition, Replacement, Combustion. Chemistry is everywhere!"},
      {t:"Electromagnetism",c:"Moving charges create magnetic fields. Generators: magnet+wire→electricity. EM waves travel at 300,000 km/s — from radio to gamma rays!"}]},
    {name:"Computer Science & AI",icon:"🤖",syl:"Algorithms, data structures, web dev, machine learning, cybersecurity.",ls:[
      {t:"Algorithms",c:"Bubble Sort, Binary Search. Big O: O(n)=linear, O(log n)=fast. Write pseudocode for finding the maximum value in a list. Efficiency matters!"},
      {t:"Web Development",c:"HTML=structure. CSS=style. JavaScript=behavior. Build a portfolio: Home, About, Projects pages. Show the world who you are!"},
      {t:"Machine Learning",c:"Supervised: labeled data. Unsupervised: find patterns. Reinforcement: trial+error. ML can perpetuate biases — always question the data!"}]},
    {name:"Global Issues",icon:"🌐",syl:"Climate, economics, ethics, human rights, sustainable development.",ls:[
      {t:"Climate Change",c:"Earth +1.1°C since industrial era. Greenhouse gases trap heat. Solutions: renewables, carbon pricing, reforestation, changed consumption habits."},
      {t:"Ethical Frameworks",c:"UTILITARIANISM: greatest happiness. DEONTOLOGY: rules matter. VIRTUE ETHICS: good character. Trolley problem: what would each framework say?"},
      {t:"The SDGs",c:"17 UN Sustainable Development Goals by 2030: No Poverty, Quality Education, Climate Action. Research 3 goals: progress & challenges?"}]},
  ],
  pioneers:[
    {name:"Advanced Writing",icon:"🎓",syl:"Academic writing, thesis, research methodology, critical analysis.",ls:[
      {t:"Research Thesis",c:"Passionate topic→literature review→find GAP→research question→methodology→collect data→analyse→write→discuss implications. This is real research!"},
      {t:"Critical Analysis",c:"What ASSUMPTIONS are made? What EVIDENCE supports it? Is the methodology SOUND? What BIASES exist? How does it fit broader academic DISCOURSE?"}]},
    {name:"University Mathematics",icon:"∫",syl:"Calculus, linear algebra, discrete math, advanced statistics, proofs.",ls:[
      {t:"Derivatives",c:"Rate of change. f(x)=x²→f'(x)=2x. Power Rule: d/dx(xⁿ)=nxⁿ⁻¹. Applications: optimization, physics, machine learning gradient descent."},
      {t:"Integrals",c:"Accumulation: area under curves. ∫xⁿdx=xⁿ⁺¹/(n+1)+C. Fundamental Theorem connects derivatives and integrals — they are inverses of each other."},
      {t:"Linear Algebra",c:"Vectors, matrices, transformations. Essential for AI, computer graphics, engineering. Every Google search uses linear algebra. Master this!"}]},
    {name:"Advanced Sciences",icon:"🔭",syl:"Quantum physics, biochemistry, neuroscience, research methodology.",ls:[
      {t:"Quantum Physics",c:"Wave-particle duality. Heisenberg uncertainty principle. Superposition: all states until measured. Entanglement. The basis of quantum computing!"},
      {t:"Biochemistry",c:"Carbs=energy. Lipids=stored energy. Proteins=workers (20 amino acids). Central Dogma: DNA→mRNA→Protein. You are made of star stuff!"},
      {t:"Neuroscience",c:"86 billion neurons. Dopamine=reward. Serotonin=mood. NEUROPLASTICITY: your brain physically changes with every experience. You are building your brain NOW!"}]},
    {name:"Advanced Computing",icon:"⚡",syl:"System design, deep learning, cybersecurity, cloud architecture.",ls:[
      {t:"System Design",c:"Scalability, reliability, latency. Caching, CDNs. SQL vs NoSQL. Load balancers. Exercise: how would you design Twitter from scratch?"},
      {t:"Deep Learning",c:"Neural networks: input→hidden layers→output. Backpropagation. CNNs for images. Transformers for text. Powers autonomous vehicles and ChatGPT!"},
      {t:"Cybersecurity",c:"Phishing, malware, SQL injection, DDoS attacks. Defense: encryption, 2FA, firewalls, penetration testing. Humans remain the weakest link!"}]},
    {name:"Capstone Project",icon:"🚀",syl:"Independent research, portfolio, university prep, public presentation, synthesis.",ls:[
      {t:"Your Capstone",c:"Choose a real problem→deep research→innovative solution→prototype→3,000-5,000 word report→present publicly. This is YOUR legacy to the world."},
      {t:"Your Future Role",c:"Climate, AI, inequality, healthcare, space — YOUR generation's defining challenges. You have global connectivity, all human knowledge, and AI tools. Go light the world on fire!"}]},
  ],
};

const QUIZZES={
  math:[{q:"12×8?",o:["96","94","98","102"],a:0},{q:"√144?",o:["11","12","13","14"],a:1},{q:"25% of 200?",o:["40","45","50","55"],a:2},{q:"3x+6=21, x=?",o:["3","4","5","6"],a:2},{q:"2³?",o:["6","8","9","12"],a:1}],
  science:[{q:"Water symbol?",o:["WO","H₂O","HO₂","W"],a:1},{q:"Bones in body?",o:["196","206","216","226"],a:1},{q:"Closest to Sun?",o:["Venus","Earth","Mercury","Mars"],a:2},{q:"Plants absorb?",o:["O₂","N₂","CO₂","H₂"],a:2},{q:"Light speed?",o:["300k km/s","150k km/s","500k km/s","100k km/s"],a:0}],
  history:[{q:"WWII ended?",o:["1943","1944","1945","1946"],a:2},{q:"First on Moon?",o:["Aldrin","Armstrong","Gagarin","Glenn"],a:1},{q:"Berlin Wall fell?",o:["1987","1988","1989","1990"],a:2},{q:"Declaration author?",o:["Washington","Lincoln","Jefferson","Adams"],a:2},{q:"French Revolution?",o:["1776","1789","1799","1812"],a:1}],
  geography:[{q:"Largest continent?",o:["Africa","N.America","Asia","Europe"],a:2},{q:"Longest river?",o:["Amazon","Mississippi","Yangtze","Nile"],a:3},{q:"Most lakes?",o:["Russia","Canada","USA","Finland"],a:1},{q:"Australia capital?",o:["Sydney","Melbourne","Canberra","Brisbane"],a:2},{q:"Africa countries?",o:["44","54","64","74"],a:1}],
  coding:[{q:"HTML stands for?",o:["HyperText Markup Lang","HighText Machine Lang","HyperTransfer ML","None"],a:0},{q:"Styling uses?",o:["HTML","JS","CSS","Python"],a:2},{q:"A loop does?",o:["Creates bug","Repeats code","Stores data","Calls function"],a:1},{q:"CPU stands for?",o:["Central Processing Unit","Computer Personal Unit","Central Program Util","Core Process Unit"],a:0},{q:"NOT a language?",o:["Python","Java","Photoshop","Ruby"],a:2}],
  english:[{q:"Synonym for happy?",o:["Sad","Joyful","Angry","Tired"],a:1},{q:"Plural of child?",o:["Childs","Childes","Children","Childrens"],a:2},{q:"Quickly is a?",o:["Noun","Verb","Adjective","Adverb"],a:3},{q:"Proper noun?",o:["city","dog","London","car"],a:2},{q:"Antonym of ancient?",o:["Old","Modern","Historic","Classic"],a:1}],
  arts:[{q:"Primary colours?",o:["Red,Blue,Yellow","Red,Green,Blue","Pink,Purple,Orange","Black,White,Grey"],a:0},{q:"Mona Lisa painter?",o:["Picasso","Van Gogh","Da Vinci","Monet"],a:2},{q:"Notes per octave?",o:["7","8","12","16"],a:2},{q:"Tempo means?",o:["Volume","Speed","Pitch","Rhythm"],a:1},{q:"Sculpture uses?",o:["Canvas","3D material","Paper","Digital"],a:1}],
  pe:[{q:"Heart muscle type?",o:["Skeletal","Smooth","Cardiac","Voluntary"],a:2},{q:"Daily water intake?",o:["1L","2L","3L","4L"],a:1},{q:"Calcium found in?",o:["Bread","Dairy","Meat","Fruit"],a:1},{q:"Aerobic means?",o:["No oxygen","With oxygen","Fast twitch","Short burst"],a:1},{q:"Protein builds?",o:["Bones","Muscles","Blood","Fat"],a:1}],
  finance:[{q:"Interest is?",o:["Free money","Cost of borrowing","A tax","A discount"],a:1},{q:"Stocks represent?",o:["Loans","Company ownership","Bank savings","Insurance"],a:1},{q:"Inflation means?",o:["Prices fall","Prices stable","Prices rise","Prices controlled"],a:2},{q:"Budget helps?",o:["Spend more","Track spending","Avoid saving","Ignore debt"],a:1},{q:"GDP stands for?",o:["Gross Domestic Product","General Daily Pay","Global Dev Plan","None"],a:0}],
  env:[{q:"Main greenhouse gas?",o:["Oxygen","Nitrogen","CO₂","Helium"],a:2},{q:"Ozone protects from?",o:["Rain","UV rays","Wind","Earthquakes"],a:1},{q:"Renewable energy?",o:["Coal","Oil","Solar","Gas"],a:2},{q:"Deforestation causes?",o:["More oxygen","Less CO₂","Habitat loss","Cooler temps"],a:2},{q:"Ocean covers Earth?",o:["51%","61%","71%","81%"],a:2}],
  life:[{q:"CPR stands for?",o:["Cardio Pulmonary Resuscitation","Central Pulse Rhythm","Cardiac Pressure Response","None"],a:0},{q:"Safe food temp?",o:["0°C","60°C","100°C","150°C"],a:1},{q:"Good communication?",o:["Shouting","Active listening","Interrupting","Ignoring"],a:1},{q:"CV used for?",o:["Cooking","Job applications","Banking","Travel"],a:1},{q:"Burns first aid?",o:["Butter","Cool running water","Ice","Hot water"],a:1}],
  philosophy:[{q:"Socrates was from?",o:["Rome","Egypt","Greece","Persia"],a:2},{q:"Ethics studies?",o:["Numbers","Right and wrong","History","Nature"],a:1},{q:"Logic studies?",o:["Feelings","Valid reasoning","Politics","Art"],a:1},{q:"Plato's famous work?",o:["Odyssey","The Republic","Iliad","Meditations"],a:1},{q:"'I think therefore I am'?",o:["Kant","Aristotle","Descartes","Hume"],a:2}],
};

const FLASH={
  math:[{f:"7×8",b:"56"},{f:"√81",b:"9"},{f:"15% of 60",b:"9"},{f:"2⁴",b:"16"},{f:"π≈",b:"3.14159"},{f:"Area circle",b:"πr²"},{f:"Pythagoras",b:"a²+b²=c²"}],
  science:[{f:"H₂O",b:"Water"},{f:"CO₂",b:"Carbon Dioxide"},{f:"O₂",b:"Oxygen"},{f:"NaCl",b:"Salt"},{f:"Fe",b:"Iron"},{f:"Photosynthesis",b:"Light → Sugar+O₂"},{f:"DNA",b:"Deoxyribonucleic Acid"}],
  history:[{f:"1969",b:"Moon Landing"},{f:"1945",b:"WWII Ends"},{f:"1776",b:"USA Independence"},{f:"1789",b:"French Revolution"},{f:"1492",b:"Columbus Americas"},{f:"1914",b:"WWI Begins"},{f:"1989",b:"Berlin Wall Falls"}],
  languages:[{f:"Bonjour",b:"Hello (French)"},{f:"Gracias",b:"Thank you (Spanish)"},{f:"Ciao",b:"Hello/Bye (Italian)"},{f:"Danke",b:"Thank you (German)"},{f:"Namaste",b:"Hello (Hindi)"},{f:"Shukran",b:"Thank you (Arabic)"},{f:"Arigato",b:"Thank you (Japanese)"}],
};

const BADGES=[{e:"⭐",n:"First Step",x:0},{e:"🧠",n:"Quiz Whiz",x:50},{e:"🔥",n:"Streak Master",x:100},{e:"🌍",n:"Explorer",x:200},{e:"📚",n:"Scholar",x:300},{e:"🏆",n:"Master",x:500},{e:"👑",n:"Champion",x:750},{e:"🌟",n:"Legend",x:1000}];
const LANGS=[{c:"en",n:"English",f:"🇬🇧"},{c:"es",n:"Español",f:"🇪🇸"},{c:"fr",n:"Français",f:"🇫🇷"},{c:"de",n:"Deutsch",f:"🇩🇪"},{c:"pt",n:"Português",f:"🇧🇷"},{c:"ar",n:"العربية",f:"🇸🇦"},{c:"zh",n:"中文",f:"🇨🇳"},{c:"hi",n:"हिन्दी",f:"🇮🇳"},{c:"ja",n:"日本語",f:"🇯🇵"},{c:"ko",n:"한국어",f:"🇰🇷"},{c:"ru",n:"Русский",f:"🇷🇺"},{c:"sw",n:"Kiswahili",f:"🇰🇪"},{c:"tr",n:"Türkçe",f:"🇹🇷"},{c:"vi",n:"Tiếng Việt",f:"🇻🇳"},{c:"th",n:"ไทย",f:"🇹🇭"},{c:"id",n:"Indonesia",f:"🇮🇩"},{c:"it",n:"Italiano",f:"🇮🇹"},{c:"nl",n:"Nederlands",f:"🇳🇱"},{c:"pl",n:"Polski",f:"🇵🇱"},{c:"uk",n:"Українська",f:"🇺🇦"},{c:"bn",n:"বাংলা",f:"🇧🇩"},{c:"ta",n:"தமிழ்",f:"🇱🇰"},{c:"ur",n:"اردو",f:"🇵🇰"},{c:"fa",n:"فارسی",f:"🇮🇷"},{c:"he",n:"עברית",f:"🇮🇱"},{c:"ms",n:"Melayu",f:"🇲🇾"},{c:"fil",n:"Filipino",f:"🇵🇭"},{c:"am",n:"አማርኛ",f:"🇪🇹"},{c:"yo",n:"Yorùbá",f:"🇳🇬"},{c:"zu",n:"isiZulu",f:"🇿🇦"}];
const LABS=[
  {id:"volcano",e:"🌋",name:"Volcano Eruption",desc:"Mix baking soda and vinegar!",steps:["Add 2 tbsp baking soda to a container","Add a few drops of red food colouring","Slowly pour in 100ml of vinegar","Watch the eruption! 🌋"],science:"Acid-base reaction: NaHCO₃ + CH₃COOH → CO₂ gas + water + sodium acetate. CO₂ bubbles create the eruption!",items:["Baking soda","Vinegar","Food colouring","Container"],diff:"Easy",time:"5 mins"},
  {id:"rainbow",e:"🌈",name:"Rainbow in a Glass",desc:"Create density layers with liquids!",steps:["Fill ¼ with honey","Slowly pour dish soap","Add coloured water","Carefully pour vegetable oil"],science:"Different liquids have different densities! Honey (1.4 g/cm³) sinks. Oil (0.9 g/cm³) floats on water.",items:["Honey","Dish soap","Water","Vegetable oil","Food colouring"],diff:"Medium",time:"10 mins"},
  {id:"static",e:"⚡",name:"Static Electricity",desc:"Bend water with a charged balloon!",steps:["Blow up a balloon","Turn on thin stream of water","Rub balloon on hair 30 seconds","Bring balloon near water stream"],science:"Rubbing transfers electrons to balloon. Water molecules are polar — negative balloon attracts positive side of water!",items:["Balloon","Running tap","Your hair"],diff:"Easy",time:"3 mins"},
  {id:"chromatography",e:"🎨",name:"Colour Chromatography",desc:"Separate hidden colours in ink!",steps:["Cut strip of coffee filter","Draw black dot 2cm from bottom","Stand in glass with 1cm water","Watch colours separate up paper!"],science:"Black ink is a mixture! Water travels up by capillary action, carrying pigments at different speeds — separating into a rainbow!",items:["Coffee filter","Black felt-tip","Glass of water"],diff:"Easy",time:"15 mins"},
  {id:"plant",e:"🌱",name:"Growing from Seed",desc:"Watch germination happen!",steps:["Fill cup with damp soil","Place 3-4 bean seeds on top","Cover with thin soil layer","Water lightly daily — record changes"],science:"Seeds germinate with water, warmth and oxygen. The radicle (root) grows down, the plumule (shoot) grows toward light!",items:["Bean seeds","Soil","Cup","Water","Ruler"],diff:"Easy",time:"7-14 days"},
  {id:"gravity",e:"🍎",name:"Gravity & Air Resistance",desc:"Test if heavier objects fall faster!",steps:["Take flat paper and a book","Drop from same height — which lands first?","Place paper ON TOP of book","Drop again — what happens?"],science:"Galileo proved all objects fall at same rate in vacuum! Air resistance slows lighter objects. Book cuts through air for both!",items:["Book","Flat paper","A coin"],diff:"Easy",time:"5 mins"},
];
const WORKSHEETS=[
  {subj:"Mathematics",grade:"Ages 6-10",title:"Times Tables Practice",desc:"Multiplication tables 1-12",pages:4,icon:"🔢",color:"4facfe,00f2fe"},
  {subj:"Mathematics",grade:"Ages 10-14",title:"Algebra Fundamentals",desc:"Solving equations, graphs",pages:6,icon:"📐",color:"4facfe,00f2fe"},
  {subj:"Science",grade:"Ages 6-10",title:"The Human Body",desc:"Label organs, body systems",pages:5,icon:"🫀",color:"43e97b,38f9d7"},
  {subj:"Science",grade:"Ages 10-14",title:"Chemistry Basics",desc:"Atoms, elements, periodic table",pages:7,icon:"⚗️",color:"43e97b,38f9d7"},
  {subj:"Language Arts",grade:"Ages 3-6",title:"Alphabet & Phonics",desc:"Letter recognition, sounds, tracing",pages:8,icon:"🔤",color:"a18cd1,fbc2eb"},
  {subj:"Language Arts",grade:"Ages 6-10",title:"Grammar & Punctuation",desc:"Nouns, verbs, adjectives",pages:6,icon:"✏️",color:"a18cd1,fbc2eb"},
  {subj:"History",grade:"Ages 10-14",title:"World War II",desc:"Causes, events, key figures",pages:5,icon:"🏛️",color:"f093fb,f5576c"},
  {subj:"Geography",grade:"Ages 6-10",title:"World Maps & Continents",desc:"Label continents, countries, capitals",pages:6,icon:"🗺️",color:"4facfe,43e97b"},
  {subj:"Computer Science",grade:"Ages 10-14",title:"Introduction to Coding",desc:"Algorithms, flowcharts, Python",pages:5,icon:"💻",color:"667eea,764ba2"},
  {subj:"Financial Literacy",grade:"Ages 14-18",title:"Personal Finance",desc:"Budgeting, saving, investing",pages:4,icon:"💰",color:"0ba360,3cba92"},
  {subj:"Environmental Science",grade:"Ages 10-14",title:"Climate Change",desc:"Causes, effects, solutions",pages:5,icon:"🌱",color:"11998e,38ef7d"},
  {subj:"Arts & Music",grade:"Ages 6-10",title:"Music Theory Basics",desc:"Notes, rhythms, scales",pages:4,icon:"🎵",color:"fa709a,fee140"},
];
const CONV={"km→mi":v=>v*.621371,"mi→km":v=>v*1.60934,"kg→lb":v=>v*2.20462,"lb→kg":v=>v*.453592,"°C→°F":v=>v*9/5+32,"°F→°C":v=>(v-32)*5/9,"m→ft":v=>v*3.28084,"ft→m":v=>v*.3048,"L→gal":v=>v*.264172,"gal→L":v=>v*3.78541,"cm→in":v=>v*.393701,"in→cm":v=>v*2.54};
const FORMULAS=[{c:"Geometry",i:["Area of circle: πr²","Circumference: 2πr","Area of triangle: ½bh","Pythagoras: a²+b²=c²","Volume of sphere: 4/3πr³"]},{c:"Algebra",i:["Quadratic: (-b±√(b²-4ac))/2a","Slope: m=(y₂-y₁)/(x₂-x₁)","y=mx+c","a²-b²=(a+b)(a-b)"]},{c:"Stats",i:["Mean=Sum÷Count","Probability=Favourable÷Total","Range=Max−Min","Variance=Σ(x-μ)²/n"]}];
const TIPS=[{i:"🍅",t:"Pomodoro",d:"25min study + 5min break ×4"},{i:"🔄",t:"Spaced Repetition",d:"Review: 1d, 3d, 1wk, 1mo"},{i:"✍️",t:"Active Recall",d:"Close book, write all you remember"},{i:"🗣️",t:"Feynman Technique",d:"Explain to a 10-year-old"},{i:"🧩",t:"Mind Mapping",d:"Draw connected ideas visually"},{i:"💤",t:"Sleep Learning",d:"Sleep within 3h of studying"}];
const PILLARS=["🔥 Curiosity First","🤝 Collaborative Intelligence","🧭 Ethical Grounding","🌱 Growth Mindset","🌍 Global Awareness","💻 Digital Fluency","💛 Emotional Intelligence","🎨 Creative Power","🔬 Evidence-Based Thinking","💪 Physical Vitality","🗺️ Local + Global Identity","♾️ Lifelong Learning"];
const LANG_VOCAB={
  spanish:{flag:"🇪🇸",name:"Spanish",lessons:[
    {title:"Greetings",words:[{w:"Hola",t:"Hello",p:"OH-la"},{w:"Adiós",t:"Goodbye",p:"ah-DYOS"},{w:"Gracias",t:"Thank you",p:"GRAH-syahs"},{w:"Por favor",t:"Please",p:"por fah-VOR"},{w:"Lo siento",t:"I'm sorry",p:"lo SYEN-to"},{w:"Buenos días",t:"Good morning",p:"BWEH-nos DEE-as"}]},
    {title:"Numbers",words:[{w:"Uno",t:"One",p:"OO-no"},{w:"Dos",t:"Two",p:"dohs"},{w:"Tres",t:"Three",p:"trehs"},{w:"Cuatro",t:"Four",p:"KWAH-troh"},{w:"Cinco",t:"Five",p:"SEEN-koh"},{w:"Diez",t:"Ten",p:"dyehs"}]},
  ]},
  french:{flag:"🇫🇷",name:"French",lessons:[
    {title:"Greetings",words:[{w:"Bonjour",t:"Hello",p:"bon-ZHOOR"},{w:"Au revoir",t:"Goodbye",p:"oh reh-VWAHR"},{w:"Merci",t:"Thank you",p:"mair-SEE"},{w:"S'il vous plaît",t:"Please",p:"seel voo PLEH"},{w:"Bonne nuit",t:"Good night",p:"bon NWEE"},{w:"Comment ça va?",t:"How are you?",p:"koh-MAHN sah VAH"}]},
    {title:"Colours",words:[{w:"Rouge",t:"Red",p:"roozh"},{w:"Bleu",t:"Blue",p:"bluh"},{w:"Vert",t:"Green",p:"vair"},{w:"Jaune",t:"Yellow",p:"zhohn"},{w:"Noir",t:"Black",p:"nwahr"},{w:"Blanc",t:"White",p:"blahn"}]},
  ]},
  hindi:{flag:"🇮🇳",name:"Hindi",lessons:[
    {title:"Greetings",words:[{w:"नमस्ते",t:"Hello",p:"na-MAS-tay"},{w:"धन्यवाद",t:"Thank you",p:"DHAN-ya-vaad"},{w:"कृपया",t:"Please",p:"KRIP-ya"},{w:"अलविदा",t:"Goodbye",p:"al-VI-daa"},{w:"माफ करना",t:"Sorry",p:"maaf KAR-na"},{w:"सुप्रभात",t:"Good morning",p:"su-pra-BHAT"}]},
    {title:"Numbers",words:[{w:"एक",t:"One",p:"ek"},{w:"दो",t:"Two",p:"do"},{w:"तीन",t:"Three",p:"teen"},{w:"चार",t:"Four",p:"chaar"},{w:"पाँच",t:"Five",p:"paanch"},{w:"दस",t:"Ten",p:"das"}]},
  ]},
  arabic:{flag:"🇸🇦",name:"Arabic",lessons:[
    {title:"Greetings",words:[{w:"مرحبا",t:"Hello",p:"MAR-ha-ba"},{w:"شكراً",t:"Thank you",p:"SHUK-ran"},{w:"من فضلك",t:"Please",p:"min FAD-lak"},{w:"مع السلامة",t:"Goodbye",p:"ma-as-sa-LA-ma"},{w:"صباح الخير",t:"Good morning",p:"sa-BAH al-KHAYR"},{w:"أسف",t:"Sorry",p:"A-sif"}]},
    {title:"Numbers",words:[{w:"واحد",t:"One",p:"WA-hid"},{w:"اثنان",t:"Two",p:"ITH-nan"},{w:"ثلاثة",t:"Three",p:"tha-LA-tha"},{w:"أربعة",t:"Four",p:"AR-ba-a"},{w:"خمسة",t:"Five",p:"KHAM-sa"},{w:"عشرة",t:"Ten",p:"ASH-ra"}]},
  ]},
};

export default function App(){
  const [pg,setPg]=useState("home");
  const [xp,setXp]=useState(120);
  const [streak,setStrk]=useState(7);
  const [done,setDone]=useState(["math","science"]);
  const [fs,setFs]=useState(15);
  const [hc,setHc]=useState(false);
  const [dys,setDys]=useState(false);
  const [accP,setAccP]=useState(false);
  const [lang,setLang]=useState("en");
  const [showL,setShowL]=useState(false);
  const [spk,setSpk]=useState(false);
  const [theme,setTheme]=useState("gradient");
  const [stg,setStg]=useState(null);
  const [sIdx,setSIdx]=useState(null);
  const [lIdx,setLIdx]=useState(null);
  const [tab,setTab]=useState("syllabus");
  const [trl,setTrl]=useState(null);
  const [trling,setTrling]=useState(false);
  const [msgs,setMsgs]=useState([{r:"ai",t:"👋 Hi! I'm your AI Tutor powered by Claude! Ask me anything about any subject in any language. Let's learn together! 🌍"}]);
  const [inp,setInp]=useState("");
  const [aiL,setAiL]=useState(false);
  const endRef=useRef(null);
  const synth=useRef(null);
  const [qS,setQS]=useState(null);
  const [qI,setQI]=useState(0);
  const [qSc,setQSc]=useState(0);
  const [qSel,setQSel]=useState(null);
  const [qDn,setQDn]=useState(false);
  const [qLog,setQLog]=useState([]);
  const [fcS,setFcS]=useState("math");
  const [fcI,setFcI]=useState(0);
  const [fcF,setFcF]=useState(false);
  const [cvV,setCvV]=useState("");
  const [cvK,setCvK]=useState("km→mi");
  const [cvR,setCvR]=useState("");
  const [mg,setMg]=useState(null);
  const [mgI,setMgI]=useState("");
  const [mgFb,setMgFb]=useState("");
  const [mgSc,setMgSc]=useState(0);
  const [mgT,setMgT]=useState(0);
  const [mgTm,setMgTm]=useState(30);
  const [mgA,setMgA]=useState(false);
  const tmR=useRef(null);
  const [selLab,setSelLab]=useState(null);
  const [labStep,setLabStep]=useState(0);
  const [selLangV,setSelLangV]=useState("spanish");
  const [selLesson,setSelLesson]=useState(0);
  const [revealed,setRevealed]=useState({});
  const [wsFilter,setWsFilter]=useState("All");
  const [dlMsg,setDlMsg]=useState("");

  const lv=Math.floor(xp/100)+1,xpP=xp%100;
  const isG=theme==="gradient"&&!hc;
  const bgMain=hc?"#000":isG?"linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)":"#0f172a";

  useEffect(()=>{synth.current=window.speechSynthesis;},[]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const doSpeak=(text)=>{if(!synth.current)return;synth.current.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.9;u.onend=()=>setSpk(false);u.onerror=()=>setSpk(false);setSpk(true);synth.current.speak(u);};
  const stopSpk=()=>{synth.current?.cancel();setSpk(false);};
  const doTrl=async(text)=>{if(lang==="en"){setTrl(null);return;}setTrling(true);try{const ln=LANGS.find(l=>l.c===lang)?.n||lang;const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Translate to ${ln}. Output ONLY the translation:\n\n${text}`}]})});const d=await r.json();setTrl(d.content?.map(c=>c.text||"").join("")||text);}catch{setTrl("Translation unavailable.");}setTrling(false);};
  const sendAI=async()=>{if(!inp.trim()||aiL)return;const u=inp.trim();setInp("");setMsgs(m=>[...m,{r:"user",t:u}]);setAiL(true);try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are a warm AI Tutor for WorldSchool Free — free global education for ages 3–18, founded by Mahesh Thatikonda. Explain clearly, use emojis, be child-friendly and enthusiastic.",messages:[...msgs.slice(-6).map(m=>({role:m.r==="user"?"user":"assistant",content:m.t})),{role:"user",content:u}]})});const d=await r.json();setMsgs(m=>[...m,{r:"ai",t:d.content?.map(b=>b.text||"").join("")||"Please try again!"}]);}catch{setMsgs(m=>[...m,{r:"ai",t:"⚠️ Connection issue. Try again!"}]);}setAiL(false);};
  const startQ=(s)=>{setQS(s);setQI(0);setQSc(0);setQSel(null);setQDn(false);setQLog([]);setPg("quiz");};
  const ansQ=(i)=>{if(qSel!==null)return;const q=QUIZZES[qS][qI];setQSel(i);const ok=i===q.a;setQLog(l=>[...l,ok]);if(ok)setQSc(s=>s+1);setTimeout(()=>{if(qI+1>=QUIZZES[qS].length){setQDn(true);setXp(x=>x+(qSc+(ok?1:0))*20);}else{setQI(x=>x+1);setQSel(null);}},900);};
  const genMg=()=>{const ops=["+","-","×"];const op=ops[Math.floor(Math.random()*3)];let a,b,ans;if(op==="+"){a=Math.floor(Math.random()*50)+1;b=Math.floor(Math.random()*50)+1;ans=a+b;}else if(op==="-"){a=Math.floor(Math.random()*50)+10;b=Math.floor(Math.random()*a)+1;ans=a-b;}else{a=Math.floor(Math.random()*12)+1;b=Math.floor(Math.random()*12)+1;ans=a*b;}setMg({q:`${a} ${op} ${b} = ?`,ans:String(ans)});setMgI("");setMgFb("");};
  const startMg=()=>{setMgSc(0);setMgT(0);setMgTm(30);setMgA(true);genMg();tmR.current=setInterval(()=>{setMgTm(t=>{if(t<=1){clearInterval(tmR.current);setMgA(false);return 0;}return t-1;});},1000);};
  const checkMg=()=>{if(!mg||!mgA)return;setMgT(t=>t+1);if(mgI.trim()===mg.ans){setMgFb("✅ +10XP!");setMgSc(s=>s+1);setXp(x=>x+10);}else setMgFb(`❌ Was ${mg.ans}`);setTimeout(genMg,700);};
  const doConv=()=>{const v=parseFloat(cvV);if(isNaN(v)){setCvR("Enter a number");return;}const fn=CONV[cvK];setCvR(fn?`${cvV} ${cvK.split("→")[0]} = ${fn(v).toFixed(4)} ${cvK.split("→")[1]}`:"N/A");};
  const downloadWS=(ws)=>{setDlMsg(`📥 Downloading: ${ws.title}...`);setTimeout(()=>{const blob=new Blob([`WORLDSCHOOL FREE\n${"=".repeat(40)}\n${ws.title}\nSubject: ${ws.subj} | Grade: ${ws.grade}\n${ws.desc}\n\nFounded by Mahesh Thatikonda\nFree Forever · For Every Child on Earth`],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`WorldSchool_${ws.title.replace(/ /g,"_")}.txt`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);setDlMsg(`✅ ${ws.title} downloaded! +15 XP`);setXp(x=>x+15);setTimeout(()=>setDlMsg(""),3000);},800);};
  const go=(p)=>{setPg(p);setStg(null);setSIdx(null);setLIdx(null);setTrl(null);setShowL(false);};

  const langN=LANGS.find(l=>l.c===lang)?.n||"English";
  const curStg=stg?CUR[stg]:null;
  const curSubj=curStg&&sIdx!==null?curStg[sIdx]:null;
  const cardBg=hc?"#111":isG?"rgba(255,255,255,.97)":"rgba(255,255,255,.04)";
  const cardTxt=hc?"#fff":isG?"#222":"#e2e8f0";
  const cardBdr=hc?"#333":isG?"rgba(0,0,0,.08)":"rgba(255,255,255,.08)";
  const subTxt=hc?"#aaa":isG?"#666":"#94a3b8";
  const inpBg=hc?"#222":isG?"#f8f8ff":"#1e293b";
  const navBg=hc?"#111":isG?"rgba(255,255,255,.97)":"rgba(15,23,42,.95)";

  const Card=({children,style={},onClick})=><div onClick={onClick} style={{background:cardBg,borderRadius:20,padding:22,boxShadow:isG?"0 4px 30px rgba(0,0,0,.1)":"none",border:`1px solid ${cardBdr}`,color:cardTxt,...style}}>{children}</div>;
  const Btn=({onClick,children,style={},bg="linear-gradient(135deg,#667eea,#764ba2)",disabled})=><button onClick={onClick} disabled={disabled} style={{background:bg,color:"#fff",border:"none",borderRadius:12,padding:"10px 20px",fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.6:1,fontSize:13,...style}}>{children}</button>;
  const GT=({g,children})=><span style={{background:`linear-gradient(135deg,${g})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{children}</span>;
  const NAV=[{id:"home",l:"🏠"},{id:"curriculum",l:"📚 Curriculum"},{id:"learn",l:"📖 Subjects"},{id:"ai-tutor",l:"🤖 AI Tutor"},{id:"games",l:"🎮 Games"},{id:"tools",l:"🔧 Tools"},{id:"lab",l:"🧪 Lab"},{id:"lang-vocab",l:"🌐 Languages"},{id:"worksheets",l:"📄 Worksheets"},{id:"dashboard",l:"📊 Dashboard"},{id:"founder",l:"👤 Founder"}];

  return(
    <div style={{minHeight:"100vh",background:bgMain,color:cardTxt,fontFamily:dys?"Arial,sans-serif":"system-ui,sans-serif",fontSize:fs}}>
      <nav style={{background:navBg,backdropFilter:"blur(12px)",padding:"0 12px",position:"sticky",top:0,zIndex:100,boxShadow:isG?"0 2px 20px rgba(0,0,0,.1)":"none",borderBottom:isG?"none":`1px solid ${cardBdr}`}}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",padding:"5px 0"}}>
          <div style={{fontWeight:900,fontSize:17,marginRight:6,cursor:"pointer",whiteSpace:"nowrap"}} onClick={()=>go("home")}><GT g="#667eea,#f093fb">🌍 WorldSchool Free</GT></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:1,flex:1}}>{NAV.map(n=><button key={n.id} onClick={()=>go(n.id)} style={{padding:"6px 8px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:10,background:pg===n.id?(isG?"linear-gradient(135deg,#667eea,#764ba2)":"rgba(99,102,241,.25)"):"transparent",color:pg===n.id?(isG?"#fff":"#818cf8"):(isG?"#555":"#94a3b8"),whiteSpace:"nowrap"}}>{n.l}</button>)}</div>
          <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
            <span style={{background:"linear-gradient(135deg,#f093fb,#f5576c)",color:"#fff",padding:"3px 7px",borderRadius:20,fontWeight:700,fontSize:10}}>⚡{xp}</span>
            <span style={{background:"linear-gradient(135deg,#fa709a,#fee140)",color:"#fff",padding:"3px 7px",borderRadius:20,fontWeight:700,fontSize:10}}>🔥{streak}d</span>
            <span style={{background:"linear-gradient(135deg,#4facfe,#00f2fe)",color:"#fff",padding:"3px 7px",borderRadius:20,fontWeight:700,fontSize:10}}>Lv{lv}</span>
            <div style={{position:"relative"}}>
              <button onClick={()=>setShowL(!showL)} style={{padding:"4px 7px",borderRadius:8,border:`1px solid ${cardBdr}`,background:isG?"#f0f0f0":cardBg,color:isG?"#333":cardTxt,cursor:"pointer",fontSize:10}}>{LANGS.find(l=>l.c===lang)?.f}▾</button>
              {showL&&<div style={{position:"absolute",top:30,right:0,background:isG?"#fff":"#1e293b",borderRadius:12,border:`1px solid ${cardBdr}`,maxHeight:300,overflowY:"auto",zIndex:300,width:160,boxShadow:"0 20px 40px rgba(0,0,0,.4)"}}>
                {LANGS.map(l=><div key={l.c} onClick={()=>{setLang(l.c);setShowL(false);setTrl(null);}} style={{padding:"6px 12px",cursor:"pointer",background:lang===l.c?"rgba(99,102,241,.2)":"transparent",display:"flex",gap:6,fontSize:11,color:isG?"#333":"#e2e8f0",borderBottom:`1px solid ${cardBdr}`}}>{l.f} {l.n}</div>)}
              </div>}
            </div>
            <button onClick={()=>setAccP(p=>!p)} style={{background:isG?"#f0f0f0":cardBg,border:`1px solid ${cardBdr}`,borderRadius:8,padding:"4px 6px",cursor:"pointer",fontSize:10,color:isG?"#333":cardTxt}}>♿</button>
          </div>
        </div>
      </nav>

      {accP&&<div style={{position:"fixed",top:52,right:10,background:isG?"#fff":"#1e293b",borderRadius:16,padding:18,boxShadow:"0 8px 40px rgba(0,0,0,.3)",zIndex:200,width:230,border:`1px solid ${cardBdr}`,color:isG?"#222":"#e2e8f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><strong style={{fontSize:13}}>♿ Accessibility</strong><button onClick={()=>setAccP(false)} style={{border:"none",background:"none",color:isG?"#222":"#fff",cursor:"pointer",fontSize:16}}>✕</button></div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div><label style={{fontSize:11,display:"block",marginBottom:3}}>Text Size: {fs}px</label><input type="range" min={12} max={22} value={fs} onChange={e=>setFs(+e.target.value)} style={{width:"100%"}}/></div>
          <label style={{display:"flex",gap:8,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={hc} onChange={e=>setHc(e.target.checked)}/>High Contrast</label>
          <label style={{display:"flex",gap:8,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={dys} onChange={e=>setDys(e.target.checked)}/>Dyslexia Font</label>
          <label style={{display:"flex",gap:8,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={theme==="gradient"} onChange={e=>setTheme(e.target.checked?"gradient":"dark")}/>🌈 Gradient / 🌙 Dark</label>
        </div>
      </div>}

      <div style={{maxWidth:1300,margin:"0 auto",padding:"22px 12px"}}>

        {pg==="home"&&<>
          <div style={{textAlign:"center",padding:"40px 0 32px",color:isG?"#fff":cardTxt}}>
            <div style={{fontSize:54,marginBottom:6}}>🌍</div>
            <h1 style={{fontWeight:900,fontSize:"clamp(28px,5vw,46px)",margin:"0 0 10px",lineHeight:1.1}}>WorldSchool Free</h1>
            <p style={{fontSize:16,opacity:.9,maxWidth:580,margin:"0 auto 22px",lineHeight:1.6}}>World-class, AI-powered, gamified education for every child on Earth. Ages 3–18. 100% Free. Forever.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>go("curriculum")} style={{background:isG?"#fff":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:isG?"#667eea":"#fff",border:"none",borderRadius:30,padding:"13px 28px",fontWeight:800,fontSize:14,cursor:"pointer"}}>🚀 Start Learning</button>
              <button onClick={()=>go("ai-tutor")} style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"2px solid rgba(255,255,255,.4)",borderRadius:30,padding:"13px 28px",fontWeight:800,fontSize:14,cursor:"pointer"}}>🤖 AI Tutor</button>
              <button onClick={()=>go("lab")} style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"2px solid rgba(255,255,255,.4)",borderRadius:30,padding:"13px 28px",fontWeight:800,fontSize:14,cursor:"pointer"}}>🧪 Science Lab</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:8,marginBottom:28}}>
            {[{n:"195",l:"Countries",e:"🌍"},{n:"5",l:"Age Stages",e:"📚"},{n:"16",l:"Subjects",e:"🎓"},{n:"12",l:"Quizzes",e:"✏️"},{n:"30",l:"Languages",e:"🌐"},{n:"6",l:"Lab Exps",e:"🧪"},{n:"12",l:"Worksheets",e:"📄"},{n:"AI",l:"Tutor",e:"🤖"}].map(s=><div key={s.n} style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",borderRadius:14,padding:"14px 8px",textAlign:"center",color:"#fff"}}><div style={{fontSize:18}}>{s.e}</div><div style={{fontWeight:900,fontSize:20}}>{s.n}</div><div style={{opacity:.8,fontSize:10}}>{s.l}</div></div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:28}}>
            {[{i:"📚",t:"Full Curriculum",d:"5 age stages, 80+ lessons, audio & 30-language translation",p:"curriculum",g:"#667eea,#764ba2"},{i:"🤖",t:"AI Tutor",d:"Claude AI — ask anything, 24/7, any language",p:"ai-tutor",g:"#f093fb,#f5576c"},{i:"🧪",t:"Science Lab",d:"6 real experiments with science explained",p:"lab",g:"#43e97b,#38f9d7"},{i:"🌐",t:"Languages",d:"Spanish, French, Hindi, Arabic vocabulary",p:"lang-vocab",g:"#a18cd1,#fbc2eb"},{i:"📄",t:"Worksheets",d:"12 free downloadable worksheets",p:"worksheets",g:"#fda085,#f6d365"},{i:"🎮",t:"Games",d:"XP, badges, streaks, leaderboard",p:"games",g:"#4facfe,#00f2fe"}].map(f=><Card key={f.t} style={{cursor:"pointer"}} onClick={()=>go(f.p)}><div style={{fontSize:28,marginBottom:5}}>{f.i}</div><h3 style={{margin:"0 0 4px",fontWeight:800,fontSize:13}}><GT g={f.g}>{f.t}</GT></h3><p style={{margin:0,color:subTxt,fontSize:11,lineHeight:1.5}}>{f.d}</p></Card>)}
          </div>
          <h2 style={{fontWeight:900,fontSize:22,textAlign:"center",marginBottom:12,color:isG?"#fff":cardTxt}}>📚 16 World-Class Subjects</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:7,marginBottom:28}}>
            {SUBJECTS_16.map(s=><div key={s.id} onClick={()=>go("learn")} style={{background:`linear-gradient(135deg,${s.bg})`,borderRadius:13,padding:12,cursor:"pointer",color:"#fff"}}><div style={{fontSize:20}}>{s.e}</div><div style={{fontWeight:700,fontSize:11,marginTop:2}}>{s.name}</div><div style={{opacity:.8,fontSize:9}}>{s.desc}</div></div>)}
          </div>
          <h2 style={{fontWeight:900,fontSize:22,textAlign:"center",marginBottom:12,color:isG?"#fff":cardTxt}}>🎓 Ages 3–18 — One Unbroken Path</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10,marginBottom:28}}>
            {STAGES.map(st=><div key={st.id} onClick={()=>{setPg("curriculum");setStg(st.id);}} style={{padding:18,borderRadius:14,background:isG?"rgba(255,255,255,.15)":cardBg,border:`2px solid ${st.color}44`,cursor:"pointer",textAlign:"center",color:isG?"#fff":cardTxt}}><div style={{fontSize:28}}>{st.label.split(" ")[0]}</div><div style={{fontWeight:700,fontSize:14}}>{st.label.split(" ").slice(1).join(" ")}</div><div style={{color:st.color,fontWeight:600,fontSize:12}}>{st.ages}</div></div>)}
          </div>
          <h2 style={{fontWeight:900,fontSize:22,textAlign:"center",marginBottom:12,color:isG?"#fff":cardTxt}}>✨ The 12 Pillars of WorldSchool</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:7,marginBottom:28}}>
            {PILLARS.map(p=><div key={p} style={{padding:12,borderRadius:12,background:isG?"rgba(255,255,255,.12)":cardBg,border:`1px solid ${cardBdr}`,textAlign:"center",fontSize:11,fontWeight:600,color:isG?"#fff":cardTxt}}>{p}</div>)}
          </div>
          <div style={{background:isG?"rgba(255,255,255,.12)":"linear-gradient(135deg,rgba(99,102,241,.1),rgba(236,72,153,.1))",borderRadius:20,padding:26,textAlign:"center",border:`1px solid ${isG?"rgba(255,255,255,.2)":cardBdr}`,marginBottom:28}}>
            <p style={{fontStyle:"italic",fontSize:15,lineHeight:1.65,margin:"0 0 10px",maxWidth:540,marginLeft:"auto",marginRight:"auto",color:isG?"#fff":cardTxt}}>"Poverty is not destiny. Geography is not destiny. Every child carries a world-class education in their pocket — forever free, forever theirs."</p>
            <p style={{fontWeight:700,opacity:.8,color:isG?"#fff":cardTxt,margin:0}}>— Mahesh Thatikonda, Founder</p>
          </div>
        </>}

        {pg==="curriculum"&&<>
          {!stg&&<><h1 style={{fontWeight:900,fontSize:26,marginBottom:4,color:isG?"#fff":cardTxt}}>📚 Full Curriculum</h1><p style={{color:isG?"rgba(255,255,255,.8)":subTxt,marginBottom:18}}>Select your age stage.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12}}>
              {STAGES.map(st=><div key={st.id} onClick={()=>{setStg(st.id);setSIdx(null);setLIdx(null);setTrl(null);}} style={{padding:22,borderRadius:16,background:isG?"rgba(255,255,255,.15)":cardBg,border:`2px solid ${st.color}44`,cursor:"pointer",textAlign:"center",color:isG?"#fff":cardTxt}}><div style={{fontSize:34}}>{st.label.split(" ")[0]}</div><div style={{fontWeight:700,fontSize:16}}>{st.label.split(" ").slice(1).join(" ")}</div><div style={{color:st.color,fontWeight:600,fontSize:13}}>{st.ages}</div><div style={{color:isG?"rgba(255,255,255,.6)":subTxt,fontSize:11,marginTop:4}}>{CUR[st.id].length} subjects · {CUR[st.id].reduce((a,s)=>a+s.ls.length,0)} lessons</div></div>)}
            </div></>}
          {stg&&sIdx===null&&<><button onClick={()=>setStg(null)} style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${cardBdr}`,background:"transparent",color:subTxt,cursor:"pointer",fontSize:11,marginBottom:12}}>← All Stages</button>
            <h2 style={{fontWeight:800,fontSize:22,marginBottom:12,color:isG?"#fff":cardTxt}}>{STAGES.find(s=>s.id===stg)?.label}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
              {curStg.map((s,i)=><Card key={i} style={{cursor:"pointer"}} onClick={()=>{setSIdx(i);setLIdx(null);setTab("syllabus");setTrl(null);}}><div style={{fontSize:24,marginBottom:4}}>{s.icon}</div><div style={{fontWeight:700,fontSize:14}}>{s.name}</div><div style={{color:subTxt,fontSize:11,marginTop:2}}>{s.ls.length} lessons</div></Card>)}
            </div></>}
          {curSubj&&<><button onClick={()=>{setSIdx(null);setLIdx(null);setTrl(null);}} style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${cardBdr}`,background:"transparent",color:subTxt,cursor:"pointer",fontSize:11,marginBottom:12}}>← Back</button>
            <h2 style={{fontWeight:800,fontSize:20,marginBottom:4,color:isG?"#fff":cardTxt}}>{curSubj.icon} {curSubj.name}</h2>
            <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
              {["syllabus","lessons","audio"].map(t=><button key={t} onClick={()=>{setTab(t);setLIdx(null);setTrl(null);}} style={{padding:"7px 14px",borderRadius:8,border:"none",background:tab===t?"linear-gradient(135deg,#667eea,#764ba2)":cardBg,color:tab===t?"#fff":subTxt,cursor:"pointer",fontSize:12,fontWeight:600}}>{t==="syllabus"?"📋":t==="lessons"?"📖":"🔊"} {t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
            </div>
            {tab==="syllabus"&&<Card><h3 style={{marginBottom:8,fontWeight:700}}>📋 Syllabus</h3><p style={{lineHeight:1.85,fontSize:14}}>{trl||curSubj.syl}</p>
              <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
                <button onClick={()=>spk?stopSpk():doSpeak(trl||curSubj.syl)} style={{padding:"6px 12px",borderRadius:8,border:"none",background:spk?"#ef4444":"#10b981",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>{spk?"⏹ Stop":"▶ Listen"} ({langN})</button>
                {lang!=="en"&&<Btn bg="linear-gradient(135deg,#8b5cf6,#a855f7)" onClick={()=>doTrl(curSubj.syl)} disabled={trling} style={{fontSize:11}}>{trling?"⏳ Translating...":"🌐 Translate → "+langN}</Btn>}
              </div></Card>}
            {tab==="lessons"&&<div>{curSubj.ls.map((l,i)=><div key={i} style={{marginBottom:6}}>
              <div onClick={()=>{setLIdx(lIdx===i?null:i);setTrl(null);}} style={{padding:12,borderRadius:10,background:lIdx===i?(isG?"rgba(102,126,234,.15)":"rgba(99,102,241,.15)"):cardBg,border:lIdx===i?"1px solid #667eea":`1px solid ${cardBdr}`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,fontSize:13,color:cardTxt}}>📖 {i+1}: {l.t}</span>
                <span style={{fontSize:10,color:subTxt}}>{lIdx===i?"▲":"▼"}</span>
              </div>
              {lIdx===i&&<Card style={{borderTopLeftRadius:0,borderTopRightRadius:0,marginTop:0}}>
                <p style={{lineHeight:1.9,fontSize:14}}>{trl||l.c}</p>
                <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
                  <button onClick={()=>spk?stopSpk():doSpeak(trl||l.c)} style={{padding:"6px 12px",borderRadius:8,border:"none",background:spk?"#ef4444":"#10b981",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>{spk?"⏹ Stop":"▶ Listen"}</button>
                  {lang!=="en"&&<Btn bg="linear-gradient(135deg,#8b5cf6,#a855f7)" onClick={()=>doTrl(l.c)} disabled={trling} style={{fontSize:11}}>{trling?"⏳":"🌐 Translate → "+langN}</Btn>}
                </div>
              </Card>}
            </div>)}</div>}
            {tab==="audio"&&<Card><h3 style={{marginBottom:12,fontWeight:700}}>🔊 Listen in {langN}</h3>
              {curSubj.ls.map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:10,background:isG?"#f8f8ff":cardBg,borderRadius:8,marginBottom:5,border:`1px solid ${cardBdr}`}}>
                <button onClick={()=>spk?stopSpk():doSpeak(l.c)} style={{padding:"5px 10px",borderRadius:8,border:"none",background:spk?"#ef4444":"#10b981",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>{spk?"⏹":"▶"}</button>
                <div><div style={{fontWeight:600,fontSize:12,color:cardTxt}}>{i+1}: {l.t}</div><div style={{fontSize:10,color:subTxt}}>Click to hear in {langN}</div></div>
              </div>)}
            </Card>}
          </>}
        </>}

        {pg==="learn"&&<>
          <h1 style={{fontWeight:900,fontSize:26,marginBottom:4,color:isG?"#fff":cardTxt}}>📖 All 16 Subjects</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
            {SUBJECTS_16.map(s=>{const isDn=done.includes(s.id);const hasQ=!!QUIZZES[s.id];return(
              <Card key={s.id}><div style={{display:"flex",gap:10,marginBottom:10}}><span style={{fontSize:28}}>{s.e}</span><div style={{flex:1}}><h3 style={{margin:0,fontWeight:800,fontSize:13}}><GT g={s.bg}>{s.name}</GT></h3><p style={{margin:0,color:subTxt,fontSize:11}}>{s.desc}</p></div>{isDn&&<span style={{fontSize:14}}>✅</span>}</div>
              <div style={{display:"flex",gap:6}}>
                <Btn style={{flex:1,fontSize:11,padding:"8px 10px"}} onClick={()=>{if(!isDn){setDone(d=>[...d,s.id]);setXp(x=>x+30);}alert(`📖 ${s.name}\n\n${isDn?"Review mode!":"🎉 +30 XP!"}\n\nCovers: ${s.desc}`);}} >📖 Lesson{isDn?" ✅":""}</Btn>
                {hasQ&&<Btn style={{flex:1,fontSize:11,padding:"8px 10px"}} bg="linear-gradient(135deg,#f093fb,#f5576c)" onClick={()=>startQ(s.id)}>✏️ Quiz</Btn>}
              </div></Card>);})}
          </div>
        </>}

        {pg==="ai-tutor"&&<div style={{maxWidth:660,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:14,color:isG?"#fff":cardTxt}}><div style={{fontSize:42}}>🤖</div><h1 style={{fontWeight:900,fontSize:26,margin:"4px 0"}}>AI Tutor</h1><p style={{color:isG?"rgba(255,255,255,.8)":subTxt,fontSize:12}}>Powered by Claude — any subject, any language!</p></div>
          <Card style={{overflow:"hidden",padding:0}}>
            <div style={{height:360,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
              {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.r==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"82%",background:m.r==="user"?"linear-gradient(135deg,#667eea,#764ba2)":(isG?"#f4f4ff":"rgba(255,255,255,.06)"),color:m.r==="user"?"#fff":cardTxt,borderRadius:m.r==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{m.r==="ai"&&<span style={{fontWeight:700,color:"#667eea",display:"block",marginBottom:2,fontSize:10}}>🤖 AI Tutor</span>}{m.t}</div></div>)}
              {aiL&&<div style={{display:"flex"}}><div style={{background:isG?"#f4f4ff":"rgba(255,255,255,.06)",borderRadius:"16px 16px 16px 4px",padding:"10px 14px",fontSize:13,color:cardTxt}}><span style={{fontWeight:700,color:"#667eea",display:"block",fontSize:10}}>🤖 AI Tutor</span>⏳ Thinking...</div></div>}
              <div ref={endRef}/>
            </div>
            <div style={{padding:"10px 14px",borderTop:`1px solid ${cardBdr}`,display:"flex",gap:8}}>
              <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAI()} placeholder="Ask anything..." style={{flex:1,border:`1px solid ${cardBdr}`,borderRadius:10,padding:"10px 12px",fontSize:13,outline:"none",background:inpBg,color:cardTxt}}/>
              <Btn onClick={sendAI} disabled={aiL||!inp.trim()} style={{padding:"10px 14px",fontSize:16}}>➤</Btn>
            </div>
          </Card>
          <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>
            {["🌱 Photosynthesis","🔢 Fractions","🌍 Universe size?","💻 What's a loop?","🏛️ Pyramids?","💡 Thunder?","🧬 DNA?","🌏 Climate change?"].map(s=><button key={s} onClick={()=>setInp(s)} style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.3)",borderRadius:20,padding:"5px 10px",cursor:"pointer",fontSize:10,fontWeight:600}}>{s}</button>)}
          </div>
        </div>}

        {pg==="quiz"&&qS&&<div style={{maxWidth:540,margin:"0 auto"}}>
          {!qDn?<Card>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontWeight:700,color:"#667eea",fontSize:12}}>Q{qI+1}/{QUIZZES[qS].length}</span><span style={{background:"linear-gradient(135deg,#43e97b,#38f9d7)",color:"#fff",padding:"3px 10px",borderRadius:20,fontWeight:700,fontSize:11}}>Score: {qSc}</span><button onClick={()=>go("learn")} style={{border:`1px solid ${cardBdr}`,borderRadius:8,padding:"3px 10px",cursor:"pointer",background:"none",fontSize:10,color:subTxt}}>✕ Exit</button></div>
            <div style={{background:isG?"#f0f0ff":"rgba(99,102,241,.1)",borderRadius:14,height:6,marginBottom:12}}><div style={{width:`${(qI/QUIZZES[qS].length)*100}%`,height:"100%",background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:14}}/></div>
            <div style={{background:isG?"#f8f8ff":"rgba(255,255,255,.05)",borderRadius:14,padding:14,marginBottom:12}}><h3 style={{margin:0,fontSize:15,fontWeight:800,color:cardTxt}}>{QUIZZES[qS][qI].q}</h3></div>
            <div style={{display:"grid",gap:7}}>{QUIZZES[qS][qI].o.map((o,i)=>{const cor=QUIZZES[qS][qI].a;let bg2=isG?"#f4f4f4":cardBg,bdr2=cardBdr;if(qSel!==null){if(i===cor){bg2=isG?"#d4edda":"rgba(16,185,129,.2)";bdr2="#10b981";}else if(i===qSel){bg2=isG?"#f8d7da":"rgba(239,68,68,.2)";bdr2="#ef4444";}}return<button key={i} onClick={()=>ansQ(i)} style={{background:bg2,border:`2px solid ${bdr2}`,borderRadius:10,padding:"10px 14px",textAlign:"left",cursor:qSel===null?"pointer":"default",fontWeight:600,fontSize:12,color:cardTxt}}><span style={{color:subTxt,marginRight:6}}>{"ABCD"[i]}.</span>{o}{qSel!==null&&i===cor&&" ✅"}{qSel===i&&i!==cor&&" ❌"}</button>;})}</div>
          </Card>:<Card style={{textAlign:"center"}}>
            <div style={{fontSize:50}}>{qSc===QUIZZES[qS].length?"🏆":qSc>=3?"🎉":"💪"}</div>
            <h2 style={{fontWeight:900,fontSize:22}}>Quiz Complete!</h2>
            <div style={{fontSize:40,fontWeight:900,margin:"6px 0"}}><GT g="#667eea,#764ba2">{qSc}/{QUIZZES[qS].length}</GT></div>
            <p style={{color:subTxt,marginBottom:14}}>+{qSc*20} XP earned!</p>
            <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}><Btn onClick={()=>startQ(qS)}>🔄 Retry</Btn><Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" onClick={()=>go("learn")}>📚 More</Btn><Btn bg="linear-gradient(135deg,#f093fb,#f5576c)" onClick={()=>go("dashboard")}>📊 Dashboard</Btn></div>
          </Card>}
        </div>}

        {pg==="games"&&<><h1 style={{fontWeight:900,fontSize:26,marginBottom:14,color:isG?"#fff":cardTxt}}>🎮 Learning Games</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:14}}>
            <Card><h3 style={{fontWeight:800,marginBottom:4}}><GT g="#4facfe,#00f2fe">⚡ Maths Speed</GT></h3><p style={{color:subTxt,fontSize:11,marginBottom:12}}>30 sec · +10 XP per correct answer</p>
              {!mgA&&mgTm===30&&<Btn bg="linear-gradient(135deg,#4facfe,#00f2fe)" style={{width:"100%",padding:12}} onClick={startMg}>🚀 Start!</Btn>}
              {!mgA&&mgTm===0&&<div style={{textAlign:"center"}}><div style={{fontSize:38}}>🏁</div><div style={{fontWeight:900,fontSize:24}}><GT g="#4facfe,#00f2fe">{mgSc}/{mgT}</GT></div><p style={{color:subTxt,fontSize:11}}>+{mgSc*10} XP!</p><Btn bg="linear-gradient(135deg,#4facfe,#00f2fe)" style={{width:"100%"}} onClick={()=>{setMgTm(30);setMgSc(0);setMgT(0);}}>🔄 Again</Btn></div>}
              {mgA&&mg&&<><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:700,color:"#f5576c",fontSize:14}}>⏱{mgTm}s</span><span style={{fontWeight:700,color:"#43e97b",fontSize:13}}>✅{mgSc}/{mgT}</span></div><div style={{background:"linear-gradient(135deg,#4facfe,#00f2fe)",borderRadius:14,padding:20,textAlign:"center",color:"#fff",marginBottom:10}}><div style={{fontSize:24,fontWeight:900}}>{mg.q}</div></div>{mgFb&&<div style={{textAlign:"center",fontWeight:700,marginBottom:8}}>{mgFb}</div>}<div style={{display:"flex",gap:6}}><input value={mgI} onChange={e=>setMgI(e.target.value)} onKeyDown={e=>e.key==="Enter"&&checkMg()} placeholder="Answer..." style={{flex:1,border:`1px solid ${cardBdr}`,borderRadius:8,padding:10,fontSize:16,outline:"none",background:inpBg,color:cardTxt}}/><Btn onClick={checkMg}>✓</Btn></div></>}
            </Card>
            <Card><h3 style={{fontWeight:800,marginBottom:4}}><GT g="#43e97b,#38f9d7">🧠 Quick Quizzes</GT></h3><p style={{color:subTxt,fontSize:11,marginBottom:10}}>12 subjects · 5 questions · Up to 100 XP</p>
              <div style={{display:"grid",gap:5,maxHeight:260,overflowY:"auto"}}>{Object.keys(QUIZZES).map(k=>{const s=SUBJECTS_16.find(x=>x.id===k);return s?<button key={k} onClick={()=>startQ(k)} style={{display:"flex",alignItems:"center",gap:8,background:isG?"#f8f8ff":cardBg,border:`1px solid ${cardBdr}`,borderRadius:10,padding:"8px 12px",cursor:"pointer",fontWeight:600,fontSize:11,color:cardTxt,textAlign:"left"}}><span style={{fontSize:16}}>{s.e}</span><span style={{flex:1}}>{s.name}</span><span style={{color:"#667eea"}}>5Qs→</span></button>:null;})}</div>
            </Card>
            <Card><h3 style={{fontWeight:800,marginBottom:4}}><GT g="#f093fb,#f5576c">🏆 Leaderboard</GT></h3>
              {[{n:"🥇 Priya S.",x:980,f:"🇮🇳"},{n:"🥈 Amara K.",x:875,f:"🇬🇭"},{n:"🥉 Lucas M.",x:820,f:"🇧🇷"},{n:"4. Sofia T.",x:760,f:"🇲🇽"},{n:"5. James O.",x:710,f:"🇳🇬"},{n:"⭐ You",x:xp,f:"🌍"}].sort((a,b)=>b.x-a.x).map((p,i)=><div key={p.n} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 0",borderBottom:`1px solid ${cardBdr}`}}><span style={{width:16,fontWeight:700,color:subTxt,fontSize:10}}>{i+1}</span><span style={{fontSize:14}}>{p.f}</span><span style={{flex:1,fontWeight:p.n.includes("You")?800:600,fontSize:11,color:cardTxt}}>{p.n}</span><span style={{background:"linear-gradient(135deg,#f093fb,#f5576c)",color:"#fff",padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700}}>⚡{p.x}</span></div>)}
            </Card>
            <Card style={{textAlign:"center"}}><h3 style={{fontWeight:800,marginBottom:4}}><GT g="#fa709a,#fee140">🔥 Daily Streak</GT></h3>
              <div style={{fontSize:42}}>🔥</div><div style={{fontWeight:900,fontSize:36}}><GT g="#fa709a,#fee140">{streak}</GT></div><div style={{color:subTxt,fontSize:11,marginBottom:10}}>Day Streak!</div>
              <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:12}}>{["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{width:28,height:28,borderRadius:"50%",background:i<streak%7?"linear-gradient(135deg,#fa709a,#fee140)":(isG?"#f0f0f0":cardBg),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:9,color:i<streak%7?"#fff":subTxt,border:`1px solid ${cardBdr}`}}>{d}</div>)}</div>
              <Btn bg="linear-gradient(135deg,#fa709a,#fee140)" style={{width:"100%"}} onClick={()=>{setStrk(s=>s+1);setXp(x=>x+25);alert("🔥 +25 XP!");}}>✅ Check In (+25 XP)</Btn>
            </Card>
          </div>
        </>}

        {pg==="tools"&&<><h1 style={{fontWeight:900,fontSize:26,marginBottom:14,color:isG?"#fff":cardTxt}}>🔧 Learning Tools</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:14}}>
            <Card><h3 style={{fontWeight:800,marginBottom:6}}><GT g="#a18cd1,#fbc2eb">🃏 Flashcards</GT></h3>
              <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>{Object.keys(FLASH).map(k=><button key={k} onClick={()=>{setFcS(k);setFcI(0);setFcF(false);}} style={{background:fcS===k?"linear-gradient(135deg,#a18cd1,#fbc2eb)":(isG?"#f0f0f0":cardBg),color:fcS===k?"#fff":subTxt,border:"none",borderRadius:20,padding:"4px 10px",cursor:"pointer",fontWeight:600,fontSize:10,textTransform:"capitalize"}}>{k}</button>)}</div>
              <div onClick={()=>setFcF(f=>!f)} style={{background:fcF?"linear-gradient(135deg,#a18cd1,#fbc2eb)":"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:16,padding:"30px 14px",textAlign:"center",color:"#fff",cursor:"pointer",minHeight:90,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><div><div style={{fontSize:9,opacity:.7,marginBottom:5}}>{fcF?"✨ ANSWER":"❓ QUESTION"} · tap to flip</div><div style={{fontSize:24,fontWeight:900}}>{fcF?FLASH[fcS][fcI].b:FLASH[fcS][fcI].f}</div></div></div>
              <div style={{display:"flex",justifyContent:"space-between",gap:6}}><Btn style={{flex:1,padding:8,fontSize:11}} onClick={()=>{setFcI(i=>i>0?i-1:FLASH[fcS].length-1);setFcF(false);}}>← Prev</Btn><span style={{color:subTxt,fontSize:11,alignSelf:"center"}}>{fcI+1}/{FLASH[fcS].length}</span><Btn style={{flex:1,padding:8,fontSize:11}} onClick={()=>{setFcI(i=>(i+1)%FLASH[fcS].length);setFcF(false);}}>Next →</Btn></div>
            </Card>
            <Card><h3 style={{fontWeight:800,marginBottom:10}}><GT g="#43e97b,#38f9d7">📐 Unit Converter</GT></h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}><input value={cvV} onChange={e=>setCvV(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doConv()} placeholder="Enter number..." style={{border:`1px solid ${cardBdr}`,borderRadius:10,padding:10,fontSize:14,outline:"none",background:inpBg,color:cardTxt}}/><select value={cvK} onChange={e=>setCvK(e.target.value)} style={{border:`1px solid ${cardBdr}`,borderRadius:10,padding:9,fontSize:12,background:inpBg,color:cardTxt}}>{Object.keys(CONV).map(k=><option key={k} value={k}>{k.replace("→"," → ")}</option>)}</select><Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" style={{width:"100%",padding:11}} onClick={doConv}>Convert ⚡</Btn>{cvR&&<div style={{background:isG?"#f0fff4":"rgba(16,185,129,.1)",border:"1px solid #43e97b",borderRadius:10,padding:12,textAlign:"center",fontWeight:700,fontSize:14,color:"#10b981"}}>{cvR}</div>}</div>
            </Card>
            <Card><h3 style={{fontWeight:800,marginBottom:10}}><GT g="#4facfe,#00f2fe">📐 Maths Formulas</GT></h3>{FORMULAS.map(f=><div key={f.c} style={{marginBottom:10}}><div style={{fontWeight:700,color:"#4facfe",marginBottom:3,fontSize:11}}>{f.c}</div>{f.i.map(x=><div key={x} style={{background:isG?"#f0f8ff":cardBg,borderRadius:6,padding:"5px 10px",marginBottom:3,fontSize:11,fontFamily:"monospace",border:`1px solid ${cardBdr}`,color:cardTxt}}>{x}</div>)}</div>)}</Card>
            <Card><h3 style={{fontWeight:800,marginBottom:10}}><GT g="#fda085,#f6d365">💡 Study Tips</GT></h3>{TIPS.map(t=><div key={t.t} style={{display:"flex",gap:8,padding:"8px 0",borderBottom:`1px solid ${cardBdr}`}}><span style={{fontSize:18}}>{t.i}</span><div><div style={{fontWeight:700,fontSize:11,color:cardTxt}}>{t.t}</div><div style={{color:subTxt,fontSize:10}}>{t.d}</div></div></div>)}</Card>
          </div>
        </>}

        {pg==="lab"&&<>
          <h1 style={{fontWeight:900,fontSize:26,marginBottom:4,color:isG?"#fff":cardTxt}}>🧪 Virtual Science Lab</h1>
          <p style={{color:isG?"rgba(255,255,255,.8)":subTxt,marginBottom:18}}>Real experiments you can do at home!</p>
          {!selLab?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
            {LABS.map(lab=><Card key={lab.id} style={{cursor:"pointer"}} onClick={()=>{setSelLab(lab);setLabStep(0);}}>
              <div style={{fontSize:40,marginBottom:6}}>{lab.e}</div>
              <h3 style={{fontWeight:900,margin:"0 0 4px",fontSize:15}}><GT g="#43e97b,#38f9d7">{lab.name}</GT></h3>
              <p style={{color:subTxt,fontSize:12,lineHeight:1.5,marginBottom:12}}>{lab.desc}</p>
              <div style={{display:"flex",gap:7,marginBottom:12}}><span style={{background:"#e8fff4",color:"#28a745",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:600}}>⏱ {lab.time}</span><span style={{background:"#e8f4ff",color:"#667eea",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:600}}>{lab.diff}</span></div>
              <Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" style={{width:"100%",padding:10}}>🔬 Start!</Btn>
            </Card>)}
          </div>:<div style={{maxWidth:580,margin:"0 auto"}}>
            <Card>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <h2 style={{fontWeight:900,margin:0,fontSize:18,color:cardTxt}}>{selLab.e} {selLab.name}</h2>
                <button onClick={()=>setSelLab(null)} style={{border:`1px solid ${cardBdr}`,borderRadius:8,padding:"4px 10px",cursor:"pointer",background:"none",fontSize:11,color:subTxt}}>← Back</button>
              </div>
              <div style={{display:"flex",gap:5,marginBottom:18,flexWrap:"wrap"}}>
                {["🛒 Materials","📋 Steps","🔬 Science","🏆 Complete"].map((s,i)=><div key={s} style={{flex:1,minWidth:65,background:labStep>=i?"linear-gradient(135deg,#43e97b,#38f9d7)":(isG?"#f0f0f0":cardBg),borderRadius:20,padding:"5px",textAlign:"center",fontSize:9,fontWeight:700,color:labStep>=i?"#fff":subTxt}}>{s}</div>)}
              </div>
              {labStep===0&&<div><h3 style={{fontWeight:800,marginBottom:12,color:cardTxt}}>🛒 You'll Need</h3>{selLab.items.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:isG?"#f8f8f8":cardBg,borderRadius:10,marginBottom:6,fontSize:13,color:cardTxt,border:`1px solid ${cardBdr}`}}><span style={{fontSize:18}}>📦</span>{item}</div>)}</div>}
              {labStep===1&&<div><h3 style={{fontWeight:800,marginBottom:12,color:cardTxt}}>📋 Steps</h3>{selLab.steps.map((step,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 14px",background:isG?"#f8f8f8":cardBg,borderRadius:10,marginBottom:6,fontSize:13,lineHeight:1.6,color:cardTxt,border:`1px solid ${cardBdr}`}}><span style={{background:"linear-gradient(135deg,#43e97b,#38f9d7)",color:"#fff",borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,flexShrink:0}}>{i+1}</span>{step}</div>)}</div>}
              {labStep===2&&<div><h3 style={{fontWeight:800,marginBottom:12,color:cardTxt}}>🔬 The Science</h3><div style={{background:"linear-gradient(135deg,#e8fff4,#d4f8e8)",border:"2px solid #43e97b",borderRadius:14,padding:18,fontSize:13,lineHeight:1.8,color:"#1a4a2a"}}>{selLab.science}</div></div>}
              {labStep===3&&<div style={{textAlign:"center",padding:"18px 0"}}><div style={{fontSize:56}}>🏆</div><h3 style={{fontWeight:900,fontSize:20,color:cardTxt}}>Complete! +40 XP!</h3><Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" style={{padding:"12px 28px"}} onClick={()=>{setXp(x=>x+40);setSelLab(null);}}>🌟 Claim XP!</Btn></div>}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:16,gap:8}}>{labStep>0&&<Btn bg="linear-gradient(135deg,#aaa,#888)" onClick={()=>setLabStep(s=>s-1)} style={{flex:1}}>← Back</Btn>}{labStep<3&&<Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" onClick={()=>setLabStep(s=>s+1)} style={{flex:1}}>Next →</Btn>}</div>
            </Card>
          </div>}
        </>}

        {pg==="lang-vocab"&&<>
          <h1 style={{fontWeight:900,fontSize:26,marginBottom:4,color:isG?"#fff":cardTxt}}>🌐 Language Learning</h1>
          <p style={{color:isG?"rgba(255,255,255,.8)":subTxt,marginBottom:16}}>Tap cards to reveal pronunciation · +5 XP per word!</p>
          <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
            {Object.entries(LANG_VOCAB).map(([k,v])=><button key={k} onClick={()=>{setSelLangV(k);setSelLesson(0);setRevealed({});}} style={{background:selLangV===k?"linear-gradient(135deg,#667eea,#764ba2)":"rgba(255,255,255,.2)",color:"#fff",border:"2px solid rgba(255,255,255,.3)",borderRadius:22,padding:"9px 18px",cursor:"pointer",fontWeight:700,fontSize:13}}>{v.flag} {v.name}</button>)}
          </div>
          {Object.entries(LANG_VOCAB).map(([k,language])=>selLangV===k&&<div key={k}>
            <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>{language.lessons.map((l,i)=><button key={i} onClick={()=>{setSelLesson(i);setRevealed({});}} style={{background:selLesson===i?"linear-gradient(135deg,#667eea,#764ba2)":"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.3)",borderRadius:20,padding:"6px 14px",cursor:"pointer",fontWeight:600,fontSize:12}}>{l.title}</button>)}</div>
            <Card>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <h2 style={{fontWeight:900,margin:0,fontSize:18,color:cardTxt}}>{language.flag} {language.name} — {language.lessons[selLesson].title}</h2>
                <span style={{background:"linear-gradient(135deg,#667eea,#764ba2)",color:"#fff",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>+5 XP/word</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:12}}>
                {language.lessons[selLesson].words.map((word,i)=>{const rev=revealed[`${k}-${selLesson}-${i}`];return<div key={i} onClick={()=>{setRevealed(r=>({...r,[`${k}-${selLesson}-${i}`]:!r[`${k}-${selLesson}-${i}`]}));if(!rev)setXp(x=>x+5);}} style={{background:rev?"linear-gradient(135deg,#667eea,#764ba2)":(isG?"#f4f4ff":"rgba(99,102,241,.1)"),border:`2px solid ${rev?"transparent":(isG?"#e0e0ff":cardBdr)}`,borderRadius:14,padding:16,cursor:"pointer",textAlign:"center",color:rev?"#fff":cardTxt}}><div style={{fontSize:22,fontWeight:900,marginBottom:5}}>{word.w}</div><div style={{fontSize:13,fontWeight:600,marginBottom:rev?6:0}}>{word.t}</div>{rev&&<div style={{fontSize:11,opacity:.85,background:"rgba(255,255,255,.2)",borderRadius:8,padding:"3px 7px",display:"inline-block"}}>🔊 {word.p}</div>}{!rev&&<div style={{fontSize:9,opacity:.5,marginTop:4}}>tap to reveal</div>}</div>;})}
              </div>
            </Card>
          </div>)}
        </>}

        {pg==="worksheets"&&<>
          <h1 style={{fontWeight:900,fontSize:26,marginBottom:4,color:isG?"#fff":cardTxt}}>📄 Free Worksheets</h1>
          <p style={{color:isG?"rgba(255,255,255,.8)":subTxt,marginBottom:14}}>Download free printable worksheets. +15 XP per download!</p>
          {dlMsg&&<div style={{background:"linear-gradient(135deg,#43e97b,#38f9d7)",color:"#fff",borderRadius:12,padding:"10px 18px",marginBottom:14,fontWeight:700,fontSize:13}}>{dlMsg}</div>}
          <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
            {["All","Mathematics","Science","Language Arts","History","Geography","Computer Science","Arts & Music","Financial Literacy","Environmental Science"].map(f=><button key={f} onClick={()=>setWsFilter(f)} style={{background:wsFilter===f?"linear-gradient(135deg,#667eea,#764ba2)":"rgba(255,255,255,.2)",color:"#fff",border:"1px solid rgba(255,255,255,.3)",borderRadius:20,padding:"6px 13px",cursor:"pointer",fontWeight:600,fontSize:11,whiteSpace:"nowrap"}}>{f}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
            {WORKSHEETS.filter(w=>wsFilter==="All"||w.subj===wsFilter).map((ws,i)=><Card key={i}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
                <div style={{width:48,height:48,borderRadius:12,background:`linear-gradient(135deg,#${ws.color})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ws.icon}</div>
                <div style={{flex:1}}><h3 style={{margin:"0 0 2px",fontWeight:800,fontSize:13,color:cardTxt}}>{ws.title}</h3><p style={{margin:0,color:subTxt,fontSize:11,lineHeight:1.4}}>{ws.desc}</p></div>
              </div>
              <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
                <span style={{background:isG?"#f0f4ff":"rgba(99,102,241,.1)",color:"#667eea",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600}}>{ws.subj}</span>
                <span style={{background:isG?"#fff8f0":"rgba(253,160,133,.1)",color:"#f59e0b",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600}}>{ws.grade}</span>
                <span style={{background:isG?"#f0fff4":"rgba(16,185,129,.1)",color:"#10b981",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600}}>{ws.pages}pp</span>
              </div>
              <Btn bg={`linear-gradient(135deg,#${ws.color})`} style={{width:"100%",padding:10,fontSize:12}} onClick={()=>downloadWS(ws)}>📥 Download Free (+15 XP)</Btn>
            </Card>)}
          </div>
        </>}

        {pg==="dashboard"&&<><h1 style={{fontWeight:900,fontSize:26,marginBottom:14,color:isG?"#fff":cardTxt}}>📊 Your Dashboard</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16}}>
            {[{l:"Total XP",v:xp,e:"⚡",g:"#f093fb,#f5576c"},{l:"Level",v:lv,e:"🏆",g:"#4facfe,#00f2fe"},{l:"Streak",v:streak+"d",e:"🔥",g:"#fa709a,#fee140"},{l:"Subjects",v:done.length,e:"📚",g:"#43e97b,#38f9d7"},{l:"Badges",v:BADGES.filter(b=>xp>=b.x).length,e:"🎖️",g:"#a18cd1,#fbc2eb"},{l:"Next Lv",v:(100-xpP)+"XP",e:"🎯",g:"#667eea,#764ba2"}].map(s=><Card key={s.l} style={{textAlign:"center",padding:16}}><div style={{fontSize:24}}>{s.e}</div><div style={{fontWeight:900,fontSize:22}}><GT g={s.g}>{s.v}</GT></div><div style={{color:subTxt,fontSize:10}}>{s.l}</div></Card>)}
          </div>
          <Card style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8,color:cardTxt}}><strong>Level {lv} Progress</strong><span style={{color:subTxt,fontSize:11}}>{xpP}/100 XP</span></div><div style={{background:isG?"#f0f0f0":"rgba(255,255,255,.06)",borderRadius:20,height:18,overflow:"hidden"}}><div style={{width:`${xpP}%`,height:"100%",background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:20}}/></div></Card>
          <Card style={{marginBottom:16}}><h3 style={{fontWeight:800,marginBottom:12,fontSize:16,color:cardTxt}}>🎖️ Badges</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:8}}>{BADGES.map(b=>{const ea=xp>=b.x;return<div key={b.n} style={{background:ea?(isG?"#f0f4ff":"rgba(99,102,241,.1)"):cardBg,border:`2px solid ${ea?"#667eea":cardBdr}`,borderRadius:12,padding:10,textAlign:"center",opacity:ea?1:.4}}><div style={{fontSize:22}}>{b.e}</div><div style={{fontWeight:700,fontSize:10,color:cardTxt}}>{b.n}</div>{ea?<div style={{color:"#10b981",fontSize:9}}>✅ Earned!</div>:<div style={{color:"#667eea",fontSize:9}}>{b.x} XP</div>}</div>;})}</div></Card>
          <Card><h3 style={{fontWeight:800,marginBottom:12,fontSize:16,color:cardTxt}}>📚 Subject Progress</h3>{SUBJECTS_16.map(s=>{const d2=done.includes(s.id);return<div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:14}}>{s.e}</span><span style={{flex:1,fontWeight:600,fontSize:11,color:cardTxt}}>{s.name}</span><div style={{width:80,background:isG?"#f0f0f0":"rgba(255,255,255,.06)",borderRadius:10,height:7}}><div style={{width:d2?"100%":"0%",height:"100%",background:`linear-gradient(135deg,${s.bg})`,borderRadius:10}}/></div><span style={{fontSize:12}}>{d2?"✅":"⭕"}</span></div>;})}</Card>
        </>}

        {pg==="founder"&&<div style={{maxWidth:720,margin:"0 auto"}}>
          <Card style={{overflow:"hidden",padding:0}}>
            <div style={{background:"linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)",padding:"48px 28px 38px",textAlign:"center",color:"#fff"}}>
              <div style={{width:130,height:130,borderRadius:"50%",border:"4px solid rgba(255,255,255,.9)",margin:"0 auto 16px",overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,.4)",background:"linear-gradient(135deg,#667eea,#764ba2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src="https://i.imgur.com/oEYEJy2.jpeg" alt="Mahesh Thatikonda" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}} onError={e=>{e.target.style.display="none";}}/>
              </div>
              <h1 style={{fontWeight:900,fontSize:32,margin:"0 0 4px"}}>Mahesh Thatikonda</h1>
              <p style={{opacity:.9,fontSize:16,fontWeight:600,margin:"0 0 3px"}}>Founder & Visionary</p>
              <p style={{opacity:.75,fontSize:12,margin:0}}>WorldSchool Free · Education Without Borders</p>
              <div style={{display:"flex",gap:7,justifyContent:"center",marginTop:16,flexWrap:"wrap"}}>
                {["🌍 Educator","💡 Innovator","❤️ Philanthropist","🚀 Visionary","🤖 AI Pioneer","🇮🇳 From India"].map(t=><span key={t} style={{background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.4)",padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:600}}>{t}</span>)}
              </div>
            </div>
            <div style={{padding:"32px 28px"}}>
              <h2 style={{fontWeight:800,marginBottom:8,fontSize:17,color:cardTxt}}>👤 About Mahesh</h2>
              <p style={{color:subTxt,lineHeight:1.85,fontSize:13,marginBottom:14}}>Mahesh Thatikonda is an innovator and digital philanthropist whose mission is <strong style={{color:cardTxt}}>making world-class education free for every child on Earth.</strong> He single-handedly built WorldSchool Free — covering 16 subjects, 5 age groups, 195 countries, with a live AI tutor. 100% free, forever.</p>
              <div style={{background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:16,padding:24,textAlign:"center",color:"#fff",marginBottom:22}}>
                <p style={{fontStyle:"italic",fontSize:14,lineHeight:1.7,margin:"0 0 10px"}}>"Poverty is not destiny. Geography is not destiny. With WorldSchool Free, every child carries a world-class education in their pocket. Forever free. Forever theirs."</p>
                <p style={{fontWeight:800,opacity:.9,margin:0}}>— Mahesh Thatikonda</p>
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                <Btn onClick={()=>go("home")}>🌍 Home</Btn>
                <Btn bg="linear-gradient(135deg,#f093fb,#f5576c)" onClick={()=>go("ai-tutor")}>🤖 AI Tutor</Btn>
                <Btn bg="linear-gradient(135deg,#43e97b,#38f9d7)" onClick={()=>go("curriculum")}>📚 Curriculum</Btn>
              </div>
            </div>
          </Card>
        </div>}

      </div>
      <div style={{textAlign:"center",color:"rgba(255,255,255,.45)",padding:"22px 12px 32px",fontSize:10}}>
        © 2025 WorldSchool Free · Founded with ❤️ by <strong style={{color:"rgba(255,255,255,.75)"}}>Mahesh Thatikonda</strong> · Free · Forever · For Every Child on Earth
      </div>
    </div>
  );
}
