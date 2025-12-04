import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RotateCcw } from 'lucide-react';
import MessageBubble from './MessageBubble';
import SpotlightQuestions from './SpotlightQuestions';
import ChatInput from './ChatInput';
import WelcomeHeader from './WelcomeHeader';
import { cn } from "@/lib/utils";

const SYSTEM_CONTEXT = `You are an expert AI regulatory consultant specializing in the EU AI Act (Regulation (EU) 2024/1689). Your role is to help users understand how the EU AI Act applies to their AI projects and systems.

Key knowledge areas:
1. **Risk Categories**: 
   - Unacceptable Risk (Prohibited): Social scoring, real-time biometric identification in public spaces (with exceptions), emotion recognition in workplace/education, etc.
   - High Risk: AI in critical infrastructure, education, employment, essential services, law enforcement, migration, justice
   - Limited Risk: Chatbots, emotion recognition, deepfakes (transparency requirements)
   - Minimal Risk: AI-enabled video games, spam filters (voluntary codes of conduct)

2. **Key Obligations**:
   - Providers: Risk management, data governance, technical documentation, transparency, human oversight, accuracy, cybersecurity
   - Deployers: Human oversight, monitoring, record-keeping
   - Importers/Distributors: Verification of conformity

3. **Timeline**:
   - February 2025: Prohibitions take effect
   - August 2025: GPAI rules apply
   - August 2026: Full application for high-risk AI systems

4. **Penalties**: Up to €35 million or 7% of global turnover for prohibited practices

Always:
- Ask clarifying questions about the user's AI system to provide accurate classification
- Explain reasoning behind risk classifications
- Provide specific article references when relevant
- Be clear about obligations and deadlines
- Recommend consulting legal experts for complex cases
- Use clear, accessible language while maintaining accuracy`;

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollAreaRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const sendMessage = async (content) => {
        const userMessage = { role: 'user', content };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        
        try {
            const conversationHistory = [...messages, userMessage]
                .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
                .join('\n\n');
            
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `${SYSTEM_CONTEXT}

Previous conversation:
${conversationHistory}

Provide a helpful, accurate response about the EU AI Act. If the user is describing an AI system, help classify it and explain the applicable requirements. Use markdown formatting for clarity. Be concise but thorough.`,
                add_context_from_internet: true
            });
            
            const assistantMessage = { 
                role: 'assistant', 
                content: response 
            };
            
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage = {
                role: 'assistant',
                content: "I apologize, but I encountered an issue processing your request. Please try again or rephrase your question."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setMessages([]);
    };
    
    const hasMessages = messages.length > 0;
    
    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            {/* Header with Reset */}
            {hasMessages && (
                <div className="flex justify-end px-4 py-3 border-b border-slate-100">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-slate-500 hover:text-slate-700 gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        New Conversation
                    </Button>
                </div>
            )}
            
            {/* Chat Area */}
            <ScrollArea 
                ref={scrollAreaRef}
                className={cn(
                    "flex-1 px-4 sm:px-6",
                    hasMessages ? "py-6" : "py-8"
                )}
            >
                {!hasMessages ? (
                    <div className="flex flex-col items-center justify-center min-h-full">
                        <WelcomeHeader />
                        <div className="w-full max-w-2xl">
                            <SpotlightQuestions 
                                onSelectQuestion={sendMessage}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <MessageBubble 
                                key={index} 
                                message={message}
                            />
                        ))}
                        
                        {isLoading && (
                            <MessageBubble 
                                message={{ role: 'assistant', content: '' }}
                                isLoading={true}
                            />
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </ScrollArea>
            
            {/* Input Area */}
            <div className={cn(
                "px-4 sm:px-6 pb-6 pt-4",
                "bg-gradient-to-t from-slate-50 via-slate-50 to-transparent"
            )}>
                <ChatInput 
                    onSend={sendMessage}
                    disabled={isLoading}
                    placeholder={hasMessages 
                        ? "Ask a follow-up question..." 
                        : "Describe your AI project or ask a question..."
                    }
                />
            </div>
        </div>
    );
}