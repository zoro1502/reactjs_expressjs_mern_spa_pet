import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import {  MdDelete, MdEdit } from "react-icons/md";

export default function AddPet() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");
  const [files, setFiles] = useState("");
  const [link, setLink] = useState("");
  const [inputField, setInputField] = useState({
    namePet: "",
    typePet: "",
    description: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");

  useEffect(() => {
    
    fetchPet();
  }, [user._id]);

    
  const fetchPet = async () => {
    const res = await axios.get(
      "http://localhost:8800/api/appointment/get-pet/" + user._id
    );
    setData(res.data.value.pets);
  };
    
  const Cancel = ({ params, setRowId }) => {
    const DeleteHandle = async (
      id
    ) => {
      try {
        const res = await axios.delete(
            `http://localhost:8800/api/appointment/delete-pet/${user._id}/${id}`
        );
        toast.success("Successful delete");
        const reson = await axios.get(
            "http://localhost:8800/api/appointment/get-pet/" + user._id
        );
        setData(reson.data.value?.pets);
      } catch (error) {
        toast.error("Cancellation of appointment failed");
      }
    };

    return (
      <div className="view">
        <button
          className="button-view"
          onClick={() => {
            if (window.confirm("Are you sure to delete?"))
              DeleteHandle(
                params.row._id
              );
          }}
        >
          < MdDelete className="icon-view" style={{ color: "red" }} />
        </button>
      </div>
    );
    };
    
    const Update = ({ params, setRowId }) => {
        const GetDetail = async (
          id
        ) => {
          try {
            const reson = await axios.get(
                "http://localhost:8800/api/appointment/get-pet/" + user._id
              );
              const responseI = reson.data.value?.pets;

              const data = responseI.find((item) => item._id == id);
              
            console.log('dasdas', data);
            setInputField(data);
            setLink(data.link)
            setIsUpdate(true);
            setIdUpdate(params.row._id)
            // setData(reson.data.value?.pets);
          } catch (error) {
            toast.error("Cancellation of appointment failed");
          }
        };
    
        return (
          <div className="view">
            <button
              className="button-view"
              onClick={() => GetDetail(
                params.row._id
              )}
            >
              < MdEdit className="icon-view" style={{ color: "#c3c331" }} />
            </button>
          </div>
        );
      };

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "namePet",
        headerName: "Pet Name",
        width: 120,
      },
      {
        field: "typePet",
        headerName: "Pet Type",
        width: 100,
      },
          {
              field: "link",
              headerName: "Image",
              width: 120,
              renderCell: (params) => <img src={params.value} style={{ maxWidth: "100%", maxHeight: "100%" }}/>,
          },
          {
            field: "updateAction",
            width: 70,
            headerName: "Update",
            type: "actions",
            renderCell: (params) => <Update {...{ params, rowId, setRowId }} />,
          },
      {
        field: "deleteAction",
        width: 70,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Cancel {...{ params, rowId, setRowId }} />,
      },
      
    ],
    [rowId]
  );

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const [errField, setErrField] = useState({
    namePet: "",
    typePet: "",
    description: "",
  });

  const validateForm = () => {
    let formValid = true;
    setErrField({
      ConfirmErr: "",
    });

    if (
      inputField.namePet == "" ||
      inputField.typePet == "" ||
      inputField.description == ""
    ) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ConfirmErr: "Please full fill input",
      }));
    }
    return formValid;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (validateForm()) {
          if (!link) {
              return toast.error('Please upload image');
        }
      const data = {
        namePet: inputField.namePet,
        typePet: inputField.typePet,
          description: inputField.description,
          link: link,
        idUser: user._id
        };
        
        const res = await axios.post(
            "http://localhost:8800/api/appointment/add-pet",
            data
          );
          if (res.data.status === 200) {
            toast.success(res.data.message);
            
              setInputField({
                  namePet: "",
                  typePet: "",
                  description: ""
              });
              setLink("")
              setFiles("")
              await fetchPet();
              
          } else {
            toast.error(res.data.message);
          }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (validateForm()) {
     
    const data = {
      namePet: inputField.namePet,
      typePet: inputField.typePet,
        description: inputField.description,
        link: link,
      idUser: user._id,
      idUpdate: idUpdate
      };
      
      const res = await axios.put(
          "http://localhost:8800/api/appointment/add-pet",
          data
        );
        if (res.data.status === 200) {
          toast.success(res.data.message);
          
            setInputField({
                namePet: "",
                typePet: "",
                description: ""
            });
            setLink("")
            setFiles("")
            await fetchPet();
            
        } else {
          toast.error(res.data.message);
        }
  }
};

  const UpdateAvatar = async (e) => {
    e.preventDefault();
    try {
        const list = await Promise.all(
            Object.values(files).map(async (file) => {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "social0722");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/johnle/image/upload",
                data
              );
              const { url } = uploadRes.data;
              return url;
            })
        );
      setLink(list[0]);
    } catch (err) {
      toast.error("Can get picture from Cloud ");
    }
    };

    console.log(data);
 
  return (
    <div className="appointment">
      <ToastContainer />
        <div className="list-appointment">
          <span className="title-appointment"> Pet List </span>
          <div className="image-information">
            {files && (
              <img src={files && URL.createObjectURL(files[0])} alt="" />
            )}
            <div className="change-image">
              <form>
                <label htmlFor="file" className="button-profile">
                  Choose Image
                  <input
                    type="file"
                    id="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => setFiles(e.target.files)}
                  ></input>
                </label>
                <button onClick={UpdateAvatar}> Save</button>
              </form>
            </div>
          </div>
          <div className="item-change">
            <span> Pet Name </span>
            <div className="item-box">
              <input
                type="text"
                name="namePet"
                value={inputField.namePet}
                onChange={InputHandler}
              />
            </div>
          </div>
          {inputField.namePet?.length <=0 && (
            <span className="error-change error-pet">{errField.ConfirmErr} </span>
          )}
          <div className="item-change">
            <span> Pet Type </span>
            <div className="item-box">
              <input
                type="text"
                name="typePet"
                value={inputField.typePet}
                onChange={InputHandler}
              />
            </div>
          </div>
          {inputField.typePet?.length <=0 && (
            <span className="error-change error-pet">{errField.ConfirmErr} </span>
          )}
          <div className="item-change">
            <span> Description</span>
            <div className="item-box">
              <input
                type="text"
                name="description"
                value={inputField.description}
                onChange={InputHandler}
              />
            </div>
          </div>
          {inputField.description?.length <=0 && (
            <span className="error-change error-pet">{errField.ConfirmErr} </span>
          )}
          <div className="width-center">
          {
            isUpdate ? (
              <button
              className="save-change width-button"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
            ) : (
              <button
              className="save-change width-button"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            )
            }
          </div>

          <Table
            title={"Manager Service"}
            column={columns}
            row={data}
            rowId={rowId}
            setRowId={setRowId}
          />
        </div>
      
    </div>
  );
}
