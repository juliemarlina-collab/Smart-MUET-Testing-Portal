// Smart MUET Guide V2 Testing Portal — Enhanced Configuration
const CONFIG = {
  guideUrl: "https://juliemarlina-collab.github.io/Smart-MUET-Guide/",
  googleFormEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfJ86lEpLLc-uh-aLTvqL7RUN1CVN2zpU0-5v5or1pvdPEc0g/viewform?embedded=true",
  googleFormPublicUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfJ86lEpLLc-uh-aLTvqL7RUN1CVN2zpU0-5v5or1pvdPEc0g/viewform?usp=pp_url"
};

const STORE_KEY = "smgTestingPortal";

const defaultState = {
  consent: false,
  baseline: false,
  guide: false,
  tasks: {
    speaking: false,
    reading: false,
    listening: false,
    writing: false
  },
  feedback: false
};

// Load state from localStorage
function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
  } catch (e) {
    console.error("Error loading state:", e);
    return { ...defaultState };
  }
}

// Save state to localStorage
function saveState(s) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch (e) {
    console.error("Error saving state:", e);
    alert("Warning: Your progress could not be saved. Please check browser storage.");
  }
}

// Mark a step as complete
function setDone(key, value = true) {
  const s = loadState();
  if (key.startsWith("tasks.")) {
    const k = key.split(".")[1];
    s.tasks = { ...s.tasks, [k]: value };
  } else {
    s[key] = value;
  }
  saveState(s);
  renderProgress();
}

// Calculate completed steps (out of 5)
function completedSteps(s) {
  let n = 0;
  if (s.consent) n++;
  if (s.baseline) n++;
  if (s.guide) n++;
  if (Object.values(s.tasks || {}).every(Boolean)) n++;
  if (s.feedback) n++;
  return n;
}

// Render progress bar and counter
function renderProgress() {
  const s = loadState();
  const done = completedSteps(s);

  // Update progress counters
  document.querySelectorAll("[data-progress]").forEach(el => {
    el.textContent = `${done}/5`;
  });

  // Update progress bar width
  document.querySelectorAll("[data-progress-bar]").forEach(el => {
    el.style.width = `${(done / 5) * 100}%`;
  });

  // Update task checkboxes
  document.querySelectorAll("[data-task]").forEach(el => {
    el.checked = !!s.tasks?.[el.dataset.task];
  });
}

// Launch Smart MUET Guide (with error handling)
function launchGuide() {
  setDone("guide", true);
  try {
    window.open(CONFIG.guideUrl, "_blank", "noopener");
  } catch (e) {
    console.error("Error opening guide:", e);
    alert("Could not open Smart MUET Guide. Please check your internet connection and try again.");
  }
}

// Set up Google Form embed
function setupGoogleForm() {
  const f = document.querySelector("#googleFormFrame");
  const p = document.querySelector("#formPlaceholder");
  const o = document.querySelector("#openForm");

  // Embed form in iframe if URL is available
  if (f && CONFIG.googleFormEmbedUrl) {
    f.src = CONFIG.googleFormEmbedUrl;
    f.hidden = false;
    if (p) p.hidden = true;
  }

  // Show fallback link if embed URL available
  if (o && CONFIG.googleFormPublicUrl) {
    o.href = CONFIG.googleFormPublicUrl;
    o.hidden = false;
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderProgress();
  setupGoogleForm();

  // Guide launch buttons
  document.querySelectorAll("[data-launch-guide]").forEach(b => {
    b.addEventListener("click", launchGuide);
  });

  // Task checkboxes
  document.querySelectorAll("[data-task]").forEach(box => {
    box.addEventListener("change", () => {
      setDone(`tasks.${box.dataset.task}`, box.checked);
    });
  });

  // Consent form submission
  const consentForm = document.querySelector("#consentForm");
  if (consentForm) {
    consentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const agreed = document.querySelector("#consentAgree")?.checked;
      if (!agreed) {
        alert("Please read and agree to the participant information before continuing.");
        return;
      }
      setDone("consent", true);
      location.href = "journey.html#baseline";
    });
  }

  // Baseline form submission
  const baselineForm = document.querySelector("#baselineForm");
  if (baselineForm) {
    baselineForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Validate all fields
      const requiredSelects = baselineForm.querySelectorAll("select[required]");
      const requiredRadios = ["familiar", "prepared"];
      let isValid = true;

      requiredSelects.forEach(select => {
        if (!select.value) {
          select.style.borderColor = "#cc0000";
          isValid = false;
        } else {
          select.style.borderColor = "";
        }
      });

      requiredRadios.forEach(name => {
        const checked = baselineForm.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
          isValid = false;
          const radios = baselineForm.querySelectorAll(`input[name="${name}"]`);
          radios.forEach(r => r.style.outline = "2px solid #cc0000");
        } else {
          const radios = baselineForm.querySelectorAll(`input[name="${name}"]`);
          radios.forEach(r => r.style.outline = "");
        }
      });

      if (!isValid) {
        alert("Please complete all fields before proceeding.");
        return;
      }

      setDone("baseline", true);
      location.href = "tasks.html";
    });
  }
});
