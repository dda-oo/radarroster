

class SmartChatbot {
    constructor(config = {}) {
        this.config = {
            brandName: config.brandName || 'RadarRoster',
            brandColor: config.brandColor || '#4A90E2',
            position: config.position || 'bottom-left',
            welcomeMessage: config.welcomeMessage || 'Hi! 👋 I\'m your AI assistant. How can I help you today?',
            knowledgeBase: config.knowledgeBase || this.getDefaultKnowledge(),
            transcriptEmail: config.transcriptEmail || 'hello@radarroster.com',
            web3formsKey: config.web3formsKey || 'fc055f0b-0423-454a-8625-57e197ca487c',
            ...config
        };
        
        this.isOpen = false;
        this.messages = [];
        this.lastTopic = null;
        this.lastResponse = null;
        this.visitorEmail = null;
        this.visitorName = null;
        this.emailCaptured = false;
        this.chatStartTime = null;
        this.transcriptSent = false;
        this.messageCount = 0;
        this.init();
    }

    getDefaultKnowledge() {
        return {
            'who|owner|founder|ceo|lead|management|team|behind': {
                response: "RadarRoster is led by **Daryoosh Dehestani**, founder and owner of this AI & Data Intelligence consultancy based in Offenburg, Germany.\n\nWe're a team of practitioners who use our own solutions daily and believe in transparency as a service.\n\n🎯 **Ready to work with experts who walk the talk?**\n→ [Schedule a free 30-min strategy call](https://calendly.com/radarroster/meeting)\n→ Email Daryoosh directly: hello@radarroster.com"
            },
            'address|location|office|where|headquarter|based': {
                response: "📍 **Location:** Offenburg, Germany 🇩🇪\n📧 **Email:** hello@radarroster.com\n🌐 **Website:** radarroster.com\n\n🌍 **Serving clients globally from our German HQ**\n→ [Book in-person or virtual meeting](https://calendly.com/radarroster/meeting)\n→ Fast response within 24 hours!"
            },
            'book|appointment|meeting|schedule|calendly|call|demo|consultation': {
                response: "📅 **Book Your Free Strategy Call:**\n\n🔗 [Schedule on Calendly](https://calendly.com/radarroster/meeting)\n\n✨ **What you'll get:**\n• 30-min personalized consultation\n• Custom AI/data roadmap\n• ROI projections\n• Zero obligation\n\n⚡ **Spots available this week!** [Book now](https://calendly.com/radarroster/meeting)"
            },
            'ai|artificial intelligence|machine learning|ml|predictive|chatbot|automation': {
                response: "🤖 **AI Strategy & Implementation:**\n\n• Custom AI roadmaps tailored to your business\n• AI-powered dashboards (Power BI, Tableau)\n• Predictive modeling & machine learning\n• Conversational AI agents & chatbots like this one!\n\n✨ **Real Results:**\n• 55% productivity increase\n• 70% faster decision-making\n• 85% accuracy in predictions\n\n🚀 **Start your AI transformation today**\n→ [Get free AI readiness assessment](https://calendly.com/radarroster/meeting)\n→ See ROI in weeks, not months!"
            },
            'data engineering|pipeline|etl|warehouse|database|data integration|snowflake|bigquery': {
                response: "⚙️ **Data Engineering Services:**\n\n• Custom ETL/ELT pipeline development\n• Real-time data streaming & processing\n• Data warehouse modernization (Snowflake, BigQuery, Azure)\n• Data quality frameworks & governance\n\n✨ **Transform** siloed data into seamless, scalable flow\n\n💡 **Solve your data challenges now**\n→ [Book free data audit call](https://calendly.com/radarroster/meeting)\n→ Discover hidden value in your existing data!"
            },
            'erp|sap|workday|oracle|cloud migration|modernization|prism|legacy system': {
                response: "☁️ **ERP & Cloud Modernization:**\n\n• SAP, Workday & Oracle integration (including Prism Analytics)\n• Cloud migration (Azure, AWS, GCP)\n• Process automation & optimization\n• Legacy system modernization\n\n✨ **Overcome** technical debt and accelerate innovation\n\n🎯 **Escape legacy limitations today**\n→ [Get custom modernization roadmap](https://calendly.com/radarroster/meeting)\n→ Reduce costs while increasing agility!"
            },
            'training|workshop|learning|upskilling|enablement|course|education': {
                response: "📚 **Training & Enablement:**\n\n• Role-based learning paths (developers, analysts, managers)\n• Hands-on workshops with real tools\n• Custom training for your tech stack\n• Ongoing support & knowledge transfer\n\n✨ **Build** long-term competency in your team\n\n🎓 **Invest in your team's future**\n→ [Design custom training program](https://calendly.com/radarroster/meeting)\n→ Turn skills into competitive advantage!"
            },
            'service|what do you do|offering|solutions|help': {
                response: "🎯 **Our Core Services:**\n\n1️⃣ **AI Strategy & Implementation**\n   → Custom AI solutions & chatbots\n\n2️⃣ **Data Engineering & Pipelines**\n   → ETL, streaming, warehouse modernization\n\n3️⃣ **ERP & Cloud Modernization**\n   → SAP, Workday, Oracle integration\n\n4️⃣ **Training & Team Enablement**\n   → Hands-on workshops & upskilling\n\n💼 **Discover how we can help your business**\n→ [Book free 30-min consultation](https://calendly.com/radarroster/meeting)\n→ Get custom solution roadmap!"
            },
            'price|cost|pricing|budget|how much|expensive|fee|rate': {
                response: "💰 **Flexible Pricing:**\n\nOur pricing is customized based on your specific needs:\n\n✓ **Free** initial strategy consultation\n✓ **Flexible** engagement models (project/retainer)\n✓ **Transparent** pricing, no hidden costs\n✓ **ROI-focused** - we prove value first\n\n� **Get your personalized quote**\n→ [Book free consultation](https://calendly.com/radarroster/meeting) - zero obligation\n→ Transparent pricing + clear ROI projections"
            },
            'contact|email|phone|reach|connect|talk|speak': {
                response: "📞 **Let's Connect:**\n\n📧 **Email:** hello@radarroster.com\n📅 **Calendly:** [Book a meeting](https://calendly.com/radarroster/meeting)\n💼 **LinkedIn:** [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n📰 **Newsletter:** [radarroster.substack.com](https://radarroster.substack.com)\n\n✨ **Choose your preferred channel:**\n→ [Book 30-min call](https://calendly.com/radarroster/meeting) - Available this week!\n→ Email: hello@radarroster.com - Response within 24h guaranteed!"
            },
            'process|methodology|how you work|approach|steps|timeline': {
                response: "🔄 **Our 3-Step Methodology:**\n\n**Phase 1: Analysis & Strategy** (1-2 weeks)\n   → Data landscape assessment\n   → Use case prioritization\n   → Custom roadmap development\n\n**Phase 2: Implementation** (4-12 weeks)\n   → Rapid prototyping & MVP\n   → Data pipeline construction\n   → AI model integration\n\n**Phase 3: Enablement** (Ongoing)\n   → Team training\n   → Continuous optimization\n   → Long-term partnership\n\nWe use **Design Thinking**, **Double Diamond**, and **Agile** frameworks.\n\n⚡ **Start your project journey today**\n→ [Get custom project timeline](https://calendly.com/radarroster/meeting)\n→ Fast-track with our proven methodology!"
            },
            'project|portfolio|example|case study|showcase|work|clients|success': {
                response: "🚀 **Project Showcase** (20+ delivered):\n\n**HR Analytics**\n• Burnout Risk Prediction (85% accuracy)\n\n**Mental Wellness**\n• Emotional AI Chatbot (60% faster support)\n\n**Finance**\n• Small Cap Intelligence Dashboard\n\n**Enterprise L&D**\n• AI Training Recommender System\n\n**ERP Integration**\n• SAP & Workday Data Integration\n\n**Operations**\n• Sales & Operations Automation Bots\n\n🎯 **Get results like these for your business**\n→ [Request relevant case studies](https://calendly.com/radarroster/meeting)\n→ Learn from similar successful projects!"
            },
            'why|benefit|advantage|value proposition|different|better|choose': {
                response: "⭐ **Why RadarRoster?**\n\n✅ **Proven Results:**\n   • 55% productivity increase\n   • 70% faster decision-making\n   • 30% cost reduction\n   • 20+ successful projects\n   • 100% client satisfaction\n\n✅ **Our Approach:**\n   • Custom solutions, not templates\n   • Deep AI & data expertise\n   • Transparent partnership\n   • We use what we build\n\n✅ **Your Success:**\n   • Free strategy call\n   • ROI-focused delivery\n   • Ongoing support\n\n🚀 **Experience the RadarRoster difference**\n→ [Start with free consultation](https://calendly.com/radarroster/meeting)\n→ Join 20+ satisfied clients!"
            },
            'about|company|philosophy|mission|vision|story': {
                response: "🎯 **About RadarRoster:**\n\nYour partner for AI-driven data solutions — from startups to enterprises.\n\n📍 **Based in:** Offenburg, Germany\n👤 **Founded by:** Daryoosh Dehestani\n\n**Our Philosophy:** *Transparency as a Service*\n\nWe believe in:\n✓ Co-creation with clients\n✓ Open communication\n✓ Long-term partnerships\n✓ Practical, proven solutions\n\n**We're not just consultants** — we're practitioners who use our own solutions daily.\n\n🤝 **Partner with a team that walks the talk**\n→ [Meet our team on a free call](https://calendly.com/radarroster/meeting)\n→ See our philosophy in action!"
            },
            'newsletter|blog|substack|article|news|content|insights': {
                response: "📰 **Stay Updated:**\n\nSubscribe to our newsletter for AI & data insights:\n\n🔗 **Substack:** [radarroster.substack.com](https://radarroster.substack.com)\n🔗 **Newsletter Page:** [Visit our blog](/pages/blog.html)\n\nWe share:\n• Industry trends\n• Case studies\n• Practical tips\n• Technology updates\n\n🎁 **Join our community**\n→ [Subscribe to newsletter](https://radarroster.substack.com)\n→ Plus get free AI strategy guide when you book a call!"
            },
            'privacy|data protection|gdpr|security|safe': {
                response: "🔒 **Privacy & Data Protection:**\n\nYour privacy matters to us.\n\n🔗 **Privacy Policy:** [View details](/pages/datenschutz.html)\n\n✓ Full GDPR compliance\n✓ Secure data handling\n✓ Transparent practices\n✓ Your data, your control\n\nWe take data protection seriously.\n\n🔐 **Work with a secure partner**\n→ [Discuss your security requirements](https://calendly.com/radarroster/meeting)\n→ Enterprise-grade data protection guaranteed!"
            },
            'imprint|impressum|legal|terms': {
                response: "⚖️ **Legal Information:**\n\n🔗 **Imprint:** [View details](/pages/impressum.html)\n\nNeed specific legal information? Feel free to ask!"
            },
            'linkedin|social media|follow|network': {
                response: "🔗 **Connect with RadarRoster:**\n\n💼 **LinkedIn:** [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n📰 **Newsletter:** [radarroster.substack.com](https://radarroster.substack.com)\n\n**Follow us for:**\n• AI & data insights\n• Industry updates\n• Project showcases\n• Job opportunities\n\n👥 **Join our growing community**\n→ [Connect on LinkedIn](https://www.linkedin.com/company/radarroster)\n→ Then [book a 1-on-1 call](https://calendly.com/radarroster/meeting)!"
            },
            'hello|hi|hey|greetings|good morning|good afternoon|good evening': {
                response: "Hello! 👋 Welcome to RadarRoster.\n\nI'm here to help you explore our AI and data intelligence services.\n\n**Quick links:**\n• [Our Services](#services)\n• [Recent Projects](#projects)\n• [Book a Call](https://calendly.com/radarroster/meeting)\n\n👉 **Ready to transform your business?**\n→ Ask me anything or [book free consultation](https://calendly.com/radarroster/meeting)!"
            },
            'thanks|thank you|great|awesome|perfect|appreciate|helpful': {
                response: "You're very welcome! 😊\n\nI'm glad I could help!\n\n**Next steps:**\n• Ask another question\n• [Book a free consultation](https://calendly.com/radarroster/meeting)\n• Explore our [services](#services)\n\n🚀 **Turn insights into action**\n→ [Schedule your strategy call now](https://calendly.com/radarroster/meeting)\n→ First 30 minutes completely free!"
            },
            'no|nope|nothing': {
                response: "No problem! 👋\n\nFeel free to reach out anytime:\n📧 hello@radarroster.com\n📅 [calendly.com/radarroster/meeting](https://calendly.com/radarroster/meeting)\n\n✨ **Before you go:**\n→ [Grab a free meeting slot](https://calendly.com/radarroster/meeting)\n→ Subscribe to [our newsletter](https://radarroster.substack.com)\n\nHave a great day!"
            },
            'yes|yeah|sure|okay|ok': {
                response: "Great! 🎯\n\nHow can I assist you?\n\n**Popular topics:**\n• AI solutions\n• Data engineering\n• ERP modernization\n• Pricing & timeline\n• Book a call\n\n🚀 **Let's get started**\n→ [Skip the chat - book now](https://calendly.com/radarroster/meeting)\n→ Or ask me anything!"
            }
        };
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        
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
                <button id="chat-toggle-btn" class="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300" style="background: linear-gradient(135deg, ${this.config.brandColor} 0%, #8B5CF6 100%);" aria-label="Open chat">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div id="chat-window" class="hidden absolute bottom-20 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden" style="max-height: calc(100vh - 8rem);" role="dialog" aria-label="Chat window">
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
                                    <div class="text-xs text-white/80 flex items-center">
                                        <span class="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                                        Online • Ready to help
                                    </div>
                                </div>
                            </div>
                            <button id="chat-close-btn" class="text-white hover:text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Close chat">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Messages -->
                    <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scroll-smooth">
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
                                aria-label="Type your message"
                            />
                            <button id="chat-send-btn" class="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300" style="background: ${this.config.brandColor}; color: white;" aria-label="Send message">
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
    }

    renderMessages() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = this.messages.map(msg => {
            const isBot = msg.type === 'bot';
            return `
                <div class="flex ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn">
                    <div class="max-w-[80%] ${isBot ? 'bg-gray-800' : 'bg-blue-600'} rounded-2xl px-4 py-3 text-white shadow-lg">
                        <div class="whitespace-pre-wrap text-sm leading-relaxed">${this.escapeHtml(msg.text)}</div>
                        <div class="text-xs text-gray-400 mt-1">${this.formatTime(msg.timestamp)}</div>
                    </div>
                </div>
            `;
        }).join('');

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    renderQuickActions() {
        const quickActionsContainer = document.getElementById('quick-actions');
        
        if (!quickActionsContainer || !this.emailCaptured || this.messages.length > 1) {
            if (quickActionsContainer) quickActionsContainer.style.display = 'none';
            return;
        }

        quickActionsContainer.style.display = 'flex';

        const actions = [
            { label: '🤖 AI Services', query: 'Tell me about AI services' },
            { label: '📊 Data Engineering', query: 'What is data engineering?' },
            { label: '💼 Contact', query: 'How can I contact you?' }
        ];

        quickActionsContainer.innerHTML = actions.map(action => `
            <button class="quick-action-btn px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" data-query="${action.query}">
                ${action.label}
            </button>
        `).join('');

        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.currentTarget.dataset.query;
                this.handleUserMessage(query);
            });
        });
    }

    attachEventListeners() {
        document.getElementById('chat-toggle-btn').addEventListener('click', () => {
            this.toggleChat();
        });

        document.getElementById('chat-close-btn').addEventListener('click', () => {
            this.closeChat();
        });

        document.getElementById('chat-send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
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
            
            if (!this.emailCaptured) {
                this.showEmailCapture();
            } else {
                setTimeout(() => {
                    document.getElementById('chat-input').focus();
                }, 300);
            }
            
            if (!this.chatStartTime) {
                this.chatStartTime = new Date();
            }
        } else {
            chatWindow.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300);
            toggleBtn.style.transform = 'scale(1)';
        }
    }

    closeChat() {
        if (this.emailCaptured && this.messages.length > 1 && !this.transcriptSent) {
            this.sendTranscript();
            
            const confirmMsg = {
                type: 'bot',
                text: "📧 Chat transcript sent to our team! We'll review and get back to you within 24 hours. Thanks for chatting! 👋",
                timestamp: new Date()
            };
            this.messages.push(confirmMsg);
            this.renderMessages();
            
            setTimeout(() => {
                this.actuallyCloseChat();
            }, 2000);
        } else {
            this.actuallyCloseChat();
        }
    }

    actuallyCloseChat() {
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
        
        if (!this.emailCaptured) {
            this.showEmailCapture();
            return;
        }
        
        this.handleUserMessage(message);
        input.value = '';
    }

    handleUserMessage(message) {
        this.messages.push({
            type: 'user',
            text: message,
            timestamp: new Date()
        });
        
        this.messageCount++;
        this.renderMessages();
        
        this.showTypingIndicator();
        
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
        }, 800 + Math.random() * 800); // Simulate thinking time
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        const followUpPatterns = [
            'what else', 'tell me more', 'more', 'continue', 'and', 'anything else', 'elaborate'
        ];
        
        if (followUpPatterns.some(pattern => message.includes(pattern))) {
            if (this.lastTopic && this.lastResponse) {
                const expandedResponses = {
                    'who|owner|founder|ceo|lead|management|team|behind': {
                        response: "📞 **Want to connect with Daryoosh?**\n\n✓ Book a call: [calendly.com/radarroster/meeting](https://calendly.com/radarroster/meeting)\n✓ Email: hello@radarroster.com\n✓ LinkedIn: [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n\nWe're always happy to discuss your project!"
                    },
                    'service|what do you do|offering|solutions|help': {
                        response: "💡 **How we work:**\n\nAll services follow our proven methodology:\n1. Free strategy consultation\n2. Custom roadmap development\n3. Agile implementation with your team\n4. Training & knowledge transfer\n\n📅 [Book a free call](https://calendly.com/radarroster/meeting) to discuss your needs!"
                    },
                    'ai|artificial intelligence|machine learning|ml|predictive|chatbot|automation': {
                        response: "🎯 **Real AI Impact:**\n\n✓ Burnout Risk Prediction: 85% accuracy\n✓ Chatbots reducing support time by 60%\n✓ Dashboards improving decision speed by 70%\n\n📅 Want to see demos? [Book a call](https://calendly.com/radarroster/meeting)"
                    }
                };
                
                if (expandedResponses[this.lastTopic]) {
                    return expandedResponses[this.lastTopic].response;
                }
                
                return "Sure! For more details, I recommend booking a personal call:\n📅 [Calendly](https://calendly.com/radarroster/meeting) or 📧 hello@radarroster.com";
            }
            
            return "What would you like to know more about? Ask me about our services, projects, pricing, or team!";
        }
        
        if (message.match(/^(no|nope|nah|not really|don't|dont)$/)) {
            this.lastTopic = null;
            return "Understood! Is there anything else I can help you with?";
        }
        
        if (message.match(/^(yes|yeah|yep|sure|ok|okay)$/)) {
            return "Great! Use the contact form below or email us at hello@radarroster.com\n\nOr book directly: [calendly.com/radarroster/meeting](https://calendly.com/radarroster/meeting)";
        }
        
        for (const [pattern, data] of Object.entries(this.config.knowledgeBase)) {
            const keywords = pattern.split('|');
            if (keywords.some(keyword => message.includes(keyword))) {
                this.lastTopic = pattern;
                this.lastResponse = data.response;
                return data.response;
            }
        }
        
        this.lastTopic = null;
        
        return "That's an interesting question! 🤔\n\nI'm best at answering questions about:\n• Services (AI, Data, ERP, Training)\n• Projects & Portfolio\n• Pricing & Process\n• Team & Contact\n\nOr speak with us directly:\n📅 [Calendly](https://calendly.com/radarroster/meeting) | 📧 hello@radarroster.com";
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingHTML = `
            <div id="typing-indicator" class="flex justify-start animate-fadeIn">
                <div class="bg-gray-800 rounded-2xl px-4 py-3 shadow-lg">
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

    showEmailCapture() {
        const messagesContainer = document.getElementById('chat-messages');
        
        document.getElementById('chat-input').disabled = true;
        document.getElementById('chat-send-btn').disabled = true;
        
        const emailCaptureHTML = `
            <div id="email-capture-container" class="flex justify-center items-center h-full animate-fadeIn">
                <div class="bg-gray-800 rounded-2xl p-6 max-w-sm w-full border border-gray-700 shadow-2xl">
                    <div class="text-center mb-4">
                        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">Welcome! 👋</h3>
                        <p class="text-sm text-gray-400">Please enter your email to start chatting. We'll send you a transcript of our conversation.</p>
                    </div>
                    <div class="space-y-3">
                        <input 
                            type="email" 
                            id="visitor-email-input" 
                            placeholder="your@email.com"
                            class="w-full bg-gray-900 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                            autocomplete="email"
                            required
                        />
                        <button 
                            id="submit-email-btn" 
                            class="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                            style="background: ${this.config.brandColor};"
                        >
                            Start Chat
                        </button>
                        <p class="text-xs text-gray-500 text-center">We respect your privacy. See our <a href="/pages/datenschutz.html" target="_blank" class="text-blue-400 hover:underline">Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.innerHTML = emailCaptureHTML;
        
        setTimeout(() => {
            const emailInput = document.getElementById('visitor-email-input');
            if (emailInput) emailInput.focus();
        }, 100);
        
        const submitBtn = document.getElementById('submit-email-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.validateAndCaptureEmail();
            });
        }
        
        const emailInput = document.getElementById('visitor-email-input');
        if (emailInput) {
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.validateAndCaptureEmail();
                }
            });
        }
    }

    validateAndCaptureEmail() {
        const emailInput = document.getElementById('visitor-email-input');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailInput.classList.add('ring-2', 'ring-red-500');
            emailInput.placeholder = 'Please enter a valid email';
            emailInput.value = '';
            
            emailInput.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                emailInput.classList.remove('ring-2', 'ring-red-500');
                emailInput.placeholder = 'your@email.com';
                emailInput.style.animation = '';
            }, 2000);
            
            return;
        }
        
        this.visitorEmail = email;
        this.emailCaptured = true;
        
        document.getElementById('chat-input').disabled = false;
        document.getElementById('chat-send-btn').disabled = false;
        
        this.renderMessages();
        
        this.messages.push({
            type: 'bot',
            text: `Great! I've got your email (${email}). How can I help you today?\n\n💡 I can answer questions about our services, projects, pricing, and more!\n\n✨ **Tip:** Your conversation will be saved and sent to both you and our team.`,
            timestamp: new Date()
        });
        
        this.renderMessages();
        this.renderQuickActions();
        
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
    }

    async sendTranscript() {
        if (!this.visitorEmail || this.messages.length <= 1 || this.transcriptSent) return;
        
        this.transcriptSent = true; // Prevent duplicate sends
        
        const chatDuration = this.chatStartTime ? Math.round((new Date() - this.chatStartTime) / 1000 / 60) : 0;
        
        let transcript = `=== RADARROSTER CHAT TRANSCRIPT ===\n\n`;
        transcript += `Visitor Email: ${this.visitorEmail}\n`;
        transcript += `Date: ${new Date().toLocaleString()}\n`;
        transcript += `Duration: ${chatDuration} minute${chatDuration !== 1 ? 's' : ''}\n`;
        transcript += `Messages Exchanged: ${this.messageCount}\n`;
        transcript += `Topics Discussed: ${this.lastTopic || 'General inquiry'}\n`;
        transcript += `\n--- CONVERSATION ---\n\n`;
        
        this.messages.forEach(msg => {
            const speaker = msg.type === 'bot' ? 'RadarRoster Bot' : `Visitor (${this.visitorEmail})`;
            const time = msg.timestamp.toLocaleTimeString();
            transcript += `[${time}] ${speaker}:\n${msg.text}\n\n`;
        });
        
        transcript += `\n=== END TRANSCRIPT ===\n\n`;
        transcript += `This conversation was automatically saved and sent via the RadarRoster AI Chatbot.\n`;
        transcript += `To follow up, reply to ${this.visitorEmail} or use Calendly: https://calendly.com/radarroster/meeting`;
        
        try {
            const formData = new FormData();
            formData.append('access_key', this.config.web3formsKey);
            formData.append('name', 'RadarRoster Chatbot');
            formData.append('email', 'noreply@radarroster.com'); // Static sender (no CC to visitor)
            formData.append('subject', `💬 New Chat Lead: ${this.visitorEmail} - ${this.lastTopic || 'General Inquiry'}`);
            formData.append('message', transcript);
            formData.append('from_name', 'RadarRoster Chatbot');
            formData.append('redirect', 'false');
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Transcript sent successfully to hello@radarroster.com');
                console.log('📧 Visitor email:', this.visitorEmail);
            } else {
                console.error('❌ Failed to send transcript:', result);
                console.error('📝 Error details:', result.message);
                this.transcriptSent = false; // Allow retry
            }
        } catch (error) {
            console.error('❌ Error sending transcript:', error);
            this.transcriptSent = false; // Allow retry
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.radarChatbot = new SmartChatbot({
        brandName: 'RadarRoster',
        brandColor: '#4A90E2',
        welcomeMessage: 'Hi! 👋 I\'m your AI assistant for RadarRoster. I can help you learn about our AI & data services. What would you like to know?',
        transcriptEmail: 'hello@radarroster.com',
        web3formsKey: '00c73c85-fb6c-4c81-80b5-85da6b375ffe'
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }
    
    
    .scroll-smooth {
        scroll-behavior: smooth;
    }
    
    
    @media (max-width: 640px) {
        #chat-window {
            width: calc(100vw - 2rem) !important;
            max-width: 100vw !important;
            height: calc(100vh - 8rem) !important;
            max-height: calc(100vh - 8rem) !important;
        }
    }
`;
document.head.appendChild(style);
