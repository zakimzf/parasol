import type { NextPage } from "next"
import Hero from "../components/slices/hero";
import Projects from "../components/slices/projects";
import Layout from "../components/layout";

const Home: NextPage = () =>
  <Layout>
    <Hero />
    <Projects />
  </Layout>

export default Home;
