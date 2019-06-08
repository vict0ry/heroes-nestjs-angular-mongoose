import { ApiModelProperty } from '@nestjs/swagger';

export class HeroDTO {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly _id: string;
}
