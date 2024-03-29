var updateSessionById = require('./lib/apiClient').updateSessionById
const supportedHelpers = [
  'WebDriver',
  'Appium',
  'Playwright'
];


class LambdaTestHelper extends Helper{

  _init(){
    this.updateTestName = this.config.updateTestName

    if (!this.config.user || !this.config.key) throw new Error('Please provide proper Lambdatest credentials')
    this.lambdatestCredentials = {
      username: this.config.user,
      accessKey: this.config.key,
      isApp: this.config?.isApp || false
    }
  }

 async getSessionId (helper, isApp) {
    try {
      if ( !isApp && helper.WebDriver) {
        return helper.WebDriver.browser.sessionId;
      }
      
      if ( !isApp && helper.Playwright) {
          const { page } = helper.Playwright;
          const resp =await JSON.parse(await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({action: 'getTestDetails'})}`));
          return resp?.data?.session_id;    
      }
      if (helper.helpers.Appium) {
          return helper.helpers.Appium.browser.sessionId;
      }

    } catch(err){
      console.log("Error - ", err)
    }
    
    throw new Error(`No matching helper found. Supported helpers: ${supportedHelpers.join('/')}`);
}

  getBody(testTitle = null, status = null){
    let body = {}
    if(status != null) body.status_ind = status
    if (this.updateTestName && testTitle != null) body.name = testTitle    
    
    return body
  }

  async updateJob(sessionId, body, lambdaCredentials) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));    
    await sleep(2000)
    try{
        await updateSessionById(sessionId, body, lambdaCredentials)
    }catch (err){
        console.log("Update api call error- ", err)

    }
    
  }

 
 async _failed(test){
    console.log("Test Failed", test.title)
    
    var sessionId = await this.getSessionId(this.helpers,this.lambdatestCredentials.isApp)
    console.log("Test ID", sessionId)   

    if (sessionId && test.title){
      var body = this.getBody(null, "failed")
      this.updateJob(sessionId, body, this.lambdatestCredentials)
    }


  }

  async _passed(test){
    console.log("Test Passed", test.title)
    var sessionId = await this.getSessionId(this.helpers,this.lambdatestCredentials.isApp)
    console.log("Test ID", sessionId)   

    if (sessionId && test.title){
      var body = this.getBody(null, "passed")
      this.updateJob(sessionId, body, this.lambdatestCredentials)
    }


  }

  async _before(test)
  {
    var sessionId = await this.getSessionId(this.helpers,this.lambdatestCredentials.isApp)
    console.log("Test ID", sessionId)   

    if (sessionId && test.title){
      var body = this.getBody(test.title,null)
      this.updateJob(sessionId, body, this.lambdatestCredentials)
    }

  }


}
module.exports =  LambdaTestHelper