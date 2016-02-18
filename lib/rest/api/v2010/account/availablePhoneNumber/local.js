'use strict';

var _ = require('lodash');
var Q = require('q');
var Page = require('../../../../../base/Page');
var deserialize = require('../../../../../base/deserialize');
var values = require('../../../../../base/values');

var LocalPage;
var LocalList;
var LocalInstance;
var LocalContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalPage
 * @augments Page
 * @description Initialize the LocalPage
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {string} accountSid -
 *          A 34 character string that uniquely identifies this resource.
 * @param {string} countryCode - The country_code
 *
 * @returns LocalPage
 */
/* jshint ignore:end */
function LocalPage(version, response, accountSid, countryCode) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    countryCode: countryCode
  };
}

_.extend(LocalPage.prototype, Page.prototype);
LocalPage.prototype.constructor = LocalPage;

/* jshint ignore:start */
/**
 * Build an instance of LocalInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns LocalInstance
 */
/* jshint ignore:end */
LocalPage.prototype.getInstance = function getInstance(payload) {
  return new LocalInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.countryCode
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalList
 * @description Initialize the LocalList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid -
 *          A 34 character string that uniquely identifies this resource.
 * @param {string} countryCode - The country_code
 */
/* jshint ignore:end */
function LocalList(version, accountSid, countryCode) {
  /* jshint ignore:start */
  /**
   * @function local
   * @memberof Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalContext}
   */
  /* jshint ignore:end */
  function LocalListInstance(sid) {
    return LocalListInstance.get(sid);
  }

  LocalListInstance._version = version;
  // Path Solution
  LocalListInstance._solution = {
    accountSid: accountSid,
    countryCode: countryCode
  };
  LocalListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/AvailablePhoneNumbers/<%= countryCode %>/Local.json' // jshint ignore:line
  )(LocalListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams LocalInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.areaCode] - The area_code
   * @param {string} [opts.contains] - The contains
   * @param {string} [opts.smsEnabled] - The sms_enabled
   * @param {string} [opts.mmsEnabled] - The mms_enabled
   * @param {string} [opts.voiceEnabled] - The voice_enabled
   * @param {string} [opts.excludeAllAddressRequired] -
   *          The exclude_all_address_required
   * @param {string} [opts.excludeLocalAddressRequired] -
   *          The exclude_local_address_required
   * @param {string} [opts.excludeForeignAddressRequired] -
   *          The exclude_foreign_address_required
   * @param {string} [opts.beta] - The beta
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  LocalListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done) {
            return false;
          }

          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, opts));
  };

  /* jshint ignore:start */
  /**
   * @description Lists LocalInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.areaCode] - The area_code
   * @param {string} [opts.contains] - The contains
   * @param {string} [opts.smsEnabled] - The sms_enabled
   * @param {string} [opts.mmsEnabled] - The mms_enabled
   * @param {string} [opts.voiceEnabled] - The voice_enabled
   * @param {string} [opts.excludeAllAddressRequired] -
   *          The exclude_all_address_required
   * @param {string} [opts.excludeLocalAddressRequired] -
   *          The exclude_local_address_required
   * @param {string} [opts.excludeForeignAddressRequired] -
   *          The exclude_foreign_address_required
   * @param {string} [opts.beta] - The beta
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  LocalListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource) {
      allResources.push(resource);
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of LocalInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.areaCode] - The area_code
   * @param {string} [opts.contains] - The contains
   * @param {string} [opts.smsEnabled] - The sms_enabled
   * @param {string} [opts.mmsEnabled] - The mms_enabled
   * @param {string} [opts.voiceEnabled] - The voice_enabled
   * @param {string} [opts.excludeAllAddressRequired] -
   *          The exclude_all_address_required
   * @param {string} [opts.excludeLocalAddressRequired] -
   *          The exclude_local_address_required
   * @param {string} [opts.excludeForeignAddressRequired] -
   *          The exclude_foreign_address_required
   * @param {string} [opts.beta] - The beta
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  LocalListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'AreaCode': opts.areaCode,
      'Contains': opts.contains,
      'SmsEnabled': opts.smsEnabled,
      'MmsEnabled': opts.mmsEnabled,
      'VoiceEnabled': opts.voiceEnabled,
      'ExcludeAllAddressRequired': opts.excludeAllAddressRequired,
      'ExcludeLocalAddressRequired': opts.excludeLocalAddressRequired,
      'ExcludeForeignAddressRequired': opts.excludeForeignAddressRequired,
      'Beta': opts.beta,
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new LocalPage(
        this._version,
        payload
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  return LocalListInstance;
}


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.AvailablePhoneNumberCountryContext.LocalInstance
 * @description Initialize the LocalContext
 *
 * @property {string} friendlyName - The friendly_name
 * @property {string} phoneNumber - The phone_number
 * @property {string} lata - The lata
 * @property {string} rateCenter - The rate_center
 * @property {number} latitude - The latitude
 * @property {number} longitude - The longitude
 * @property {string} region - The region
 * @property {string} postalCode - The postal_code
 * @property {string} isoCountry - The iso_country
 * @property {string} addressRequirements - The address_requirements
 * @property {string} beta - The beta
 * @property {string} capabilities - The capabilities
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} payload - The instance payload
 */
/* jshint ignore:end */
function LocalInstance(version, payload, accountSid, countryCode) {
  this._version = version;

  // Marshaled Properties
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.phoneNumber = payload.phone_number; // jshint ignore:line
  this.lata = payload.lata; // jshint ignore:line
  this.rateCenter = payload.rate_center; // jshint ignore:line
  this.latitude = deserialize.decimal(payload.latitude); // jshint ignore:line
  this.longitude = deserialize.decimal(payload.longitude); // jshint ignore:line
  this.region = payload.region; // jshint ignore:line
  this.postalCode = payload.postal_code; // jshint ignore:line
  this.isoCountry = payload.iso_country; // jshint ignore:line
  this.addressRequirements = payload.address_requirements; // jshint ignore:line
  this.beta = payload.beta; // jshint ignore:line
  this.capabilities = payload.capabilities; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    countryCode: countryCode,
  };
}

module.exports = {
  LocalPage: LocalPage,
  LocalList: LocalList,
  LocalInstance: LocalInstance,
  LocalContext: LocalContext
};