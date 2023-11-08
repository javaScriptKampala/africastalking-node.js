'use strict';

const fixtures = require('africastalking/test/fixtures');

let AfricasTalking, mobileData;

describe('Mobile Data Bundles', function(){

    this.timeout(15000);

    before(function () {
        AfricasTalking = require('africastalking/lib')(fixtures.TEST_ACCOUNT);
        mobileData = AfricasTalking.MOBILE_DATA;
    });

    describe('validation', function () {
        it('#send() cannot be empty', function () {
            return mobileData.send({})
                .should.be.rejected();
        });

        it('#send() must have phoneNumber, quantity, unit and validity', function () {
            const opts =  {
                productName:'Mobile Data',
                recipients: [ { phoneNumber: fixtures.phoneNumber } ]
            }

            return mobileData.send(opts).should.be.rejected();
        });
        
        it('#send() rejects because there is at least one invalid phoneNumber', function(){
            const opts = {
                productName:'Mobile Data',
                recipients: [
                    {
                        phoneNumber: '+25571234567890223',
                        quantity: 50,
                        unit: 'MB',
                        validity: 'Day',
                        isPromoBundle: false,
                        metadata: {
                            "first_name": "Daggie",
                            "last_name": "Blanqx"
                        }
                    },
                ]
            };
            
            return mobileData.send(opts).should.be.rejected();
    
        });

        it('#send() rejects invalid options', function () {
            const opts = {
                productName:'Mobile Data',
                recipients: [
                    {
                        phoneNumber: 'not phone',
                        quantity: 50,
                        unit: 'ZB',
                        validity: 'Today'
                    },
                ]
            };

            return mobileData.send(opts).should.be.rejected();
        });
    });

    it('sends mobiledata to one', function (done) {
        const opts = {
            productName:'Mobile Data',
            recipients: [
                {
                    phoneNumber: fixtures.phoneNumber,
                    quantity: 50,
                    unit: 'MB',
                    validity: 'Day'
                },
            ]
        };

        mobileData.send(opts)
            .then(function(resp){
                resp.should.have.property('responses');
                done();
            })
            .catch(function(){
                done();
            });

    });

    it('sends mobiledata to many', function(done){
        const opts = {
            productName:'Mobile Data',
            recipients: [
                {
                    phoneNumber: fixtures.phoneNumber,
                    quantity: 50,
                    unit: 'MB',
                    validity: 'Day'
                },
                {
                    phoneNumber: fixtures.phoneNumber,
                    quantity: 50,
                    unit: 'MB',
                    validity: 'Day'
                },
            ]
        };
        
        mobileData.send(opts)
            .then(function(resp){
                resp.should.have.property('responses');
                done();
            })
            .catch(function(){
                done();
            });
        });
});
