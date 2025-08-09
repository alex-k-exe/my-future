import * as React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={cn(
                "relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[95vh] overflow-hidden flex flex-col",
                className
            )}>
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}
                
                {/* Content */}
                <div className="p-4 overflow-y-auto flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
