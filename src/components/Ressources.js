import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Empty, Modal, Image } from 'antd';
import { Link } from 'react-router-dom'
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../Config/Config";
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"

const Ressources = (props)=>{
    const [otherRessource, setOtherRessource] = useState();
    const [uniqueRessource,setUniqueRessource] = useState()
    const [visible, setVisible] = useState(false);
    const [pageInit, setPageInit] = useState(0)
    const [newRessource, setnewRessource] = useState();
    const [Images, setImages] = useState()
    const [source, setSource] = useState()
    const [filter, setFilter] = useState('ASC')
    useEffect(() => { 
        getOtherRessourceAsc(pageInit, filter)
        window.scrollTo(0, 0)
        if(otherRessource !== newRessource){
            setnewRessource(otherRessource)
            
        }
    }, []);
    const sliderRef = useRef()
    
    const next = () => {
        getOtherRessourceAsc(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1)
        getOtherRessourceAsc(pageInit-1, filter)
        
    };


    
    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        slidesToShow: 1,
        speed: 500,
        slidesToShow: 3,
        rows: otherRessource && otherRessource.length<6?2:3,
        slidesPerRow: 1,
        responsive: [
            {
        breakpoint: 991,
        settings: {
            slidesToShow: 2,   
            rows: 1,         
        }
        },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              rows: 1,
            }
          }
        ],
        dots: false,
      };
    const getOtherRessourceAsc =async(page, filter)=>{
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type',filter)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };
        const data = await fetch(apiURL+'/or/getall', requestOptions)
        const dataJson = await data.json();
        if(data.status == 200){
            setOtherRessource(dataJson)
        }
    }
    const getOtherRessourceDesc =async()=>{
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+'/or/getallDESC', requestOptions)
        const dataJson = await data.json();
        if(data.status == 200){
            setOtherRessource(dataJson)
        }
    }

    const showModal =(el)=>{
        setVisible(true)
        setUniqueRessource(el)
        getImage(el.id)
        setSource(el.link)
         console.log(el,"el");
    }
    const getImage = async(id)=>{
        try {
            const requestOptions = {
                method: 'GET',
              };
            const data = await fetch(apiURL+"/or/get/"+id+"/full.jpg",requestOptions);
            if(data.status == 200){
                const dataJson = await data.json();
                setImages(dataJson)
            } 
          } catch (error) {
            console.log(error);
          }
        
    }

    return(
        <>
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
                
            >
            <div className="modal-container">
            <center>
            <Image src={Images && Images != undefined ? Images : null} height={'100%'}className="img-preview"/>
            </center>
                <div className={props.auth.lang+"_media-modal-flex"}> 
                    {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>
                        {uniqueRessource && uniqueRessource.titre}
                    </h2>: <h2 className={props.auth.lang+"_modal-title"}>
                        {uniqueRessource && uniqueRessource.titrear}
                    </h2>}
                </div> 
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueRessource && uniqueRessource.description}</p>:
                <p className={props.auth.lang+"_modal-content"}>{uniqueRessource && uniqueRessource.descriptionar}</p>}               
                <a className="media-source-button" disabled={source==undefined} target="_blank" rel="noopener noreferrer" href={source}>Source <ExportOutlined style={{paddingLeft:10}}/></a>
               
            </div>
        </Modal>
            {/* Ressources Image-Text */}
            <section className={props.auth.lang+"_slider-ressources-section"}>
                <h1 className={props.auth.lang+"_ressources-title"}> {getLanguage(props).Autres} <br />{getLanguage(props).ressources}</h1>
                <div className="ressources-slider-shadow"></div>
            </section>
            <section className="ressources-text-section">
                <p className={props.auth.lang+"_ressources-text"}>{getLanguage(props).ressourcesText}</p>
            </section>
            <section className="ressource-content-section">
                <div className="ressource-content-header">
                    <div className="ressource-content-header-left">
                        <span className="ressource-title-decoration"></span>
                        <h2 className={props.auth.lang+"_ressource-activity-title"}>{getLanguage(props).Galerie}</h2>
                    </div>
                    <div className="ressource-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getOtherRessourceAsc(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getOtherRessourceAsc(0,"DESC")} /></div>
                    </div>
                </div>
            </section>
            <section className="ressource-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                    {otherRessource && otherRessource.length !==0 ? otherRessource.map((el)=>(
                    <div className="ressource-activity-card" onClick={()=>showModal(el)}>
                    <div className="img-container">
                        {/* <img src={el.data} height="100%" /> */}
                        <img src={apiURL+"/or/get/"+el['id']+"/thumb.jpg"} height={'100%'}/>  
                        <div className="ressource-activity-card-banner" style={{backgroundColor: "#FECC17"}}>                            
                            <h3 className="ressource-activity-card-title">{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}</h3>                            
                        </div>
                        </div>
                    </div>
                    )):<Empty />}
                    

                </Slider>
                <div className='slick-dots'>
                    <ul style={{ margin: "0px", padding: "0px" }}> 
                        <li>
                            <div className="dots-arrow dots-prev" onClick={previous} >
                                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                            </div>
                        </li>
                        <li className="point-pagination_react_slick"></li>
                        <li>
                            <div className="dots-arrow dots-next" onClick={next} >
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Ressources);