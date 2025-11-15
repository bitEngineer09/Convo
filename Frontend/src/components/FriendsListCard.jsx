import React, { useState } from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { IoCloseCircle } from "react-icons/io5";
import Loader from './Loader';
import PageLoader from './PageLoader';

const FriendsListCard = ({ friend, isSelected, onClick, onRemove, removePending }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Prevent card click
        setShowConfirm(true);
    };

    const handleConfirmRemove = async (e) => {
        e.stopPropagation();
        setShowConfirm(false);
        if (onRemove) {
            await onRemove(friend._id);
        }
    };

    const handleCancelRemove = (e) => {
        e.stopPropagation();
        setShowConfirm(false);
    };

    return (
        <>
            <div
                onClick={onClick}
                className={`
                    w-full
                    rounded-xl hover:shadow-md
                    p-3 sm:p-4
                    flex items-center gap-3
                    transition-all cursor-pointer
                    relative
                    ${isSelected 
                        ? 'bg-primary/10 border-2 border-primary' 
                        : 'bg-base-300 hover:bg-base-300/70'
                    }
                `}>
                <img 
                    src={friend?.profilePic} 
                    alt="user avatar" 
                    className='size-12 sm:size-14 rounded-full object-cover shrink-0' 
                />
                <div className='flex-1 min-w-0'>
                    <p className='text-sm sm:text-base font-medium truncate'>
                        {friend?.fullName}
                    </p>
                    <div className='flex items-center gap-1 mt-1'>
                        {getLanguageFlag(friend?.nativeLanguage)}
                        <span className='text-xs text-base-content/70 truncate'>
                            {friend?.nativeLanguage}
                        </span>
                    </div>
                </div>
                
                {/* Remove Friend Button */}
                <button
                    onClick={handleRemoveClick}
                    className='text-error hover:text-error/80 transition shrink-0 p-1'
                    title="Remove Friend"
                >
                    {
                        removePending ? <PageLoader /> : <IoCloseCircle className='text-xl sm:text-2xl' />
                    }
                </button>

                {isSelected && (
                    <div className='size-2 bg-primary rounded-full shrink-0'></div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleCancelRemove}
                >
                    <div 
                        className="bg-base-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-2">Remove Friend</h3>
                        <p className="text-base-content/70 mb-6">
                            Are you sure you want to remove <span className="font-semibold text-base-content">{friend?.fullName}</span> from your friends list?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancelRemove}
                                className='btn btn-success btn-outline'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmRemove}
                                className='btn btn-error btn-outline'
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default FriendsListCard;

function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className='size-3 shrink-0'
            />
        )
    }
}