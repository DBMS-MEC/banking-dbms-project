const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

// script.js

function handleChat() {
    const userMessage = document.querySelector('.chat-input textarea').value.trim();

    // Append the user's message to the chatbox
    // You can customize this part based on your chatbot logic

    const chatbox = document.querySelector('.chatbox');
    const userChatLi = document.createElement('li');
    userChatLi.classList.add('chat', 'outgoing');
    userChatLi.innerHTML = `<p>${userMessage}</p>`;
    chatbox.appendChild(userChatLi);

    // Simulate bot response (you'll replace this with actual chatbot logic)
    setTimeout(() => {
        const botChatLi = document.createElement('li');
        botChatLi.classList.add('chat', 'incoming');
        botChatLi.innerHTML = `
            <span class="material-symbols-outlined">smart_toy</span>
            <p>Bot's response goes here</p>
        `;
        chatbox.appendChild(botChatLi);
    }, 500);

    // Clear the input field
    document.querySelector('.chat-input textarea').value = '';

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
chatbotToggler.addEventListener("click", () => {
    console.log("Chatbot Toggler Clicked");
    chatbotZIndex += 1; // Increment the z-index
    chatbot.style.zIndex = chatbotZIndex;
    document.body.classList.toggle("show-chatbot");
});




sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));