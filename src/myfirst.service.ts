import { Injectable } from '@nestjs/common';

export interface First {
  name: string;
}

@Injectable()
export class MyFirstService {
  private readonly firsts: First[] = [];

  create(value: First) {
    this.firsts.push(value);
  }

  findAll(): First[] {
    return this.firsts;
  }
}
