

export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callBack: Function ) => {

    //Validar si nos mandan archivo o no...
    // y lo aceptamos o no de acuerdo al fileFilter de nestjs
    if( !file ) return callBack( new Error('File is empty'), false  );

    const fileExptension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if( validExtensions.includes( fileExptension ) ) {
        return callBack( null, true );
    }

    callBack(null, false);

}