import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from 'app/modules/hello/hello.controller';
import { CustomHttpResponse } from 'app/shared/custom/http-response/http-response.service';

describe('HelloController', () => {
    let controller: HelloController;
    let customHttpResponse: CustomHttpResponse<any>;

    beforeEach(async () => {
        customHttpResponse = new CustomHttpResponse({
            code: 'OK',
            message: 'API call successfull',
            additionalMessage: 'Git Gud',
            statusCode: HttpStatus.OK,
            data: {
                message: 'Hello, World!'
            }
        });

        const module: TestingModule = await Test.createTestingModule({
            controllers: [HelloController],
        }).compile();

        controller = module.get<HelloController>(HelloController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a custom response with "Hello, World!" when no name query parameter is provided', () => {
        const result = controller.getHello({ res : { statusCode: 200 } }, 'Hello, World!');
        expect(result).toEqual(customHttpResponse);
    });
});