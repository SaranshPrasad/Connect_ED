import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../utils/constants';

const EditProfileForm = ({ setIsModalOpen, initialData, setUserData }) => {
    const firstNameRef = useRef(initialData.firstName || '');
    const lastNameRef = useRef(initialData.lastName || '');
    const aboutRef = useRef(initialData.about || '');
    const skillsRef = useRef(initialData.skills ? initialData.skills.join(', ') : '');
    const jobTitleRef = useRef(initialData.jobTitle || '');
    const locationRef = useRef(initialData.location || '');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {};
            if (firstNameRef.current.value !== initialData.firstName) {
                updatedData.firstName = firstNameRef.current.value;
            }
            if (lastNameRef.current.value !== initialData.lastName) {
                updatedData.lastName = lastNameRef.current.value;
            }
            if (jobTitleRef.current.value !== initialData.jobTitle) {
                updatedData.jobTitle = jobTitleRef.current.value;
            }
            if (locationRef.current.value !== initialData.location) {
                updatedData.location = locationRef.current.value;
            }
            if (aboutRef.current.value !== initialData.about) {
                updatedData.about = aboutRef.current.value;
            }
            const updatedSkills = skillsRef.current.value.split(',').map(skill => skill.trim());
            if (JSON.stringify(updatedSkills) !== JSON.stringify(initialData.skills)) {
                updatedData.skills = updatedSkills;
            }

            if (Object.keys(updatedData).length > 0) {
                const res = await axios.patch(`${BASE_URL}/user/profile/edit`, updatedData, { withCredentials: true });
                setUserData(res.data.data);
            } else {
                console.log("No changes to update");
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="firstName"
                            ref={firstNameRef}
                            defaultValue={initialData.firstName || ''}
                            placeholder="First Name"
                            className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                        <input
                            type="text"
                            name="lastName"
                            ref={lastNameRef}
                            defaultValue={initialData.lastName || ''}
                            placeholder="Last Name"
                            className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                    </div>
                    <input
                        type="text"
                        name="jobTitle"
                        ref={jobTitleRef}
                        defaultValue={initialData.jobTitle || ''}
                        placeholder="Job Title"
                        className="bg-gray-700 text-white p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="location"
                        ref={locationRef}
                        defaultValue={initialData.location || ''}
                        placeholder="Location"
                        className="bg-gray-700 text-white p-2 rounded w-full"
                    />
                    <textarea
                        name="about"
                        ref={aboutRef}
                        defaultValue={initialData.about || ''}
                        placeholder="About"
                        className="bg-gray-700 text-white p-2 rounded w-full h-32"
                    />
                    <textarea
                        name="skills"
                        ref={skillsRef}
                        defaultValue={initialData.skills ? initialData.skills.join(', ') : ''}
                        placeholder="Enter your skills (comma separated)"
                        className="bg-gray-700 text-white p-2 rounded w-full h-32"
                    />

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
