import { useState } from "react";
import { toast } from "react-toastify";
import{axios} from 'axios'
import {useParams} from "react-router-dom"
export default function PlayerForm({initialValues}){
    const{id}=useParams();
    const[formData,setFormData]=useState({ name: "",
    position: "DEF",
    image: "",
    rating:"",
    pace: "",
    shooting: "",
    passing: "",
    defense: "",
    physical: "",
    diving: "",
    reflexes: "",
    handling: "",
    positioning: "",
    kicking: "",
  });
  useEffect(() => {
    if (initialValues) {
      setFormData({  ...initialValues });
    }
    // eslint-disable-next-line
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token=localStorage.getItem("token");
    try{
        if(initialValues){
      await axios.put(`http://localhost:3000/api/v1/players/${id}`,formData,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        withCredentials:true,
      });
      toast.success("Player Updated successfully");
    }
    else{
       await axios.post(`http://localhost:3000/api/v1/players`,formData,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        withCredentials:true,
       });
       toast.success("Player Created successfully");
    }}
    catch(error){
    toast.error("Something went wrong");
    };
    
  };
  return(
    <div>
        <form onSubmit={handleSubmit}>
        <h2>
            {initialValues?"Edit Player":"Create Player"}
        </h2>
        <input 
        name="name"
        placeholder="Player Name"
        value={formData.name}
        onChange={handleChange}
        required
        />
        <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        />
        <input
        type="number"
        name="rating"
        placeholder="Player Rating"
        value={formData.rating}
        onChange={handleChange}
        />
        
        <select
        name="position"
        value={formData.position}
        onChange={handleChange}
        >
            <option value="GK">GK</option>
            <option value="DEF">DEF</option>
            <option value="MID">MID</option>
            <option value="ATT">ATT</option>

        </select>

        {formData.position=="GK"?(
        <>
        <input name="diving" placeholder="Diving" value={formData.diving} onChange={handleChange} />
            <input name="reflexes" placeholder="Reflexes" value={formData.reflexes} onChange={handleChange} />
            <input name="handling" placeholder="Handling" value={formData.handling} onChange={handleChange} />
            <input name="positioning" placeholder="Positioning" value={formData.positioning} onChange={handleChange} />
            <input name="kicking" placeholder="Kicking" value={formData.kicking} onChange={handleChange}/>
        </>
        ):(
          <>
          <input name="pace" placeholder="Pace" value={formData.pace} onChange={handleChange}/>
            <input name="shooting" placeholder="Shooting" value={formData.shooting} onChange={handleChange} />
            <input name="passing" placeholder="Passing" value={formData.passing} onChange={handleChange}/>
            <input name="defense" placeholder="Defense" value={formData.defense} onChange={handleChange}/>
            <input name="physical" placeholder="Physical" value={formData.physical} onChange={handleChange}/>
          </>
        )}
        <div>
            <button
            type="submit"
            >
                {initialValues? "Update":"Create"}
            </button>
        </div>
        </form>
    </div>
  )
}