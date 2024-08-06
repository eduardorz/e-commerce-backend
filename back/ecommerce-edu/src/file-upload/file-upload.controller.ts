import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @Post('uploadImage/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
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
