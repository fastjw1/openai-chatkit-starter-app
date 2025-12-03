import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Bot,
    LayoutDashboard,
    MessageSquare,
    Settings,
    User,
    Menu,
} from "lucide-react";

import { SettingsDialog } from "./SettingsDialog";

interface V0LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function V0Layout({ children, className }: V0LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSettingsSave = () => {
        // Force reload to apply new settings as they are read on mount/initialization
        window.location.reload();
    };

    return (
        <div className={cn("flex h-screen w-full bg-slate-50 dark:bg-slate-950", className)}>
            {/* Sidebar */}
            <aside
                className={cn(
                    "flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-300",
                    isSidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
                    {isSidebarOpen && (
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            Agent App
                        </span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 p-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} active />
                    <NavItem icon={<MessageSquare size={20} />} label="Chat" isOpen={isSidebarOpen} />
                    <NavItem icon={<Bot size={20} />} label="Agents" isOpen={isSidebarOpen} />
                    <NavItem icon={<User size={20} />} label="Profile" isOpen={isSidebarOpen} />
                    <NavItem
                        icon={<Settings size={20} />}
                        label="Settings"
                        isOpen={isSidebarOpen}
                        onClick={() => setIsSettingsOpen(true)}
                    />
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        {isSidebarOpen && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">User</span>
                                <span className="text-xs text-slate-500">user@example.com</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <SettingsDialog
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                onSave={handleSettingsSave}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Chat</h1>
                </header>
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, isOpen, active, onClick }: { icon: React.ReactNode; label: string; isOpen: boolean; active?: boolean; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            )}
        >
            {icon}
            {isOpen && <span>{label}</span>}
        </button>
    );
}
