'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
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

    const handleQuickQuestion = (question: string, answer: string) => {
        const userMessage: Message = {
            id: messages.length + 1,
            text: question,
            isBot: false,
            timestamp: new Date(),
        };

        const botMessage: Message = {
            id: messages.length + 2,
            text: answer,
            isBot: true,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage, botMessage]);
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

        const lowerInput = inputValue.toLowerCase();
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
            botResponse = quickQuestions[1].answer;
        } else if (lowerInput.includes('list') || lowerInput.includes('post') || lowerInput.includes('sell')) {
            botResponse = quickQuestions[0].answer;
        } else if (lowerInput.includes('visit') || lowerInput.includes('schedule') || lowerInput.includes('viewing')) {
            botResponse = quickQuestions[2].answer;
        } else if (lowerInput.includes('safe') || lowerInput.includes('security') || lowerInput.includes('privacy')) {
            botResponse = quickQuestions[3].answer;
        } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
            botResponse = quickQuestions[4].answer;
        }

        const botMessage: Message = {
            id: messages.length + 2,
            text: botResponse,
            isBot: true,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage, botMessage]);
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
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-2 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold">EstateIndia Assistant</h3>
                                <p className="text-xs text-blue-100">Online • Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                            className="hover:bg-white/20 p-2 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.isBot
                                        ? 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-200'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none shadow-md'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-400' : 'text-blue-100'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Quick Questions */}
                        {messages.length <= 2 && (
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 font-medium text-center">Quick Questions:</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {quickQuestions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleQuickQuestion(q.question, q.answer)}
                                            className="text-left text-sm px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 text-gray-700 hover:text-blue-600 shadow-sm"
                                        >
                                            💡 {q.question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Contact Form */}
                    {showContactForm ? (
                        <div className="p-4 bg-white border-t border-gray-200">
                            <form onSubmit={handleContactSubmit} className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Describe your query..."
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowContactForm(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-medium transition-all shadow-md"
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
                                <div className="px-4 py-2 border-t border-gray-200 bg-blue-50">
                                    <button
                                        onClick={() => setShowContactForm(true)}
                                        className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-md"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contact Support Team
                                    </button>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-200">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
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
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                        1
                    </span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
