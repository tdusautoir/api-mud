import { MudStatusCode } from "../../helpers/constants";

export class CreateUserStatsResult {
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
};

export class UpdateUserStatsResult {
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
};