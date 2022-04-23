import type { NextPage } from "next"
import Hero from "../components/slices/hero";
import Layout from "../components/layout";
import Brands from "../components/slices/brands";
import Projects from "../components/slices/projects";

const Home: NextPage = () =>
  <Layout>
    <Hero />
    <Brands/>
    <Projects />
  </Layout>

export default Home;
