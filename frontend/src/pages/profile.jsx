import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import { getuser, updateabout } from "../../route";
import { toast } from "react-toastify";
import Followbtn from "../components/followbtn";

const ProfileComponent = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("No about : Give Some Input");
  const [editValue, setEditValue] = useState(bio);
  const [updatedsuser, setupdateduser] = useState(null);
  const user = useSelector((state) => state.userinfo);

  useEffect(() => {
    const getabout = async () => {
      const { data } = await axios.post(getuser, { id: user.id });
      setupdateduser(data.user);
      setBio(data.user.about);
    };
    getabout();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(bio);
  };

  const handleSaveClick = async () => {
    setBio(editValue);
    setIsEditing(false);

    const { data } = await axios.patch(updateabout, {
      userid: user.id,
      about: editValue,
    });
    if (data.status) {
      toast.success("Successfully Updates");
    } else {
      toast.error("Error Occured");
    }
  };

  return (
    <>
      {updatedsuser == null ? (
        <></>
      ) : (
        <div className="h-full bg-gray-200 p-8">
          <div className="rounded-lg bg-white pb-8 shadow-xl">
            <div className="absolute right-12 mt-4 rounded">
              <button
                onClick={() => setOpenSettings(!openSettings)}
                className="rounded border border-gray-400 bg-gray-100 bg-opacity-10 p-2 text-gray-300 hover:bg-opacity-20 hover:text-gray-300"
                title="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a 1 1 0 110-2 1 1 0 010 2zm0 7a 1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
              {openSettings && (
                <div className="absolute right-0 mt-1 w-40 border border-gray-200 bg-white py-2 shadow-2xl">
                  <div className="border-b py-2">
                    <p className="mb-1 px-6 text-xs uppercase text-gray-400">
                      Settings
                    </p>
                    <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                      <span className="text-sm text-gray-700">
                        Share Profile
                      </span>
                    </button>
                    <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        ></path>
                      </svg>
                      <span className="text-sm text-gray-700">Block User</span>
                    </button>
                    <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="text-sm text-gray-700">More Info</span>
                    </button>
                  </div>
                  <div className="py-2">
                    <p className="mb-1 px-6 text-xs uppercase text-gray-400">
                      Feedback
                    </p>
                    <button className="flex w-full items-center space-x-2 px-6 py-1.5 hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                      <span className="text-sm text-gray-700">Report</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-[250px] w-full">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="h-full w-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="-mt-20 flex flex-col items-center">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar
                  alt="asac"
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 150, height: 150 }}
                />
              </IconButton>
              <div className="mt-2 flex items-center space-x-2">
                <p className="text-2xl">
                  {user.firstname + " " + user.lastname}
                </p>
                <span className="rounded-full bg-blue-500 p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">@{user.username}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 px-12 pt-4 pb-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-gray-700 text-xl">
                  {updatedsuser.followers.length}
                </p>
                <p className="text-gray-700 text-xl">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-700 text-xl">
                  {updatedsuser.following.length}
                </p>
                <p className="text-gray-700 text-xl">Following</p>
              </div>
              
            </div>
            <div className="px-12 text-center text-sm">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                  <button
                    onClick={handleSaveClick}
                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEditClick}
                    className="rounded bg-gray-200 p-2"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M9 13.5L15.232 7.268a1 1 0 011.415 0l3.536 3.536a1 1 0 010 1.415L13.5 18H9v-4.5z"
                      ></path>
                    </svg>
                  </button>
                  <p className="text-gray-700 text-xl">{bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
