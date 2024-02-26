// commands/index.ts
import ping from './ping';
import setupThreads from './setupThreads';
import resetThreadsConfig from './resetThreadsConfig';
import showThreadsConfig from './showThreadsConfig';

export default [
  ping, setupThreads, resetThreadsConfig, showThreadsConfig
];