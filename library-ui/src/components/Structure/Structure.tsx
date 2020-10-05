import React from "react";
import { Layout } from "antd";
import Toolbar from "../Toolbar/Toolbar";

const { Header, Content, Footer } = Layout;
interface Props {
  children: React.ReactNode;
}

const Structure: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <Header>
        <Toolbar />
      </Header>
      <Content style={{ margin: "0 auto", width: "85%" }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <hr />
        Library Vulnerability Detection System @ Chris Wilson 2020
      </Footer>
    </React.Fragment>
  );
};

export default Structure;
