import {HttpException, HttpStatus} from "@nestjs/common";

export class CustomNotFoundException extends HttpException{
    constructor() {
        super(" not found", HttpStatus.NOT_FOUND);
    }
}

export class CustomBadDataException extends HttpException{
    constructor(data:string) {
        super(`некроректные данные запроса  ${data} `, HttpStatus.BAD_REQUEST);
    }
}








// 500 Internal Server Error
 export class CustomDuplicateException extends HttpException{
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}



 export class CustomOtherException extends HttpException{
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}

