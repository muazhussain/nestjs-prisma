import { IsOptional } from "class-validator";

export class UpdateUserSettingDto {
    @IsOptional()
    notificationOn?: boolean;

    @IsOptional()
    smsEnabled?: boolean;
}