import React from "react";
import useScreenSize from "../../../hooks/useScreenResize";
import Card from "../components/Card";
import CompanyStats from "../components/CompanyStats";
import Container from "../components/Container";

const Home = () => {
  const { width } = useScreenSize();

  return (
    <Container>
      <div className="w-full h-full p-3! sm:p-7!">
        <div className="w-full flex items-center ">
          <CompanyStats />
        </div>
      </div>
    </Container>
  );
};

export default Home;
