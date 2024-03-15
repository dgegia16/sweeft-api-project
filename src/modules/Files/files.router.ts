import express from 'express';
import { ValidateBody } from '@src/utils/validateBody';
import { UploadFileDto } from './dtos/uploadFile.dto';
import { ChangeVisibilityDto } from './dtos/changeVisibility.dto';
import { checkAuth, checkUserAuth } from '@src/middlewares/checkAuth';
import FilesController from './files.controller';

export const FilesRouter = express.Router();

FilesRouter.post(
  '/upload',
  checkAuth,
  checkUserAuth,
  ValidateBody(UploadFileDto),
  FilesController.uploadFile
);

FilesRouter.get('/all', checkAuth, FilesController.getAllFiles);

FilesRouter.delete('/delete/:fileId', checkAuth, FilesController.deleteFile);

FilesRouter.post(
  '/change-visibility',
  checkAuth,
  ValidateBody(ChangeVisibilityDto),
  FilesController.changeFileVisibility
);
