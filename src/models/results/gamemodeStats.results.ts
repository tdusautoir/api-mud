import { MudStatusCode } from "../../helpers/constants";

export class CreateGamemodeStatsResult {
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

export class UpdateGamemodeStatsResult {
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