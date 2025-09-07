let userName = null;

function sendMessageAction() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (message === "") return;

    // Show user message
    addMessage(message, "user");

    // Clear input
    input.value = "";

    // Show typing indicator
    showTyping();

    // Generate bot reply after delay
    setTimeout(() => {
        hideTyping();
        const reply = getBotReply(message);
        addMessage(reply, "bot");
    }, 1500);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    // Avatar
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.innerText = sender === "user" ? "🧑" : "🤖";
    // Text
    const textSpan = document.createElement("span");
    textSpan.className = "text";
    textSpan.innerText = text;
    // Timestamp
    const timeSpan = document.createElement("span");
    timeSpan.className = "timestamp";
    timeSpan.innerText = formatTime(new Date());
    // Assemble
    msg.appendChild(avatar);
    msg.appendChild(textSpan);
    msg.appendChild(timeSpan);
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// Format time for timestamp
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
// Theme switcher
window.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.onclick = function() {
            document.body.classList.toggle('dark-mode');
            document.querySelector('.chat-container').classList.toggle('dark-mode');
            document.getElementById('chatBox').classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        };
    }
});

function showTyping() {
    const chatBox = document.getElementById("chatBox");
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.classList.add("message", "bot");
    typing.innerText = "Bot is typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function getBotReply(message) {
    message = message.toLowerCase();

    // Greet
    if (message.includes("hello") || message.includes("hi")) {
        return userName ? `Hello again, ${userName}! 👋` : "Hello! 👋 What's your name?";
    }

    // If user tells their name
    if (message.includes("my name is")) {
        userName = message.replace("my name is", "").trim();
        return `Nice to meet you, ${userName}! 😃`;
    }

    // Asking bot name
    if (message.includes("your name")) {
        return "hello I am AI chatbot.";
    }
    if (message.includes("what is ai ?")) {
        return "I is the first-person pronoun in the English language, referring to oneself. In the context of your query likely a typo for AI, which stands for Artificial Intelligence. AI is the field of computer science focused on creating systems that can perform tasks that typically require human intelligence, such as learning, problem-solving, and decision-making.";
    }
    if (message.includes("who is create ?")) {
        return "Akash A BSC(CSA)- Student"
    }
    // Saying goodbye
    if (message.includes("bye")) {
        return "Goodbye! Have a wonderful day 🌸";
    }

    // Love response
    if (message.includes("love")) {
        return "Aww ❤️ I love you too!";
    }

    // Time
    if (message.includes("time")) {
        return `⏰ The current time is ${new Date().toLocaleTimeString()}`;
    }

    // Date
    if (message.includes("date")) {
        return `📅 Today's date is ${new Date().toLocaleDateString()}`;
    }

    // Random small talk
    const replies = [
        "Interesting... tell me more 🤔",
        "Wow, that’s cool! 😃",
        "Hmm, I didn’t know that.",
        "Can you explain it a bit more?",
        "I see 👀"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}