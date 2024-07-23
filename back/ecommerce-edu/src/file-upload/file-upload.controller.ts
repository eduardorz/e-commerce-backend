import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id') productId: string,
        @UploadedFile() file: Express.Multer.File,
    ){
        return this.fileUploadService.uploadImage(file, productId);
    }
}
