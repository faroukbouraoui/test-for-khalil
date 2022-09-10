import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Menu, Button, Drawer, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/img/Logo-26 1.png'
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
// import { RightOutlined } from '@ant-design/icons';
import getLanguage from "./utilFunction/language"


const { SubMenu } = Menu;

const Header = (props)=>{
    
    const location = useLocation();
    
    const [isVisible, setVisible] = useState(false);
    const [lang, setLang] = useState('fr');
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);

    const showDrawer = (id) => {
        setVisible(true)        
    };
    const onClose=()=>{
        setVisible(false);
    }

    const goToArchive = () =>{
        if(props.auth.lang == 'ar'){
            setTimeout(() => {
                window.location="/archive"
            }, 100);
            const action = {type:'SET_CURRENT_USER', lang:'ar'}
            props.dispatch(action);
        }
        if(props.auth.lang == 'fr'){
            setTimeout(() => {
                window.location="/archive"
            }, 100);
           
            const action = {type:'SET_CURRENT_USER', lang:'fr'}
            props.dispatch(action);
        }
        
        
    }
    // const  langSelect=()=>{
        
    //     return (
    //    <Menu onClick={(key)=>handleLangClick(key)} >
    //        <Menu.Item key="fr">
    //           Français
    //        </Menu.Item>
    //        <Menu.Item key="ar">
    //          Arabe
    //        </Menu.Item>
    //    </Menu>
    //  );
    // }

   
    console.log("lannnnnnbng",getLanguage(props));
    const handleLangClick = (e) => {
        console.log('testo', e);
        if(e == "ar"){
            e = "fr"
        }
        else{
            e = "ar"
        }
        setLang(e)
        // this.setState({ lang: e.key });
        const action = {type:'SET_CURRENT_USER', lang:e}
        props.dispatch(action);
      } 
    const returnLang =()=>{
        if(props.auth.lang == 'fr'){
          return <span>العربية</span>
        }
        if(props.auth.lang =='ar'){
          return <span>Français</span>
        }
      }

    const menuMobile = () => {
  return (
    <>
      <Button type="link" className={props.auth.lang+"_mobileVisible"} onClick={showDrawer} icon={<MenuOutlined style={{color:"#27213C"}}/>} />
      
      <Drawer
        title="Menu"
        placement={props.auth.lang == 'fr'? "right" : "left"}
        width="70%"
        closable={false}
        onClose={onClose}
        visible={isVisible}
      >
      {/* {location.pathname} */}
        <Menu mode="inline" onClick={onClose} selectedKeys={[location.pathname]}> 
            <Menu.Item className="" key="/presentation">
                            <Link to="/presentation" className="">
                            {getLanguage(props).Présentation}
                            </Link>
                            </Menu.Item>
                            
                            <SubMenu title={getLanguage(props).Activités} className="" style={{padding:0}}>
                                <Menu.ItemGroup>
                                    <Menu.Item key="/projection"><Link to="/projection" className="">{getLanguage(props).ProjectionsDébats}</Link></Menu.Item>
                                    <Menu.Item key="/testimonial"><Link to="/testimonial" className="">{getLanguage(props).Témoignages}</Link></Menu.Item>
                                    <Menu.Item key="/plaidoyer"><Link to="/plaidoyer" className="">{getLanguage(props).Plaidoyer}</Link></Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <Menu.Item key="/program" className="">
                                <Link to="/program" className="">
                                {getLanguage(props).Programme}
                                </Link>
                            </Menu.Item>
                           
                            <SubMenu title={getLanguage(props).Archive} className="">
                                <Menu.ItemGroup>
                                    <Menu.Item key="/archive"><Link to="/archive" className="">{getLanguage(props).Archive}</Link></Menu.Item>
                                    <Menu.Item key="/archive/article"><Link to="/archive/article" className="">{getLanguage(props).Articles}</Link></Menu.Item>
                                    <Menu.Item key="/photos"><Link to="/photos" className=""> {getLanguage(props).Photos}</Link></Menu.Item>
                                    <Menu.Item key="/brochures"><Link to="/brochures" className=""> {getLanguage(props).BrochuresCommuniqués}</Link></Menu.Item>
                                    <Menu.Item key="/videos"><Link to="/videos" className=""> {getLanguage(props).Vidéos}</Link></Menu.Item>
                                    <Menu.Item key="/rapports"><Link to="/rapports" className="">{getLanguage(props).RapportsPublications}</Link></Menu.Item>
                                    <Menu.Item key="/ressources"><Link to="/ressources" className="">{getLanguage(props).AutresRessources}</Link></Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>                                                                          
                                                        
                            <Menu.Item key="/media" className="">
                                <Link to="/media" className="">
                                     {getLanguage(props).Médias}
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/contact" className="">
                                <Link to="/contact" className="">
                                 {getLanguage(props).Contribuer}
                                </Link>
                            </Menu.Item>
                            <SubMenu title='FR' key="/er" className="">
                                <Menu.ItemGroup>
                                    <Menu.Item key="/k"><Link to="/" className="">AR</Link></Menu.Item>                                    
                                </Menu.ItemGroup>
                            </SubMenu>
        </Menu>
      </Drawer>
    </>
  );
};

    return(

        <>
            <div>
                <Row align="middle" className={props.auth.lang+"_header"}>
                    <div className={props.auth.lang+"_left-header-flex"}>
                        <div>
                            <Link to="/">
                                <img src={logo} className={props.auth.lang+"_logo"}/>
                            </Link>
                        </div>
                        <div className={props.auth.lang+"_left-header-vertical-line"}>
                        </div>
                        <div>
                            <span className={props.auth.lang+"_left-header-text"}>{getLanguage(props).Mansinech_26_janvier}</span>
                        </div>
                    </div>
                    <div>  
                    {menuMobile()}              
                        <Menu mode="horizontal" className={props.auth.lang+"_menu mobileHidden"} selectedKeys={[location.pathname]}>                                           
                            <Menu.Item className={props.auth.lang+"_menu-item"} key="/presentation">
                            <Link to="/presentation" className={props.auth.lang+"_menu-item-links"} className={props.auth.lang+"_menu-item-links"}>
                            {getLanguage(props).Présentation}
                            </Link>
                            </Menu.Item>
                            
                            <SubMenu title={getLanguage(props).Activités} className={props.auth.lang+"_submenu-item"} icon={<DownOutlined />}>
                                <Menu.ItemGroup>
                                    <Menu.Item key="/projection"><Link to="/projection" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).ProjectionsDébats}</Link></Menu.Item>
                                    <Menu.Item key="/testimonial"><Link to="/testimonial" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).Témoignages}</Link></Menu.Item>
                                    <Menu.Item key="/plaidoyer"><Link to="/plaidoyer" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).Plaidoyer}</Link></Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>                                                                                              
                            
                            <Menu.Item key="/program" className={props.auth.lang+"_menu-item"}>
                                <Link to="/program" className={props.auth.lang+"_menu-item-links"}>
                                {getLanguage(props).Programme}
                                </Link>
                            </Menu.Item>
                            <SubMenu title={getLanguage(props).Archive} onTitleClick={goToArchive} className={props.auth.lang+"_submenu-item"} icon={<DownOutlined />}>
                            
                                <Menu.ItemGroup>
                                    {/* <Menu.Item key="/archive"><Link to="/archive" className="menu-item-links">Archive</Link></Menu.Item> */}
                                    <Menu.Item key="/archive/article"><Link to="/archive/article" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).Articles}</Link></Menu.Item>
                                    <Menu.Item key="/photos"><Link to="/photos" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).Photos}</Link></Menu.Item>
                                    <Menu.Item key="/brochures"><Link to="/brochures" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).BrochuresCommuniqués}</Link></Menu.Item>
                                    <Menu.Item key="/videos"><Link to="/videos" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).Vidéos}</Link></Menu.Item>
                                    <Menu.Item key="/rapports"><Link to="/rapports" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).RapportsPublications}</Link></Menu.Item>
                                    <Menu.Item key="/ressources"><Link to="/ressources" className={props.auth.lang+"_menu-item-links"}>{getLanguage(props).AutresRessources}</Link></Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>        
                            <Menu.Item key="/media" className={props.auth.lang+"_menu-item"}>
                                <Link to="/media" className={props.auth.lang+"_menu-item-links"}>
                                {getLanguage(props).Médias}
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/contact" className={props.auth.lang+"_menu-item"+ ' '+props.auth.lang+"_temoigne-menu-item"}>
                                <Link to="/contact" className={props.auth.lang+"_menu-item-links"}>
                                {getLanguage(props).Contribuer}
                                </Link>
                            </Menu.Item>
                             {/* <SubMenu title='FR' key="/er" className="submenu-item submenu-item-language" icon={<DownOutlined />}>
                                <Menu.ItemGroup>
                                    <Menu.Item key="/k"><Link to="/" className="menu-item-links">AR</Link></Menu.Item>                                    
                                </Menu.ItemGroup>
                               
                            </SubMenu>  */}
                        <Menu.Item className={props.auth.lang+'_submenu-item'+ ' '+props.auth.lang+'_submenu-item-language'} >
                            {/* <Dropdown overlay={langSelect()}>
                                <Button  className={props.auth.lang+"_language-btn-style"} style={{backgroundColor:"#D7D5D5"}}>
                                    
                                    <span>{returnLang()}</span>
                                </Button>
                            </Dropdown> */}
                            <Link onClick={(e)=>handleLangClick(props.auth.lang)}  className={props.auth.lang+"_language-btn-style"} style={{backgroundColor:"#D7D5D5"}}>
                                {returnLang()}
                                {/* {props.auth.lang} */}
                            </Link>
                            {/* {handleLangClick()}
                            {getLanguage(props).Contribuer} */}
                            </Menu.Item>

                        </Menu>
                            
                    </div>
                </Row>
            </div>
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Header);