import { v4 as uuid } from 'uuid';

export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callBack: Function ) => {

    if( !file ) return callBack( new Error('File is empty'), false  );/* Innecesario */

    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${ uuid() }.${ fileExtension }`;

    callBack(null, fileName);

}