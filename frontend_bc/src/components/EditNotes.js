import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


function EditNotes() {
    const [creator, setCreator] = useState("");
    const [title, setTitle] = useState("");
    const[notes, setNotes] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getUserById();
    }, []);

    const updateUser = async (e) =>{
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`,{
                creator,
                title,
                notes
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

const getUserById = async () =>{
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setCreator(response.data.creator);
    setTitle(response.data.title);
    setNotes(response.data.notes);
}

  return (
    <div className="columns mt-5 is-centered">
  <div className="column is-half">
    <div className="box p-5">
      <h1 className="title has-text-centered has-text-info">✏️ Edit Note</h1>
      <form onSubmit={updateUser}>
        <div className="field">
          <label className="label">Creator</label>
          <div className="control">
            <input 
              type="text" 
              className="input is-medium is-rounded" 
              value={creator} 
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Enter creator name" 
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input 
              type="text" 
              className="input is-medium is-rounded" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter title" 
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Notes</label>
          <div className="control">
            <textarea 
              className="textarea is-medium is-rounded"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              rows="4" 
              placeholder="Write your notes here..." 
              required
            ></textarea>
          </div>
        </div>

        <div className="field has-text-centered">
          <button type="submit" className="button is-info is-medium is-rounded px-5">
             Update
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

export default EditNotes;