import { useState, useRef, useContext } from "react";
import upload from "./upload.png"
import * as tus from "tus-js-client";

import { ethers } from "ethers";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState("");

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const videoHandler = (event) => {
    setVideo(event.target.files[0]);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${"4402a176-ddeb-4ecc-bfd6-ea9be0466f11"}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "tusClient",
        }),
      }
    );

    const { tusEndpoint } = await response.json();

    const upload = new tus.Upload(video, {
      endpoint: tusEndpoint,
      metadata: {
        filename: "tusClient",
        filetype: "video/mp4",
      },
      uploadSize: video.size,
      onError(err) {
        console.error("Error uploading file:", err);
      },
      onProgress(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("Uploaded " + percentage + "%");
      },
      onSuccess() {
        console.log("Upload finished:", upload.url);
        console.log("upload is", upload);
      },
    });
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  };

  return (
    <div className="flex items-center  ">
      <form
        className="form-control       grid col-span-2 2xl:h-[40rem] h-[30rem] w-[50rem] border-dashed border-[6px] rounded-bl-[60px] text-black border-base-200 mt-40 place-items-center container mx-auto ml-[14rem] 2xl:ml-[36rem] "
         
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
      >
      <img src={upload} className='2xl:h-80 h-48 w-72 2xl:w-80'>

      </img>
       <div className="flex justify-between gap-10">
       <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered  border-base-200 input-info w-full max-w-xs"
          placeholder="Name"
          ref={nameInputRef}
          required
        />
        </div>
        <div>
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          className="input input-bordered border-base-200 input-info w-full max-w-xs"
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />
        </div>
        </div>
        <label className="label">
          <span className="label-text ">Video</span>
        </label>
        <input
          type="file"
          name="videoUrl"
          id="videoUrl"
          className="file-input file-input-bordered border-base-200 file-input-info w-full max-w-xs"
          onChange={videoHandler}
          required
        />
        <button
          type="submit"
          className={`btn bg-white text-black border-base-200 ${isLoading && "loading"}`}
          style={{ marginTop: "7%" }}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
       
      </form>
    </div>
  );
}

export default Main;