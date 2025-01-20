import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const  ProfileCard = ({photoUrl, firstName, lastName, username, jobTitle, id, about, skill, location}) => {
  const handleInterested = async (profileId) => {
    try {
      const toUserId = profileId;
      const status = "interested";
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIgnore = async (profileId) => {
    try {
      const toUserId = profileId;
      const status = "ignored";
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }} className='bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white'>
      <MDBCardBody className="p-4">
        <div>
          <MDBTypography tag='h6' className='text-3xl'>{firstName} {lastName}</MDBTypography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="small mb-0">
              <MDBIcon fas icon="laptop-code me-2" />{jobTitle}
            </p>
            <p className="fw-bold mb-0">
            <MDBIcon fas icon="map-pin" /> {location}
            </p>
          </div>
        </div>
        <div className="md:d-flex align-items-center mb-4 flex-col">
          <div className="flex-shrink-0">
            <MDBCardImage
              style={{ width: '100px' }}
              className="img-fluid rounded-circle border border-dark"
              src={photoUrl}
              alt='profile'
              fluid />
          </div>
          <div className="md:flex ms-3 flex-col ">
            <div className="d-flex flex-row mb-2">
              <p className="mb-0 me-2">@{username}</p>
            </div>
            <div>
              <MDBCardText>{about}</MDBCardText>

            </div>
          </div>
        </div>
        <hr />
        <MDBCardText>{skill}</MDBCardText>
        <div className='flex gap-2 justify-between'>
        <MDBBtn color="success" rounded  size="lg" onClick={() => handleInterested(id)}>
        <MDBIcon fas icon="check-circle"  />
        </MDBBtn>
        <MDBBtn color="danger" rounded  size="lg" onClick={() =>handleIgnore(id)}>
        <MDBIcon fas icon="times-circle"  />
        </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
export default ProfileCard;