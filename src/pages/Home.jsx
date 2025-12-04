import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { Shield, ExternalLink } from 'lucide-react';

const EU_SHIELD_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dfc14d3c454ca00653883/7321db077_freepik__talk__35655.png";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Main gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2147] to-[#0a1628]" />
                
                {/* Radial glows */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#003399]/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F0B429]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#003399]/10 rounded-full blur-[150px]" />
                
                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
                
                {/* Floating stars/particles */}
                <div className="absolute top-20 left-[10%] w-2 h-2 bg-[#F0B429] rounded-full animate-pulse shadow-lg shadow-yellow-500/50" />
                <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-[#F0B429] rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-[#F0B429] rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-[8%] w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="absolute bottom-1/4 left-[5%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 flex flex-col h-screen">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-[#0d1f3c]/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        {/* Logo with image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#F0B429]/30 rounded-xl blur-lg" />
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#F0B429]/30 bg-[#003399]/50 p-1">
                                <img 
                                    src={EU_SHIELD_IMAGE} 
                                    alt="EU AI Act" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                AI Act Navigator
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0B429]/20 text-[#F0B429] font-medium">
                                    EU 2024
                                </span>
                            </h1>
                            <p className="text-sm text-slate-400">
                                Regulation Classification & Compliance
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all text-sm"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Official Regulation
                        </a>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
                            <span className="text-sm font-medium text-emerald-400">Active</span>
                        </div>
                    </div>
                </header>
                
                {/* Chat Container with glass effect */}
                <main className="flex-1 overflow-hidden">
                    <div className="h-full max-w-5xl mx-auto px-4 py-6">
                        <div className="h-full bg-white/[0.97] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 border border-white/20 overflow-hidden">
                            <ChatInterface />
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="px-4 py-4 text-center border-t border-white/10 bg-[#0d1f3c]/50 backdrop-blur-sm">
                    <p className="text-sm text-slate-500">
                        <Shield className="w-4 h-4 inline-block mr-1 text-[#F0B429]" />
                        This tool provides general guidance only. For legal compliance, consult qualified legal professionals.
                    </p>
                </footer>
            </div>
        </div>
    );
}