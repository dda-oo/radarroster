/**
 * RadarRoster Smart Chatbot
 * A configurable AI-style chatbot trained on website content
 * Can be customized for any client website
 * 
 * @version 1.0.0
 * @author RadarRoster
 */

class SmartChatbot {
    constructor(config = {}) {
        this.config = {
            brandName: config.brandName || 'RadarRoster',
            brandColor: config.brandColor || '#4A90E2',
            position: config.position || 'bottom-left', // bottom-right, bottom-left
            welcomeMessage: config.welcomeMessage || 'Hi! I\'m here to help you learn about our services. Ask me anything!',
            language: config.language || 'en',
            knowledgeBase: config.knowledgeBase || this.getDefaultKnowledge(),
            ...config
        };
        
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    getDefaultKnowledge() {
        return {
            // Services
            'ai|artificial intelligence|machine learning|ml|predictive': {
                en: "We offer comprehensive AI Strategy & Implementation services including:\n• Custom AI roadmaps tailored to your business\n• AI-powered dashboards (Power BI, Tableau)\n• Predictive modeling & machine learning\n• Conversational AI agents & chatbots\n\nWe help companies leverage AI to increase productivity by up to 55% and make decisions 70% faster.",
                de: "Wir bieten umfassende KI-Strategie & Implementierung:\n• Individuelle KI-Roadmaps\n• KI-gestützte Dashboards\n• Predictive Modeling & Machine Learning\n• Konversations-KI-Agenten\n\nWir helfen Unternehmen, die Produktivität um bis zu 55% zu steigern."
            },
            'data engineering|pipeline|etl|warehouse|database': {
                en: "Our Data Engineering services include:\n• Custom ETL/ELT pipeline development\n• Real-time data streaming & processing\n• Data warehouse modernization (Snowflake, BigQuery, Azure)\n• Data quality frameworks\n\nWe transform siloed, messy data into a seamless, scalable data flow.",
                de: "Unsere Data Engineering Services:\n• ETL/ELT-Pipeline-Entwicklung\n• Echtzeit-Datenstreaming\n• Data Warehouse Modernisierung\n• Datenqualitäts-Frameworks\n\nWir verwandeln isolierte Daten in nahtlose Datenflüsse."
            },
            'erp|sap|workday|oracle|cloud migration|modernization': {
                en: "We specialize in ERP & Cloud Modernization:\n• SAP, Workday & Oracle integration\n• Cloud migration (Azure, AWS, GCP)\n• Process automation & optimization\n• Legacy system modernization\n\nWe help you overcome technical debt and accelerate innovation.",
                de: "Wir sind spezialisiert auf ERP & Cloud Modernisierung:\n• SAP, Workday & Oracle Integration\n• Cloud-Migration (Azure, AWS, GCP)\n• Prozessautomatisierung\n• Legacy-System-Modernisierung"
            },
            'training|workshop|learning|upskilling|enablement': {
                en: "Our Training & Enablement programs offer:\n• Role-based learning paths (developers, analysts, managers)\n• Hands-on workshops with real tools\n• Custom training for your tech stack\n• Ongoing support & knowledge transfer\n\nWe build long-term competency in your team.",
                de: "Unsere Trainings- und Enablement-Programme:\n• Rollenbasierte Lernpfade\n• Hands-on-Workshops\n• Individuelle Schulungen\n• Kontinuierliche Unterstützung"
            },
            'price|cost|pricing|budget|how much': {
                en: "Our pricing is customized based on your specific needs and project scope. We offer:\n• Free initial strategy consultation\n• Flexible engagement models (project-based, retainer)\n• Transparent pricing with no hidden costs\n\nLet's schedule a free call to discuss your requirements!",
                de: "Unsere Preise sind individuell auf Ihre Bedürfnisse zugeschnitten:\n• Kostenlose Erstberatung\n• Flexible Engagement-Modelle\n• Transparente Preisgestaltung\n\nLassen Sie uns einen kostenlosen Termin vereinbaren!"
            },
            'contact|email|phone|call|meeting|demo': {
                en: "I'd love to connect you with our team! You can:\n• Book a free strategy call using the contact form below\n• Email us at: hello@radarroster.com\n• Visit our website: radarroster.com\n\nWould you like me to scroll down to the contact form?",
                de: "Gerne verbinde ich Sie mit unserem Team:\n• Buchen Sie einen kostenlosen Strategie-Call\n• E-Mail: hello@radarroster.com\n• Website: radarroster.com\n\nSoll ich zum Kontaktformular scrollen?"
            },
            'process|methodology|how you work|approach': {
                en: "We follow a proven 3-step methodology:\n\n1. Analysis & Strategy\n   • Data landscape assessment\n   • Use case prioritization\n   • Custom roadmap development\n\n2. Implementation & Development\n   • Rapid prototyping & MVP\n   • Data pipeline construction\n   • AI model integration\n\n3. Guidance & Enablement\n   • Team training\n   • Ongoing optimization\n   • Long-term partnership\n\nWe use Design Thinking, Double Diamond, and Agile methodologies.",
                de: "Wir folgen einer bewährten 3-Schritt-Methodik:\n\n1. Analyse & Strategie\n2. Implementierung & Entwicklung\n3. Begleitung & Enablement\n\nWir nutzen Design Thinking, Double Diamond und Agile."
            },
            'project|portfolio|example|case study|showcase': {
                en: "We've delivered 20+ successful projects including:\n\n• Burnout Risk Prediction (HR Analytics)\n• Emotional AI Chatbot (Mental Wellness)\n• Small Cap Intelligence Dashboard (Finance)\n• AI Training Recommender (Enterprise L&D)\n• SAP & Workday Data Integration\n• Sales & Operations Automation Bots\n\nWould you like to know more about any of these?",
                de: "Wir haben 20+ erfolgreiche Projekte umgesetzt:\n\n• Burnout-Risiko-Vorhersage\n• Emotionale KI-Chatbots\n• Finance Dashboards\n• KI-Trainings-Empfehlungen\n• SAP & Workday Integration\n• Automatisierungs-Bots"
            },
            'why|benefit|advantage|value proposition': {
                en: "Why choose RadarRoster?\n\n✓ 55% productivity increase with AI solutions\n✓ 70% faster decision-making\n✓ 30% cost reduction through optimization\n✓ 20+ successful projects delivered\n✓ 100% client satisfaction\n✓ Transparent, partnership-driven approach\n\nWe focus on custom development, not templates, with deep practical AI & data expertise.",
                de: "Warum RadarRoster?\n\n✓ 55% Produktivitätssteigerung\n✓ 70% schnellere Entscheidungen\n✓ 30% Kostenreduktion\n✓ 20+ erfolgreiche Projekte\n✓ 100% Kundenzufriedenheit\n✓ Transparente Partnerschaft"
            },
            'who|about|team|company': {
                en: "RadarRoster is your partner for AI-driven data solutions. We work with organizations from startups to enterprises, helping them transform data into strategic advantage.\n\nOur philosophy: Transparency as a Service. We believe in co-creation, open communication, and long-term partnerships.\n\nWe're not just consultants—we're practitioners who use our own solutions daily.",
                de: "RadarRoster ist Ihr Partner für KI-gestützte Datenlösungen. Wir arbeiten mit Startups bis Großunternehmen.\n\nUnsere Philosophie: Transparenz als Service. Wir glauben an Ko-Kreation und langfristige Partnerschaften."
            },
            'hello|hi|hey|greetings|good morning|good afternoon': {
                en: "Hello! 👋 Welcome to RadarRoster. I'm here to help you explore our AI and data intelligence services. What would you like to know about?",
                de: "Hallo! 👋 Willkommen bei RadarRoster. Wie kann ich Ihnen helfen?"
            },
            'thanks|thank you|great|awesome|perfect': {
                en: "You're welcome! 😊 Is there anything else you'd like to know about our services?",
                de: "Gerne! 😊 Kann ich Ihnen noch mit etwas anderem helfen?"
            }
        };
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        
        // Add welcome message
        this.messages.push({
            type: 'bot',
            text: this.config.welcomeMessage,
            timestamp: new Date()
        });
    }

    createChatWidget() {
        const positionClass = this.config.position === 'bottom-left' ? 'left-4' : 'right-4';
        
        const html = `
            <div id="smart-chatbot" class="fixed bottom-4 ${positionClass} z-50">
                <!-- Chat Button -->
                <button id="chat-toggle-btn" class="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: linear-gradient(135deg, ${this.config.brandColor} 0%, #8B5CF6 100%);">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div id="chat-window" class="hidden absolute bottom-20 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden" style="max-height: calc(100vh - 8rem);">
                    <!-- Header -->
                    <div class="p-4 border-b border-gray-800" style="background: linear-gradient(135deg, ${this.config.brandColor} 0%, #8B5CF6 100%);">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-semibold text-white">${this.config.brandName} AI</div>
                                    <div class="text-xs text-white/80">Online • Ready to help</div>
                                </div>
                            </div>
                            <button id="chat-close-btn" class="text-white hover:text-gray-200 transition">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Messages -->
                    <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Quick Actions -->
                    <div id="quick-actions" class="px-4 py-2 border-t border-gray-800 flex flex-wrap gap-2 bg-gray-900/50">
                        <!-- Quick action buttons -->
                    </div>

                    <!-- Input -->
                    <div class="p-4 border-t border-gray-800 bg-gray-900">
                        <div class="flex space-x-2">
                            <input 
                                type="text" 
                                id="chat-input" 
                                placeholder="Ask me anything..."
                                class="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                            />
                            <button id="chat-send-btn" class="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90" style="background: ${this.config.brandColor}; color: white;">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.renderMessages();
        this.renderQuickActions();
    }

    renderMessages() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = this.messages.map(msg => {
            const isBot = msg.type === 'bot';
            return `
                <div class="flex ${isBot ? 'justify-start' : 'justify-end'}">
                    <div class="max-w-[80%] ${isBot ? 'bg-gray-800' : 'bg-blue-600'} rounded-2xl px-4 py-3 text-white">
                        <div class="whitespace-pre-wrap text-sm leading-relaxed">${this.escapeHtml(msg.text)}</div>
                        <div class="text-xs text-gray-400 mt-1">${this.formatTime(msg.timestamp)}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    renderQuickActions() {
        const quickActionsContainer = document.getElementById('quick-actions');
        if (!quickActionsContainer || this.messages.length > 1) {
            quickActionsContainer.style.display = 'none';
            return;
        }

        const actions = [
            { label: '🤖 AI Services', query: 'Tell me about AI services' },
            { label: '📊 Data Engineering', query: 'What is data engineering?' },
            { label: '💼 Contact', query: 'How can I contact you?' }
        ];

        quickActionsContainer.innerHTML = actions.map(action => `
            <button class="quick-action-btn px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition border border-gray-700" data-query="${action.query}">
                ${action.label}
            </button>
        `).join('');

        // Attach listeners to quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.currentTarget.dataset.query;
                this.handleUserMessage(query);
            });
        });
    }

    attachEventListeners() {
        // Toggle chat
        document.getElementById('chat-toggle-btn').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat
        document.getElementById('chat-close-btn').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('chat-send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.remove('hidden');
            chatWindow.style.animation = 'slideInUp 0.3s ease-out';
            toggleBtn.style.transform = 'scale(0.9)';
            
            // Focus input
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 300);
        } else {
            chatWindow.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300);
            toggleBtn.style.transform = 'scale(1)';
        }
    }

    closeChat() {
        this.isOpen = false;
        const chatWindow = document.getElementById('chat-window');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        
        chatWindow.style.animation = 'slideOutDown 0.3s ease-in';
        setTimeout(() => {
            chatWindow.classList.add('hidden');
        }, 300);
        toggleBtn.style.transform = 'scale(1)';
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.handleUserMessage(message);
        input.value = '';
    }

    handleUserMessage(message) {
        // Add user message
        this.messages.push({
            type: 'user',
            text: message,
            timestamp: new Date()
        });
        
        this.renderMessages();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.messages.push({
                type: 'bot',
                text: response,
                timestamp: new Date()
            });
            
            this.hideTypingIndicator();
            this.renderMessages();
            this.renderQuickActions();
        }, 500 + Math.random() * 1000); // Simulate thinking time
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const lang = this.config.language;
        
        // Find best matching response
        for (const [pattern, responses] of Object.entries(this.config.knowledgeBase)) {
            const keywords = pattern.split('|');
            if (keywords.some(keyword => message.includes(keyword))) {
                return responses[lang] || responses['en'];
            }
        }
        
        // Default fallback
        if (lang === 'de') {
            return "Das ist eine interessante Frage! Ich empfehle, direkt mit unserem Team zu sprechen. Möchten Sie einen kostenlosen Beratungstermin vereinbaren? Nutzen Sie einfach das Kontaktformular unten auf der Seite oder schreiben Sie uns an hello@radarroster.com";
        }
        
        return "That's an interesting question! I'd recommend speaking directly with our team for the best answer. Would you like to schedule a free consultation? You can use the contact form below or email us at hello@radarroster.com";
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingHTML = `
            <div id="typing-indicator" class="flex justify-start">
                <div class="bg-gray-800 rounded-2xl px-4 py-3">
                    <div class="flex space-x-2">
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get current language from page
    const currentLang = document.documentElement.lang || 'en';
    
    window.radarChatbot = new SmartChatbot({
        brandName: 'RadarRoster',
        brandColor: '#4A90E2',
        language: currentLang,
        welcomeMessage: currentLang === 'de' 
            ? 'Hallo! 👋 Ich helfe Ihnen gerne mehr über unsere KI- und Daten-Services zu erfahren. Was möchten Sie wissen?'
            : 'Hi! 👋 I\'m here to help you learn about our AI and data intelligence services. What would you like to know?'
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);
