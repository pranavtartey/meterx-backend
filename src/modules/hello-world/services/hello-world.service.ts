import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  constructor() {}

  sayHelloWorld(): string {
    // Simulate some validation
    const someCondition = true;

    if (!someCondition) {
      // This will be caught by your global exception filter
      throw new BadRequestException('Invalid input provided');
    }

    try {
      // Your business logic here
      return 'hello-world';
    } catch {
      // Throw NestJS exception instead of returning empty string
      throw new InternalServerErrorException('Failed to process request');
    }
  }
}
