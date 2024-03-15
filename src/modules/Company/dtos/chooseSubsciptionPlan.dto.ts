import { IsUUID, IsEnum } from 'class-validator';
import { TSubscriptionPlan_Enum } from '../company.entity';

export class ChooseSubscriptionPlanDto {
  @IsEnum(TSubscriptionPlan_Enum)
  subscriptionPlan: TSubscriptionPlan_Enum;
}
