import { useState , useEffect } from "react";
import "./styles.css";

export default function App() {

  const [showCreative, setShowCreative] = useState(()=> false);
  const [progress, setProgress] = useState(()=>0);
  const [formData, setFormData] = useState(()=>{})
  const [creatives, setCreatives] = useState(()=>[]);

  let allItems = [];

  const colors = ["red", "blue", "green"];

  useEffect(()=>{
    allItems = [...creatives];
  },[creatives]);

  const createCreattive = () => {
    if(formData.title !== "" && formData.subtitle !== ""){
      setCreatives([...creatives, {...formData}]);
      setProgress(progress+1);
      setShowCreative(false);
      
    }
    else{
      console.log("form not filled");
    }
    
  }

  const handleChange = (ev) => {
    setFormData({...formData, [ev.target.name]: ev.target.value});
  }

  const handleColorChange = (ev) =>{
    setFormData({...formData, color: ev.target.title});
  }

  const filterByColor = (color) => {
    let updatedCreatives = creatives.filter((ele)=>{
      return ele.color.includes(color);
    })

    setCreatives(()=>updatedCreatives.length > 0 ? updatedCreatives : allItems);
  };

  const filterByText = (text) => {
    let updatedCreatives = creatives.filter((ele)=>{
      return ele.title.includes(text) || ele.subtitle.includes(text);
    })

    setCreatives(()=>updatedCreatives.length > 0 ? updatedCreatives : allItems);
  };

  return (
    <div className="App">
      <section id="main">
        <h2>Filter By</h2>
        <div className="filterSection alignItems">
          <div>
            <h3>Color:</h3>
            <div className="alignItems">
              {colors.map((e,i)=>{
                return <div key={i+3} onClick={()=>{filterByColor(e)}} className={e}></div>
              })}
            </div>
          </div>
          <div>
            <h3>title/ subtitle:</h3>
            <input type="text" onChange={(ev)=>filterByColor(ev.target.value)}/>
          </div>
        </div>
        <br/>
        <div id="progressSection">
          <progress id="file" value={progress} max={5}>{`${progress}/5`}</progress>
        </div>

        <br/>

        <button disabled={creatives.length === 5} onClick={()=>setShowCreative(true)}>+ Add Creative</button>

        { creatives.length > 0 && creatives.map((ele)=>{
          return (<div className={`creativeCard  ${ele.color}Card`}>
            <h2>{ele.title}</h2>
            <h3>{ele.subtitle}</h3>
          </div>)
        })}
      </section>

      {showCreative && <section id="newCreative"> 
        <div>
          <div id="panelHeader ">
            <h2>Creative Creation</h2>
            <button onClick={()=>setShowCreative(false)}><b>X</b></button>
          </div>
          
          <label>title</label>
          <br/>
          <input name="title"  type="text" onChange={(ev)=>handleChange(ev)}/>
          <br/>
          <br/>
          
          <label>subtitle</label>
          <br/>
          <input  name="subtitle" type="text" onChange={(ev)=>handleChange(ev)}/>
          <br/>
          <label>colors</label>
          <div>
            {colors.map((e,i)=>{
              return <div name="color" title={e} key={i} 
                      onClick={(ev)=>{handleColorChange(ev)}} 
                      className={e}></div>
            })}
          </div>
          <br/>
          <button onClick={()=>createCreattive()}>Done</button>
        </div>
      </section>}
    </div>
  );
}
