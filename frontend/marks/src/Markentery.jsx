import React from 'react'
import { useState } from 'react';
import './Markentery.css'
export default function Markentery() {
    const [headers, setHeaders] = useState([]);
    const [marks, setmarks] = useState([]);
    const [mark1,setmark1]=useState();
    const [mark2,setmark2]=useState();
    const [mark3,setmark3]=useState();
    const [mark4,setmark4]=useState();
    const [mark5,setmark5]=useState();
    const [mark6,setmark6]=useState(10);
    const [click,setclick]=useState(0);
    function entermarks(event){
        event.preventDefault();
        console.log(mark1,mark2,mark3,mark4,mark5);
        const newTotal = parseInt(mark1 || 0) + parseInt(mark2 || 0) + parseInt(mark3 || 0) + parseInt(mark4 || 0) + parseInt(mark5 || 0);
        if(click==0){
            setclick(1);
            setHeaders(["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5", "Total"]);
        }
        setmarks([...marks, [mark1, mark2, mark3, mark4, mark5, newTotal]]);
        // setmark1("");
        // setmark2("");
        // setmark3("");
        // setmark4("");
        // setmark5("");
        handleSubmit();
        
    }
    const handleSubmit = async()=>{
        try {
            
            const total = parseInt(mark1 || 0) + parseInt(mark2 || 0) + parseInt(mark3 || 0) + parseInt(mark4 || 0) + parseInt(mark5 || 0);
            const res = await fetch("http://localhost:7000/add-data",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    Sub1: mark1, 
                    Sub2: mark2, 
                    Sub3: mark3, 
                    Sub4: mark4, 
                    Sub5: mark5, 
                    Tot: total 
                })

            })

            const data = await res.json();
            console.log(data);
            if(!res.ok){
                throw new Error ("HTTP Error");
            }
            console.log("Added succesfully");
            
        } catch (error) {
            console.log(error);
        }
    }
 
  return (
    <div className='maincontentmarks'>
        <h1>Mark Entery Portal</h1>
        <div className="inputform">
        <form action="" onSubmit={entermarks}>
            <p>
            <label htmlFor="" className='lable1'>Subject 1:</label>
            <input type="number" onChange={(e)=>{setmark1(e.target.value)}} value={mark1} required/><br/>
            </p>
            <p>
            <label htmlFor="" className='lable1'>Subject 2:</label>
            <input type="number"  onChange={(e)=>{setmark2(e.target.value)}} value={mark2} required/><br/>
            </p>
            <p><label htmlFor="" className='lable1'>Subject 3:</label>
            <input type="number" onChange={(e)=>{setmark3(e.target.value)}} value={mark3} required/><br/>
            </p>
            <p>
            <label htmlFor="" className='lable1'>Subject 4:</label>
            <input type="number" onChange={(e)=>{setmark4(e.target.value)}} value={mark4} required/><br/>
            </p><p>
            <label htmlFor="" className='lable1'>Subject 5:</label>
            <input type="number" onChange={(e)=>{setmark5(e.target.value)}} value={mark5} required/><br/></p>
            <button type='sumbit' >Sumbit</button>
        </form>
        </div>
        <div className="markstable">
        <table id='marktable' className='marktable' border="1">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((marks, rowIndex) => (
                            <tr key={rowIndex}>
                                {marks.map((mark, colIndex) => (
                                    <td key={colIndex}>{mark}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </div>
  )
}
