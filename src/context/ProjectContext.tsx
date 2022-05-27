import { RpcHelper } from "parasol-finance-sdk";
import { createContext, useContext, useEffect, useState } from "react";

import { ProjectDetails } from "../constants";
import { NftContext } from "./NftContext";

export const ProjectContext = createContext({});

const ProjectProvider = ({ children }: any) => {
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<any>();

  useEffect(() => {
    (async () => {
      if (projects.length === 0) {
        const helper = new RpcHelper(provider);
        await helper.getProjectList().then((p: any) => setProjects(p));
        setLastTimestamp(Date.now());
      }
    })();
  }, []);

  return (
    <>
      <ProjectContext.Provider
        value={{ projects, setProjects, lastTimestamp, setLastTimestamp }}
      >
        {children}
      </ProjectContext.Provider>
    </>
  );
};

export const useProjectData = () => {
  return useContext<any>(ProjectContext);
};

export default ProjectProvider;
