import React from "react";

import { Sidebar } from "./sidebar";
import { SidebarLoja} from "./sidebarloja"
import BodyWrapper from "./BodyWraper";

export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden h-screen pt-10">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};

export const DashboardLoja = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex bg-gray-200">
        <SidebarLoja />

        <div className="flex flex-col flex-1 overflow-hidden pt-16">
          <main className="content">
            <section className="flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 1, flexBasis: "0%" }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};
