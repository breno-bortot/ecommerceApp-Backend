import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import * as sanitize from "sanitize-html";

export class UserParams {
    @IsString()
    @Transform(({ value }) => sanitize(value, { disallowedTagsMode:"escape" }) )
    userId: string;
}
