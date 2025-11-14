import React from 'react'
import { LuPalette } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { THEMES } from '../constants/constants';
import { useThemeSlot } from '../store/useThemeSlot';

const ThemeSelector = ({ onClose }) => {
    const { theme, setTheme } = useThemeSlot();
    
    const handleThemeSelect = (themeName) => {
        setTheme(themeName);
        onClose();
    };

    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='
                    w-full max-w-md sm:max-w-lg
                    max-h-[80vh]
                    rounded-xl sm:rounded-2xl
                    bg-base-200 
                    border border-base-content/10
                    shadow-2xl
                    flex flex-col
                '>
                {/* Header */}
                <div className='flex items-center justify-between p-4 sm:p-5 border-b border-base-content/10'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <LuPalette className='text-xl sm:text-2xl text-primary' />
                        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold'>Choose Theme</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className='btn btn-ghost btn-sm btn-circle hover:bg-base-content/10'
                    >
                        <IoClose className='text-xl sm:text-2xl' />
                    </button>
                </div>

                {/* Theme List */}
                <div className='overflow-y-auto p-3 sm:p-4 flex flex-col gap-2 sm:gap-3'>
                    {THEMES.map((themeOptions) => {
                        return (
                            <button
                                key={themeOptions.label}
                                onClick={() => handleThemeSelect(themeOptions.name)}
                                className={`
                                    flex justify-between items-center
                                    text-sm sm:text-base md:text-lg cursor-pointer 
                                    rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-3.5
                                    transition-all
                                    ${theme == themeOptions.name 
                                        ? "bg-primary/10 text-primary ring-2 ring-primary/30" 
                                        : "hover:bg-base-content/5"}
                                `}
                            >
                                <p className='flex items-center gap-2 sm:gap-3 md:gap-4'>
                                    <LuPalette className='text-base sm:text-lg md:text-xl' />
                                    <span className='truncate max-w-[150px] sm:max-w-none'>
                                        {themeOptions.name}
                                    </span>
                                </p>

                                {/* Theme primary colors */}
                                <div className='flex gap-1 shrink-0'>
                                    {themeOptions.colors.map((color, i) =>
                                        <span
                                            key={i}
                                            className='size-2 sm:size-2.5 md:size-3 rounded-full'
                                            style={{ backgroundColor: color }}
                                        />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ThemeSelector