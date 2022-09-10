import React, { useState, useEffect, useRef} from "react";
import { connect } from "react-redux";
import { Modal, Image, Empty } from 'antd';
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import player from '../assets/img/video-player.png'
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import {apiURL} from '../Config/Config'
import YouTube from 'react-youtube';
import getLanguage from "./utilFunction/language";
import getCurrentLocalDate from "./utilFunction/currentLocalDate"


const Projection = (props)=>{

//     ({src,
//   width,
//   height,
//   magnifierHeight = 100,
//   magnifieWidth = 100,
//   zoomLevel = 1.5
// }: {
//   src: string;
//   width?: string;
//   height?: string;
//   magnifierHeight?: number;
//   magnifieWidth?: number;
//   zoomLevel?: number;
// })
    // const mounted = useRef();
    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleVideo, setVisibleVideo] = useState(false);
    const [projection, setProjection] = useState();
    const [imageProjection, setImageProjection] = useState();
    const [videoProjection, setVideoProjection] = useState();
    const [singleVideoProjection, setSingleVideoProjection] = useState();
    const [titleProjection, setTitleProjection] = useState("");
    const [descriptionProjection, setDescriptionProjection] = useState("");
    const [uniqueVideo,setUniqueVideo] = useState()
    const [idVideo, setIdVideo] = useState()
    const [pageInit, setPageInit] = useState(0)
    const [newProjection, setNewProjection] = useState();
    const [pageInitVideo, setPageInitVideo] = useState(0)
    const [newProjectionVideo, setNewProjectionVideo] = useState();
    const [ModalPhotoContext, setModalPhotoContext] = useState()
    const [filterImage, setFilterImage] = useState('ASC')
    const [filterVideo, setFilterVideo] = useState('ASC')

    // const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");             
    // const [nbrPageProjection,setNbrPageProjection] = useState(8)
    // const [pageProjection,setPageProjection] = useState(0)

    useEffect(() => { 
        // getAllProjectionASC()
        getAllProjectionASC(pageInit, filterImage)
        // getAllVideoProjectionASC()        
        getAllVideoProjectionDESC(pageInitVideo, filterVideo)        
        window.scrollTo(0, 0)
        if(projection !== newProjection){
          setNewProjection(projection)   
      }
      if(videoProjection !== newProjectionVideo){
        setNewProjectionVideo(videoProjection)   
      }
    }, []);

    const sliderRef = useRef()
    const sliderRefVideo = useRef()
    const sliderRefPhoto = useRef()

    const nextPhoto = () => {
      sliderRefPhoto.current.slickNext();
  };

  const previousPhoto = () => {
    sliderRefPhoto.current.slickPrev();    
  };
    
  const nextGallery = () => {

    getAllProjectionASC(pageInit+1, filterImage)
    setPageInit(pageInit+1)
};

// Trigger previous method to show the previous slides
const previousGallery = () => {
    setPageInit(pageInit-1)
    getAllProjectionASC(pageInit-1, filterImage)
};

    const nextVideo = () => {        
      getAllVideoProjectionDESC(pageInitVideo+1, filterVideo)
      setPageInitVideo(pageInitVideo+1)
    };

    // Trigger previous method to show the previous slides
    const previousVideo = () => {        
      setPageInitVideo(pageInitVideo-1)
      getAllVideoProjectionDESC(pageInitVideo-1, filterVideo)
    };

    const getAllProjectionASC =async(page, filter)=>{
      let formdata =new FormData()
      formdata.append('page',page)
      formdata.append('nbparpage',6)
      formdata.append('type', filter)
      const requestOptions = {
          method: 'POST',
          body: formdata
        };
        const data = await fetch(apiURL+"/projectiondebat/getall", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setProjection(dataJson);            
        }
    }

    const getAllProjectionDESC =async()=>{
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+"/projectiondebat/getallDESC", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setProjection(dataJson);            
        }
    }

    const getAllVideoProjectionASC =async()=>{
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+"/videoprojectiondebat/getallASC", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setVideoProjection(dataJson);            
        }
    }

    const getAllVideoProjectionDESC =async(page, filter)=>{
      let formdata =new FormData()
      formdata.append('page',page)
      formdata.append('nbparpage',6)
      formdata.append('type', filter)
      const requestOptions = {
          method: 'POST',
          body: formdata
        };
        const data = await fetch(apiURL+"/videoprojectiondebat/getall", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setVideoProjection(dataJson);            
        }
    }

    const getImageProjectionByid =async(el)=>{
        console.log(el,'el');
        const requestOptions = {
            method: 'GET',
        };        
        const data = await fetch(apiURL+"/photoprojectiondebat/getall/"+el.id, requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setImageProjection(dataJson);   
            setTitleProjection(el.title)
            setDescriptionProjection(el.description)
            setVisibleImage(true)
            setModalPhotoContext(el)         
        }
    }

    // const handleMouseMove = e => {
    //     const { left, top, width, height } = e.target.getBoundingClientRect()
    //     const x = (e.pageX - left) / width * 100
    //     const y = (e.pageY - top) / height * 100
    //     setBackgroundPosition(`${x}% ${y}%`)
    //     console.log(backgroundPosition,'ww');
    // }

    const settingsGallery = {
    //   className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 3,
      rows: projection && projection.length<6?2:3,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {    
            mobileFirst: true,
            initialSlide: 0,
            slidesToShow: 2,
            rows: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
              centerMode: false,
            slidesToShow: 1,
          }
        }
      ],
      dots: false,
      arrows: false
    //   nextArrow: <nextRef />,
    //   prevArrow: <prevClick />
    };

    const settingsVideo = {
    //   className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 3,
      rows: videoProjection && videoProjection.length<12?1:2,
      slidesPerRow: 1,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
          {/* <button>"20"</button> */}
           {/* onClick={prevClick}  onClick={nextClick} onClick={prevClick} */}
            <div className="dots-arrow dots-prev" onClick={previousVideo}>
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
            {/* {prevClick({})} */}
          </li>
            {dots} 
          <li>
          {/* {nextClick({})} onClick={nextClick}*/}
            <div className="dots-arrow dots-next" onClick={nextVideo}>
                <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
            </div>
          </li>
          </ul>
        </div>
      ),
      responsive: [
           {
          breakpoint: 991,
          settings: {
              centerMode: false,
            slidesToShow: 2,
            rows: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
              centerMode: false,
            slidesToShow: 1,
          }
        }
      ],
      dots: false,
      arrows: false
    //   nextArrow: <nextRef />,
    //   prevArrow: <prevClick />
    };

    const NextImageArrow = ({ onClick }) => {
            return (
            <div className="image-arrow image-next" onClick={onClick}>
                <img className="image-arrow-size" src={rightarrow}/>
            </div>
            );
    };

    const PrevImageArrow = ({ onClick }) => {
            return (
            <div className="image-arrow image-prev" onClick={onClick}>
                <img className="image-arrow-size" src={leftarrow}/>
            </div>
        );
    };

    // const settingsImage = {
    //   className: "center",
    //   centerMode: true,
    //   infinite: false,
    //   centerPadding: 0,
    //   slidesToShow: 1,
    //   speed: 500,      
    //   responsive: [
    //     {
    //       breakpoint: 767,
    //       settings: {
    //         slidesToShow: 1,            
    //       }
    //     }
    //   ],
    //   dots: true,
    //   nextArrow: <NextImageArrow />,
    //   prevArrow: <PrevImageArrow />
    // };


    const settingsImage = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      appendDots: dots => (
          <div>
            <ul style={{ margin: "0px", padding: "0px" }}> 
            <li>
              <div className="dots-arrow dots-prev" onClick={previousPhoto} >
                  <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
              </div>
            </li>
              {dots} 
            <li>
              <div className="dots-arrow dots-next" onClick={nextPhoto} >
                  <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
              </div>
            </li>
            </ul>
          </div>
        ),      
      responsive: [
          {
          breakpoint: 767,
          settings: {
              slidesToShow: 1,            
          }
          }
      ],
      dots: true,
      };
console.log("oiuuuuuuuuuuuuuuuuuuuu", projection);
const showModalVideo =(el)=>{
    console.log("el video",el);
    setUniqueVideo(el)
    setIdVideo(el.path.substr(32,11))
    setVisibleVideo(true)
}
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const onReady=(event)=> {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}
console.log("dataaa",videoProjection);
    return(
        <>
        <Modal                
                centered
                visible={visibleImage}
                onOk={() => setVisibleImage(false)}
                onCancel={() => setVisibleImage(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                
            >
            <div className="modal-container">
            <Slider {...settingsImage} ref={slider => (sliderRefPhoto.current = slider)}>
            {imageProjection && imageProjection.map((el)=>(               
                <div>
                <center>
                    <Image  src={el.data} className="img-preview" />                   
                </center>
                </div>
            ))}             
            </Slider> 
            <div className={props.auth.lang+"_media-modal-flex"}>
            {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{ModalPhotoContext && ModalPhotoContext.title}</h2>:
            <h2 className={props.auth.lang+"_modal-title"}>{ModalPhotoContext && ModalPhotoContext.titlear}</h2>}
            </div>   
            
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{ModalPhotoContext && ModalPhotoContext.description}</p>:
                <p className={props.auth.lang+"_modal-content"}>{ModalPhotoContext && ModalPhotoContext.description}</p>}
                <a className="media-source-button" disabled={ModalPhotoContext && ModalPhotoContext.source==undefined} target="_blank" rel="noopener noreferrer" href={ModalPhotoContext && ModalPhotoContext.source}>Source <ExportOutlined style={{paddingLeft:10}}/></a>
            </div>
            </Modal>
            <Modal                
                centered
                visible={visibleVideo}
                onOk={() => setVisibleVideo(false)}
                onCancel={() => setVisibleVideo(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                destroyOnClose={true}
                
            >
            <div className="modal-container">                
                <div class="video-container">
                <YouTube videoId={idVideo} opts={opts} onReady={onReady} />
                    {/* <ReactPlayer className="youtube-video" url={uniqueVideo&& uniqueVideo.path} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/> */}
                </div> 
                <div className={props.auth.lang+"_media-modal-flex"}>
                {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo&& uniqueVideo.titre}</h2>: <h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo&& uniqueVideo.titrear}</h2>}

                  </div>                   
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo&& uniqueVideo.date}</p>
                {props.auth.lang== 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueVideo&& uniqueVideo.description}</p> : <p className={props.auth.lang+"_modal-content"}>{uniqueVideo&& uniqueVideo.descriptionar}</p>}
            </div>
            </Modal>
            {/* Projection Image-Text */}
            <section className="slider-projection-section">
                {props.auth.lang == 'fr'?<h1 className={props.auth.lang+"_projection-title"}>{getLanguage(props).projectionTitleOne} <br />{getLanguage(props).projectionTitleTwo}</h1>:<h1 className={props.auth.lang+"_projection-title"}>{getLanguage(props).projectionTitleThree}</h1>}
                <div className="projection-slider-shadow"></div>
            </section>
            {/* Projection Text */}
            <section className="projection-text-section">
               {props.auth.lang == 'fr'?<p className={props.auth.lang+"_projection-text"}>{getLanguage(props).projectionTextOne}<br /><br /> 

              {getLanguage(props).projectionTextTwo}</p>:<p className={props.auth.lang+"_projection-text"}>{getLanguage(props).projectionTextThree}<br /><br /> 

              {getLanguage(props).projectionTextFour}</p>} 
            </section>
            <section className={props.auth.lang+"_projection-content-header"}>
                    <div className={props.auth.lang+"_projection-content-header-left"}>
                        <span className="projection-title-decoration"></span>
                        <h2 className={props.auth.lang+"_projection-activity-title"}>{getLanguage(props).activityTitle}</h2>
                    </div>
                    <div className="projection-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getAllProjectionASC(0, "ASC")}/><UpOutlined className="pagination-icon" onClick={()=>getAllProjectionASC(0, "DESC")}/></div>
                    </div>
            </section>            
            <section className="projection-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settingsGallery}>
               {projection && projection.length !==0 ? projection.map((el)=>(
                    <div className="projection-activity-card" onClick={() => getImageProjectionByid(el)} >                                       
                    <div className="img-container">                     
                        
                        <img  src={apiURL+"/photoprojectiondebat/getall/"+el['photoProjectionDebats']['id']+"/thumb.jpg"} height={'100%'} />                        
                        <div className={props.auth.lang+"_projection-activity-card-banner"} style={{backgroundColor: "#FECC17"}}>
                            <span className="projection-activity-date">
                            {/* <Moment format="DD/MM/YYYY"> */}
                          {getCurrentLocalDate(props,el.date)}
                            {/* </Moment> */}
                            </span>
                            {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_projection-activity-card-title"}>{el.title.length <= 20? el.title: el.title.substring(0,20)+"..."}</h3>:<h3 className={props.auth.lang+"_projection-activity-card-title"}>{el.title.length <= 20? el.title: el.title.substring(0,20)+"..."}</h3>}                            
                        </div>
                        </div>
                    </div>
                )):<Empty />}
                </Slider>
                <div className='slick-dots'>
                            <ul style={{ margin: "0px", padding: "0px" }}> 
                                <li>
                                    <div className="dots-arrow dots-prev" onClick={previousGallery} >
                                        <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                                    </div>
                                </li>
                                <li className="point-pagination_react_slick"></li>
                                <li>
                                    <div className="dots-arrow dots-next" onClick={nextGallery} >
                                        <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
                                    </div>
                                </li>
                            </ul>
                </div>
            </section>

            {/* /***************Video*****************  */}
            <section className={props.auth.lang+"_projection-content-header"} style={{marginTop: 80}}>
                    <div className={props.auth.lang+"_projection-content-header-left"}>
                        <span className="projection-title-decoration" style={{backgroundColor: "#FF9966"}}></span>
                        <h2 className={props.auth.lang+"_testimonial-activity-title"}>{getLanguage(props).activityTitleVideo}</h2>
                    </div>
                    <div className="projection-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getAllVideoProjectionDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllVideoProjectionDESC(0,"DESC")} /></div>
                    </div>
            </section>
            <section className="projection-slider-section">
                <Slider ref={slider => (sliderRefVideo.current = slider)} {...settingsVideo}>
                {videoProjection && videoProjection.length !==0 ? videoProjection.map((el)=>(
                    <div className="projection-activity-card" onClick={() => showModalVideo(el)} >                                       
                    <div className="img-container">    
                    <img src={player} className="video-player"/>                  
                     
                        <img src={apiURL+"/videoprojectiondebat/get/"+el['id']+"/thumb.jpg"} height={'100%'}/>                        
                        <div className={props.auth.lang+"_projection-activity-card-banner"} style={{backgroundColor: "#FF9966"}}>
                            <span className="projection-activity-date">
                            {/* <Moment format="DD/MM/YYYY"> */}
                            {getCurrentLocalDate(props,el.date)}
                            {/* </Moment> */}
                            </span>
                           {props.auth.lang=='fr'?<h3 className={props.auth.lang+"_projection-activity-card-title"}>{/*{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}*/}video</h3>:<h3 className={props.auth.lang+"_projection-activity-card-title"}>{/*{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}*/}فيديوهات</h3>}         
                        </div>
                        </div>
                    </div>   
                    )):<Empty />} 
                           
                </Slider>
                <div className='slick-dots'>
                            <ul style={{ margin: "0px", padding: "0px" }}> 
                                <li>
                                    <div className="dots-arrow dots-prev" onClick={previousVideo} >
                                        <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                                    </div>
                                </li>
                                <li className="point-pagination_react_slick"></li>
                                <li>
                                    <div className="dots-arrow dots-next" onClick={nextVideo} >
                                        <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
                                    </div>
                                </li>
                            </ul>
                </div>
            </section>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
        dispatch(action);
        },
    };
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        };
    };
      
export default connect(mapStateToProps, mapDispatchToProps)(Projection);