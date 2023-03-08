import {renderApp} from './server';

export const render = async (req: any, res: any) => {
  const {html} = await renderApp(req, res);

  res.json({html});
};

export const routes = () => {
  return ['/'];
};
