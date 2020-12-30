import React from "react";

import { Sidebar } from "./sidebar";
import BodyWrapper from "./BodyWraper";

export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
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
