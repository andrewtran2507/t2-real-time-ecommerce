import { ReactNode } from "react";


interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div>
      <div className="vh-100 px-2">{children}</div>
    </div>
  );
};

export default MainLayout;
