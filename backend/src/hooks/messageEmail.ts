interface Params {
    name: string;
    email: string;
    text: string;
}

export function messageResponse({ name }: Params): string {
    return  `
            <p>Estimado/a ${name},</p>
            <p>Queremos informarte que hemos recibido tu consulta y estamos encantados de brindarte más información sobre nuestros cursos. Nuestro equipo está revisando tu solicitud en este momento y se comunicará contigo a la brevedad.</p>
            <p>Si tienes alguna pregunta adicional o necesitas más detalles sobre nuestros cursos, no dudes en comunicarte con nosotros a través de este correo electrónico o a través de los medios de contacto proporcionados en nuestra <a href="https://www.urbano.com.ar/">página web</a>.</p>
            <p>¡Te mantendremos informado/a sobre los avances de tu solicitud y estaremos en contacto pronto!</p>
            <br>
            <p>Saludos cordiales, Urbano.</p>
            <br>
            <hr>
            <br>
            <div> <a href="https://www.urbano.com.ar/"> <img src="https://www.urbano.com.ar/assets/media/general/LOGO_AUDITORIA_CO_WWW.png" width="100%" height="200px"/> </a> </div>
            `;
};

export function messageRequire ({ name, email, text }: Params): string {
    return  `
            <p>Un usuario realizó la siguiente consulta:</p>
            <br>${text}
            </p>
            <p>Información del usuario:
            <br><b>Nombre: </b>${name}
            <br><b>Email: </b>${email}
            </p>
            <br>
            <div> <a href="https://www.urbano.com.ar/"> <img src="https://www.urbano.com.ar/assets/media/general/LOGO_AUDITORIA_CO_WWW.png" width="100%" height="200px"/> </a> </div>
            `;
};