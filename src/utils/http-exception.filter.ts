import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import * as fs from 'fs';
import { GraphQLError } from 'graphql';
import { v4 as uuid } from 'uuid';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const error = {
      id: uuid(),
      exception,
    };

    if (exception instanceof HttpException) {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo();
      const context = gqlHost.getContext();
      const userAgent = context.req.headers['user-agent'] || '';

      Logger.error(
        `${HttpStatus[`${exception.getStatus()}`]} \nerrorId: ${
          error.id
        } \n${userAgent}`,
        info.fieldName,
      );

      fs.appendFileSync('./errors.txt', `${JSON.stringify(error)}, \n`);
    }

    if (exception instanceof ApolloError) {
      Logger.error(
        `${exception.extensions.code} \nerrorId: ${error.id}`,
        exception.name,
      );

      fs.appendFileSync('./errors.txt', `${JSON.stringify(error)}, \n`);
    }

    return new GraphQLError(
      `${
        exception.status
          ? HttpStatus[`${exception.getStatus()}`]
          : `${exception.extensions.code}`
      }`,
      null,
      null,
      null,
      null,
      null,
      { errorId: error.id },
    );
  }
}
