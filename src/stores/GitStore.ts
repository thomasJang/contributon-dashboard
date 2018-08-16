import { types, flow, getEnv, getRoot } from 'mobx-state-tree';
import IStoreEnv from './StoreEnv';
import { IAppStore } from './AppStore';

export const Log = types.model('Log', {
  id: types.number,
  content: types.string,
});

export const Project = types.model('Project', {
  projectId: types.string,
  projectName: types.string,
  commit: types.number,
  issue: types.number,
});

type ILogType = typeof Log.Type;
export interface ILog extends ILogType {}

type IProjectType = typeof Project.Type;
export interface IProject extends IProjectType {}

const projectList = [
  {
    projectId: '1',
    projectName: 'ankus - Lite for web data analysis',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '2',
    projectName: 'Chromium / Blink',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '3',
    projectName: 'Contiribute to Keras(+Tensorflow) Documentation',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '4',
    projectName: 'CUBRID DBMS를 적용한 CMS(Content Management System)',
    Repository: 'https://github.com/cubrid-cms',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '5',
    projectName: 'GitShare',
    Repository: 'https://github.com/jsdevkr/gitCodeShare.com',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '6',
    projectName: 'Guider',
    Repository: 'https://github.com/iipeace/guider',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '7',
    projectName: 'it-chain',
    Repository: 'https://github.com/it-chain/engine',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '8',
    projectName: 'Netfilter',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '9',
    projectName: 'OpenStack',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '10',
    projectName: 'Presto Music',
    Repository: 'https://github.com/kosslab-kr/Presto.Contributhon',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '11',
    projectName: 'Tizen C#/Xamarin Sample App 개발',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '12',
    projectName: 'Tizen NN API & Runtime',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '13',
    projectName: 'uftrace',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '14',
    projectName: 'webOS Open Source Edition',
    Repository: '',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '15',
    projectName: '구름입력기',
    Repository: 'https://github.com/gureum/gureum/',
    commit: 0,
    issue: 0,
  },
  {
    projectId: '16',
    projectName: '캐글 속 커널 한글화 작업을 통한 데이터 사이언스 대중화',
    Repository: 'https://github.com/kosslab-kr/Kaggle_KR',
    commit: 0,
    issue: 0,
  },
];

const ProjectStore = types
  .model('UserStore', {
    projects: types.optional(types.array(Project), []),
    log: types.optional(types.array(Log), []),
  })
  .actions(self => {
    const init = function() {
      self.log.push({
        id: 1,
        content: 'first commit',
      });

      self.projects = projectList as any;

      return {};
    };

    return {
      init,
    };
  });

type IProjectStoreType = typeof ProjectStore.Type;
export interface IProjectStore extends IProjectStoreType {}

export default ProjectStore;
