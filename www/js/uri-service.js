/**
 * Created by carlos on 13/03/17.
 */
function UriService() {
    this.role = 'demo';
    this.driverList = function (source, destination) {
        if (this.role == 'demo') {
            return './assets/json/drivers.json';
        }
    };

}
module.exports = UriService;