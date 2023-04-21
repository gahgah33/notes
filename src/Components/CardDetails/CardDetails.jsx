import React, {useState } from 'react'
import styles from "./CardDetails.module.css"
import axios from 'axios';

export default function CardDetails({allNotes, getAllNotes}) {
  let userToken = localStorage.getItem("userToken")

  const [updateData, setUpdateData] = useState({
    "token":userToken,
    "NoteID":"",
    "title":"",
    "desc":""
  })

  const [delCard, setDelCard] = useState({
  "NoteID":"",
  "token": userToken
    })

  console.log(allNotes);

  function editValues(index){
   
    console.log(allNotes[index])
    document.getElementById("title2").value =allNotes[index].title;
    document.getElementById("desc2").value =allNotes[index].desc;
    setUpdateData({...updateData, "NoteID":allNotes[index]._id})
    console.log(updateData);
  }

  function getValue(e){
    setUpdateData({...updateData,[e.target.name] :e.target.value})
    console.log(updateData);

  }

 async function addFun(e){
    e.preventDefault()
    let {data} = await axios.put(`https://sticky-note-fe.vercel.app/updateNote`,updateData )
    console.log(data);
    getAllNotes()

  }

  async function deleteCard(id){
    console.log(id);
    setDelCard({...delCard, "NoteID":id})
    console.log(delCard);
    let {data} = await axios.delete(`https://sticky-note-fe.vercel.app/deleteNote`, {data:delCard})
    console.log(data);
    getAllNotes()
  }
  return (
    // display cards
   <>{allNotes? allNotes.map((note, index)=><div key={note._id}  className='col-md-4'>

   <div className='note p-3 text-dark mb-3 d-flex justify-content-between'> 
  <div>
  <p className='fw-bold text-capitalize'>{note.title}</p>
   <p className='fw-bold text-capitalize'>{note.desc}</p>
  </div>
 
  <div>
  <i onClick={()=>deleteCard(note._id)}  className="del fa-solid fa-trash mx-2"></i>
  <i onClick={()=>editValues(index)} className="edit fa-solid fa-pen-to-square mx-2"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1"></i>
  </div>
 
   </div>
 
 
 
 </div>
 ): ""}

 {/* edit popup */}


<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<form id="edit-form" onSubmit={addFun} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input onChange={getValue} id='title2' placeholder="Type Title" name="title" className="form-control" type="text" />
                            <textarea onChange={getValue}  id='desc2' className="form-control my-2" placeholder="Type your note" name="desc" cols="30" rows="10"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                            <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                        </div>
                    </div>
                </div>
</form>
</div>
   
   </>
  )
}
