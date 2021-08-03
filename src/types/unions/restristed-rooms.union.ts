import { Field, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { Room } from 'src/modules/rooms/entities/room.entity';

@Resolver('RestrictedRoom')
export class RestrictedRoomResolver {
  @ResolveField()
  __resolveType(value: Room): any {
    if (!value.hasOwnProperty('doctorId')) {
      return 'InfoForGuest';
    }
    if (value.hasOwnProperty('doctorId')) {
      return 'InfoForAdmin';
    }
    return null;
  }
}

@ObjectType()
export class InfoForAdmin {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  doctorId: string;
}

@ObjectType()
export class InfoForGuest {
  @Field()
  id: string;

  @Field()
  name: string;
}

export type RestrictedRoom = InfoForAdmin | InfoForGuest;
