/* eslint-disable no-unused-vars */
import { Outlet, useLocation } from "react-router-dom";
import AsideLayout from "./AsideLayout";
import { useEffect, useRef, useState } from "react";
import SideProfile from "@/components/fragments/admin/SideProfile";
import { setDataDeleteMany, setDataEdit } from "@/store/slices/admin-slice";
import { useDispatch, useSelector } from "react-redux";
import ButtonScrollTop from "@/components/elements/ButtonScrollTop";
import HeaderAdminLayout from "./admin/HeaderAdminLayout";
import { selectedUserData } from "@/store/slices/auth-slice";
import HeaderGuruLayout from "./guru/HeaderGuruLayout";
import HeaderSiswaLayout from "./siswa/HeaderSiswaLayout";

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const userData = useSelector(selectedUserData);
  const [isEdit, setIsEdit] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const editProfileRef = useRef();
  const sidebarRef = useRef();
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const handleToggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        editProfileRef.current &&
        !editProfileRef.current.contains(e.target)
      ) {
        setIsEdit(false);
      }
    };

    if (isEdit) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isEdit]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebar(false);
      }
    };

    if (isSidebar) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isSidebar]);

  useEffect(() => {
    if (pathname) {
      dispatch(setDataDeleteMany([]));

      setIsSidebar(false);
    }
  }, [pathname, dispatch]);

  return (
    <main className="w-screen overflow-hidden h-screen flex ">
      <aside
        ref={sidebarRef}
        className={`${
          isSidebar ? "left-0 " : "-left-[300px] lg:left-0"
        } lg:block bg-neutral z-50 fixed lg:static py-5 shadow-sm boder-r border-gray-500 -hidden w-[230px] lg:w-[220px] min-h-screen transition-all duration-300`}
      >
        <AsideLayout setIsSidebar={setIsSidebar} />
      </aside>

      <div className="flex  flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex flex-col flex-1 overflow-auto"
        >
          {userData && userData.role === "admin" && (
            <HeaderAdminLayout
              setIsEdit={setIsEdit}
              handleToggleSidebar={handleToggleSidebar}
            />
          )}

          {userData && userData.role === "guru" && (
            <HeaderGuruLayout handleToggleSidebar={handleToggleSidebar} />
          )}
          {userData && userData.role === "siswa" && (
            <HeaderSiswaLayout handleToggleSidebar={handleToggleSidebar} />
          )}
          <Outlet />
          {isEdit && (
            <SideProfile ref={editProfileRef} handleClose={handleCloseEdit} />
          )}
        </div>
      </div>
      <ButtonScrollTop scrollContainerRef={scrollContainerRef} />
    </main>
  );
};

export default MainLayout;
