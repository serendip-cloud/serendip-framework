"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal @module Db
 */
const chalk_1 = require("chalk");
const _ = require("underscore");
/**
 * Every functionality thats use database should use it trough this service
 */
class DbService {
    constructor() {
        this.providers = {};
    }
    static configure(options) {
        DbService.options = _.extend(DbService.options, options);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (DbService.options && DbService.options.providers)
                for (const key of Object.keys(DbService.options.providers)) {
                    const provider = DbService.options.providers[key];
                    console.log(chalk_1.default.gray(`DbService > trying to connect to DbProvider named: ${key}`));
                    yield provider.object.initiate(provider.options);
                    this.providers[key] = provider.object;
                    console.log(chalk_1.default.green(`DbService > connected to DbProvider name: ${key}`));
                }
        });
    }
    collection(collectionName, track, provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].collection(collectionName, track);
    }
    dropDatabase(provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].dropDatabase();
    }
    dropCollection(name, provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].dropCollection(name);
    }
    openUploadStreamByFilePath(filePath, metadata, provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].openUploadStreamByFilePath(filePath, metadata);
    }
    openDownloadStreamByFilePath(filePath, opts, provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].openDownloadStreamByFilePath(filePath, opts);
    }
    collections(provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].collections();
    }
    stats(provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].stats();
    }
    events(provider) {
        if (!provider && !DbService.options.defaultProvider) {
            throw "collection specific provider and default provider not set";
        }
        if (!this.providers[provider || DbService.options.defaultProvider])
            throw `> DbService provider named ${provider ||
                DbService.options.defaultProvider} not configured`;
        return this.providers[provider || DbService.options.defaultProvider].events;
    }
}
DbService.dependencies = [];
DbService.options = {};
exports.DbService = DbService;
