import {queues, jobs, viewState} from './components/WorkSpace/index.story'

let token = null;

const WorkSpace = {
  getAllJobs: () => {
    return jobs
  },
  getAllQueues: () => {
    return queues
  },
  getViewState: () => {
    return viewState
  }
}

export default {
  WorkSpace,
  setToken: _token => { token = _token; }
};
