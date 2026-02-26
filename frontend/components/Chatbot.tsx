'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Mail, Send } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
    questionId?: number; // Track which question was asked
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [lastAskedQuestionId, setLastAskedQuestionId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! 👋 I'm your EstateIndia assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickQuestions = [
        { id: 1, question: "How do I list my property?", answer: "To list your property:\n1. Sign up as a Property Owner\n2. Click 'Post Property' in the header\n3. Fill in property details\n4. Upload photos\n5. Submit for review\n\nYour property will be live within 24 hours!" },
        { id: 2, question: "What are the fees?", answer: "Our pricing is transparent:\n\n• Property Owners: Free to list, 2% commission on sale\n• Brokers: ₹999/month subscription\n• Tenants/Buyers: Completely FREE\n• Premium listings: Starting from ₹2,999/month" },
        { id: 3, question: "How to schedule a property visit?", answer: "Scheduling a visit is easy:\n1. Go to the property details page\n2. Click 'Request Information' or 'Contact via WhatsApp'\n3. Fill in your details and preferred time\n4. The owner/broker will contact you within 2 hours!" },
        { id: 4, question: "Is my data safe?", answer: "Absolutely! We take security seriously:\n✅ SSL encrypted connections\n✅ No data sharing with third parties\n✅ Verified property owners\n✅ Secure payment gateway\n✅ Privacy-first approach" },
        { id: 5, question: "How do I contact support?", answer: "We're here to help!\n\n📧 Email: support@estateindia.com\n📱 Phone: +91 98765 43210\n💬 Live Chat: Right here!\n⏰ Working Hours: Mon-Sat, 9 AM - 7 PM" },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Get follow-up questions (exclude the one just asked)
    const getFollowUpQuestions = () => {
        return quickQuestions.filter(q => q.id !== lastAskedQuestionId);
    };

    const handleQuickQuestion = (questionId: number, question: string, answer: string) => {
        const userMessage: Message = {
            id: messages.length + 1,
            text: question,
            isBot: false,
            timestamp: new Date(),
            questionId: questionId,
        };

        const botMessage: Message = {
            id: messages.length + 2,
            text: answer,
            isBot: true,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage, botMessage]);
        setLastAskedQuestionId(questionId);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            isBot: false,
            timestamp: new Date(),
        };

        // Simple keyword-based responses
        let botResponse = "I understand your question. Let me connect you with our support team for the best assistance. Please use the 'Contact Support' button below!";
        let matchedQuestionId: number | null = null;

        const lowerInput = inputValue.toLowerCase();
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
            botResponse = quickQuestions[1].answer;
            matchedQuestionId = 2;
        } else if (lowerInput.includes('list') || lowerInput.includes('post') || lowerInput.includes('sell')) {
            botResponse = quickQuestions[0].answer;
            matchedQuestionId = 1;
        } else if (lowerInput.includes('visit') || lowerInput.includes('schedule') || lowerInput.includes('viewing')) {
            botResponse = quickQuestions[2].answer;
            matchedQuestionId = 3;
        } else if (lowerInput.includes('safe') || lowerInput.includes('security') || lowerInput.includes('privacy')) {
            botResponse = quickQuestions[3].answer;
            matchedQuestionId = 4;
        } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
            botResponse = quickQuestions[4].answer;
            matchedQuestionId = 5;
        }

        const botMessage: Message = {
            id: messages.length + 2,
            text: botResponse,
            isBot: true,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage, botMessage]);
        setLastAskedQuestionId(matchedQuestionId);
        setInputValue('');
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const botMessage: Message = {
            id: messages.length + 1,
            text: `Thank you, ${contactName}! 🎉 We've received your message and will get back to you at ${contactEmail} within 2 hours. Our team is on it!`,
            isBot: true,
            timestamp: new Date(),
        };
        setMessages([...messages, botMessage]);
        setShowContactForm(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setLastAskedQuestionId(null);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-96 h-[520px] bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-tight leading-none mb-1">EstateIndia Assistant</h3>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.isBot
                                        ? 'bg-muted/30 text-foreground rounded-tl-sm shadow-sm border border-border/50'
                                        : 'bg-slate-900 text-white rounded-br-sm shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm tracking-tight whitespace-pre-line leading-relaxed">{message.text}</p>
                                    <p className={`text-[10px] uppercase font-semibold mt-1.5 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Initial Quick Questions (only when first opened) */}
                        {messages.length === 1 && (
                            <div className="space-y-3 pt-2">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center">How can I help you?</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {quickQuestions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleQuickQuestion(q.id, q.question, q.answer)}
                                            className="text-left text-sm px-4 py-3 bg-white hover:bg-muted/30 border border-border/50 rounded-xl transition-all duration-200 text-foreground shadow-xs hover:border-slate-900/20"
                                        >
                                            <span className="opacity-70 mr-2">💡</span> {q.question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Follow-up Questions (after each answer) */}
                        {messages.length > 1 && getFollowUpQuestions().length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center">You might also want to know:</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {getFollowUpQuestions().slice(0, 3).map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleQuickQuestion(q.id, q.question, q.answer)}
                                            className="text-left text-xs px-3 py-2.5 bg-white hover:bg-muted/30 border border-border/50 rounded-lg transition-colors text-foreground font-medium flex items-center gap-2"
                                        >
                                            <span className="text-muted-foreground">→</span> {q.question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Contact Form */}
                    {showContactForm ? (
                        <div className="p-4 bg-card border-t border-border">
                            <form onSubmit={handleContactSubmit} className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm text-foreground shadow-xs"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm text-foreground shadow-xs"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Describe your query..."
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm text-foreground resize-none shadow-xs"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowContactForm(false)}
                                        className="flex-1 px-4 py-2 border border-border/50 rounded-xl hover:bg-muted/30 text-sm font-medium text-foreground transition-colors h-10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-sm font-medium transition-colors shadow-sm h-10"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            {/* Contact Support Button */}
                            {messages.length > 4 && (
                                <div className="px-4 py-3 border-t border-border bg-muted/30">
                                    <button
                                        onClick={() => setShowContactForm(true)}
                                        className="w-full py-2.5 bg-muted/30 hover:bg-muted/50 text-foreground border border-border/50 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Contact Support Team
                                    </button>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 bg-card border-t border-border">
                                <form onSubmit={handleSendMessage} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2.5 bg-white border border-border/50 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent shadow-xs"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center shrink-0"
                                    >
                                        <Send className="w-5 h-5 -ml-1 text-white" />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Chat Button - Only show when chat is CLOSED */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-slate-800 hover:scale-105 transition-all duration-300 flex items-center justify-center group border border-white/10"
                >
                    <MessageCircle className="w-6 h-6" />
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm border border-background">
                        1
                    </span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
