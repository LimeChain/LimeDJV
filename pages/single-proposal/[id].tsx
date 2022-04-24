import React from "react";
import SideMenu from "../../components/Shared/SideMenu";
import Wrapper from "../../components/Shared/Wrapper";

const SingleProposal = () => {
  return (
    <>
      <SideMenu></SideMenu>
      <Wrapper>
        <div className="wrapper">
          <div className="owner">
            <div className="inner">
              <div className="label">Title</div>
              <div className="title">Transfer DAO ownership</div>
            </div>
            <div className="inner">
              <div className="label">By</div>
              <div className="title">
                0x44C9197CC8e9081d1d44F9e89fA77CD935ACE2aA
              </div>
            </div>
          </div>
          <div className="voters">
            <div className="inner">
              <div className="label">Partners</div>
              <div>
                <div className="title">
                  0x44C9197CC8e9081d1d44F9e89fA77CD935ACE2aA
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="inner">
              <div className="label">Description</div>
              <div>
                <div className="title">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  velit felis, accumsan nec commodo sed, ultrices sit amet
                  dolor. Etiam ac bibendum lorem. Nulla quis gravida dui. Duis
                  sed arcu a turpis congue facilisis a quis dui. Morbi ut massa
                  non tellus finibus varius et nec ligula. Nullam sit amet
                  ornare nisi, eu lobortis dui. Pellentesque erat nisl, cursus
                  eget porttitor non, consectetur id lacus. Aenean lacus ipsum,
                  facilisis quis nulla quis, consectetur faucibus turpis. Morbi
                  imperdiet orci eu turpis commodo finibus. Nam volutpat lacus
                  sit amet felis porta, nec aliquet felis elementum. Donec
                  faucibus quam eget pretium vulputate. Nam pellentesque aliquam
                  dui, non varius velit aliquet sed. Suspendisse mollis, ipsum
                  quis hendrerit cursus, arcu magna imperdiet nibh, in sagittis
                  neque eros at eros. Aliquam nibh dolor, aliquet ac sapien
                  scelerisque, iaculis iaculis velit. Mauris quis nunc ac elit
                  tempor vestibulum id eget lacus. Fusce mattis libero nec leo
                  porttitor aliquet. Aenean luctus sapien dolor, eget facilisis
                  ante finibus sed. Aliquam erat volutpat. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Suspendisse enim mi, imperdiet consectetur sodales
                  in, aliquet eget justo. Donec ut sodales quam, quis placerat
                  lectus. Nunc volutpat, odio vitae hendrerit molestie, felis ex
                  consequat sapien, in fringilla sapien urna sit amet felis.
                  Pellentesque mollis, nulla id convallis elementum, quam nisi
                  ullamcorper erat, non porta ipsum velit mattis eros. Fusce
                  eget rhoncus dolor. Mauris suscipit sodales justo. Cras id
                  lacus odio. Proin ultricies turpis a felis imperdiet egestas
                  id porttitor diam. Ut et urna rhoncus, aliquet lorem ut,
                  faucibus sem. Aenean volutpat laoreet mauris at sagittis.
                  Mauris mauris diam, aliquam ut molestie et, pellentesque eu
                  dui. Maecenas sodales est ac efficitur tincidunt. Nunc a est
                  ipsum. Suspendisse sagittis, massa nec imperdiet pretium, orci
                  dui sagittis justo, sed cursus orci sem quis massa. Donec
                  vestibulum erat nisi, a malesuada neque fringilla eget.
                  Curabitur dictum nisl at velit vehicula luctus. Integer
                  maximus vestibulum leo in volutpat. Suspendisse feugiat tempor
                  sollicitudin. Quisque gravida consectetur diam id ultricies.
                  In ut velit quis massa commodo ornare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <style jsx>{`
        .owner {
          height: 107px;
          background: #f1fffc;
          border-radius: 20px;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .voters {
          height: 107px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .description {
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .inner {
          display: flex;
          margin-left: 50px;
          line-height: 1.5;
        }
        .label {
          margin-right: 100px;
          font-weight: 600;
          font-size: 18px;
          color: #00e0b8;
          width: 40px;
        }
        .title {
          font-weight: 600;
          font-size: 16px;
          color: #59a99a;
        }
      `}</style>
    </>
  );
};

export default SingleProposal;
