import React, { useEffect, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export default function EditProfileForm({ initialData, setUserData }) {
  const [open, setOpen] = useState(false);
  const firstNameRef = useRef(initialData.firstName || '');
  const lastNameRef = useRef(initialData.lastName || '');
  const aboutRef = useRef(initialData.about || '');
  const skillsRef = useRef(initialData.skills ? initialData.skills.join(', ') : '');
  const jobTitleRef = useRef(initialData.jobTitle || '');
  const locationRef = useRef(initialData.location || '');
  const urlRef = useRef(initialData.photoUrl || '');

  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

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
      if (urlRef.current.value !== initialData.photoUrl) {
        updatedData.photoUrl = urlRef.current.value;
      }

      if (Object.keys(updatedData).length > 0) {
        const res = await axios.patch(`${BASE_URL}/user/profile/edit`, updatedData, { withCredentials: true });
        setUserData(res.data.data);
      } else {
        console.log("No changes to update");
      }

      setOpen(false); // Close modal after submitting
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
      >
        Edit Profile
      </button>

      <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
        <MDBModalDialog className="modal-dialog-centered">
          <MDBModalContent className="rounded-lg shadow-lg bg-gradient-to-r from-purple-400 to-pink-600">
            <MDBModalHeader className="bg-gradient-to-r from-purple-400 to-pink-600 text-white">
              <MDBModalTitle>Edit Profile</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setOpen(false)}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody className="bg-black text-white p-8">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <MDBInput
                    label="First Name"
                    labelStyle={{ color: 'white' }}
                    floating
                    ref={firstNameRef}
                    defaultValue={initialData.firstName || ''}
                    className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                  />
                  <MDBInput
                    label="Last Name"
                    labelStyle={{ color: 'white' }}
                    floating
                    ref={lastNameRef}
                    defaultValue={initialData.lastName || ''}
                    className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                  />
                </div>

                <MDBInput
                  label="Job Title"
                  labelStyle={{ color: 'white' }}
                    floating
                  ref={jobTitleRef}
                  defaultValue={initialData.jobTitle || ''}
                  className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                />
                <MDBInput
                  label="Location"
                  labelStyle={{ color: 'white' }}
                    floating
                  ref={locationRef}
                  defaultValue={initialData.location || ''}
                  className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                />
                <MDBInput
                  label="Profile Picture URL"
                  labelStyle={{ color: 'white' }}
                    floating
                  ref={urlRef}
                  defaultValue={initialData.photoUrl || ''}
                  className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                />
                <MDBInput
                  label="About"
                  labelStyle={{ color: 'white' }}
                    floating
                  ref={aboutRef}
                  defaultValue={initialData.about || ''}
                  className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                />
                <MDBInput
                  label="Skills (comma separated)"
                  labelStyle={{ color: 'white' }}
                    floating
                  ref={skillsRef}
                  defaultValue={initialData.skills ? initialData.skills.join(', ') : ''}
                  className="w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-500 py-3 px-4 rounded-md"
                />
              </form>
            </MDBModalBody>

            <MDBModalFooter className="bg-black">
              <MDBBtn color="secondary" onClick={() => setOpen(false)} className="bg-gray-600 hover:bg-gray-700">
                Close
              </MDBBtn>
              <MDBBtn 
                color="primary" 
                type="submit" 
                onClick={handleFormSubmit}
                className="bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 py-2 px-6 rounded-full"
              >
                Save Changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
