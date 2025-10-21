import { TokenGenerators } from '../utils/api_axios';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import https from 'https'
import util from 'util'
import "dotenv/config"
import * as fs from 'fs'
import Ajv2019 from "ajv/dist/2019"

const HIGHLIGHT = "color:green; background-color:yellow"
const HEADER_START_TIME = "request-start-time"
const HEADER_REPSONE_TIME = "response-time"
const outputDir = "./temp-dir"

export class ApiHelper {
    static async post(url: any, header: any, payload: any) {
        const config = {
            method: 'post',
            url: url,
            headers: header,
            data: payload,
        };
        return await new ApiHelper( ).request(config);;
    }

    static async get(url: any, header: any) {
        const config = {
            method: 'GET',
            url: url,
            headers: header,
        };
        return await new ApiHelper( ).request(config);;
    }

    static async put(url: any, header: any, payload: any) {
        const config = {
            method: 'put',
            url: url,
            headers: header,
            data: payload,
        };
        return await new ApiHelper( ).request(config);;
    }

    
  interceptorsEnabled: boolean = true

  static saveResponseData: boolean = false;
  static dateAndTimeForFileName = new Date().toISOString().replace(/([^a-z0-9]+)/gi, '-');
  static enableDebug: boolean = false

  public enableDebugging() {
    ApiHelper.enableDebug = true
    this.turnOnMessageTypes(['info', 'debub', 'warn', 'log'])
  }

  public setSaveResponseData(flag: boolean) {
    ApiHelper.saveResponseData = flag;
  }

  public turnOnMessageTypes(...messageTypes: any[]) {
    console.log(`Enabling console types: ${messageTypes}`, HIGHLIGHT)
    let iterator = messageTypes.values()
    for (const type of iterator) {
      console[type] = function () { console[type] }
    }

  }

  public turnOffMessageTypes(...messageTypes: any[]) {
    console.log(`%cDisabling console types: ${messageTypes}`, HIGHLIGHT)
    let iterator = messageTypes.values()
    for (const type of iterator) {
      console[type] = function () { }
    }

  }

  public async request(config: AxiosRequestConfig, options?: any): Promise<AxiosResponse> {
    const instance = axios.create()
    return await this.instanceRequest(instance, config)
  }

  public async instanceRequest(instance: AxiosInstance, config: AxiosRequestConfig, options?: any): Promise<AxiosResponse> {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    var responseToReturn: AxiosResponse;

    if (this.interceptorsEnabled) {
      instance.interceptors.request.use((config) => {
        config.headers[HEADER_START_TIME] = Date.now()
        return config
      })
      instance.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        const endTime: any = Date.now()
        const startTime: any = response.config.headers[HEADER_START_TIME]
        const durationInSeconds: number = (endTime - startTime) / 1000
        const durationInMilliSec: any = (endTime - startTime)
        response.headers[HEADER_REPSONE_TIME] = durationInMilliSec;
        return response
      })

    }

    await instance.request(config)
      .then(async (response) => {
        responseToReturn = response

        if (ApiHelper.enableDebug) {
          ApiHelper.debugResponse(response)
        }

        if (options?.SaveResponse || ApiHelper.saveResponseData) {
          // if (response.data !== '' && response.data.constructor === Object) {
          await ApiHelper.saveResponseToFile(config, response);
          // }
        }

      })
      .catch(function (error) {
        responseToReturn = error.response
        if (ApiHelper.enableDebug) {
          ApiHelper.debugResponseError(error)
        }

      }).finally(function () {
        if (ApiHelper.enableDebug) {// Print Input
          ApiHelper.debugRequestConfig(instance, config)
        }
        console.debug('-'.repeat(20))
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = undefined

      });

    return responseToReturn;
  }

  public setAuthorization(config: AxiosRequestConfig<any>,  token: any):AxiosRequestConfig {
    config.headers['Authorization'] = token
    return config
  }

  private static async saveResponseToFile(config: AxiosRequestConfig<any>, response: AxiosResponse<any, any>) {
    fs.mkdirSync(outputDir, { recursive: true });
    var fileName = outputDir + '/response_' + this.dateAndTimeForFileName + '.json';
    // For Debugging 
    var fileName = outputDir + '/response.json';
    console.debug(`Writing response.data to file......`)
    // fs.writeFileSync
    fs.appendFileSync( fileName, 
      "\n" + "-".repeat(20) + " REQUEST " + "-".repeat(20) + "\n"
      + util.inspect(config)
      + "\n" +"-".repeat(20) + " RESPONSE " + "-".repeat(20) + "\n"
      // + util.inspect(response.data)
      + JSON.stringify(response.data)
      + "\n" + "-".repeat(20) + " END " + "-".repeat(20) + "\n",
      'utf8')
    console.info(`Response data saved to file : '${fileName}' `)
  }

  public static async printResponseOnConsole(config: AxiosRequestConfig<any>, response: AxiosResponse<any, any>) {
    const lineBreak = "\n" + "-".repeat(50) + "\n"
    const dashes25 = "-".repeat(25)
    console.info("\n%s [%s] %s\n", dashes25, "RESPONSE DATA", dashes25)
    
    console.dir(response.data, { depth: null, colors: true })
    console.info("\n%s [%s] %s\n", dashes25, "RESPONSE HEADERS", dashes25)
    console.info(response.headers)
    console.info("\n%s [%s] %s\n", dashes25, "RESPONSE CONFIG", dashes25)
    console.info(response.config)

  }

  public static debugRequestConfig(instance: AxiosInstance, config: AxiosRequestConfig) {
    console.groupCollapsed("AXIOS INSTANCE")
    console.debug(util.inspect(instance))
    console.groupEnd()

    console.groupCollapsed("AXIOS CONFIG")
    console.debug(util.inspect(config))
    console.groupEnd()

    console.groupCollapsed("AXIOS.DEFAULTS")
    console.debug(util.inspect(axios.defaults))
    console.groupEnd()

  }

  public static debugResponse(response: AxiosResponse<any, any>) {

    console.log("RESPONSE TIME :".padEnd(30, " "), `${response.headers[HEADER_REPSONE_TIME]} milli seconds`)
    console.log("RESPONSE STATUS :".padEnd(30, " "), response.status)
    console.log("RESPONSE STATUS TEXT :".padEnd(30, " "), response.statusText)

    console.groupCollapsed("RESPONSE.DATA")
    console.debug(util.inspect(response.data))
    console.groupEnd()

    console.groupCollapsed("RESPONSE.HEADERS")
    console.debug(util.inspect(response.headers))
    console.groupEnd()

    console.groupCollapsed("RESPONSE.CONFIG")
    console.debug(util.inspect(response.config))
    console.groupEnd()

  }

  public static debugResponseError(error) {

    console.info("RESPONSE STATUS :".padEnd(30, " "), error?.response?.status)
    console.info("RESPONSE STATUS TEXT :".padEnd(30, " "), error?.response?.statusText)
    console.info("ERROR.CODE :".padEnd(30, " "), error?.code)
    console.info("ERROR MESSAGE :".padEnd(30, " "), error?.response?.data?.ErrorMessage)

    console.groupCollapsed("RESPONSE.ERROR")
    console.error(util.inspect(error))
    console.groupEnd()
  }


  /**
   * 
   * @param jsonResponseBody 
   * @param JsonSchema , preferbly give schema in latest draft version 2019
   * @returns 
   */
  public validateJsonSchema(jsonResponseBody, jsonSchemaFile: any): boolean {
    /***
     *  To Generate Schema, visit https://www.jsonschema.net/app/schemas/0
     *  Login > select "continue as a Guest"
     * 
     *  const ajv = new Ajv()
     *  const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")
     *  ajv.addMetaSchema(draft6MetaSchema)
     */
    const ajv = new Ajv2019()
    const validate = ajv.compile(jsonSchemaFile)
    const validation = validate(jsonResponseBody)
    console.log(`Schema Validaiton : ` + validation)
    if (!validation) {
      console.warn(`Validaiton failed !`)
      console.log(JSON.stringify(validate.errors))
    }
    return validation
  }
}
