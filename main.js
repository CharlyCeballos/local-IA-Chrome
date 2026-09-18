const MESSAGES = {
  READY: "Listo para vibecodear",
  WAKING: "Espera, despertando a la IA...",
  THINKING: "Pensando...",
  NEEDS_DOWNLOAD:
    "Modelo pendiente de descarga (varios GB). Escribe algo y pulsa Enviar para iniciarla.",
  ERROR_INIT: "❌ Error al despertar a la IA.",
  ERROR_PROMPT: "❌ Error al procesar la petición.",
  NOT_AVAILABLE:
    "❌ LanguageModel no disponible. Usa Chrome 138+ y activa los flags de Gemini Nano.",
  NOT_READY:
    "❌ Modelo no disponible en este equipo. Revisa chrome://on-device-internals.",
};

const MODEL_OPTIONS = {
  systemPrompt:
    "Eres un asistente técnico conciso y amigable. Respondes en español (México).",
  expectedInputs: [{ type: "text", languages: ["es", "en"] }],
  expectedOutputs: [{ type: "text", languages: ["es"] }],
};

let session = null;
const outputElement = document.getElementById("output");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

async function init() {
  if (typeof LanguageModel === "undefined") {
    outputElement.textContent = MESSAGES.NOT_AVAILABLE;
    return;
  }
  try {
    const availability = await LanguageModel.availability(MODEL_OPTIONS);
    if (availability === "unavailable") {
      outputElement.textContent = MESSAGES.NOT_READY;
      return;
    }

    outputElement.textContent =
      availability === "available" ? MESSAGES.READY : MESSAGES.NEEDS_DOWNLOAD;
    userInput.disabled = false;
    updateSendButtonState();
    userInput.focus();
  } catch (error) {
    console.error("Error al inicializar:", error);
    outputElement.textContent = MESSAGES.ERROR_INIT;
  }
}

function updateSendButtonState() {
  sendBtn.disabled = userInput.disabled || userInput.value.trim() === "";
}

// Chrome requires a user gesture to start the download, so the session is
// created on the first send instead of on page load.
async function ensureSession() {
  if (session) return session;

  outputElement.textContent = MESSAGES.WAKING;
  session = await LanguageModel.create({
    ...MODEL_OPTIONS,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (event) => {
        outputElement.textContent = `Descargando modelo: ${Math.round(
          event.loaded * 100
        )}%`;
      });
    },
  });
  return session;
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  userInput.disabled = true;
  sendBtn.disabled = true;

  try {
    const model = await ensureSession();
    outputElement.textContent = MESSAGES.THINKING;
    outputElement.textContent = await model.prompt(text);
  } catch (error) {
    console.error("Error en prompt:", error);
    outputElement.textContent = MESSAGES.ERROR_PROMPT;
  } finally {
    userInput.disabled = false;
    userInput.value = "";
    updateSendButtonState();
    userInput.focus();
  }
}

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
});

userInput.addEventListener("input", updateSendButtonState);
sendBtn.addEventListener("click", handleSend);

// Start the process
init();
