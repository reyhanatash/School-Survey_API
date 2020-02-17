export default class secret {
    public static key = 'jabizsecret';
}
export class dbConnection {
    public static dbConfig = {
        connectionLimit: 1000,
        // host: '164.132.119.216',
        host: '164.132.119.216',
        // port: '3306',
        // user: 'root',
        port: '3030',
        user: 'brp',
        password: 'corpcorp',
        database: 'schoolsurvey'
    };
}
