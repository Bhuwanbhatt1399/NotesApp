import React, { useCallback,  useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

import { useEffect } from "react";

const Home = () => {

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null

  });

  const [userInfo, setUserInfo] = useState(null);
 
  
  const navigate = useNavigate();

  //Get user info
 const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8000/get-user");

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);





// useEffect(() => {
//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     try {
//       const response = await axios.get(
//         "http://localhost:8000/get-user",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchUser();
// }, []);


 useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  return (
    <>
      <Navbar  userInfo={userInfo} />

      <div className='px-24 mt-8  '>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <NoteCard
            title="Meeting on 3 november "
            date="3rd nov 2024"
            content="Meeting on 7 th april on monday please ready  "
            tags="#Meeting"

            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

        </div>
      </div>
      <button className=' w-16 h-16 flex item-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer ' onClick={() => {
        setOpenAddEditModel({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className="text-[32px] text-white  " />
      </button>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2) ",
          },
        }}
        contentLabel=""
        className="w-[40%]  max-h-3/4 bg-white rounded-md mx-auto m-14 p-5 overflow-scroll "
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null });

          }}
        />
      </Modal>
    </>
  )
}

export default Home
