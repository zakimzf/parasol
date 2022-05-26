import { createContext, useContext, useEffect, useState } from "react";

import { ProjectDetails } from "../constants";
import { NftContext } from "./NftContext";

export const ProjectContext = createContext({});

const ProjectProvider = ({ children }: any) => {
  const { helper } = useContext(NftContext);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<any>();

  useEffect(() => {
    (async () => {
      if (projects.length === 0) {
        await helper?.getProjectList().then((p: any) => setProjects(p));
        setLastTimestamp(Date.now());
      }
      else {
        console.log(projects, "forth");
      }
    })();
  }, [helper]);

  console.log(lastTimestamp, "lastTimestamp");

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
