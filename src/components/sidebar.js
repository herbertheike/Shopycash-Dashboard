import React, { useState } from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { BiMenu } from "react-icons/bi";


export const Sidebar = () => {
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
          isSidebarOpen ? "block" : "hidden"
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
        <span className="mx-2 text-2xl font-semibold text-black">
            Shopycash Administrativo
          </span>
        </div>

        <Navigation
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/administrativo/dashboard',
                elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Cadastro',
                itemId: '/administrativo/cadastro',
                elemBefore: () => <Icon name="book" />,
              },
              {
                title: 'Usuarios',
                itemId: '/administrativo/usuarios',
                elemBefore: () => <Icon name="users" />,
              },
            ]}
          />

      <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Sair",
                itemId: "/",
                elemBefore: () => <Icon name="log-out" />
              }
            ]}
            onSelect={logout}
          />
        </div>
      </div>
    </React.Fragment>
      
    );

    
};
