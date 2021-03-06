/**
 * @internal @module Db
 */
import chalk from 'chalk';
import { DbProviderInterface, DbProviderOptionsInterface } from 'serendip-business-model';
import * as _ from 'underscore';

import { ServerServiceInterface } from '../server';

export interface DbServiceOptions {
  /**
   * name of default provider. will be used in case of executing collection without provider argument set
   */
  defaultProvider?: string;

  providers?: {
    [key: string]: {
      object?: DbProviderInterface;
      options?: DbProviderOptionsInterface;
    };
  };
}

/**
 * Every functionality thats use database should use it trough this service
 */
export class DbService implements ServerServiceInterface {
  static dependencies = [];

  static options: DbServiceOptions = {};

  static configure(options: DbServiceOptions) {
    DbService.options = _.extend(DbService.options, options);
  }

  private providers: { [key: string]: DbProviderInterface } = {};
  async start() {
    if (DbService.options && DbService.options.providers)
      for (const key of Object.keys(DbService.options.providers)) {
        const provider = DbService.options.providers[key];
        console.log(
          chalk.gray(
            `DbService > trying to connect to DbProvider named: ${key}`
          )
        );
        await provider.object.initiate(provider.options);
        this.providers[key] = provider.object;

        console.log(
          chalk.green(`DbService > connected to DbProvider name: ${key}`)
        );
      }
  }

  collection<T>(collectionName: string, track?: boolean, provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].collection<T>(collectionName, track);
  }

  dropDatabase(provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].dropDatabase();
  }

  dropCollection(name: string, provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].dropCollection(name);
  }

  openUploadStreamByFilePath(filePath: string, metadata: any, provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].openUploadStreamByFilePath(filePath, metadata);
  }



  openDownloadStreamByFilePath(filePath: string, opts?: { start?: number, end?: number, revision?: number }, provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].openDownloadStreamByFilePath(filePath, opts);
  }




  collections(provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].collections();
  }






  stats(provider?: string) {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;
    return this.providers[
      provider || DbService.options.defaultProvider
    ].stats();
  }

  events(provider?: string): { [key: string]: any } {
    if (!provider && !DbService.options.defaultProvider) {
      throw "collection specific provider and default provider not set";
    }
    if (!this.providers[provider || DbService.options.defaultProvider])
      throw `> DbService provider named ${provider ||
      DbService.options.defaultProvider} not configured`;

    return this.providers[provider || DbService.options.defaultProvider].events;
  }

  constructor() { }
}
