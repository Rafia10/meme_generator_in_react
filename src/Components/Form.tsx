import { useState } from "react";
import memesData from "../memesData";
import "./Form.css";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export const Form = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [state, setState] = useState("");

  async function handleMemes(event: any) {
    event.preventDefault();
    const randomNumber = Math.floor(
      Math.random() * memesData.data.memes.length
    );

    await setState(memesData.data.memes[randomNumber].url);
  }

  const handleInputChange = (event: any) => {
    if (event.target.name === "topText") {
      setTopText(event.target.value);
    } else if (event.target.name === "bottomText") {
      setBottomText(event.target.value);
    }
  };

  function handleDownload() {
    const memeContainer = document.getElementById("meme-container");

    if (memeContainer) {
      const width = memeContainer.firstElementChild?.clientWidth;
      const height = memeContainer.firstElementChild?.clientHeight;
      domtoimage
        .toBlob(memeContainer, {
          width,
          height,
        })
        .then((canvas) => {
          saveAs(canvas, "image");
        });
    }
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
      <br />
      <button className="form-button" onClick={handleDownload}>
        Download Meme
      </button>
    </form>
  );
};
