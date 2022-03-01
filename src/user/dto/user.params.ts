import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import * as sanitize from "sanitize-html";

export class UserParams {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    userId: string;
}
