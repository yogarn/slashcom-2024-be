import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ path: string; url: string }> {
    const path = await this.storageService.uploadFile(file);
    return {
      path: path,
      url: `https://ovzjkuidtmhedlcdjhkm.supabase.co/storage/v1/object/public/storage/${path}`,
    };
  }

  @Delete('/:path')
  async deleteFile(@Param('path') path: string) {
    return await this.storageService.deleteFile(path);
  }
}
