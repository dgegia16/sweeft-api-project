import { Request, Response } from 'express';
import {
  GetAllFiles,
  UploadFile,
  DeleteFile,
  ChangeFileVisibility
} from './files.service';

class FilesController {
  async uploadFile(req: Request, res: Response) {
    try {
      const file = await UploadFile(req.body);
      return res.status(201).json(file);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllFiles(req: Request, res: Response) {
    try {
      const files = await GetAllFiles(req.auth?.type as any, req?.auth?.id!);
      return res.status(200).json(files);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const file = await DeleteFile(req.auth?.id!, req.params.fileId);
      return res.status(202).json(file);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async changeFileVisibility(req: Request, res: Response) {
    try {
      const { fileId, isPrivate } = req.body;

      const file = await ChangeFileVisibility(
        fileId,
        isPrivate,
        req.auth?.id!,
        req.auth?.type as any
      );

      return res.status(200).json(file);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new FilesController();
