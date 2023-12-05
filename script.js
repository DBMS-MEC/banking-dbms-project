const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; 
// Paste your API key here
const fraudDetectionAPIKey ="sk_test_yourstripeapikey";
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
    const API_URL = "sk_test_yourstripeapikey";
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
    const botResponse = generateBotResponse(userMessage);
    const botChatLi = document.createElement('li');
    botChatLi.classList.add('chat', 'incoming');
    botChatLi.innerHTML = `
        <span class="material-symbols-outlined">smart_toy</span>
        <p>${botResponse}</p>
    `;
    chatbox.appendChild(botChatLi);
    document.querySelector('.chat-input textarea').value = '';

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
function generateBotResponse(userMessage) {
    // Basic command handling
    if (userMessage.startsWith('login')) {
        return 'Sure, let me process your login request.';
    } else if (userMessage.startsWith('signup')) {
        return 'Great! I will help you sign up.';
    } else if (userMessage.startsWith('addtransaction')) {
        return 'Adding a new transaction. Please provide the details.';
    } else if (userMessage.startsWith('changepassword')) {
        return 'Got it! Let\'s change your password.';
    } else if (userMessage.startsWith('viewtransactions')) {
        return 'Sure, let me fetch your transactions.';
    } else if (userMessage.startsWith('addaccount')) {
        return 'Adding a new account. Please provide the details.';
    } else if (userMessage.startsWith('deleteaccount')) {
        return 'Sure, I will delete the specified account.';
    } else if (userMessage.startsWith('viewblacklisted')) {
        return 'Fetching information about blacklisted users.';
    } else if (userMessage.startsWith('addblacklisted')) {
        return 'Adding a user to the blacklist. Please provide the details.';
    } else {
        return 'I\'m sorry, I didn\'t understand that command.';
    }
}




    
    // Simulate bot response (you'll replace this with actual chatbot logic)
    

    // Clear the input field
    document.querySelector('.chat-input textarea').value = '';

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;


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

const detectFraud = async (amount, date, accountType) => {
    const fraudDetectionURL = "sk_test_yourstripeapikey"; // Replace with your fraud detection API endpoint
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${fraudDetectionAPIKey}`
      },
      body: JSON.stringify({
        amount,
        date,
        accountType,
        userId: loggedInUserId // Include relevant information for fraud detection
      })
    };
  
    try {
      const response = await fetch(fraudDetectionURL, requestOptions);
      const data = await response.json();
  
      // Process the fraud detection response
      console.log("Fraud detection result:", data);
  
      // Display the fraud detection result in the chatbox or take appropriate actions
      const fraudResult = data.isFraudulent;
      const message = fraudResult ? "Fraud detected!" : "No fraud detected.";
      const chatLi = createChatLi(message, "incoming");
      chatbox.appendChild(chatLi);
    } catch (error) {
      console.error("Error in fraud detection:", error);
    }
  };


sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
      
    




