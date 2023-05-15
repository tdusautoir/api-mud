import { MudStatusCode } from "../../constants/statusCodes";

export class VerifyEmailResult{
    success: boolean;
    errorMessage?: string;    
    returnCode?: MudStatusCode;
    resultObject?: object;

    constructor(success: boolean, errorMessage?: string, returnCode?: MudStatusCode, resultObject?: object) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.returnCode = returnCode;
        this.resultObject = resultObject;
    };
}

export class CreateConfirmationResult{
    success: boolean;
    errorMessage?: string;    
    returnCode?: MudStatusCode;
    resultObject?: object;

    constructor(success: boolean, errorMessage?: string, returnCode?: MudStatusCode, resultObject?: object) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.returnCode = returnCode;
        this.resultObject = resultObject;
    };
}