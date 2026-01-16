

class SmartChatbot {
    constructor(config = {}) {
        this.config = {
            brandName: config.brandName || 'RadarRoster',
            brandColor: config.brandColor || '#4A90E2',
            position: config.position || 'bottom-left',
            welcomeMessage: config.welcomeMessage || 'Hi! 👋 We\'re your AI assistant for RadarRoster. We can help you learn about our AI & data services. What would you like to know?',
            knowledgeBase: config.knowledgeBase || this.getDefaultKnowledge(),
            transcriptEmail: config.transcriptEmail || 'hello@radarroster.com',
            web3formsKey: config.web3formsKey || '00c73c85-fb6c-4c81-80b5-85da6b375ffe',
            ...config
        };

        this.sessionId = sessionStorage.getItem('chatbot_session_id') || this.generateSessionId();
        sessionStorage.setItem('chatbot_session_id', this.sessionId);
        
        this.isOpen = false;
        this.messages = [];
        this.lastTopic = null;
        this.lastResponse = null;
        this.visitorEmail = null;
        this.visitorName = null;
        this.emailCaptured = false;
        this.chatStartTime = null;
        this.transcriptSent = this.checkIfTranscriptSent();
        this.messageCount = 0;
        this.qualificationData = {};
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    checkIfTranscriptSent() {
        return sessionStorage.getItem('chatbot_transcript_sent_' + this.sessionId) === 'true';
    }

    markTranscriptAsSent() {
        sessionStorage.setItem('chatbot_transcript_sent_' + this.sessionId, 'true');
    }

    getDefaultKnowledge() {
        return {

            'who|owner|founder|ceo|lead|management|team|behind': {
                response: "RadarRoster is led by **Daryoosh Dehestani**, founder and owner of this AI & Data Intelligence consultancy based in Offenburg, Germany.\n\nWe're a team of practitioners who use our own solutions daily and believe in transparency as a service.\n\nWould you like to connect with our team?"
            },

            'address|location|office|where|headquarter|based': {
                response: "📍 **Location:** Offenburg, Germany\n📧 **Email:** hello@radarroster.com\n🌐 **Website:** radarroster.com\n\n💡 Ready to discuss your project? [Book a meeting](https://calendly.com/radarroster/meeting)!"
            },

            'book|appointment|meeting|schedule|calendly|call|demo|consultation': {
                response: "📅 **Book a Free Strategy Call:**\n\n🔗 [Schedule on Calendly](https://calendly.com/radarroster/meeting)\n\nOr use the contact form at the bottom of the page, or email hello@radarroster.com\n\nWhat time works best for you?"
            },

            'ai|artificial intelligence|machine learning|ml|predictive|chatbot|automation': {
                response: "🤖 **AI Strategy & Implementation:**\n\n• Custom AI roadmaps tailored to your business\n• AI-powered dashboards (Power BI, Tableau)\n• Predictive modeling & machine learning\n• Conversational AI agents & chatbots like this one!\n\n✨ **Real Results:**\n• 55% productivity increase\n• 70% faster decision-making\n• 85% accuracy in predictions\n\nInterested in a specific AI solution?"
            },

            'data engineering|pipeline|etl|warehouse|database|data integration|snowflake|bigquery': {
                response: "⚙️ **Data Engineering Services:**\n\n• Custom ETL/ELT pipeline development\n• Real-time data streaming & processing\n• Data warehouse modernization (Snowflake, BigQuery, Azure)\n• Data quality frameworks & governance\n\n✨ **Transform** siloed data into seamless, scalable flow\n\nWhat's your current data challenge?"
            },

            'erp|sap|workday|oracle|cloud migration|modernization|prism|legacy system': {
                response: "☁️ **ERP & Cloud Modernization:**\n\n• SAP, Workday & Oracle integration (including Prism Analytics)\n• Cloud migration (Azure, AWS, GCP)\n• Process automation & optimization\n• Legacy system modernization\n\n✨ **Overcome** technical debt and accelerate innovation\n\nWhich ERP system are you using?"
            },

            'training|workshop|learning|upskilling|enablement|course|education': {
                response: "📚 **Training & Enablement:**\n\n• Role-based learning paths (developers, analysts, managers)\n• Hands-on workshops with real tools\n• Custom training for your tech stack\n• Ongoing support & knowledge transfer\n\n✨ **Build** long-term competency in your team\n\nWhat skills does your team need most?"
            },

            'service|what do you do|offering|solutions|help': {
                response: "🎯 **Our Core Services:**\n\n1️⃣ **AI Strategy & Implementation**\n   → Custom AI solutions & chatbots\n\n2️⃣ **Data Engineering & Pipelines**\n   → ETL, streaming, warehouse modernization\n\n3️⃣ **ERP & Cloud Modernization**\n   → SAP, Workday, Oracle integration\n\n4️⃣ **Training & Team Enablement**\n   → Hands-on workshops & upskilling\n\nWhich area interests you most?"
            },

            'price|cost|pricing|budget|how much|expensive|fee|rate': {
                response: "💰 **Flexible Pricing:**\n\nOur pricing is customized based on your specific needs:\n\n✓ **Free** initial strategy consultation\n✓ **Flexible** engagement models (project/retainer)\n✓ **Transparent** pricing, no hidden costs\n✓ **ROI-focused** - we prove value first\n\n📅 [Book a free call](https://calendly.com/radarroster/meeting) to get a custom quote for your project!"
            },

            'contact|email|phone|reach|connect|talk|speak': {
                response: "📞 **Let's Connect:**\n\n📧 **Email:** hello[at]radarroster[dot]com\n📅 **Calendly:** [Book a meeting](https://calendly.com/radarroster/meeting)\n💼 **LinkedIn:** [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n📰 **Newsletter:** [radarroster.substack.com](https://radarroster.substack.com)\n\n💡 **Prefer the contact form?** Scroll to the bottom of the page!\n\nHow would you like to proceed?"
            },

            'process|methodology|how you work|approach|steps|timeline': {
                response: "🔄 **Our 3-Step Methodology:**\n\n**Phase 1: Analysis & Strategy** (1-2 weeks)\n   → Data landscape assessment\n   → Use case prioritization\n   → Custom roadmap development\n\n**Phase 2: Implementation** (4-12 weeks)\n   → Rapid prototyping & MVP\n   → Data pipeline construction\n   → AI model integration\n\n**Phase 3: Enablement** (Ongoing)\n   → Team training\n   → Continuous optimization\n   → Long-term partnership\n\nWe use **Design Thinking**, **Double Diamond**, and **Agile** frameworks.\n\nWant to discuss your project timeline?"
            },

            'project|portfolio|example|case study|showcase|work|clients|success': {
                response: "🚀 **Project Showcase** (20+ delivered):\n\n**HR Analytics**\n• Burnout Risk Prediction (85% accuracy)\n\n**Mental Wellness**\n• Emotional AI Chatbot (60% faster support)\n\n**Finance**\n• Small Cap Intelligence Dashboard\n\n**Enterprise L&D**\n• AI Training Recommender System\n\n**ERP Integration**\n• SAP & Workday Data Integration\n\n**Operations**\n• Sales & Operations Automation Bots\n\nWhich industry/use case resonates with you?"
            },

            'why|benefit|advantage|value proposition|different|better|choose': {
                response: "⭐ **Why RadarRoster?**\n\n✅ **Proven Results:**\n   • 55% productivity increase\n   • 70% faster decision-making\n   • 30% cost reduction\n   • 20+ successful projects\n   • 100% client satisfaction\n\n✅ **Our Approach:**\n   • Custom solutions, not templates\n   • Deep AI & data expertise\n   • Transparent partnership\n   • We use what we build\n\n✅ **Your Success:**\n   • Free strategy call\n   • ROI-focused delivery\n   • Ongoing support\n\nReady to see what we can do for you?"
            },

            'about|company|philosophy|mission|vision|story': {
                response: "🎯 **About RadarRoster:**\n\nYour partner for AI-driven data solutions — from startups to enterprises.\n\n📍 **Based in:** Offenburg, Germany\n👤 **Founded by:** Daryoosh Dehestani\n\n**Our Philosophy:** *Transparency as a Service*\n\nWe believe in:\n✓ Co-creation with clients\n✓ Open communication\n✓ Long-term partnerships\n✓ Practical, proven solutions\n\n**We're not just consultants** — we're practitioners who use our own solutions daily.\n\nWhat brought you to RadarRoster today?"
            },

            'newsletter|blog|substack|article|news|content|insights': {
                response: "📰 **Stay Updated:**\n\nSubscribe to our newsletter for AI & data insights:\n\n🔗 **Substack:** [radarroster.substack.com](https://radarroster.substack.com)\n🔗 **Newsletter Page:** [Visit our blog](/pages/blog.html)\n\nWe share:\n• Industry trends\n• Case studies\n• Practical tips\n• Technology updates\n\nWhat topics interest you most?"
            },

            'privacy|data protection|gdpr|security|safe': {
                response: "🔒 **Privacy & Data Protection:**\n\nYour privacy matters to us.\n\n🔗 **Privacy Policy:** [View details](/pages/datenschutz.html)\n\n✓ Full GDPR compliance\n✓ Secure data handling\n✓ Transparent practices\n✓ Your data, your control\n\nWe take data protection seriously. Any questions?"
            },
            'imprint|impressum|legal|terms': {
                response: "⚖️ **Legal Information:**\n\n🔗 **Imprint:** [View details](/pages/impressum.html)\n\nNeed specific legal information? Feel free to ask!"
            },

            'linkedin|social media|follow|network': {
                response: "🔗 **Connect with RadarRoster:**\n\n💼 **LinkedIn:** [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n📰 **Newsletter:** [radarroster.substack.com](https://radarroster.substack.com)\n\n**Follow us for:**\n• AI & data insights\n• Industry updates\n• Project showcases\n• Job opportunities\n\nSee you there!"
            },

            'hello|hi|hey|greetings|good morning|good afternoon|good evening': {
                response: "Hello! 👋 Welcome to RadarRoster.\n\nWe're here to help you explore our AI and data intelligence services.\n\n**Quick links:**\n• [Our Services](#services)\n• [Recent Projects](#projects)\n• [Book a Call](https://calendly.com/radarroster/meeting)\n\nWhat would you like to know about?"
            },

            'thanks|thank you|great|awesome|perfect|appreciate|helpful': {
                response: "You're very welcome! 😊\n\nWe're glad we could help!\n\n**Next steps:**\n• Ask another question\n• [Book a free consultation](https://calendly.com/radarroster/meeting)\n• Explore our [services](#services)\n\nAnything else we can help with?"
            },

            'no|nope|nothing': {
                response: "No problem! 👋\n\nFeel free to reach out anytime:\n📧 hello[at]radarroster[dot]com\n📅 [calendly.com/radarroster/meeting](https://calendly.com/radarroster/meeting)\n\nHave a great day!"
            },

            'yes|yeah|sure|okay|ok': {
                response: "Great! 🎯\n\nHow can we assist you?\n\n**Popular topics:**\n• AI solutions\n• Data engineering\n• ERP modernization\n• Pricing & timeline\n• Book a call"
            },

            'faq|frequently asked|common question|question': {
                response: "📚 **Frequently Asked Questions:**\n\nVisit our comprehensive FAQ page: [View all FAQs](/pages/faq.html)\n\n**Quick answers:**\n• Pricing ranges: €10K-€100K+\n• Timeline: 2-12 weeks typically\n• We work with all company sizes\n• ERP integrations available\n• Full GDPR compliance\n\nWhat specific question can we help with?"
            },

            'how much|cost|price range|pricing|budget|expensive': {
                response: "💰 **Project Pricing:**\n\nMost projects range from **€10,000 to €100,000+** based on scope:\n\n**Small Projects (€10-25K):**\n• MVP chatbots\n• Simple dashboards\n• Proof-of-concept AI models\n\n**Medium Projects (€25-75K):**\n• Data pipeline automation\n• Predictive analytics\n• ERP integrations\n\n**Large Projects (€75K+):**\n• Enterprise data platforms\n• Custom AI solutions\n• Cloud migrations\n\n💡 Try our [ROI Calculator](#roi-calculator) to estimate potential savings!\n\nWant a custom quote? [📅 Book a call](https://calendly.com/radarroster/meeting)"
            },

            'timeline|how long|duration|time frame|delivery|fast': {
                response: "⏱️ **Project Timeline:**\n\nWe focus on rapid delivery with agile methodology:\n\n**2-4 weeks:**\n• MVP & proof-of-concept projects\n\n**1-3 months:**\n• Standard implementations\n• Dashboards, chatbots, basic pipelines\n\n**3-6 months:**\n• Complex enterprise solutions\n• Full data platforms, AI systems\n• ERP modernization\n\nUnlike traditional consultancies (6-12 months), we prioritize **speed without sacrificing quality**. You'll see working prototypes within the first 2-3 weeks!\n\nWhat's your ideal timeline?"
            },

            'small business|startup|company size|enterprise|small team': {
                response: "🏭 **We Work With All Sizes:**\n\nFrom 5-person startups to 5,000+ employee enterprises!\n\n**Small Teams (5-50):**\n• Affordable automation\n• AI chatbots\n• Basic analytics dashboards\n\n**Mid-size (50-500):**\n• Data pipeline integration\n• Predictive models\n• Process automation\n\n**Enterprises (500+):**\n• ERP integrations\n• Cloud migrations\n• Enterprise data platforms\n\n**Our philosophy:** *You don't need to be a tech company to benefit from tech.*\n\nWhat's your team size?"
            },

            'messy data|dirty data|data quality|bad data|clean data|data cleaning': {
                response: "🧹 **Messy Data? That's Our Specialty!**\n\nMost companies struggle with siloed or incomplete data. We help with:\n\n**Data Assessment:**\n• Audit your current data landscape\n• Identify gaps and issues\n\n**Data Cleaning:**\n• Automated pipelines to standardize\n• Validate and enrich your data\n\n**Quality Frameworks:**\n• Ongoing monitoring\n• Maintain 99%+ data quality\n\n**ETL/ELT Pipelines:**\n• Connect siloed systems\n• Single source of truth\n\n💡 **70% of our clients** start with poor data quality. It's part of the journey!\n\nWhat data challenges are you facing?"
            },

            'erp integration|sap|workday|oracle|dynamics|erp system': {
                response: "☁️ **ERP Integration & Modernization:**\n\n**Yes!** We specialize in ERP integrations:\n\n✅ **SAP Integration:**\n• SAP S/4HANA, ECC, SuccessFactors\n• Real-time data sync with analytics\n\n✅ **Workday Integration:**\n• HCM, Financial, Prism Analytics\n• Custom reporting & dashboards\n\n✅ **Oracle & Dynamics:**\n• Oracle Cloud, NetSuite\n• Microsoft Dynamics 365\n\n✅ **Cloud Migration:**\n• Legacy system modernization\n• Azure, AWS, GCP migration\n\nWe build **real-time data pipelines** to sync ERP data with Power BI, Tableau, or custom analytics platforms.\n\nWhich ERP system are you using?"
            },

            'methodology|process|approach|how you work|implementation': {
                response: "🔄 **Our 3-Phase Methodology:**\n\nWe combine **Design Thinking, Double Diamond, and Agile:**\n\n**Phase 1: Analysis & Strategy (1-2 weeks)**\n• Data landscape assessment\n• Use case prioritization\n• Custom roadmap development\n\n**Phase 2: Implementation (2-8 weeks)**\n• Rapid prototyping & MVP\n• Data pipeline construction\n• AI model integration\n• Testing & refinement\n\n**Phase 3: Enablement (Ongoing)**\n• Team training & handoff\n• Documentation & support\n• Continuous optimization\n\n**Result:** Working prototypes in 2-3 weeks, full delivery in 2-12 weeks depending on scope.\n\nWant to discuss your project?"
            },

            'support|maintenance|after launch|ongoing|post-launch': {
                response: "🔧 **Ongoing Support & Partnership:**\n\nWe believe in long-term partnerships!\n\n**30-Day Warranty:**\n• Free bug fixes and adjustments\n\n**Ongoing Maintenance:**\n• Optional monthly retainers\n• Updates, monitoring, optimization\n• Typically 20-40 hours/month\n\n**Training & Enablement:**\n• Teach your team to manage solutions\n• Extend capabilities independently\n\n**Strategic Consulting:**\n• Quarterly reviews\n• Identify new opportunities\n• Continuous improvement\n\n💡 Most clients choose ongoing support to continuously improve and scale their solutions.\n\nInterested in learning more?"
            },

            'security|gdpr|compliance|data protection|privacy|safe': {
                response: "🔒 **Security & GDPR Compliance:**\n\nSecurity and compliance are built into everything we do:\n\n✅ **GDPR Compliant:**\n• Full Article 6 compliance\n• Data processing agreements\n• Right to deletion & portability\n\n✅ **End-to-End Encryption:**\n• Data in transit & at rest\n• Industry-standard protocols\n\n✅ **Access Controls:**\n• Role-based permissions\n• Multi-factor authentication\n• Audit logging\n\n✅ **Hosting in EU:**\n• Azure/AWS Frankfurt region\n• No data transfers outside EU\n\nYour data stays **in your control**. We never share or sell client data.\n\nView our full [Privacy Policy](/pages/datenschutz.html)"
            },

            'difference|why choose|better than|compared to|advantage': {
                response: "⭐ **What Makes RadarRoster Different:**\n\n**RadarRoster:**\n✅ Custom solutions, not templates\n✅ 2-12 week delivery (rapid)\n✅ We use what we build (practitioners)\n✅ Full transparency & co-creation\n✅ Long-term partnership focus\n✅ Flexible pricing & ownership\n\n**Traditional Consultancies:**\n❌ Template-based solutions\n❌ 6-12 month timelines\n❌ Consultants, not practitioners\n❌ Black box approach\n❌ Project-based, then gone\n❌ Vendor lock-in models\n\n**Our Philosophy:**\n*Transparency as a Service* - You're not a spectator, you're a co-creator.\n\nReady to experience the difference?"
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
                <button id="chat-toggle-btn" class="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300" style="background: linear-gradient(135deg, ${this.config.brandColor} 0%, #8B5CF6 100%);" aria-label="Open chat">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>

                <div id="chat-window" class="hidden absolute bottom-20 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden" style="max-height: calc(100vh - 8rem);" role="dialog" aria-label="Chat window">
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

                    <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scroll-smooth">
                    </div>

                    <div id="quick-actions" class="px-4 py-2 border-t border-gray-800 flex flex-wrap gap-2 bg-gray-900/50">
                    </div>

                    <div class="p-4 border-t border-gray-800 bg-gray-900">
                        <div class="flex space-x-2">
                            <input 
                                type="text" 
                                id="chat-input" 
                                placeholder="Ask us anything..."
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
        this.renderQuickActions();
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
        if (!quickActionsContainer || this.messages.length > 1) {
            if (quickActionsContainer) quickActionsContainer.style.display = 'none';
            return;
        }

        quickActionsContainer.style.display = 'flex';

        const actions = [
            { label: '🤖 AI Services', query: 'Tell us about AI services' },
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

        document.getElementById('chat-close-btn').addEventListener('click', async () => {
            await this.closeChat();
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

    async closeChat() {
        console.log('🔍 Close chat check:', {
            emailCaptured: this.emailCaptured,
            messageCount: this.messages.length,
            transcriptSent: this.transcriptSent,
            visitorEmail: this.visitorEmail
        });

        if (this.emailCaptured && this.messages.length > 1 && !this.transcriptSent) {
            const confirmMsg = {
                type: 'bot',
                text: "📧 Sending transcript to our team...",
                timestamp: new Date()
            };
            this.messages.push(confirmMsg);
            this.renderMessages();

            const success = await this.sendTranscript();

            if (success) {
                confirmMsg.text = "✅ Thank you for chatting! Our team has received your message and will be in touch soon!";
            } else {
                confirmMsg.text = "⚠️ There was an issue sending the transcript. Please email us at hello[at]radarroster[dot]com";
            }
            this.renderMessages();

            setTimeout(() => {
                this.actuallyCloseChat();
            }, 2500);
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
            let response;

            if (this.qualificationStep === 'challenge') {
                response = this.handleChallengeResponse(message);
            } else if (this.qualificationStep === 'budget') {
                response = this.handleBudgetResponse(message);
            } else if (this.qualificationStep === 'timeline') {
                response = this.handleTimelineResponse(message);
            } else {
                response = this.generateResponse(message);
            }
            
            this.messages.push({
                type: 'bot',
                text: response,
                timestamp: new Date()
            });
            
            this.hideTypingIndicator();
            this.renderMessages();
            this.renderQuickActions();
        }, 800 + Math.random() * 800);
    }

    handleChallengeResponse(message) {
        const msg = message.trim().toLowerCase();
        
        if (msg === 'skip' || msg === 'later' || msg === 'no' || msg === 'nothing' || msg === 'none' || msg === 'nope' || msg === 'not sure' || msg === 'idk' || msg === 'i don\'t know') {
            this.qualificationStep = null;
            this.qualificationData.challenge = 'Skipped - wants to explore first';
            return "No problem! We understand you'd like to explore first. \n\nFeel free to ask us anything about:\n• Our AI & Data services\n• Pricing & timeline\n• Case studies & success stories\n• How we work\n\nWhat would you like to know?";
        }
        
        this.qualificationData.challenge = message;
        this.qualificationStep = 'budget';
        
        return `Thanks for sharing! Understanding your challenge helps us provide better recommendations.\n\n**2. What's your estimated budget for this project?**\n\nType the number that matches:\n1️⃣ Under €10,000\n2️⃣ €10,000 - €50,000\n3️⃣ €50,000 - €100,000\n4️⃣ Over €100,000\n5️⃣ Not sure yet\n\n💡 Don't worry, these questions help us understand your needs better and save both of us time. You can also type 'skip' if you prefer.`;
    }

    handleBudgetResponse(message) {
        const msg = message.trim().toLowerCase();

        if (msg === 'skip' || msg === 'later' || msg === 'no' || msg === 'not now') {
            this.qualificationStep = null;
            this.qualificationData.budget = 'Skipped';
            return "We understand! These questions help us tailor our recommendations to your needs, but we're happy to answer your questions first. 😊\n\nWhat would you like to know about our services?";
        }
        
        const budgetMap = {
            '1': 'Under €10,000',
            '2': '€10,000 - €50,000',
            '3': '€50,000 - €100,000',
            '4': 'Over €100,000',
            '5': 'Not sure yet'
        };
        
        const choice = message.trim();
        if (budgetMap[choice]) {
            this.qualificationData.budget = budgetMap[choice];
            this.qualificationStep = 'timeline';
            
            return `Perfect! One last quick question:\n\n⏰ **When are you looking to start?**\n\n1️⃣ ASAP (within 1 month)\n2️⃣ Soon (1-3 months)\n3️⃣ Planning ahead (3-6 months)\n4️⃣ Exploring options (6+ months)\n\nPlease reply with a number (1-4), or type 'skip'.`;
        } else {
            return "We'd appreciate it if you could select one of the options above (1-5), as it helps us understand how we can best help you. If you're not ready to share, just type 'skip' and we can chat about our services instead! 😊";
        }
    }

    handleTimelineResponse(message) {
        const msg = message.trim().toLowerCase();

        if (msg === 'skip' || msg === 'later' || msg === 'no' || msg === 'not now') {
            this.qualificationStep = null;
            this.qualificationData.timeline = 'Skipped';
            return "No problem at all! We're here to help answer your questions. What would you like to know about our services?";
        }
        
        const timelineMap = {
            '1': 'ASAP (within 1 month)',
            '2': 'Soon (1-3 months)',
            '3': 'Planning ahead (3-6 months)',
            '4': 'Exploring options (6+ months)'
        };
        
        const choice = message.trim();
        if (timelineMap[choice]) {
            this.qualificationData.timeline = timelineMap[choice];

            this.qualificationData.leadScore = this.calculateLeadScore();

            this.qualificationStep = null;
            
            let response = `Perfect! Thanks for sharing that information with us. `;
            
            if (this.qualificationData.leadScore === 'HOT') {
                response += `🔥 **This sounds like a great fit!**\n\nBased on your budget and timeline, we'd love to connect you with our team ASAP.\n\n📅 **Next step:** [Book a strategy call](https://calendly.com/radarroster/meeting)\n\nOr ask us any questions about our services, past projects, or how we work!`;
            } else if (this.qualificationData.leadScore === 'WARM') {
                response += `✨ **Excellent timing!**\n\nWe'd be happy to discuss how we can help. Let us know if you have any questions about:\n\n• Our services & approach\n• Case studies & results\n• Pricing & packages\n• Technical capabilities\n\nOr 📅 [schedule a call](https://calendly.com/radarroster/meeting) when you're ready!`;
            } else {
                response += `Thanks for your interest! We're here to answer any questions you have about:\n\n• Our services & methodology\n• Case studies & success stories\n• Pricing options\n• Technical expertise\n\nFeel free to ask anything, or 📅 [book a call](https://calendly.com/radarroster/meeting) when you're ready to explore further!`;
            }
            
            return response;
        } else {
            return "We'd appreciate it if you could select one of the options above (1-4). This helps us understand your timeline better. Or just type 'skip' if you prefer! 😊";
        }
    }

    calculateLeadScore() {
        const budget = this.qualificationData.budget;
        const timeline = this.qualificationData.timeline;

        if ((budget === '€50,000 - €100,000' || budget === 'Over €100,000') && 
            (timeline === 'ASAP (within 1 month)' || timeline === 'Soon (1-3 months)')) {
            return 'HOT';
        }

        if (budget === '€10,000 - €50,000' || budget === '€50,000 - €100,000' || budget === 'Over €100,000' ||
            timeline === 'ASAP (within 1 month)' || timeline === 'Soon (1-3 months)') {
            return 'WARM';
        }

        return 'COLD';
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
                        response: "📞 **Want to connect with Daryoosh?**\n\n✓ Book a call: [calendly.com/radarroster/meeting](https://calendly.com/radarroster/meeting)\n✓ Email: hello[at]radarroster[dot]com\n✓ LinkedIn: [linkedin.com/company/radarroster](https://www.linkedin.com/company/radarroster)\n\nWe're always happy to discuss your project!"
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

                return "Sure! For more details, I recommend booking a personal call:\n📅 [Calendly](https://calendly.com/radarroster/meeting) or 📧 hello[at]radarroster[dot]com";
            }

            return "What would you like to know more about? Ask us about our services, projects, pricing, or team!";
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
        
        return "That's an interesting question! 🤔\n\nWe're best at answering questions about:\n• Services (AI, Data, ERP, Training)\n• Projects & Portfolio\n• Pricing & Process\n• Team & Contact\n\nOr speak with us directly:\n📅 [Calendly](https://calendly.com/radarroster/meeting) | 📧 hello[at]radarroster[dot]com";
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
            text: `Great! We've got your email (${email}). Before we dive in, let us ask you a few quick questions to better understand how we can help you:\n\n**1. What's your main challenge or goal?**\n\nFor example:\n• Struggling with messy/siloed data\n• Need AI/automation to save time\n• Want better business insights\n• Modernizing legacy ERP systems\n• Other (just describe it briefly)\n\nFeel free to type your answer, or type 'skip' if you prefer to ask questions first.`,
            timestamp: new Date()
        });
        
        this.qualificationStep = 'challenge';
        this.qualificationData = {};
        
        this.renderMessages();
        this.renderQuickActions();

        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
    }

    async sendTranscript() {
        if (!this.visitorEmail || this.messages.length <= 1) return;

        const chatDuration = this.chatStartTime ? Math.round((new Date() - this.chatStartTime) / 1000 / 60) : 0;

        let leadScoreEmoji = '';
        if (this.qualificationData.leadScore === 'HOT') leadScoreEmoji = '🔥';
        else if (this.qualificationData.leadScore === 'WARM') leadScoreEmoji = '🟡';
        else if (this.qualificationData.leadScore === 'COLD') leadScoreEmoji = '🟢';
        
        let transcript = `=== RADARROSTER CHAT TRANSCRIPT ===\n\n`;
        transcript += `Visitor Email: ${this.visitorEmail}\n`;
        transcript += `Date: ${new Date().toLocaleString()}\n`;
        transcript += `Duration: ${chatDuration} minute${chatDuration !== 1 ? 's' : ''}\n`;
        transcript += `Messages Exchanged: ${this.messageCount}\n`;
        transcript += `Topics Discussed: ${this.lastTopic || 'General inquiry'}\n`;

        if (this.qualificationData.challenge || this.qualificationData.budget || this.qualificationData.timeline) {
            transcript += `\n--- QUALIFICATION DATA ---\n\n`;
            if (this.qualificationData.challenge) transcript += `Challenge/Goal: ${this.qualificationData.challenge}\n`;
            if (this.qualificationData.budget) transcript += `Budget: ${this.qualificationData.budget}\n`;
            if (this.qualificationData.timeline) transcript += `Timeline: ${this.qualificationData.timeline}\n`;
            if (this.qualificationData.leadScore) transcript += `Lead Score: ${this.qualificationData.leadScore} ${leadScoreEmoji}\n`;
        }
        
        transcript += `\n--- CONVERSATION ---\n\n`;
        
        this.messages.forEach(msg => {
            const speaker = msg.type === 'bot' ? 'RadarRoster Bot' : `Visitor (${this.visitorEmail})`;
            const time = msg.timestamp.toLocaleTimeString();
            transcript += `[${time}] ${speaker}:\n${msg.text}\n\n`;
        });
        
        transcript += `\n=== END TRANSCRIPT ===\n\n`;
        transcript += `This conversation was automatically saved and sent via the RadarRoster AI Chatbot.\n`;
        transcript += `To follow up, reply to ${this.visitorEmail} or use Calendly: https://calendly.com/radarroster/meeting`;

        let emailSubject = `💬 Chat Transcript from ${this.visitorEmail}`;
        if (this.qualificationData.leadScore) {
            emailSubject = `${leadScoreEmoji} ${this.qualificationData.leadScore} LEAD - Chat from ${this.visitorEmail}`;
        }

        try {
            const formData = new FormData();
            formData.append('access_key', this.config.web3formsKey);
            formData.append('subject', emailSubject);
            formData.append('from_name', 'RadarRoster Chatbot');
            formData.append('email', this.config.transcriptEmail);
            formData.append('message', transcript);
            formData.append('botcheck', '');
            formData.append('redirect', 'false');
            
            console.log('📤 Sending transcript to:', this.config.transcriptEmail);
            console.log('📝 Access key:', this.config.web3formsKey);
            console.log('🔑 Botcheck field:', formData.get('botcheck') !== null ? 'Added' : 'Missing');
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            console.log('📡 Response status:', response.status);
            
            const result = await response.json();
            console.log('📬 Response data:', result);
            
            if (result.success) {
                console.log('✅ Transcript sent successfully to', this.config.transcriptEmail);
                this.transcriptSent = true;
                this.markTranscriptAsSent();
                return true;
            } else {
                console.error('❌ Failed to send transcript. Error:', result.message || 'Unknown error');
                this.transcriptSent = false;
                return false;
            }
        } catch (error) {
            console.error('❌ Error sending transcript:', error);
            this.transcriptSent = false;
            return false;
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
