Skip to main content
Google Classroom
Classroom
IT451L Virtual Systems and Services Lab
BSIT VIII B
Home
Calendar
Gemini
Enrolled
To-do
B
BSIT Social Services
8-B
I
IT Project Management - Section B
Section B
E
Enterprise System
BSIT-8B
I
IT451L Virtual Systems and Services Lab
BSIT VIII B
I
IT451 Virtual Systems and Services
BSIT VIII B
F
FYP 03: 2022 to 2026
BSCS A, B C. BSIT A, B
Archived classes
Settings
Stream
Classwork
People
IT451L Virtual Systems and Services Lab BSIT VIII B - Classroom
IT451L Virtual Systems and Services Lab
BSIT VIII B
Upcoming
Due today
2:00 PM – Lab Task 12..

Post by Touseeb Hanif
Touseeb Hanif
Created 12:56 PM12:56 PM
Go to public folder in the chat app and change these files.
chat.js
Javascript

index.html
HTML


Post by Abdul Moiz
Abdul Moiz
Created 12:37 PM12:37 PM
🟡 STEP 1 — OPEN WORKERS

Go here:

👉 https://dash.cloudflare.com

Then:


Workers & Pages → Create → Worker


Click:


Create Worker


🟡 STEP 2 — PASTE YOUR CODE

Cloudflare opens an online editor.

Paste this:


const html = `YOUR FULL HTML HERE`;

export default {
async fetch(request, env) {
const url = new URL(request.url);

// GET employees
if (url.pathname === "/api/employees" && request.method === "GET") {
const { results } = await env.DB.prepare(
"SELECT * FROM employees"
).all();

return Response.json(results);
}

// POST employee
if (url.pathname === "/api/employees" && request.method === "POST") {
const body = await request.json();

await env.DB.prepare(
"INSERT INTO employees (name, position) VALUES (?, ?)"
)
.bind(body.name, body.position)
.run();

return Response.json({ success: true });
}

// frontend
return new Response(html, {
headers: { "content-type": "text/html;charset=UTF-8" },
});
},
};


Click:


Save and Deploy


🟡 STEP 3 — CREATE DATABASE (D1)

Now go:


Workers & Pages → D1 SQL


Click:


Create Database


Name it:


employees_db


Click Create.

🟡 STEP 4 — OPEN DATABASE

Click your database → then:


Console


Run this SQL:


CREATE TABLE employees (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
position TEXT
);


Click:


Run


🟡 STEP 5 — CONNECT DATABASE TO WORKER

Go back to:


Workers & Pages → your worker → Settings


Find:


Bindings → Add binding


Select:

Type → D1 Database

Variable name → DB

Database → employees_db
worker.js.txt
Text

assignment
Assignment: "Lab Task 12.."
Waseeqa Ghazanfer posted a new assignment: Lab Task 12..
Created 11:52 AM11:52 AM (Edited 12:35 PM)
book
Material: "Course Guide"
Waseeqa Ghazanfer posted a new material: Course Guide
Created 9:47 AM9:47 AM
assignment
Assignment: "Lab Task 11"
Waseeqa Ghazanfer posted a new assignment: Lab Task 11
Created May 14May 14 (Edited May 15)
assignment
Assignment: "Project Proposal"
Waseeqa Ghazanfer posted a new assignment: Project Proposal
Created May 10May 10
assignment
Assignment: "Lab Task 10.."
Waseeqa Ghazanfer posted a new assignment: Lab Task 10..
Created May 7May 7 (Edited May 7)
assignment
Assignment: "Lab Task 11"
Waseeqa Ghazanfer posted a new assignment: Lab Task 11
Created Apr 30Apr 30 (Edited May 7)
assignment
Assignment: "Lab Task 9"
Waseeqa Ghazanfer posted a new assignment: Lab Task 9
Created Apr 23Apr 23 (Edited May 7)
assignment
Assignment: "Lab Task 8..."
Waseeqa Ghazanfer posted a new assignment: Lab Task 8...
Created Apr 23Apr 23 (Edited May 7)
assignment
Assignment: "Lab Task 7"
Waseeqa Ghazanfer posted a new assignment: Lab Task 7
Created Apr 18Apr 18 (Edited May 7)

Post by Waseeqa Ghazanfer
Waseeqa Ghazanfer
Created Apr 18Apr 18
Today's lab link: (3-6  o'clock)
https://us04web.zoom.us/j/78977227087?pwd=AIUQNsDO5KJVpK1XaybvC2k4vyARCS.1
assignment
Assignment: "Lab Task 6"
Waseeqa Ghazanfer posted a new assignment: Lab Task 6
Created Mar 26Mar 26 (Edited May 7)

Post by Waseeqa Ghazanfer
Waseeqa Ghazanfer
Created Mar 26Mar 26
Today's lab link: 
https://us04web.zoom.us/j/77807436503?pwd=NrmalaKSYz2g12dFzIBTQVwIaAmtgF.1

Meeting ID: 778 0743 6503
Passcode: 2S1bFh
assignment
Assignment: "Lab Task 5"
Waseeqa Ghazanfer posted a new assignment: Lab Task 5
Created Mar 12Mar 12 (Edited May 7)

Post by Waseeqa Ghazanfer
Waseeqa Ghazanfer
Created Mar 11Mar 11 (Edited Mar 11)
Dear Students, 
Create your Microsoft Azure account before tomorrow's lab session. The upcoming lab task will require access to Azure, so ensure that your account is ready in advance.
assignment
Assignment: "Lab task 4"
Waseeqa Ghazanfer posted a new assignment: Lab task 4
Created Mar 5Mar 5 (Edited Mar 12)
assignment
Assignment: "Lab Task 3"
Waseeqa Ghazanfer posted a new assignment: Lab Task 3
Created Feb 26Feb 26 (Edited May 7)
assignment
Assignment: "Lab task 2"
Waseeqa Ghazanfer posted a new assignment: Lab task 2
Created Feb 19Feb 19 (Edited Feb 21)

Post by Touseeb Hanif
Touseeb Hanif
Created Feb 19Feb 19
Vmware Cloud ( LAB 2 )

https://labs.hol.vmware.com/HOL/catalog
/**
 * LLM Chat App Frontend - ChatGPT Multi-Session Architecture
 */

// DOM elements
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

// Utility Navigation Controls
const historyButton = document.getElementById("history-button");
const newChatButton = document.getElementById("new-chat-button");
const historyModal = document.getElementById("history-modal");
const closeHistory = document.getElementById("close-history");
const historyLogBody = document.getElementById("history-log-body");

// Storage Schema Keys
const SESSIONS_STORAGE_KEY = "cf_ai_chat_sessions_v1";
const CURRENT_ID_STORAGE_KEY = "cf_ai_chat_current_id_v1";

// Default system baseline greeting
const DEFAULT_WELCOME = "Hello! I'm an LLM chat app powered by Cloudflare Workers AI. How can I help you today?";

// Application Memory State Structure
let chatSessions = JSON.parse(localStorage.getItem(SESSIONS_STORAGE_KEY)) || [];
let currentSessionId = localStorage.getItem(CURRENT_ID_STORAGE_KEY) || null;
let isProcessing = false;

/**
 * Returns the currently active chat session object
 */
function getCurrentSession() {
	return chatSessions.find(s => s.id === currentSessionId);
}

/**
 * Generates an entirely fresh active conversation session tracking frame
 */
function createNewSession() {
	const newId = "session_" + Date.now();
	const newSession = {
		id: newId,
		title: "New Chat Session",
		timestamp: new Date().toLocaleDateString(),
		history: [
			{ role: "assistant", content: DEFAULT_WELCOME }
		]
	};
	chatSessions.unshift(newSession); // Push to the top of the history list
	currentSessionId = newId;
	saveState();
	renderCurrentChat();
}

/**
 * Saves current app states into permanent local storage vectors
 */
function saveState() {
	localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(chatSessions));
	localStorage.setItem(CURRENT_ID_STORAGE_KEY, currentSessionId);
}

/**
 * Renders the active conversation message history into the main window view
 */
function renderCurrentChat() {
	// Wipe out old message element layouts cleanly
	const existingMsgs = chatMessages.querySelectorAll(".message");
	existingMsgs.forEach(el => el.remove());

	const session = getCurrentSession();
	if (!session) return;

	session.history.forEach(msg => {
		if (msg.role !== "system") {
			addMessageToChatUi(msg.role, msg.content);
		}
	});
}

// Auto-resize textarea as user types
userInput.addEventListener("input", function () {
	this.style.height = "auto";
	this.style.height = this.scrollHeight + "px";
});

// Send message on Enter (without Shift)
userInput.addEventListener("keydown", function (e) {
	if (e.key === "Enter" && !e.shiftKey) {
		e.preventDefault();
		sendMessage();
	}
});

// Action Event Wireups
sendButton.addEventListener("click", sendMessage);

// "New Chat" mimics GPT: Saves what you have, switches context cleanly
newChatButton.addEventListener("click", () => {
	const current = getCurrentSession();
	// Only create a new session if the current one has actual user interactions
	if (current && current.history.length <= 1) {
		alert("You are already in a clean new chat window.");
		return;
	}
	createNewSession();
});

// Build the Session Sidebar List View
historyButton.addEventListener("click", () => {
	historyLogBody.innerHTML = "";

	if (chatSessions.length === 0) {
		historyLogBody.innerHTML = `<p style="color: var(--text-light); text-align:center; padding:1rem;">No past chat rooms recorded.</p>`;
	} else {
		chatSessions.forEach(session => {
			const item = document.createElement("div");
			item.className = "history-session-item";
			// Grab the first user message as the title preview if it exists
			const titleText = session.title;
			
			item.innerHTML = `
				<div class="session-title">${escapeHtml(titleText)}</div>
				<div class="session-date">${session.timestamp}</div>
			`;
			
			// Switch chat instance on click
			item.addEventListener("click", () => {
				currentSessionId = session.id;
				saveState();
				renderCurrentChat();
				historyModal.classList.remove("active");
			});

			historyLogBody.appendChild(item);
		});
	}
	historyModal.classList.add("active");
});

closeHistory.addEventListener("click", () => historyModal.classList.remove("active"));
window.addEventListener("click", (e) => { if (e.target === historyModal) historyModal.classList.remove("active"); });

/**
 * Handles communication with backend and manages history states
 */
async function sendMessage() {
	const message = userInput.value.trim();
	if (message === "" || isProcessing) return;

	let session = getCurrentSession();
	if (!session) {
		createNewSession();
		session = getCurrentSession();
	}

	isProcessing = true;
	userInput.disabled = true;
	sendButton.disabled = true;

	// Append layouts
	addMessageToChatUi("user", message);
	session.history.push({ role: "user", content: message });

	// Auto update title based on first user message topic
	if (session.title === "New Chat Session" || session.history.length <= 3) {
		session.title = message.length > 30 ? message.substring(0, 30) + "..." : message;
	}
	saveState();

	userInput.value = "";
	userInput.style.height = "auto";
	typingIndicator.classList.add("visible");
	scrollToBottom();

	let responseText = "";
	let assistantTextEl = null;

	try {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ messages: session.history }),
		});

		if (!response.ok) throw new Error("Failed response state.");
		if (!response.body) throw new Error("Null response payload stream.");

		typingIndicator.classList.remove("visible");

		const assistantMessageEl = document.createElement("div");
		assistantMessageEl.className = "message assistant-message";
		assistantMessageEl.innerHTML = "<p></p>";
		chatMessages.appendChild(assistantMessageEl);
		assistantTextEl = assistantMessageEl.querySelector("p");

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";

		const processEvents = (events) => {
			for (const data of events) {
				if (data === "[DONE]") return true;
				try {
					const jsonData = JSON.parse(data);
					const content = jsonData.response || jsonData.choices?.[0]?.delta?.content || "";
					if (content) {
						responseText += content;
						assistantTextEl.textContent = responseText; 
						scrollToBottom();
					}
				} catch (e) {
					console.error("SSE parse error", e);
				}
			}
			return false;
		};

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				const parsed = consumeSseEvents(buffer + "\n\n");
				processEvents(parsed.events);
				break;
			}
			buffer += decoder.decode(value, { stream: true });
			const parsed = consumeSseEvents(buffer);
			buffer = parsed.buffer;
			if (processEvents(parsed.events)) break;
		}

		if (responseText.trim().length > 0) {
			session.history.push({ role: "assistant", content: responseText });
			saveState();
		}

	} catch (error) {
		console.error("Chat Execution Error:", error);
		typingIndicator.classList.remove("visible");
		addMessageToChatUi("assistant", "Sorry, there was an error processing your request.");
	} finally {
		isProcessing = false;
		userInput.disabled = false;
		sendButton.disabled = false;
		userInput.focus();
	}
}

function addMessageToChatUi(role, content) {
	const messageEl = document.createElement("div");
	messageEl.className = `message ${role}-message`;
	messageEl.innerHTML = `<p></p>`;
	messageEl.querySelector("p").textContent = content; 
	chatMessages.insertBefore(messageEl, typingIndicator);
	scrollToBottom();
}

function scrollToBottom() {
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

function consumeSseEvents(buffer) {
	let normalized = buffer.replace(/\r/g, "");
	const events = [];
	let eventEndIndex;
	while ((eventEndIndex = normalized.indexOf("\n\n")) !== -1) {
		const rawEvent = normalized.slice(0, eventEndIndex);
		normalized = normalized.slice(eventEndIndex + 2);
		const lines = rawEvent.split("\n");
		const dataLines = [];
		for (const line of lines) {
			if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
		}
		if (dataLines.length === 0) continue;
		events.push(dataLines.join("\n"));
	}
	return { events, buffer: normalized };
}

function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// App Initialization Cycle Setup
if (!currentSessionId || !getCurrentSession()) {
	if (chatSessions.length > 0) {
		currentSessionId = chatSessions[0].id;
	} else {
		createNewSession();
	}
}
saveState();
renderCurrentChat();
chat.js
Displaying index.html.
