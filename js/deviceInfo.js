import { Device } from "@capacitor/device";

export default {
    data() {
        return {
            id: "",
            name: "",
            model: "",
            manufacturer: "",
            osVersion: "",
        }
    },
    mounted() {
        Device.getId().then((id) => {
            this.id = id.identifier;
        });
        Device.getInfo().then((info) => {
            this.name = info.name;
            this.model = info.model;
            this.manufacturer = info.manufacturer;
            this.osVersion = info.osVersion;
        });
        $("#deviceInfo").table();
    },
    template: /* html */`
    <table id="deviceInfo" data-role="table" class="table-stroke ui-responsive">
        <tbody>
            <tr>
                <th>Device</th>
                <td>{{name}}</td>
            </tr>
            <tr>
                <th>ID</th>
                <td>{{id}}</td>
            </tr>
            <tr>
                <th>Model</th>
                <td>{{model}}</td>
            </tr>
            <tr>
                <th>Manufacturer</th>
                <td>{{manufacturer}}</td>
            </tr>
            <tr>
                <th>OS Version</th>
                <td>{{osVersion}}</td>
            </tr>
        </tbody>
    </table>`
};
