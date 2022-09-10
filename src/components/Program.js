import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Empty, Modal, Image } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { apiURL } from "../Config/Config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moment from 'react-moment';
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"


const Program = (props)=>{
    
    const [programs, setPrograms] = useState([]);
    const [visible, setVisible] = useState(false);
    const [uniqueProgramm, setUniqueProgramm] = useState()
    const [pageInit, setPageInit] = useState(0)
    const [newProgramm, setNewProgramm] = useState();
    const [Images, setImages] = useState();
    const [filter, setFilter] = useState('ASC')

    useEffect(() => { 
        getAllProgramsDESC(pageInit, filter)
        if(programs !== newProgramm){
            setNewProgramm(programs) 
        }
        window.scrollTo(0, 0)
    }, []);    

    const sliderRef = useRef()
    
    const next = () => {
        getAllProgramsDESC(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1)
        getAllProgramsDESC(pageInit-1, filter)
    };

    const getAllProgramsASC = async () => {
        // setPrograms(['null'])
        const requestOptions = {
        method: 'GET',
      };
        const data = await fetch(apiURL+"/programme/getall",requestOptions);
        console.log("dataaaaa",data);
        const dataJson = await data.json();
        setPrograms(dataJson)
        
    }
    
    const getAllProgramsDESC = async (page, filter) => {
        let formdata =new FormData()
      formdata.append('page',page)
      formdata.append('nbparpage',9)
      formdata.append('type',filter)
      const requestOptions = {
          method: 'POST',
          body: formdata
        };
        const data = await fetch(apiURL+"/programme/getall",requestOptions);
       
        const dataJson = await data.json();
        setPrograms(dataJson)
        console.log("dataJson",dataJson);
    }
    const showModal =(el)=>{
        
        setVisible(true)
        setUniqueProgramm(el)
        getImage(el.id)
       
    }

    const programBanner = (program) => {
        var color = ""
        if(program.categorie == "Atelier Fresque"){
            color = "#E52E3B";
        }
        else if(program.categorie == "Interviews"){
            color = "#EF7C43";
        }
        else if(program.categorie == "Tournée"){
            color = "#FECC17";
        }
        else if(program.categorie == "Fonds d’archives"){
            color = "#99CC66";
        }
        else if(program.categorie == "Plaidoyer"){
            color = "#27213C";
        }else{
            color="black"
        }
        console.log(program,'test');
        return(
                        <div className="img-container">
                       
                        <img src={apiURL+"/programme/get/"+program['id']+"/thumb.jpg"} height={'100%'} /> 
                            <div className="program-activity-card-banner" style={{backgroundColor: color}}>
                                <span className={props.auth.lang+"_program-activity-date"}>
                                    {getCurrentLocalDate(props, program.date)}
                                </span>
                                {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_program-activity-card-title"}>{program.title.length <= 25? program.title: program.title.substring(0,25)+"..."}</h3> : 
                                <h3 className={props.auth.lang+"_program-activity-card-title"}>{program.titlear.length <= 25? program.titlear: program.titlear.substring(0,25)+"..."}</h3>}
                                <span className={props.auth.lang+"_program-activity-description"}>{program.categorie.length <= 25? program.categorie: program.categorie.substring(0,25)+"..."}</span>
                            </div>
                        </div>
        )    
    }

    const settings = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      initialSlide: 0,
      rows: programs && programs.length<9?2:3,
      slidesPerRow: 1,
    
      responsive: [
          {
          breakpoint: 991,
          settings: {
            mobileFirst: true,
            slidesToShow: 2,
            initialSlide: 0,
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
      dots: false,
    //   appendDots: dots => (
    //     <div>
    //         <ul> 
    //             <img className="program-arrow-size" src={leftarrow} onClick={ProgramPrevArrow()}/>
    //             {dots} 
    //             <img className="program-arrow-size" src={rightarrow} onClick={ProgramNextArrow()}/>
    //         </ul>
    //     </div>
    //   ),
    //   nextArrow: <ProgramNextArrow />,
    //   prevArrow: <ProgramPrevArrow />
    };
    const getImage = async(id)=>{
        try {
            const requestOptions = {
                method: 'GET',
              };
            const data = await fetch(apiURL+"/programme/get/"+id+"/full.jpg",requestOptions);
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
            <Image src={Images && Images != undefined ? Images : null} height={'100%'} className="img-preview" />
            </center>
                <div className={props.auth.lang+"_media-modal-flex"}> 
                    {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>
                        {uniqueProgramm && uniqueProgramm.title}
                    </h2> : <h2 className={props.auth.lang+"_modal-title"}>
                        {uniqueProgramm && uniqueProgramm.titlear}
                    </h2>}
                    
                    {/* <a className="media-source-button" disabled={imageSource==undefined} target="_blank" rel="noopener noreferrer" href={imageSource}>Source <ExportOutlined style={{paddingLeft:10}}/></a> */}
                </div> 
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueProgramm && uniqueProgramm.description}</p> : <p className={props.auth.lang+"_modal-content"}>{uniqueProgramm && uniqueProgramm.descriptionar}</p>}               
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueProgramm && uniqueProgramm.adresse}</p> : <p className={props.auth.lang+"_modal-content"}>{uniqueProgramm && uniqueProgramm.adressear}</p> }               
            </div>
        </Modal>
            {/* Program Image-Text */}
            <section className="slider-program-section">
                <h1 className={props.auth.lang+"_program-title"}>{getLanguage(props).Programme}</h1>
                <p className={props.auth.lang+"_program-description"}>{getLanguage(props).ProgrammeText1}
                </p>
                <p className={props.auth.lang+"_program-description"}>{getLanguage(props).ProgrammeText2}
                </p>
            </section>
            {/* Program content */}
            <section className="program-content-section">
                <div className={props.auth.lang+"_program-content-header"}>
                    <div className={props.auth.lang+"_program-content-header-left"}>
                        <span className="program-title-decoration"></span>
                        <h2 className={props.auth.lang+"_program-activity-title"}>{getLanguage(props).Activités}</h2>
                    </div>
                    <div className="program-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllProgramsDESC(0, "ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllProgramsDESC(0,"DESC")} /></div>
                    </div>
                </div>
            </section>
            <section className="program-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>    
                {programs.length>0 && programs.length !==0 ? programs.map((el)=>(            
                    <div className="program-activity-card" onClick={()=>showModal(el)}>     
                        {programBanner(el)}
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Program);