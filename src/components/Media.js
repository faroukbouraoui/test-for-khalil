import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Empty, Image, Modal } from 'antd';
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import player from '../assets/img/video-player.png'
import laPresse from '../assets/img/media-la-presse.png'
import misk from '../assets/img/media-misk.png'
import {apiURL} from '../Config/Config'
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import YouTube from 'react-youtube';
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"

const Media = (props)=>{

    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleVideo, setVisibleVideo] = useState(false);
    const [uniqueVideo, setUniqueVideo] = useState(false);
    const [media, setMedia] = useState(false);
    const [videoMedia, setVideoMedia] = useState(false);
    const [imageMedia, setImageMedia] = useState(false);
    const [imageTitle, setImageTitle] = useState(false);
    const [imageSource, setImageSource] = useState(false);
    const [imageDescription, setImageDescription] = useState(false);
    const [imageDate, setImageDate] = useState(false);
    const [idVideo, setIdVideo] = useState()
    const [pageInit, setPageInit] = useState(0)
    const [newRm, setNewRm] = useState();
    const [rmContext, setRmContext] = useState()
    const [pageInitVideo, setPageInitVideo] = useState(0)
    const [newRmVideo, setNewRmVideo] = useState();
    const [filterImage, setFilterImage] = useState('ASC')
    const [filterVideo, setFilterVideo] = useState('ASC')

    useEffect(() => { 
        getAllMediaDESC(pageInit, filterImage)
        if(media !== newRm){
            setNewRm(media) 
        }
        getVideoMediaDESC(pageInitVideo, filterVideo)
        if(videoMedia !== newRmVideo){
            setNewRmVideo(videoMedia) 
        }
        window.scrollTo(0, 0)
    }, []);

    const sliderRef = useRef()
    const sliderRefVideo = useRef()
    
    const nextGallery = () => {
        getAllMediaDESC(pageInit+1, filterImage)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previousGallery = () => {
        setPageInit(pageInit-1)
        getAllMediaDESC(pageInit-1, filterImage)
    };

    const nextVideo = () => {
        getVideoMediaDESC(pageInitVideo+1, filterVideo)
        setPageInitVideo(pageInitVideo+1)
    };

    // Trigger previous method to show the previous slides
    const previousVideo = () => {
        setPageInitVideo(pageInitVideo-1)
        getVideoMediaDESC(pageInitVideo-1, filterVideo)
    };

    const getAllMediaASC =async()=>{
        const requestOptions = {
            method: 'GET',
        };
        const data = await fetch(apiURL+"/retombemediatique/getallASC", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setMedia(dataJson);            
        }
    }

    const getAllMediaDESC =async(page, filter)=>{
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type',filter)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };
        const data = await fetch(apiURL+"/retombemediatique/getall", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setMedia(dataJson);            
        }
    }

    const getVideoMediaASC =async()=>{
            const requestOptions = {
                method: 'GET',
            };        
            const data = await fetch(apiURL+"/videorm/getall", requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                setVideoMedia(dataJson);                            
            }
    }

    const getVideoMediaDESC =async(page, filterVideo)=>{
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type',filterVideo)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };       
            const data = await fetch(apiURL+"/videorm/getall", requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                setVideoMedia(dataJson);                            
            }
    }

    const getImageMediaByid = async(el)=>{
            
            const requestOptions = {
                method: 'GET',
            };        
            const data = await fetch(apiURL+"/photorm/getall/"+el.id, requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                
                setImageMedia(dataJson);   
                setImageTitle(el.title)
                setImageDescription(el.description)
                setImageSource(el.source)
                setImageDate(el.date)
                setRmContext(el)
                setVisibleImage(true)                 
            }
        }

    const getVideo = (video) =>{
      
        setUniqueVideo(video)
        setIdVideo(video.path.substr(32,11))
        setVisibleVideo(true)    
    }

    const settingsGallery = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 4,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
    
      responsive: [
          {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,   
            rows:1                 
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,                    
          }
        }
      ],
      dots: false
    };

    const settingsVideo = {
      className: "center",
      centerMode: false,
      infinite: false,      
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      rows: 2,
      slidesPerRow: 1,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
          {/* <button>"20"</button> */}
           {/* onClick={prevClick}  onClick={nextClick}*/}
            <div className="dots-arrow dots-prev" onClick={previousVideo}>
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
            {/* {prevClick({})} */}
          </li>
            {dots} 
          <li>
          {/* {nextClick({})} */}
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
            slidesToShow: 2,
            mobileFirst:true,
            autoPlay: true,
            rows: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            rows: 1
          }
        }
      ],
      dots: true
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

    const settingsImage = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,      
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,            
          }
        }
      ],
      dots: true,
      nextArrow: <NextImageArrow />,
      prevArrow: <PrevImageArrow />
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
console.log(imageSource,"asc");
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
            <Slider {...settingsImage}>
            {imageMedia && imageMedia.map((el, index)=>(                                 
                index!=0? 
                <div>    
                <center>                           
                    <Image src={el.data} className="img-preview"/>                    
                </center>
                </div>
                :null
            ))}            
            </Slider>    
            <div className={props.auth.lang+"_media-modal-flex"}>            
                {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{rmContext && rmContext.title}</h2> : 
                <h2 className={props.auth.lang+"_modal-title"}>{rmContext && rmContext.titlear}</h2>}
            </div>
            <p className={props.auth.lang+"_modal-content"}>{rmContext && rmContext.date}</p>
            {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{rmContext && rmContext.legende}</p> : <p className={props.auth.lang+"_modal-content"}>{rmContext && rmContext.legendear}</p>}
            <a className="media-source-button" disabled={imageSource==undefined} target="_blank" rel="noopener noreferrer" href={imageSource}>Source <ExportOutlined style={{paddingLeft:10}}/></a>

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
                
                <YouTube videoId={uniqueVideo && uniqueVideo.path.substr(32,11)} opts={opts} onReady={onReady} />
                    {/* <ReactPlayer className="youtube-video" url={uniqueVideo && uniqueVideo.path} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/> */}
                </div>
                <div className={props.auth.lang+"_media-modal-flex"}> 
                    {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titre}</h2>  :
                    <h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titrear}</h2>}
                </div>                        
                                                   
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.date}</p>
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.description}</p> : 
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.descriptionar}</p>}
            </div>
            </Modal>
            {/* Media Image-Text */}
            <section className="slider-media-section">
                <h1 className={props.auth.lang+"_media-title"}>{getLanguage(props).Media}</h1>                
            </section>
            {/* Media content */}
            <section className="media-content-section">
                <section className={props.auth.lang+"_media-content-header"}>
                    <div className={props.auth.lang+"_media-content-header-left"}>
                        <span className="media-title-decoration"></span>
                        <h2 className={props.auth.lang+"_media-activity-title"}>{getLanguage(props).Articles}</h2>
                    </div>
                    <div className="media-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllMediaDESC(0,"DESC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllMediaDESC(0, "ASC")} /></div>
                    </div>
                </section>
            </section>
                {/* Media Cards */}
                <section className="media-slider-section">
                    {/* <Row justify="center" gutter={[18, 18]}>                       */}
                        <Slider ref={slider => (sliderRef.current = slider)} {...settingsGallery} >
                        {media && media.length !==0 ? media.map((el)=>(
                        <div className="media-column" onClick={()=>getImageMediaByid(el)}>
                            <div className="card-img">
                                {/* <img src={el.photoRM.data} /> */}
                                <img src={apiURL+"/photorm/getall/"+el['id']+"/thumb.jpg"} height={'100%'}/> 
                            </div>
                            <div className="media-card-banner">
                                <div className={props.auth.lang+"_media-upper-text"} >
                                    {/* <Moment format="DD/MM/YYYY"> */}
                                        <span className="media-date">{getCurrentLocalDate(props,el.date)}</span>
                                    {/* </Moment> */}
                                    <span className="media-card-title">{el.author?.length <= 15 ? el.author: el.author.substring(0,15)+"..."}</span>
                                </div>
                                {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_media-card-article"}>{el.title?.length <= 15 ? el.title: el.title?.substring(0,15)+"..."}</h3> : <h3 className={props.auth.lang+"_media-card-article"}>{el.titlear?.length <= 15 ? el.titlear: el.titlear?.substring(0,15)+"..."}</h3>}
                            </div>
                        </div> 
                        )):<Empty />}   
                        </Slider>                     
                    {/* </Row> */}
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
                {/* Media videos */}
                <section className="media-content-section">
                <div className={props.auth.lang+"_media-content-header"}>
                    <div className={props.auth.lang+"_media-content-header-left"}>
                        <span className="media-title-decoration"></span>
                        <h2 className={props.auth.lang+"_media-activity-title"}>{getLanguage(props).Vidéos}</h2>
                    </div>
                    <div className="media-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getVideoMediaDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getVideoMediaDESC(0,"DESC")} /></div>
                    </div>
                </div>
                </section>
                {/* Videos section */}            
            <section className="media-slider-section">
                <Slider ref={slider => (sliderRefVideo.current = slider)} {...settingsVideo}>
                {videoMedia && videoMedia.length !==0 ? videoMedia.map((el)=>(
                    <div className="media-activity-card" onClick={() => getVideo(el)}>                                       
                    <div className="img-container">    
                    <img src={player} className="video-player"/>                  
                        {/* <img src={el.photo} height="64%" />                         */}
                        <img src={apiURL+"/videorm/get/"+el['id']+"/thumb.jpg"} height={'64%'}/> 
                        <div className="media-activity-card-banner" style={{backgroundColor: "#FF9966"}}>
                            <span className={props.auth.lang+"_media-activity-date"}>
                            {getCurrentLocalDate(props, el.date)}
                            </span>
                            { props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_media-activity-card-title"}>{el.titre?.length <= 25 ? el.titre: el.titre?.substring(0,25)+"..."}</h3> : <h3 className={props.auth.lang+"_media-activity-card-title"}>{el.titrear?.length <= 25 ? el.titrear: el.titrear?.substring(0,25)+"..."}</h3>   }                          
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Media);