/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

(function () {
    'use strict';

    var TrafficCop = require('@mozmeao/trafficcop');
    var href = window.location.href;

    var initTrafficCop = function () {
        if (href.indexOf('v=') !== -1) {
            if (href.indexOf('v=1') !== -1) {
                window.dataLayer.push({
                    'data-ex-variant': 'no-variant',
                    'data-ex-name': 'wnp-103-en-experiment'
                });
            } else if (href.indexOf('v=2') !== -1) {
                window.dataLayer.push({
                    'data-ex-variant': 'mozrally',
                    'data-ex-name': 'wnp-103-en-experiment'
                });
            }
        } else if (TrafficCop) {
            var acab = new TrafficCop({
                id: 'exp-wnp-103-en',
                cookieExpires: 0,
                variations: {
                    'v=1': 90,
                    'v=2': 10
                }
            });
            acab.init();
        }
    };

    // Avoid entering automated tests into random experiments.
    if (href.indexOf('automation=true') === -1) {
        initTrafficCop();
    }
})();