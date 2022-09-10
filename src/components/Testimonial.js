import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Image, Modal, Empty } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../Config/Config";
import player from '../assets/img/video-player.png'
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"

const Testimonial = (props)=>{

    const [visible, setVisible] = useState(false);
    const [visibleImage, setVisibleImage] = useState(false);
    const [Temoignage, setTemoignage] = useState();
    const [imageTestimonial, setImageTestimonial] = useState("");
    const [videoTestimonial, setVideoTestimonial] = useState();
    const [uniqueVideo,setUniqueVideo] = useState()
    const [titleTestimonial, setTitleTestimonial] = useState("");
    const [descriptionTestimonial, setDescriptionTestimonial] = useState("");
    const [idVideo, setIdVideo] = useState()
    const [pageInit, setPageInit] = useState(0)
    const [newTemoignage, setNewTemoignage] = useState();
    const [pageInitVideo, setPageInitVideo] = useState(0)
    const [newTemoignageVideo, setNewTemoignageVideo] = useState();
    const [ModalPhotoTemoignageContext, setModalPhotoTemoignageContext] = useState()
    const [filterImage, setFilterImage] = useState('ASC')
    const [filterVideo, setFilterVideo] = useState('ASC')

    useEffect(() => { 
        getAllTemoignagesDESC(pageInit, filterImage)
        getVideoTestimonialDESC(pageInitVideo, filterVideo)
        if(Temoignage !== newTemoignage){
            setNewTemoignage(Temoignage)   
        }
        if(videoTestimonial !== newTemoignageVideo){
            setNewTemoignageVideo(videoTestimonial)   
        }
        window.scrollTo(0, 0)
    }, []);

    const sliderRef = useRef()
    const sliderRefVideo = useRef()
    const sliderRefModal = useRef()

    const nextModal = () => {
        sliderRefModal.current.slickNext();
    };

    // Trigger previous method to show the previous slides
    const previousModal = () => {
        sliderRefModal.current.slickPrev();
    };
    
    const nextGallery = () => {

        getAllTemoignagesDESC(pageInit+1, filterImage)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previousGallery = () => {
        setPageInit(pageInit-1)
        getAllTemoignagesDESC(pageInit-1, filterImage)
    };

    const nextVideo = () => {
        getVideoTestimonialDESC(pageInitVideo+1, filterVideo)
        setPageInitVideo(pageInitVideo+1)
    };

    // Trigger previous method to show the previous slides
    const previousVideo = () => {
        setPageInitVideo(pageInitVideo-1)
        getVideoTestimonialDESC(pageInitVideo-1, filterVideo)
    };

const settingsGallery = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      rows: Temoignage && Temoignage.length<6?2:3,
      slidesPerRow: 1,
     
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
            slidesToShow: 1,
          }
        }
      ],
      dots: false,
}

const settingsVideo = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      rows: videoTestimonial && videoTestimonial.length<6?2:3,
      slidesPerRow: 1,

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
            slidesToShow: 1,
          }
        }
      ],
      dots: false,
}

const getAllTemoignagesASC =async()=>{
    const requestOptions = {
        method: 'GET',
      };
    const data = await fetch(apiURL+"/temoignage/getallASC",requestOptions);
    console.log("dataaaaa",data);
    const dataJson = await data.json();
    setTemoignage(dataJson)
}

const getAllTemoignagesDESC =async(page, filter)=>{
    let formdata =new FormData()
    formdata.append('page',page)
    formdata.append('nbparpage',6)
    formdata.append('type',filter)
    const requestOptions = {
        method: 'POST',
        body: formdata
      };
    const data = await fetch(apiURL+"/temoignage/getall",requestOptions);
    console.log("dataaaaa",data);
    const dataJson = await data.json();
    console.log("dataaaaaa",dataJson);
    setTemoignage(dataJson)
}

const getVideoTestimonialASC =async()=>{
        
        const requestOptions = {
            method: 'GET',
        };        
        const data = await fetch(apiURL+"/videotemoignage/getallASC", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setVideoTestimonial(dataJson);   
            console.log(videoTestimonial, "mes");                  
        }
    }

const getVideoTestimonialDESC =async(page, filter)=>{
        
    let formdata =new FormData()
    formdata.append('page',page)
    formdata.append('nbparpage',6)
    formdata.append('type',filter)
    const requestOptions = {
        method: 'POST',
        body: formdata
      };        
        const data = await fetch(apiURL+"/videotemoignage/getall", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setVideoTestimonial(dataJson);   
                              
        }
    }

const getImageTestimonialByid = async(el)=>{
       
        const requestOptions = {
            method: 'GET',
        };        
        const data = await fetch(apiURL+"/phototemoignage/getall/"+el.id, requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            console.log("dataJson",dataJson);
            setImageTestimonial(dataJson);   
            setTitleTestimonial(el.titre)
            setDescriptionTestimonial(el.description)
            setModalPhotoTemoignageContext(el)
            setVisibleImage(true)         
        }
    }

const getVideo = (video) =>{
    setUniqueVideo(video)
    setVisible(true)    
}

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

    const settingsImage = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: 0,
        slidesToShow: 1,
        speed: 500,
        appendDots: dots => (
            <div>
              <ul style={{ margin: "0px", padding: "0px" }}> 
              <li>
              {/* <button>"20"</button> */}
               {/* onClick={prevClick}  onClick={nextClick}*/}
                <div className="dots-arrow dots-prev" onClick={previousModal} >
                    <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                </div>
              </li>
                {dots} 
              <li>
                <div className="dots-arrow dots-next" onClick={nextModal} >
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
        // nextArrow: <NextImageArrow />,
        // prevArrow: <PrevImageArrow />
        };

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
            <Slider {...settingsImage} ref={slider => (sliderRefModal.current = slider)}>
                {imageTestimonial && imageTestimonial.map((el)=>(   
                    <div>
                    <center>
                        <Image src={el.data} className="img-preview"/>
                    </center>
                    <div className={props.auth.lang+"_media-modal-flex"}>
                {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{ModalPhotoTemoignageContext &&ModalPhotoTemoignageContext.titre}</h2>:
                <h2 className={props.auth.lang+"_modal-title"}>{ModalPhotoTemoignageContext&&ModalPhotoTemoignageContext.titrear}</h2>}
            </div>   
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{ModalPhotoTemoignageContext&&ModalPhotoTemoignageContext.description}</p>:
                <p className={props.auth.lang+"_modal-content"}>{ModalPhotoTemoignageContext&&ModalPhotoTemoignageContext.descriptionar}</p>}
            </div>  
                     
                ))}             
            </Slider> 
            
            </div>
            </Modal>
            <Modal                
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                destroyOnClose={true}                
            >
            <div className="modal-container">
                <div class="video-container">
                <YouTube videoId={uniqueVideo && uniqueVideo.path.substr(32,11)} opts={opts} onReady={onReady} />
                    {/* <ReactPlayer className="youtube-video" url={uniqueVideo && uniqueVideo.path} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/> */}
                </div>
                <div className={props.auth.lang+"_media-modal-flex"}>
                    {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titre}</h2>
                    :<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titrear}</h2>}
                </div>    
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.date}</p>
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.description}</p>
            </div>
            </Modal>
            {/* Testimonial Image-Text */}
            <section className="slider-testimonial-section">
                <h1 className={props.auth.lang+"_testimonial-title"}>{getLanguage(props).testimonialTitle}</h1>
                <div className="testimonial-slider-shadow"></div>
            </section>
            {/* Testimonial Text */}
            <section className="testimonial-text-section">
                <p className={props.auth.lang+"_testimonial-text"}>{getLanguage(props).testimonialText}</p>
            </section>            
            <section className={props.auth.lang+"_projection-content-header"}>
                    <div className={props.auth.lang+"_projection-content-header-left"}>
                        <span className="projection-title-decoration"></span>
                        <h2 className={props.auth.lang+"_projection-activity-title"}>{getLanguage(props).activityTitle}</h2>
                    </div>
                    <div className="projection-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getAllTemoignagesDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllTemoignagesDESC(0,"DESC")} /></div>
                    </div>
            </section>            
            <section className="projection-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settingsGallery}>
                   {Temoignage && Temoignage.length !==0 ? Temoignage.map((el)=>(
                        <div className="projection-activity-card" onClick={() => getImageTestimonialByid(el)} >                                       
                        <div className="img-container">                     
                           
                  <img  src={apiURL+"/phototemoignage/getall/"+el['id']+"/thumb.jpg"} height={'100%'} />                        
                            <div className={props.auth.lang+"_projection-activity-card-banner"} style={{backgroundColor: "#FECC17"}}>
                                <span className={props.auth.lang+"_projection-activity-date"}>
                                {getCurrentLocalDate(props,el.date)}
                                </span>
                                {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_projection-activity-card-title"}>{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}</h3>:<h3 className={props.auth.lang+"_projection-activity-card-title"}>{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}</h3>}                           
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
            <section className={props.auth.lang+"_testimonial-content-header"} style={{paddingTop: 90}}>
                    <div className={props.auth.lang+"_testimonial-content-header-left"}>
                        <span className="testimonial-title-decoration"></span>
                        <h2 className={props.auth.lang+"_testimonial-activity-title"}>{getLanguage(props).activityTitleVideo}</h2>
                    </div>
                    <div className="projection-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getVideoTestimonialDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getVideoTestimonialDESC(0,"DESC")} /></div>
                    </div>
                </section>
            <section className="testimonial-slider-section">
                <Slider ref={slider => (sliderRefVideo.current = slider)} {...settingsVideo}>        
                {videoTestimonial && videoTestimonial.length !==0 ? videoTestimonial.map((el)=>(                            
                    <div className="testimonial-activity-card">
                            <div className="img-container" onClick={() => getVideo(el)}>
                            <img src={player} className="video-player"/> 
                        
                        <img src={apiURL+"/videotemoignage/get/"+el['id']+"/thumb.jpg"} height={'100%'} />
                        <div className={props.auth.lang+"_testimonial-activity-card-banner"} style={{backgroundColor: "#FF9966"}}>
                            <span className="testimonial-activity-date">
                            {getCurrentLocalDate(props,el.date)} 
                            </span>
                            {props.auth.lang =='fr'?<h3 className={props.auth.lang+"_testimonial-activity-card-title"}>{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}</h3>:<h3 className={props.auth.lang+"_testimonial-activity-card-title"}>{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."} </h3> }
                            
                             <span className="testimonial-activity-description">{el.description}</span> 
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);