import { Files } from './files.entity';
import { UploadFileDto } from './dtos/uploadFile.dto';
import { GetUserById } from '../User/user.service';

export async function UploadFile(body: UploadFileDto) {
  
  const file = Files.create({
    name: body.name,
    ownerUserId: body.ownerUserId,
    ownerCompanyId: body.ownerCompanyId,
    path: 'path'
  });
  await file.save();
  return file;
}

export async function GetAllFiles(
  currentUserType: 'user' | 'company',
  currentUserId: string
) {
  if (currentUserType === 'user') {
    const user = await GetUserById(currentUserId);

    const publicFiles = await Files.find({
      where: { private: false, ownerCompanyId: user.companyId }
    });

    const privateFiles = await Files.find({
      where: {
        ownerUserId: currentUserId,
        private: true,
        ownerCompanyId: user.companyId
      }
    });

    return [...publicFiles, ...privateFiles];
  } else if (currentUserType === 'company') {
    const files = await Files.find({
      where: { ownerCompanyId: currentUserId }
    });
    return files;
  }
}

export async function GetFile(fileId: string) {
  const file = await Files.findOne({ where: { id: fileId } });
  if (!file) {
    throw new Error('File not found');
  }
  return file;
}

export async function DeleteFile(userId: string, fileId: string) {
  const file = await GetFile(fileId);
  if (file.ownerUserId !== userId) {
    throw new Error('You are not authorized to delete this file');
  }
  await file.remove();
  return file;
}

export async function ChangeFileVisibility(
  fileId: string,
  visibility: boolean,
  currentUserId: string,
  currentUserType: 'user' | 'company'
) {
  const file = await GetFile(fileId);

  if (currentUserType === 'user' && file.ownerUserId === currentUserId) {
    file.private = visibility;
    await file.save();
    return file;
  } else if (
    currentUserType === 'company' &&
    file.ownerCompanyId === currentUserId
  ) {
    file.private = visibility;
    await file.save();
    return file;
  }
}
