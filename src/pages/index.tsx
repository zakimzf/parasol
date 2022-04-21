import type { NextPage } from "next"
import Hero from "../components/slices/hero";
import Layout from "../components/layout";
import Brands from "../components/slices/brands";

const Home: NextPage = () =>
  <Layout>
    <Hero />
    {/*<Projects />*/}
    <Brands/>
  </Layout>

export default Home;
