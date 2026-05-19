const MESSAGES = {
  WAKING: "Espera, despertando a la IA...",
  READY: "Listo para vibe codear",
  THINKING: "Pensando...",
  ERROR_INIT: "❌ Error al despertar a la IA.",
  ERROR_PROMPT: "❌ Error al procesar la petición.",
  NOT_AVAILABLE: "❌ LanguageModel no disponible. Usa Chrome 127+ y activa flags.",
  NOT_READY: "❌ Modelo no listo. Revisa chrome://components."
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
    const availability = await LanguageModel.availability();
    if (availability === "no") {
      outputElement.textContent = MESSAGES.NOT_READY;
      return;
    }

    outputElement.textContent = MESSAGES.WAKING;

    session = await LanguageModel.create({
      systemPrompt: "Eres un asistente técnico conciso y amigable. Respondes en español.",
      expectedOutputs: [
        { type: "text", languages: ["es", "en"] }
      ]
    });

    // Initial call to wake up the model
    await session.prompt("Ping");
    
    outputElement.textContent = MESSAGES.READY;
    
    // Enable controls
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();

  } catch (error) {
    console.error("Error al inicializar:", error);
    outputElement.textContent = MESSAGES.ERROR_INIT;
  }
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text || !session) return;

  // Lock UI
  userInput.disabled = true;
  sendBtn.disabled = true;
  outputElement.textContent = MESSAGES.THINKING;

  try {
    const respuesta = await session.prompt(text);
    outputElement.textContent = respuesta;
    
  } catch (error) {
    console.error("Error en prompt:", error);
    outputElement.textContent = MESSAGES.ERROR_PROMPT;
  } finally {
    // Unlock UI
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.value = "";
    userInput.focus();
  }
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSend();
  }
});

// Start the process
init();
