import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { accContext } from "../context/ApplicationContext";
import Dashbtn from "./Dashbord.module.scss";
const Dashbord = () => {
  const [videoData, setVideoData] = useState([]);
  const [flag, setFlag] = useState(false);
  const ctx = useContext(accContext);
  const adress = ctx.sharedState.acclogin.accountAddress;
  const Channel = ctx.sharedState.channel;
  const CheckChannel = async () => {
    const data = {
      address: adress,
    };
    const dataforchannel = await axios.post(
      "https://skylive.onrender.com/Creaters/adress",
      data
    );
    console.log(dataforchannel);
    console.log(Channel);
    const videoList = await axios.post(
      "https://skylive.onrender.com/Videos/adress",
      data
    );
    console.log(videoList);
    await setVideoData(videoList.data);
    setTimeout(() => {
      console.log(videoData);
    }, 2000);
  };

  useEffect(() => {
    CheckChannel();
  }, [adress]);
  console.log(flag);
  return (
    <>
      <div>
        {Channel.map((videoData) => (
          <div className=" component 2xl:ml-36 w-[66rem] 2xl:w-[100rem]   mt-36 ml-20 overflow-hidden  ">
            {/* border-b-2   className=" pt-20  pl-40*/}
            <img
              src={videoData.channelbackground}
              className="w-full h-40"
            ></img>
            <div className=" flex ml-20   ">
              <div>
                <div className="avatar 2xl:ml-20  ml-10">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={videoData.channelprofile} />
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <p className="text-lg  pl-10 font-bold">
                  {videoData.channelname}
                </p>

                <p className="text-lg  pl-10 font-bold">@ {videoData.name}</p>
              </div>
            </div>

            <div className=" flex justify-evenly text-2xl ">
              <div
                className={Dashbtn.btn}
                onClick={() => {
                  if (flag) {
                    setFlag(false);
                  } else {
                    setFlag(true);
                  }
                }}
              >
                videos
              </div>

              <Link
                style={{ marginRight: "20px" }}
                exact
                className={Dashbtn.btn}
                to="/live"
              >
                Go Live
              </Link>
              <Link
                style={{ marginRight: "20px" }}
                exact
                className={Dashbtn.btn}
                to="/upload"
              >
                Upload
              </Link>
              <div className="pl-10">
                <h4 className={Dashbtn.btn}>about</h4>
              </div>
            </div>
            <hr className=" flex  pt-20 " />
            <div className="border-r-2 pl-[80rem]"></div>
          </div>
        ))}
        <div className="grid col-span-2 2xl:pl-60  pl-20  grid-cols-3 2xl:grid-cols-5 place-content-center  divide-y  gap-4">
          {flag &&
            videoData.map((post) => (
              <Link to="/player">
                <div className=" p-8 	">
                  <div className="card card-compact w-60 h-60 shadow-2xl  ">
                    <figure className="h-full">
                      <a href={post.thumbnail}>
                        <img src={post.thumbnail} onClick={post.thumbnail} />
                      </a>
                    </figure>
                    <div className="card-body h-24 ">
                      <div className="flex justify-between">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img src={Channel[0].channelprofile} />
                          </div>
                        </div>

                        <div>
                          <p className="card-title text-lg ">{post.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className=" flex justify-evenly text-2xl ">
          <h3 className="  text-white  btn outline-0">videos</h3>

          <Link
            style={{ marginRight: "20px" }}
            exact
            className="ring-1 btn  ring-white rounded-xl"
            to="/live"
          >
            Go Live
          </Link>
          <Link
            style={{ marginRight: "20px" }}
            exact
            className="ring-1 btn ring-white rounded-xl"
            to="/upload"
          >
            Upload
          </Link>
          <div className="pl-10">
            <h3 className="  text-black  outline-0">about</h3>
          </div>
        </div>
        <hr className=" flex  pt-20 " />
        <div className="border-r-2 pl-[80rem]"></div>
      </div>
    </>
  );
};
export default Dashbord;
