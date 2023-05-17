import { MudStatusCode } from "../../helpers/constants";

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

export class DeleteConfirmationResult{
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