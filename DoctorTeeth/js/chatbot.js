class DentalChatbot {
    constructor() {
        this.responses = {
            greeting: {
                en: ["Hello!", "Hi!", "Welcome!", "Hey there!", "Greetings!"],
                it: ["Ciao!", "Salve!", "Benvenuto!", "Buongiorno!", "Buonasera!"],
                al: ["Përshëndetje!", "Tungjatjeta!", "Mirësevini!", "Ç'kemi!"]
            },
            farewell: {
                en: ["Goodbye!", "See you soon!", "Take care!", "Have a great day!"],
                it: ["Arrivederci!", "A presto!", "Stammi bene!", "Buona giornata!"],
                al: ["Mirupafshim!", "Shihemi së shpejti!", "Kujdesuni!", "Ditën e mirë!"]
            },
            default: {
                en: "I'm not sure about that. Would you like to know more about our purple whitening technology?",
                it: "Non sono sicuro di questo. Vuoi saperne di più sulla nostra tecnologia di sbiancamento viola?",
                al: "Nuk jam i sigurt për këtë. Dëshironi të dini më shumë për teknologjinë tonë të zbardhjes vjollcë?"
            },
            whitening: {
                en: "Our purple whitening technology uses advanced color theory to neutralize yellow stains instantly!",
                it: "La nostra tecnologia di sbiancamento viola usa la teoria avanzata dei colori per neutralizzare istantaneamente le macchie gialle!",
                al: "Teknologjia jonë e zbardhjes vjollcë përdor teorinë e avancuar të ngjyrave për të neutralizuar menjëherë njollat e verdha!"
            },
            product: {
                en: "Our purple toothpaste uses color theory to neutralize yellow stains. Just one application shows visible results!",
                it: "Il nostro dentifricio viola usa la teoria dei colori per neutralizzare le macchie gialle. Una sola applicazione mostra risultati visibili!",
                al: "Pasta jonë e dhëmbëve vjollcë përdor teorinë e ngjyrave për të neutralizuar njollat e verdha. Vetëm një aplikim tregon rezultate të dukshme!"
            },
            safety: {
                en: "Our product is completely safe and dermatologically tested. It uses natural purple pigments that are safe for oral use.",
                it: "Il nostro prodotto è completamente sicuro e testato dermatologicamente. Utilizza pigmenti viola naturali sicuri per uso orale.",
                al: "Produkti ynë është plotësisht i sigurt dhe i testuar dermatologjikisht. Përdor pigmente vjollcë natyrale të sigurta për përdorim oral."
            },
            purchase: {
                en: "You can purchase our products from our official website or authorized retailers.",
                it: "Puoi acquistare i nostri prodotti dal nostro sito web ufficiale o dai rivenditori autorizzati.",
                al: "Ju mund të blini produktet tona nga faqja jonë zyrtare e internetit ose shitësit e autorizuar."
            }
        };

        this.keywords = {
            greetings: ['hello', 'hi', 'hey', 'ciao', 'salve', 'përshëndetje', 'tungjatjeta'],
            farewells: ['bye', 'goodbye', 'ciao', 'arrivederci', 'mirupafshim'],
            product: ['toothpaste', 'purple', 'viola', 'vjollcë', 'white', 'teeth', 'denti', 'dhëmbë'],
            help: ['help', 'aiuto', 'ndihmë', 'info', 'information']
        };

        this.quickReplies = {
            en: [
                "Tell me about the purple technology",
                "How does it work?",
                "Show me the flavors",
                "Is it safe?",
                "Where can I buy it?"
            ],
            it: [
                "Parlami della tecnologia viola",
                "Come funziona?",
                "Mostrami i sapori",
                "È sicuro?",
                "Dove posso comprarlo?"
            ],
            al: [
                "Më trego për teknologjinë vjollcë",
                "Si funksionon?",
                "Më trego shijet",
                "A është e sigurt?",
                "Ku mund ta blej?"
            ]
        };
    }

    initialize() {
        const chatbotHTML = `
            <button class="chatbot-toggle">
                <i class="fas fa-comments"></i>
            </button>
            <div class="chatbot-container">
                <div class="chat-header">
                    <i class="fas fa-tooth"></i>
                    <span>Dr. Bot</span>
                </div>
                <div class="chat-messages"></div>
                <div class="quick-replies"></div>
                <div class="chat-input">
                    <input type="text" placeholder="Choose a quick reply..." disabled>
                    <button disabled><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.setupEventListeners();
        this.sendBotMessage(this.responses.greeting[document.documentElement.lang || 'en'][0]);
        this.showQuickReplies();
    }

    setupEventListeners() {
        const toggle = document.querySelector('.chatbot-toggle');
        const container = document.querySelector('.chatbot-container');
        const input = document.querySelector('.chat-input input');
        const sendBtn = document.querySelector('.chat-input button');

        toggle.addEventListener('click', () => {
            container.classList.toggle('active');
        });

        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                this.sendUserMessage(message);
                this.processUserMessage(message);
                input.value = '';
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    sendUserMessage(message) {
        const chat = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.textContent = message;
        chat.appendChild(messageElement);
        chat.scrollTop = chat.scrollHeight;
    }

    sendBotMessage(message) {
        const chat = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.textContent = message;
        chat.appendChild(messageElement);
        chat.scrollTop = chat.scrollHeight;
    }

    showQuickReplies() {
        const quickRepliesContainer = document.querySelector('.quick-replies');
        const lang = document.documentElement.lang || 'en';
        
        quickRepliesContainer.innerHTML = this.quickReplies[lang]
            .map(reply => `<button class="quick-reply">${reply}</button>`)
            .join('');

        // Add click events to quick replies
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                this.sendUserMessage(button.textContent);
                this.processUserMessage(button.textContent);
            });
        });
    }

    processUserMessage(message) {
        const lang = document.documentElement.lang || 'en';
        const lowercaseMsg = message.toLowerCase();

        // Process based on quick reply content
        if (lowercaseMsg.includes('safe')) {
            this.sendBotMessage(this.responses.safety[lang]);
        } else if (lowercaseMsg.includes('buy') || lowercaseMsg.includes('purchase')) {
            this.sendBotMessage(this.responses.purchase[lang]);
        } else if (lowercaseMsg.includes('purple') || lowercaseMsg.includes('technology')) {
            this.sendBotMessage(this.responses.whitening[lang]);
        } else if (lowercaseMsg.includes('flavor')) {
            this.sendBotMessage(this.responses.product[lang]);
        } else if (this.keywords.greetings.some(word => lowercaseMsg.includes(word))) {
            const greetings = this.responses.greeting[lang];
            this.sendBotMessage(greetings[Math.floor(Math.random() * greetings.length)]);
        } else if (this.keywords.farewells.some(word => lowercaseMsg.includes(word))) {
            const farewells = this.responses.farewell[lang];
            this.sendBotMessage(farewells[Math.floor(Math.random() * farewells.length)]);
        } else if (this.keywords.product.some(word => lowercaseMsg.includes(word))) {
            this.sendBotMessage(this.responses.product[lang]);
        } else {
            this.sendBotMessage(this.responses.default[lang]);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new DentalChatbot();
    chatbot.initialize();
});

// Add CSS for quick replies
const style = document.createElement('style');
style.textContent = `
    .quick-replies {
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        border-top: 1px solid var(--glass-border);
    }

    .quick-reply {
        padding: 0.5rem 1rem;
        border: 1px solid var(--primary-color);
        border-radius: 15px;
        background: var(--glass-bg);
        color: var(--primary-color);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .quick-reply:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }

    .chat-input input:disabled {
        background: var(--glass-bg);
        cursor: not-allowed;
    }

    .chat-input button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
