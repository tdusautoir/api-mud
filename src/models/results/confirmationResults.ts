export class VerifyEmailResult{
    success: boolean;
    errorMessage?: string;    
    returnCode?: number;
    resultObject?: object;

    constructor(success: boolean, errorMessage?: string, returnCode?: number, resultObject?: object) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.returnCode = returnCode;
        this.resultObject = resultObject;
    };
}