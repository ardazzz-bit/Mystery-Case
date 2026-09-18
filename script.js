const sections = document.querySelectorAll(".section");
const tabs = document.querySelectorAll(".tab");

function showSection(id) {
  sections.forEach(section => {
    section.classList.remove("active");
  });

  tabs.forEach(tab => {
    tab.classList.remove("active");

    if (tab.textContent.toLowerCase().includes(id)) {
      tab.classList.add("active");
    }
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: document.querySelector(".tabs").offsetTop - 80,
    behavior: "smooth"
  });
}


// -------------------------
// SUSPECTS
// -------------------------

const suspects = {

  victor: {
    name: "Victor Reed",
    role: "Hotel Owner",
    text:
      "Victor owns the Blackwood Hotel. He claims he spent the entire night in the lobby dealing with paperwork.",
    clue:
      "Victor says the lobby camera was broken earlier that night. However, the camera log shows it was recording normally."
  },

  lena: {
    name: "Lena Hart",
    role: "Journalist",
    text:
      "Lena was investigating Elias after receiving an anonymous message about the hotel.",
    clue:
      "Lena admits she argued with Elias earlier, but says she left Room 307 before 10:30 PM."
  },

  marcus: {
    name: "Marcus Cole",
    role: "Head Chef",
    text:
      "Marcus was working in the kitchen preparing the hotel's late-night service.",
    clue:
      "Marcus says he never left the kitchen after 10:45 PM. Kitchen inventory confirms he was there."
  },

  nora: {
    name: "Nora Shaw",
    role: "Hotel Guest",
    text:
      "Nora claims she stayed in her room reading during the entire incident.",
    clue:
      "Nora's room is directly across from Room 307. She says she heard nothing unusual."
  }

};


function openSuspect(id) {

  const suspect = suspects[id];

  const box = document.getElementById("suspectDetail");

  box.classList.remove("hidden");

  box.innerHTML = `
    <span class="eyebrow">${suspect.role}</span>
    <h3>${suspect.name}</h3>

    <p>${suspect.text}</p>

    <p>
      <b>Investigator's note:</b>
      ${suspect.clue}
    </p>

    <button onclick="this.parentElement.classList.add('hidden')">
      CLOSE FILE
    </button>
  `;

  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


// -------------------------
// EVIDENCE
// -------------------------

const evidence = [

  {
    title: "Broken Watch",
    text:
      "The victim's watch stopped at exactly 11:17 PM. The glass is cracked, but the hands were manually moved backward."
  },

  {
    title: "Room Key",
    text:
      "The key to Room 307 was found inside Elias's coat. The hotel uses electronic locks, and every entry is logged."
  },

  {
    title: "Coffee Cup",
    text:
      "The coffee was still warm at 11:42 PM. Hotel records show it was delivered to Room 307 at 11:19 PM."
  },

  {
    title: "Torn Note",
    text:
      "The note reads: 'Meet me after the kitchen closes. Bring the ledger.' The handwriting matches Elias's notes."
  },

  {
    title: "Camera Log",
    text:
      "The lobby camera recorded Victor leaving the lobby at 11:12 PM and returning at 11:34 PM."
  },

  {
    title: "Wet Glove",
    text:
      "A wet black glove was found near the kitchen entrance. Its size matches Victor's gloves."
  }

];

let cluesFound = 0;

function inspectEvidence(index) {

  const item = evidence[index];

  const box = document.getElementById("evidenceDetail");

  box.classList.remove("hidden");

  box.innerHTML = `
    <span class="eyebrow">EVIDENCE #${index + 1}</span>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  `;

  cluesFound++;

  if (cluesFound > 6) {
    cluesFound = 6;
  }

  document.getElementById("clueCount").textContent =
    `${cluesFound} / 6 CLUES`;

  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


// -------------------------
// INTERROGATION
// -------------------------

let currentPerson = "victor";

const questions = {

  victor: [

    "I was in the lobby until around 11:30 PM.",

    "Elias was my business partner. We had disagreements about the hotel's finances.",

    "I went upstairs briefly, but only to check a leaking pipe."
  ],

  lena: [

    "I left the hotel restaurant around 10:40 PM and went back to my room.",

    "Yes. I was investigating him because I thought he was hiding something.",

    "I heard someone walking quickly down the hallway around 11:20 PM."
  ],

  marcus: [

    "I was in the kitchen. The staff can confirm it.",

    "I barely knew Elias outside of work.",

    "I saw Victor near the kitchen entrance shortly after 11:15 PM."
  ],

  nora: [

    "I was reading in my room. I didn't leave.",

    "No. I only met him that evening.",

    "I heard footsteps outside my room around 11:20 PM."
  ]

};


function selectPerson(id, button) {

  currentPerson = id;

  document.querySelectorAll(".person").forEach(person => {
    person.classList.remove("active");
  });

  button.classList.add("active");

  const suspect = suspects[id];

  document.getElementById("interrogationContent").innerHTML = `

    <div class="avatar big">
      ${suspect.name.split(" ").map(x => x[0]).join("")}
    </div>

    <span class="eyebrow">${suspect.role}</span>

    <h3>${suspect.name}</h3>

    <p>
      "${suspect.text}"
    </p>

    <button onclick="askQuestion(0)">
      Where were you at 11:30?
    </button>

    <button onclick="askQuestion(1)">
      Did you know Elias?
    </button>

    <button onclick="askQuestion(2)">
      Did you see anyone?
    </button>

    <div id="answer"></div>
  `;
}


function askQuestion(index) {

  const answer = questions[currentPerson][index];

  document.getElementById("answer").innerHTML = `
    <div class="warning">
      <strong>?</strong>
      <div>
        <b>ANSWER</b>
        <br>
        "${answer}"
      </div>
    </div>
  `;
}


// -------------------------
// FINAL DEDUCTION
// -------------------------

function solve(answer) {

  const result = document.getElementById("result");

  if (answer === "victor") {

    result.innerHTML = `
      <div class="success">

        <h2>CASE SOLVED</h2>

        <p>
          Victor Reed is responsible.
        </p>

        <p>
          The camera log places Victor outside the lobby between
          11:12 PM and 11:34 PM.
          The coffee was delivered at 11:19 PM,
          meaning someone entered Room 307 after Victor disappeared.
        </p>

        <p>
          The wet glove connects Victor to the kitchen entrance,
          while his original statement claimed he never left the lobby.
        </p>

        <p>
          <b>Congratulations, Detective.</b>
          You followed the timeline instead of trusting the alibis.
        </p>

      </div>
    `;

  } else {

    result.innerHTML = `
      <div class="failure">

        <h2>WRONG DEDUCTION</h2>

        <p>
          That suspect's story doesn't explain all of the evidence.
        </p>

        <p>
          Re-check the camera log, coffee delivery time,
          and the suspect statements.
        </p>

        <button onclick="showSection('evidence')">
          REVIEW EVIDENCE
        </button>

      </div>
    `;
  }

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}