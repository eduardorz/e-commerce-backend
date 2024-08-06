import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id', ParseUUIDPipe) productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: 'Supera el máximo de 200kb',
                    }),
                    new FileTypeValidator({
                        fileType: /(.jpg|.jpeg|.png|.webp)/,
                    }),
                ],
            }),
        ) file: Express.Multer.File,
    ){
        return this.fileUploadService.uploadImage(file, productId);
    }
}
