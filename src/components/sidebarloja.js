import React, { useState } from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import { MdDashboard, MdSettings,MdFolder } from 'react-icons/md';
import { BsPencilSquare,BsTagFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { BiMenu } from "react-icons/bi";




export const SidebarLoja = () => {
    const history = useHistory();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logout = () => {
      try {
        localStorage.clear();
        history.push("/");
      } catch (error) {
        
      }
  }
  
    return (

        <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "ease-out translate-x-0 block" : "ease-in -translate-x-full hidden"
        }`}
      />
    
      <div className="absolute top-0 w-full z-50">
      <AppBar position="static" >
        <Toolbar >
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <BiMenu  onClick={() => {if(isSidebarOpen=== false){
            setIsSidebarOpen(true)
          }else{
            setIsSidebarOpen(false)
          }}} />
          </IconButton>
          <span variant="h6" >
            Shopy Cash - Usuario Logado: {localStorage.getItem("@nome")} - {localStorage.getItem("@email")}
          </span>
        </Toolbar>
      </AppBar>

        </div>
        {/* Sidebar */}
        <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0 block" : "ease-in -translate-x-full hidden"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="text-lg font-semibold text-black pt-12">
            Shopycash Loja - {localStorage.getItem("@loja")}
          </span>
        </div>

        <Navigation
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
              history.push(itemId)
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/store/'+localStorage.getItem("@slug")+'/dashboard',
                elemBefore: () => <MdDashboard />,
              },
              {
                title: 'Cadastros',
                itemId: '/store/'+localStorage.getItem("@slug")+'/cadastros',
                elemBefore: () => <BsPencilSquare />,
                subNav: [
                  {
                    title: "Produtos",
                    itemId: '/store/'+localStorage.getItem("@slug")+'/produtos',
                    
                    elemBefore: () => <BsTagFill />
                  },
                  {
                    title: "Categorias",
                    itemId: '/store/'+localStorage.getItem("@slug")+'/categoria',
                    elemBefore: () => <MdFolder />
                  }
                ]
              },
              {
                title: 'Pedidos',
                itemId: '/store/'+localStorage.getItem("@slug")+'/pedidos',
                elemBefore: () => <FaFileInvoiceDollar />,
              }, 
              {
                title: 'Configurações',
                itemId: '/store/'+localStorage.getItem("@slug")+'/configuracoes',
                elemBefore: () => <MdSettings />,
              },                                                                                                                                                             
            ]}
          />

      <div className="relative bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Sair",
                itemId: "/",
                elemBefore: () => <FiLogOut />
              }
            ]}
            onSelect={logout}
          />
        </div>
      </div>
    </React.Fragment>
      
    );

    
};
