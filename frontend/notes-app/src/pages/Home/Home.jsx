import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from "react";
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import EmptyImage from "../../assets/undraw_add-files_d04y.png";
import NoData from "../../assets/clipboard.jpg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  //Get user info
  const getUserInfo = useCallback(async () => {
    try {
      // const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/get-user");

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


  // Get all notes 
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpacted error occurred.Please try again.")
    }
  }


  //Delete notes
  const deleteNote = async (data) => {
    if (!data?._id) return;
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`,);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted successfully", "delete")
        getAllNotes()

      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        console.log("An unexpacted error occurred.Please try again.")
      }
    }
  }

  //Search for a note 
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const updateIsPinned = async (noteData) => {
    if (!noteData?._id) return;
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        "isPinned": !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated successfully ")
        getAllNotes()
      };
    } catch (error) {
      console.log(error)
    }

  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes()
  };
  useEffect(() => {
    getAllNotes()
    getUserInfo();
  }, [getUserInfo]);


  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className='px-24 mt-8 '>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={isSearch ? NoData : EmptyImage}
            message={isSearch
              ? `Oops No notes found matching your search`
              : `start creating your first note! Click the 'add' button to jot down your journey thoughts, and reminders. Let's get started `} />
        )}

      </div>
      <button className=' w-16 h-16 flex item-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer ' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className="text-[32px] text-white  " />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
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
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });

          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      {showToastMsg.isShown && (
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      )}

    </>
  )
}

export default Home
