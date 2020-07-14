import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlebarsTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
