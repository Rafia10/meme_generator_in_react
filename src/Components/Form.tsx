import { useState } from "react";
import memesData from "../memesData";
import "./Form.css";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
export const Form = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [state, setState] = useState("");
  //@ts-ignore
  function handleMemes(event) {
    event.preventDefault();
    const randomNumber = Math.floor(
      Math.random() * memesData.data.memes.length
    );
    //@ts-ignore
    setState(memesData.data.memes[randomNumber].url);
  }
  //@ts-ignore
  const handleInputChange = (event) => {
    if (event.target.name === "topText") {
      setTopText(event.target.value);
    } else if (event.target.name === "bottomText") {
      setBottomText(event.target.value);
    }
  };
  function handleDownload() {
    const memeContainer = document.getElementById("meme-container");
    console.log(state);
    //@ts-ignore

    html2canvas(memeContainer).then((canvas) => {
      //@ts-ignore
      canvas.toBlob((blob) => {
        console.log(blob);
        //@ts-ignore
        saveAs(blob, "image.png");
      });

      // Put your image url here.
    });
    // saveAs(state, "image.png");
  }

  return (
    <form className="form" onSubmit={handleMemes}>
      <input
        type="text"
        name="topText"
        className="form-input"
        placeholder="Top text"
        value={topText}
        onChange={handleInputChange}
      />
      <input
        type="text"
        className="form-input"
        name="bottomText"
        placeholder="Bottom text"
        value={bottomText}
        onChange={handleInputChange}
      />
      <button className="form-button">Get A New Meme Image</button>
      <br></br>
      {state && (
        <div id="meme-container" className="image-container">
          <img src={state} alt={topText} />
          <div className="text-container">
            <p>{topText}</p>
          </div>
          <div className="text-container2">
            <p>{bottomText}</p>
          </div>
        </div>
      )}
      <button className="form-button" onClick={handleDownload}>
        Download Meme
      </button>
    </form>
  );
};
