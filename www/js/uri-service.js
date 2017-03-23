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
    this.GoogleAPIKEY = function () {
        if (this.role == 'demo') {
            return 'AIzaSyBLlgXM_UyBb1cK3gSPS62z2KP-_D0UHc0';
        }
    };
}
module.exports = UriService;