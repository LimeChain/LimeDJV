import Link from "next/link";
import React from "react";

const SideMenu = ({ }) => {
  return (
    <>
     <nav>
          <Link href="/">
            <a className="margin-top margin-bottom">
                <img src="/svgs/arrow.svg" />
            </a>
          </Link>
          <Link href="/">
            <a className="margin-top margin-bottom">
                <img src="/svgs/home.svg" />
            </a>
          </Link>
          <Link href="/my-ventures">
            <a className="margin-top margin-bottom">
                <img src="/svgs/category.svg" />
            </a>
          </Link>
          {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}
        </nav>
      <style jsx>{`
        nav {
            height: 100%;
            display: flex;
            float: left;
            flex-direction: column;
            align-items: center;
            width: 100px;
            z-index: 1;
            top: 0;
            left: 0;
            overflow-x: hidden;
            padding-top: 20px;
            background: #FAF9FF;
            margin-right: 60px;
        }
      `}</style>
    </>
  );
};

export default SideMenu;