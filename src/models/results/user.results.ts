import { MudStatusCode } from "../../helpers/constants";

export class CreateUserResult {
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

export class UpdateUserResult {
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

export class DeleteUserResult {
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