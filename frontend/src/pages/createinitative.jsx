import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checktoken, createIntitative } from "../../route";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../features/userinfo/userinfoSlice";
import { toast } from "react-toastify";

const CreateInitative = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const userdata = useSelector((state) => state.userinfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Checking Token
  useEffect(() => {
    const validatetoken = async () => {
      const token = localStorage.getItem("authorization");
      if (!token) {
        navigate("/signin");
        return;
      }
      const { data } = await axios.post(
        checktoken,
        {},
        { headers: { authorization: token } }
      );
      if (!data.status) {
        console.log("here2");
        navigate("/signin");
        localStorage.removeItem("authorization");
        return;
      } else {
        const userdata = data.decoded;
        dispatch(setLoading(true));
        dispatch(setUser(userdata));
        dispatch(setLoading(false));
      }
    };
    validatetoken();
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("description", description);
    formdata.append("userid", userdata.id);
    formdata.append("username", userdata.username);
    formdata.append("title", title);
    const { data } = await axios.post(createIntitative, formdata);
    if (data.status) {
      toast.success("Successfully Created");
      navigate("/ownintiative");
    } else {
      toast.error("Unsuccessfuly");
    }
  };

  return (
    <div className="  md:px-48 lg:px-80 bg-gray-200 h-screen">
      <div className="  justify-center h-screen bg-red-500">
        <div className="bg-white w-full p-4 rounded shadow">
          <h2 className="text-xl font-semibold uppercase mb-4 justify-center">
            Create Initiative
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {image == null ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-500 border-dashed rounded-lg bg-green-50 dark:bg-green-700">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-green-500 dark:text-green-400">
                      <span className="font-semibold">
                        Successfully Uploaded!
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium text-lg mb-2"
              >
                Title:
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium text-lg mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows="4"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <div className="flex space-x-5 ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <div
                onClick={() => {
                  navigate("/ownintiative");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 "
              >
                Delete
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInitative;
