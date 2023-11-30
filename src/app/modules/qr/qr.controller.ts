import { Controller, Get, HttpStatus, Post, Query, Request, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpResponse } from 'app/shared/custom/http-response/http-response.service';
import { join, resolve } from 'path';
import * as QRCode from 'qrcode';
import { QRCodeToFileStreamOptions } from 'qrcode';
import * as stream from 'stream';

@Controller()
@ApiTags("QR Code")
export class QRController {
    
    @Get("list")
    @ApiOperation({ summary: "Display QR", description: "A simple greeting API that returns a friendly \"QR, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    getQR(
        @Request() request, 
        @Query("name") message: string
    ) {
        const response = new CustomHttpResponse({
            code: "OK",
            message: "API call successfull",
            additionalMessage: "Git Gud",
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        });
        request.res.statusCode = response.statusCode;
        return response;
    }

    @Get("view")
    @ApiOperation({ summary: "View QR", description: "A simple greeting API that returns a friendly \"QR, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    async displayQrCode(@Response() response) {
        try {

            const qrCodeValue = "Hi mom";
            const qrCodeStream = new stream.PassThrough();
            const qrCodeOptions: QRCodeToFileStreamOptions = {
                errorCorrectionLevel: "H",
                type: "png",
                scale: 18,
                margin: 1,
                color: {
                    dark: "#28282B",
                    light: "#F9F6EE"
                }
            }

            QRCode.toFileStream(qrCodeStream, qrCodeValue , qrCodeOptions);

            response.setHeader("Content-Type", "image/png");
            response.setHeader("Content-Disposition", `inline; filename=test.png`);

            qrCodeStream.pipe(response);

        } catch (error) {
            response.status(500).json({ message: "Internal Server Error", error });
        }
    }

    @Post("generate")
    @ApiOperation({ summary: "Generate QR", description: "A simple greeting API that returns a friendly \"QR, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    async generateQrCode(@Response() response) {
        try {

            const qrCodeData = "Your QR Code Data"; // Replace with your actual data
            const folderPath = resolve("./src/storage/qr-codes");
            const qrCodePath = join(folderPath, `${Date.now()}.png`);
            
            await QRCode.toFile(qrCodePath, qrCodeData);
            console.log(5);
            response.status(201).json({ message: "QR Code generated successfully" });
        } catch (error) {
            response.status(500).json({ message: "Internal Server Error", error });
        }
    }
}
