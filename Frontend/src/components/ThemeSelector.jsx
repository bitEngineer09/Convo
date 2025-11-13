import React from 'react'
import { LuPalette } from "react-icons/lu";
import { THEMES } from '../constants/constants';
import { useThemeSlot } from '../store/useThemeSlot';

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeSlot();
    return (
        <div
            className='
                dropdown dropdown-end
                w-70 h-100
                overflow-y-auto
                rounded-xl sm:rounded-2xl p-2 sm:p-3
                flex flex-col gap-2 sm:gap-3
                bg-base-200 backdrop-blur-lg border border-base-content/10
                '>
            {
                THEMES.map((themeOptions) => {
                    return (
                        <button
                            key={themeOptions.label}
                            onClick={() => setTheme(themeOptions.name)}
                            className={`
                                flex justify-between items-center
                                text-sm sm:text-base md:text-lg cursor-pointer 
                                rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 sm:py-2.5
                                ${theme == themeOptions.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}
                                `}
                        >
                            <p className='flex items-center gap-2 sm:gap-3 md:gap-4'>
                                <LuPalette className='text-base sm:text-lg md:text-xl' />
                                <span className='truncate max-w-[120px] sm:max-w-none'>{themeOptions.name}</span>
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
                })
            }
        </div>
    )
}

export default ThemeSelector