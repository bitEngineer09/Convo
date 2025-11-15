import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../lib/api'
import Loader from './Loader'
import { LANGUAGES } from '../constants/constants'

const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    bio: userData?.bio || '',
    nativeLanguage: userData?.nativeLanguage || '',
    location: userData?.location || '',
  });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      queryClient.invalidateQueries(["authUser"]);
      queryClient.invalidateQueries(["userData"]);
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    updateProfileMutation(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black/50 z-40 backdrop-blur-sm'
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div 
          className='
            w-full max-w-2xl
            bg-base-100
            rounded-2xl
            shadow-2xl
            max-h-[90vh]
            overflow-y-auto
            animate-in fade-in zoom-in duration-200
          '
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='sticky top-0 bg-base-100 z-10 flex justify-between items-center p-4 sm:p-6 border-b border-base-300'>
            <h2 className='text-xl sm:text-2xl font-bold'>Edit Profile</h2>
            <button 
              onClick={onClose}
              disabled={isPending}
              className='btn btn-sm btn-circle btn-ghost'
            >
              <FaTimes className='text-lg' />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='p-4 sm:p-6'>
            <div className='flex flex-col gap-4'>
              {/* Full Name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-semibold'>Full Name *</span>
                </label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  className='input input-bordered w-full outline-none'
                  required
                  disabled={isPending}
                />
              </div>

              {/* Bio */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-semibold'>Bio</span>
                </label>
                <textarea
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder='Tell us about yourself...'
                  className='textarea textarea-bordered w-full h-24 outline-none'
                  disabled={isPending}
                />
              </div>

              {/* Native Language - Dropdown */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-semibold'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className='select select-bordered w-full outline-none'
                  disabled={isPending}
                >
                  <option value=''>Pick a language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option
                        key={`native-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {lang}
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* Location */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-semibold'>Location</span>
                </label>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  placeholder='e.g., New York, USA'
                  className='input input-bordered w-full outline-none'
                  disabled={isPending}
                />
              </div>

              {/* Submit Buttons */}
              <div className='flex gap-3 mt-4'>
                <button
                  type='button'
                  onClick={onClose}
                  disabled={isPending}
                  className='btn btn-outline flex-1'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isPending}
                  className='btn btn-primary flex-1'
                >
                  {isPending ? <Loader size="small" /> : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;