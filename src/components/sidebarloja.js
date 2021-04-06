import React, { useState } from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";


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
  const onClick = (itemId) =>{
    try{
      history.push(itemId);
    }catch(error){
      alert("ERRO",error)
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
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            Shopycash Loja - {localStorage.getItem("@loja")}
          </span>
        </div>

        <Navigation
            activeItemId={location.pathname}
            onSelect={(itemId)=> onClick(itemId)}
            items={[
              {
                title: 'Dashboard',
                itemId: '/store/'+localStorage.getItem("@slug")+'/dashboard',
                elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Categorias',
                itemId: '/store/'+localStorage.getItem("@slug")+'/cadastro',
                elemBefore: () => <Icon name="book" />,
              }
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
